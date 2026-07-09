import { motion } from "framer-motion";
import { technologies, tierColors } from "../data/technologies";

/**
 * Tecnologias como "skills desbloqueadas".
 */
export default function TechStack() {
  return (
    <section id="tech" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        index="03"
        title="TECNOLOGIAS"
        subtitle="SCANNING SKILLS..."
      />

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {technologies.map((t, i) => {
          const color = tierColors[t.tier] || "#22d3ee";
          return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 8) * 0.06, duration: 0.45 }}
              whileHover={{ y: -4, scale: 1.04 }}
              className="glass holo-border group relative overflow-hidden rounded-lg p-4"
              style={{ borderColor: `${color}33` }}
            >
              <div
                className="font-display text-[8px] tracking-[0.2em]"
                style={{ color }}
              >
                SKILL UNLOCKED
              </div>
              <div className="mt-1 font-display text-base font-bold text-white">
                {t.name}
              </div>

              {/* Barra de nível */}
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-space-700">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${t.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i % 8) * 0.05, duration: 0.9 }}
                />
              </div>
              <div className="mt-1 flex justify-between font-display text-[8px] tracking-widest text-white/40">
                <span>{t.tier.toUpperCase()}</span>
                <span style={{ color }}>{t.level}%</span>
              </div>

              {/* Glow no hover */}
              <div
                className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 20px ${color}22, 0 0 22px ${color}44` }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function SectionHeader({ index, title, subtitle }) {
  return (
    <div className="flex flex-col items-start">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-display text-xs tracking-[0.3em] text-neon-purple/80"
      >
        {subtitle}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-2 flex items-baseline gap-3"
      >
        <span className="font-display text-sm text-neon-cyan/50">[{index}]</span>
        <span className="font-display text-3xl font-black tracking-wider text-white text-glow-cyan md:text-4xl">
          {title}
        </span>
      </motion.h2>
      <div className="mt-3 h-[2px] w-24 bg-gradient-to-r from-neon-cyan to-transparent" />
    </div>
  );
}
