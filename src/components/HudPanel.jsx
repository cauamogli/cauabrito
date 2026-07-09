import { motion } from "framer-motion";
import { Cpu, Gamepad2, Zap, Shield } from "lucide-react";

/**
 * Painel de status do "player" — interface holográfica flutuante.
 */
export default function HudPanel() {
  const rows = [
    { icon: Gamepad2, label: "PLAYER", value: "CAUÃ" },
    { icon: Cpu, label: "CLASS", value: "SOFTWARE DEVELOPER" },
    { icon: Zap, label: "LEVEL", value: "2026" },
    { icon: Shield, label: "SPECIALTY", value: "FULL STACK / MOBILE / IA" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      className="glass-strong holo-border hud-corners relative w-full max-w-xs rounded-xl p-5"
    >
      {/* Cabeçalho */}
      <div className="mb-4 flex items-center justify-between border-b border-neon-cyan/20 pb-3">
        <span className="font-display text-xs tracking-[0.25em] text-neon-cyan text-glow-cyan">
          PROFILE LOADED
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-neon-green shadow-[0_0_8px_#22ff99]" />
          <span className="font-display text-[9px] tracking-widest text-neon-green">
            ONLINE
          </span>
        </span>
      </div>

      {/* Linhas de status */}
      <div className="space-y-3">
        {rows.map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.12 }}
            className="flex items-center gap-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neon-cyan/30 bg-neon-cyan/5">
              <Icon size={15} className="text-neon-cyan" />
            </span>
            <div className="min-w-0">
              <div className="font-display text-[9px] tracking-[0.2em] text-neon-cyan/60">
                {label}
              </div>
              <div className="truncate font-body text-sm font-semibold text-white">
                {value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Barra de energia decorativa */}
      <div className="mt-5">
        <div className="mb-1 flex justify-between font-display text-[8px] tracking-widest text-neon-cyan/60">
          <span>SYSTEM POWER</span>
          <span>98%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-space-700">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple"
            initial={{ width: 0 }}
            animate={{ width: "98%" }}
            transition={{ delay: 1.2, duration: 1.4, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
