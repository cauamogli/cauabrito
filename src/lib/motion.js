// Estado global de ponteiro + scroll, SEM provocar re-render do React.
// O R3F (useFrame) lê diretamente destes objetos mutáveis;
// componentes DOM podem usar os hooks com motion values do Framer.

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

// Ponteiro normalizado: -1 (esquerda/topo) .. 1 (direita/baixo)
export const pointer = { nx: 0, ny: 0 };

// Scroll: velocity decai pra 0; progress 0..1 da página
export const scrollState = { velocity: 0, progress: 0, lastY: 0, dir: 1 };

// Detecção de dispositivo de baixa potência / touch
export const isTouch =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

let listenersAttached = false;

export function attachGlobalListeners() {
  if (listenersAttached || typeof window === "undefined") return;
  listenersAttached = true;

  const onMove = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    pointer.nx = (x / window.innerWidth) * 2 - 1;
    pointer.ny = (y / window.innerHeight) * 2 - 1;
  };

  const onScroll = () => {
    const y = window.scrollY || 0;
    const max = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    scrollState.dir = y >= scrollState.lastY ? 1 : -1;
    scrollState.velocity = Math.min(
      6,
      scrollState.velocity + Math.abs(y - scrollState.lastY) * 0.05
    );
    scrollState.progress = y / max;
    scrollState.lastY = y;
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  // Decaimento contínuo da velocidade de scroll
  const decay = () => {
    scrollState.velocity *= 0.92;
    if (scrollState.velocity < 0.001) scrollState.velocity = 0;
    requestAnimationFrame(decay);
  };
  requestAnimationFrame(decay);
}

// Hook para parallax em elementos DOM (segue o ponteiro com mola suave).
// strength = quantos px de deslocamento máximo.
export function usePointerParallax(strength = 20, stiffness = 60) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const x = useSpring(rx, { stiffness, damping: 18, mass: 0.6 });
  const y = useSpring(ry, { stiffness, damping: 18, mass: 0.6 });

  useEffect(() => {
    let raf;
    const loop = () => {
      rx.set(pointer.nx * strength);
      ry.set(pointer.ny * strength);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [rx, ry, strength]);

  return { x, y };
}
