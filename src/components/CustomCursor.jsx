import { useEffect, useRef, useState } from "react";
import { isTouch } from "../lib/motion";

/**
 * Cursor futurista com rastro/brilho. Desativado em touch.
 */
export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (isTouch) return;
    document.body.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      const el = e.target;
      const interactive =
        el.closest("a, button, [data-cursor], input, textarea");
      setHovering(!!interactive);
    };

    let raf;
    const loop = () => {
      // anel segue com leve atraso (rastro)
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Ponto central */}
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_10px_#22d3ee]"
      />
      {/* Anel com rastro */}
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 h-10 w-10 rounded-full border border-neon-cyan/60 transition-[width,height,margin,border-color] duration-200"
        style={
          hovering
            ? {
                width: 56,
                height: 56,
                marginLeft: -28,
                marginTop: -28,
                borderColor: "rgba(168,85,247,0.9)",
                boxShadow: "0 0 18px rgba(168,85,247,0.5)",
              }
            : undefined
        }
      />
    </>
  );
}
