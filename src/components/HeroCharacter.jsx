import { useEffect, useMemo, useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { usePointerParallax, pointer, isTouch } from "../lib/motion";
import personagem from "../assets/personagem.png";

/**
 * Personagem principal — GRADE DE OLHAR (3×3).
 *
 * 9 fotos do personagem olhando para direções diferentes. Conforme o
 * mouse se move, fazemos crossfade (mistura por opacidade) entre as
 * fotos vizinhas → o olhar acompanha o cursor de forma contínua e
 * natural, sem cortes. PNGs transparentes = flutua sem caixa.
 *
 * TESTE COM 3 POSES (horizontal). Coloque em src/assets/gaze/:
 *    left.png    center.png    right.png
 *  (mesmo enquadramento/pose, só a cabeça mudando; PNG transparente)
 *  Depois dá pra expandir para a grade 3×3 completa.
 */

// Carrega tudo que existir em assets/gaze/*.png (não quebra se faltar)
const modules = import.meta.glob("../assets/gaze/*.png", {
  eager: true,
  import: "default",
});
const gazeImages = {};
for (const path in modules) {
  const name = path.split("/").pop().replace(".png", "");
  gazeImages[name] = modules[path];
}
const imgFor = (name) =>
  gazeImages[name] || gazeImages["center"] || personagem;

// 3 poses na horizontal: índice 0 = esquerda, 1 = centro, 2 = direita
const CELLS = [
  { name: "left" },
  { name: "center" },
  { name: "right" },
  { name: "up" },
  { name: "down" },
];

export default function HeroCharacter() {
  const { x, y } = usePointerParallax(18, 45);
  const rotateY = useTransform(x, [-18, 18], [-6, 6]);
  const rotateX = useTransform(y, [-18, 18], [5, -5]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ perspective: 1200 }}
    >
      {/* Raios de luz volumétrica bem suaves atrás */}
      <GodRays />

      {/* Brilho ambiente discreto */}
      <div className="pointer-events-none absolute top-[14%] h-[46%] w-[46%] rounded-full bg-neon-blue/12 blur-[120px]" />
      <div className="pointer-events-none absolute top-[24%] h-[34%] w-[34%] rounded-full bg-neon-cyan/10 blur-[90px]" />

      {/* Plataforma de energia sutil nos pés */}
      <EnergyPlatform />

      {/* CAMADA EXTERNA — parallax + tilt sutil do mouse */}
      <motion.div
        className="relative z-10"
        style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* CAMADA INTERNA — flutuação lenta */}
        <motion.div
          className="relative"
          animate={{
            y: [0, -14, 4, -9, 0],
            rotate: [-1.2, 0.8, -0.5, 1.2, -1.2],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <GazeStack />
        </motion.div>
      </motion.div>

      {/* Moldura de MIRA estável (lock-on) */}
      <LockOnFrame />
    </div>
  );
}

/* -------------------------------------------------------------
   Pilha das 9 fotos com olhar que segue o mouse (crossfade)
   ------------------------------------------------------------- */
function GazeStack() {
  const refs = useRef([]);

  useEffect(() => {
    if (isTouch) return;

    let raf;

    const cur = {
      x: 0,
      y: 0,
    };

    const clamp = (v, min = -1, max = 1) => Math.max(min, Math.min(max, v));

    const loop = () => {
      // Mouse normalizado:
      // x: -1 esquerda | 0 centro | 1 direita
      // y: -1 cima     | 0 centro | 1 baixo
      const tx = clamp(pointer.nx);
      const ty = clamp(pointer.ny);

      // Suavização do movimento do olhar
      cur.x += (tx - cur.x) * 0.12;
      cur.y += (ty - cur.y) * 0.12;

      const ax = Math.abs(cur.x);
      const ay = Math.abs(cur.y);

      // Pesos de cada direção
      const weights = {
        center: Math.max(0, 1 - Math.max(ax, ay) * 1.45),
        left: Math.max(0, -cur.x),
        right: Math.max(0, cur.x),
        up: Math.max(0, -cur.y),
        down: Math.max(0, cur.y),
      };

      // Normaliza para a soma das opacidades ficar natural
      const total =
        weights.center +
        weights.left +
        weights.right +
        weights.up +
        weights.down || 1;

      for (let i = 0; i < CELLS.length; i++) {
        const cell = CELLS[i];
        const el = refs.current[i];

        if (el) {
          const opacity = weights[cell.name] / total;
          el.style.opacity = String(opacity);
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  const imgStyle = {
    filter:
      "drop-shadow(0 0 16px rgba(34,211,238,0.4)) drop-shadow(0 0 46px rgba(59,130,246,0.28)) drop-shadow(0 14px 32px rgba(0,0,0,0.65))",
  };

  return (
    <motion.div
      data-cursor
      className="relative"
      style={{ height: "62vh", aspectRatio: "1024 / 1536" }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {CELLS.map((cell, i) => (
        <img
          key={cell.name}
          ref={(el) => (refs.current[i] = el)}
          src={imgFor(cell.name)}
          alt={cell.name === "center" ? "Personagem principal — CAUÃ" : ""}
          draggable={false}
          className="absolute inset-0 block h-full w-full select-none object-contain transition-opacity duration-75"
          style={{
            ...imgStyle,
            opacity: cell.name === "center" ? 1 : 0,
          }}
        />
      ))}
    </motion.div>
  );
}

/* -------------------------------------------------------------
   Raios de luz volumétrica — leque suave atrás da figura
   ------------------------------------------------------------- */
function GodRays() {
  const beams = useMemo(() => [-22, -10, 0, 10, 22], []);
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center overflow-visible">
      {beams.map((deg, i) => (
        <motion.span
          key={deg}
          className="absolute top-[8%] h-[110%] w-[9px] origin-top"
          style={{
            rotate: `${deg}deg`,
            background:
              "linear-gradient(to bottom, rgba(34,211,238,0.2), rgba(59,130,246,0.07) 45%, transparent 78%)",
            filter: "blur(8px)",
          }}
          animate={{ opacity: [0.16, 0.4, 0.16] }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------
   Plataforma / feixe de energia sutil nos pés
   ------------------------------------------------------------- */
function EnergyPlatform() {
  return (
    <div className="pointer-events-none absolute bottom-[6%] left-1/2 z-0 -translate-x-1/2">
      <div className="absolute bottom-0 left-1/2 h-[30vh] w-36 -translate-x-1/2 bg-gradient-to-t from-neon-cyan/15 via-neon-cyan/[0.04] to-transparent blur-lg" />
      <div className="relative h-8 w-56 -translate-y-2">
        <div className="absolute inset-0 rounded-[50%] bg-neon-cyan/20 blur-xl" />
        <div className="absolute inset-x-10 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-neon-cyan/60 shadow-[0_0_16px_#22d3ee]" />
        {[0, 1].map((r) => (
          <motion.div
            key={r}
            className="absolute left-1/2 top-1/2 h-7 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-neon-cyan/35"
            animate={{ scale: [0.7, 1.4], opacity: [0.45, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: r * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   Moldura de mira (lock-on) — leve, só os cantos e leituras
   ------------------------------------------------------------- */
function LockOnFrame() {
  const corner = "absolute h-6 w-6 border-neon-cyan/50";
  return (
    <div className="pointer-events-none absolute inset-[-2%] z-20 hidden md:block">
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />

      <Readout className="left-0 -top-5" tick="left">
        TARGET LOCK
      </Readout>
      <Readout className="right-0 -top-5" tick="right">
        ID: CAUÃ
      </Readout>
      <Readout className="left-0 -bottom-5" tick="left">
        SCAN&nbsp;98%
      </Readout>
      <Readout className="right-0 -bottom-5" tick="right">
        DEPTH&nbsp;∞
      </Readout>
    </div>
  );
}

function Readout({ children, className = "", tick = "left" }) {
  return (
    <div
      className={`absolute flex items-center gap-1.5 font-display text-[9px] tracking-[0.25em] text-neon-cyan/60 ${className}`}
    >
      {tick === "left" && <span className="h-[1px] w-4 bg-neon-cyan/40" />}
      <span>{children}</span>
      {tick === "right" && <span className="h-[1px] w-4 bg-neon-cyan/40" />}
    </div>
  );
}
