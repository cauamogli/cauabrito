import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Tela inicial estilo videogame: PRESS START.
 * Ao clicar, dispara uma transição (glitch + zoom) e chama onStart().
 */
export default function StartScreen({ onStart }) {
  const [launching, setLaunching] = useState(false);

  const handleStart = () => {
    if (launching) return;
    setLaunching(true);
    // Tempo da animação de transição antes de revelar a experiência
    setTimeout(() => onStart(), 1300);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Camada de zoom espacial no launch */}
      <motion.div
        className="absolute inset-0 hud-grid"
        animate={
          launching
            ? { scale: 2.6, opacity: 0, filter: "blur(8px)" }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 1.2, ease: "easeIn" }}
      />

      {/* Flash neon no launch */}
      {launching && (
        <motion.div
          className="absolute inset-0 bg-neon-cyan"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.2, times: [0, 0.3, 1] }}
        />
      )}

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        animate={launching ? { scale: 1.4, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeIn" }}
      >
        {/* Selo superior */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center gap-3 font-display text-[10px] tracking-[0.35em] text-neon-cyan/70"
        >
          <span className="h-[1px] w-10 bg-neon-cyan/50" />
          SYSTEM ONLINE
          <span className="h-[1px] w-10 bg-neon-cyan/50" />
        </motion.div>

        {/* PRESS START piscando */}
        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="group relative font-display text-5xl font-black tracking-[0.18em] text-white md:text-7xl"
        >
          <span className="animate-flicker text-glow-cyan">PRESS</span>{" "}
          <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
            START
          </span>
          {/* Sublinhado scanner */}
          <span className="absolute -bottom-3 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-neon-cyan shadow-neon transition-all duration-500 group-hover:w-full" />
        </motion.button>

        {/* Nome + cargo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <h1 className="font-display text-3xl font-bold tracking-[0.3em] text-white md:text-4xl">
            CAUA
          </h1>
          <p className="mt-2 font-display text-sm tracking-[0.4em] text-neon-cyan/80">
            SOFTWARE DEVELOPER
          </p>
        </motion.div>

        {/* Frase de carregamento */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ delay: 0.8, duration: 2.2, repeat: Infinity }}
          className="mt-12 font-body text-xs tracking-[0.3em] text-neon-purple/80"
        >
          ENTERING DEVELOPER ORBIT...
        </motion.p>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-6 font-body text-[10px] tracking-[0.25em] text-white/40"
        >
          [ CLIQUE EM PRESS START PARA INICIAR A MISSÃO ]
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
