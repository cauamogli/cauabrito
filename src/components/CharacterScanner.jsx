import { motion } from "framer-motion";

export default function CharacterScanner() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {/* Linha principal do scanner */}
      <motion.div
        className="absolute left-1/2 h-[2px] w-[82%] -translate-x-1/2 rounded-full bg-neon-cyan/80 shadow-[0_0_18px_#22d3ee,0_0_45px_rgba(34,211,238,0.55)]"
        initial={{ top: "8%", opacity: 0 }}
        animate={{
          top: ["8%", "88%", "8%"],
          opacity: [0, 1, 0.85, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Brilho largo acompanhando o scanner */}
      <motion.div
        className="absolute left-1/2 h-24 w-[90%] -translate-x-1/2 bg-gradient-to-b from-transparent via-neon-cyan/12 to-transparent blur-xl"
        initial={{ top: "2%", opacity: 0 }}
        animate={{
          top: ["2%", "82%", "2%"],
          opacity: [0, 0.8, 0.45, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pontos laterais de leitura */}
      <motion.div
        className="absolute left-[8%] top-[28%] h-2 w-2 rounded-full bg-neon-green shadow-[0_0_12px_#22ff99]"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.35, 0.8] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[9%] top-[54%] h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_12px_#22d3ee]"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.35, 0.8] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.45,
        }}
      />

      <motion.div
        className="absolute left-[18%] bottom-[22%] h-1.5 w-1.5 rounded-full bg-neon-purple shadow-[0_0_12px_rgba(168,85,247,0.9)]"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      {/* Textos técnicos */}
      <motion.div
        className="absolute right-[4%] top-[18%] hidden rounded-md border border-neon-cyan/25 bg-black/35 px-3 py-2 font-display text-[8px] uppercase tracking-[0.22em] text-neon-cyan/70 backdrop-blur-md md:block"
        animate={{ opacity: [0.25, 0.8, 0.25] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        BIOMETRIC SCAN
      </motion.div>

      <motion.div
        className="absolute left-[4%] top-[48%] hidden rounded-md border border-neon-green/25 bg-black/35 px-3 py-2 font-display text-[8px] uppercase tracking-[0.22em] text-neon-green/70 backdrop-blur-md md:block"
        animate={{ opacity: [0.25, 0.85, 0.25] }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        FACE MATCH 98%
      </motion.div>

      <motion.div
        className="absolute bottom-[12%] right-[8%] hidden rounded-md border border-neon-purple/25 bg-black/35 px-3 py-2 font-display text-[8px] uppercase tracking-[0.22em] text-neon-purple/70 backdrop-blur-md md:block"
        animate={{ opacity: [0.25, 0.8, 0.25] }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.9,
        }}
      >
        NEURAL ID CONFIRMED
      </motion.div>
    </div>
  );
}