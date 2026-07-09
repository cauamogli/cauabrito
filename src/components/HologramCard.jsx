import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Card holográfico genérico com tilt 3D no hover.
 * Use como wrapper de qualquer conteúdo (HUD, missão, seção).
 */
export default function HologramCard({
  children,
  className = "",
  glow = "cyan", // cyan | purple | pink | green
  tilt = true,
  ...rest
}) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");

  const glows = {
    cyan: "rgba(34,211,238,0.55)",
    purple: "rgba(168,85,247,0.55)",
    pink: "rgba(236,72,153,0.55)",
    green: "rgba(34,255,153,0.5)",
  };

  const handleMove = (e) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTransform(
      `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(14px) scale(1.025)`
    );
  };

  const reset = () => setTransform("");

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`holo-border hud-corners glass relative rounded-xl transition-shadow duration-300 ${className}`}
      style={{
        transform,
        transformStyle: "preserve-3d",
        transition: "transform 0.18s ease-out, box-shadow 0.3s ease",
        boxShadow: transform
          ? `0 0 28px ${glows[glow]}, inset 0 0 22px rgba(34,211,238,0.06)`
          : "0 0 0 rgba(0,0,0,0)",
      }}
      {...rest}
    >
      {/* Scanline interna que cruza no hover */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-0 transition-opacity duration-300 [.holo-border:hover>&]:opacity-100">
        <div className="absolute inset-x-0 h-1/2 animate-scan bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent" />
      </div>
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
}
