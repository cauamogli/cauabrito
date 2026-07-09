import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HackerMode() {
  const [active, setActive] = useState(false);
  const audioCtxRef = useRef(null);

  const codeLines = useMemo(
    () => [
      'const developer = "Cauã Brito";',
      "skills.map(skill => buildProject(skill));",
      'deploy("vercel");',
      "while(alive) { evolve(); }",
      "function createFuture() { return code + vision; }",
      "status: ONLINE",
      "system.access = granted;",
      "portfolio.mode = hacker;",
      "React + Tailwind + Motion",
      "scan.identity('Cauã Brito')",
    ],
    []
  );

  function playBeep(type = "on") {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;

      if (!AudioContext) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(type === "on" ? 880 : 420, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        type === "on" ? 1320 : 260,
        ctx.currentTime + 0.12
      );

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (error) {
      console.log("Áudio não suportado neste navegador.");
    }
  }

  function toggleHackerMode() {
    const next = !active;
    setActive(next);
    playBeep(next ? "on" : "off");
  }

  useEffect(() => {
    document.body.classList.toggle("hacker-mode-active", active);

    return () => {
      document.body.classList.remove("hacker-mode-active");
    };
  }, [active]);

  return (
    <>
      <motion.button
        type="button"
        onClick={toggleHackerMode}
        className={`fixed bottom-5 right-5 z-[999] rounded-full border px-5 py-3 font-display text-[10px] uppercase tracking-[0.25em] backdrop-blur-xl transition-all duration-300 ${
          active
            ? "border-green-400/60 bg-green-400/15 text-green-300 shadow-[0_0_30px_rgba(74,222,128,0.35)]"
            : "border-neon-cyan/40 bg-black/50 text-neon-cyan shadow-[0_0_25px_rgba(34,211,238,0.22)]"
        }`}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        {active ? "Modo Hacker ON" : "Modo Hacker"}
      </motion.button>

      <AnimatePresence>
        {active && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[998] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Camada escura */}
            <div className="absolute inset-0 bg-black/25" />

            {/* Grid futurista */}
            <div className="absolute inset-0 opacity-[0.16]">
              <div className="h-full w-full bg-[linear-gradient(rgba(34,211,238,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.22)_1px,transparent_1px)] bg-[size:42px_42px]" />
            </div>

            {/* Scanner vertical */}
            <motion.div
              className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-green-400/10 to-transparent"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
            />

            {/* Códigos flutuando */}
            <div className="absolute inset-0">
              {codeLines.map((line, index) => (
                <motion.div
                  key={`${line}-${index}`}
                  className="absolute whitespace-nowrap font-mono text-[11px] text-green-300/45"
                  style={{
                    left: `${8 + ((index * 17) % 82)}%`,
                    top: `${8 + ((index * 11) % 78)}%`,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: [0, 0.65, 0],
                    y: [-20, -120],
                  }}
                  transition={{
                    duration: 7 + index * 0.4,
                    repeat: Infinity,
                    delay: index * 0.45,
                    ease: "linear",
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Terminal fake */}
            <motion.div
              className="absolute left-5 top-5 hidden w-[360px] rounded-2xl border border-green-400/30 bg-black/60 p-4 font-mono text-xs text-green-300/80 shadow-[0_0_35px_rgba(74,222,128,0.18)] backdrop-blur-xl md:block"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <span className="ml-2 text-[10px] uppercase tracking-[0.25em] text-green-300/50">
                  terminal
                </span>
              </div>

              <TerminalLine delay={0}>iniciando protocolo dev...</TerminalLine>
              <TerminalLine delay={0.4}>verificando identidade: CAUÃ BRITO</TerminalLine>
              <TerminalLine delay={0.8}>status: full stack developer</TerminalLine>
              <TerminalLine delay={1.2}>deploy: online</TerminalLine>
              <TerminalLine delay={1.6}>modo hacker: ativado</TerminalLine>
            </motion.div>

            {/* Vinheta */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TerminalLine({ children, delay = 0 }) {
  return (
    <motion.div
      className="mb-1"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.25 }}
    >
      <span className="text-green-400/70">&gt;</span> {children}
    </motion.div>
  );
}