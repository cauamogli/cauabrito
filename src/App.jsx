import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, User2, Rocket } from "lucide-react";

import { attachGlobalListeners } from "./lib/motion";
import SpaceScene from "./components/SpaceScene";
import StartScreen from "./components/StartScreen";
import HeroCharacter from "./components/HeroCharacter";
import HudPanel from "./components/HudPanel";
import HologramCard from "./components/HologramCard";
import TechStack, { SectionHeader } from "./components/TechStack";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ContactSection from "./components/ContactSection";
import CustomCursor from "./components/CustomCursor";


export default function App() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    attachGlobalListeners();
  }, []);

  return (
    <>
      {/* Fundo 3D sempre presente */}
      <SpaceScene />

      {/* Overlays cinematográficos globais (ordem importa p/ blend) */}
      <div className="cine-grade" />
      <div className="vignette" />
      <div className="cine-bars" />
      <div className="global-scanlines" />
      <div className="film-grain" />
      <CustomCursor />

      {/* Tela inicial */}
      <AnimatePresence>
        {!started && <StartScreen key="start" onStart={() => setStarted(true)} />}
      </AnimatePresence>

      {/* Experiência principal */}
      <AnimatePresence>
        {started && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative z-10"
          >
            {/* ===================== HERO ===================== */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
              {/* HUD topo */}
              <TopHud />

              {/* Trilhos laterais de telemetria (não cortam nas bordas) */}
              <SideRail
                side="left"
                items={["NEURAL INTERFACE CONNECTED", "GRAVITY FIELD ACTIVE"]}
              />
              <SideRail
                side="right"
                items={["SPACE ROUTE LOADED", "ACCESS GRANTED"]}
              />

              <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-[280px_1fr]">
                {/* Painel de status (esquerda no desktop) */}
                <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
                  <HudPanel />
                </div>

                {/* Personagem central */}
                <div className="order-1 flex flex-col items-center lg:order-2">
                  {/* Barra de status fina acima */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-[10px] tracking-[0.25em]"
                  >
                    <span className="flex items-center gap-1.5 text-neon-green/90">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green shadow-[0_0_8px_#22ff99]" />
                      SYSTEM ONLINE
                    </span>
                    <span className="text-neon-cyan/50">/</span>
                    <span className="text-neon-cyan/70">PROFILE LOADED</span>
                    <span className="text-neon-cyan/50">/</span>
                    <span className="text-neon-purple/80">DEVELOPER MODE ACTIVE</span>
                  </motion.div>

                  <HeroCharacter />

                  {/* Bloco de nome — tratamento cinematográfico */}
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="mt-6 text-center"
                  >
                    <h1 className="relative font-display text-5xl font-black uppercase tracking-[0.18em] text-white md:text-6xl">
                      <span className="bg-gradient-to-b from-white via-cyan-100 to-neon-cyan/70 bg-clip-text text-transparent [text-shadow:0_0_30px_rgba(34,211,238,0.45)]">
                        Cauã
                      </span>
                    </h1>
                    <div className="mx-auto mt-3 flex items-center justify-center gap-3">
                      <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-neon-cyan/70" />
                      <span className="font-display text-xs tracking-[0.4em] text-neon-cyan/90">
                        SOFTWARE DEVELOPER
                      </span>
                      <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-neon-cyan/70" />
                    </div>
                    <div className="mt-2 font-display text-[10px] tracking-[0.35em] text-neon-purple/70">
                      MISSION: BUILD THE FUTURE
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Indicador de scroll */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
              >
                <div className="font-display text-[9px] tracking-[0.3em] text-neon-cyan/60">
                  SCROLL // ACCELERATE FALL
                </div>
                <div className="mx-auto mt-2 h-8 w-5 rounded-full border border-neon-cyan/40">
                  <div className="mx-auto mt-1.5 h-1.5 w-1 rounded-full bg-neon-cyan" />
                </div>
              </motion.div>
            </section>

            {/* ===================== SOBRE MIM ===================== */}
            <section id="about" className="relative mx-auto max-w-4xl px-6 py-24">
              <SectionHeader index="01" title="SOBRE MIM" subtitle="PLAYER DETECTED" />
              <HologramCard className="mt-10 p-8" glow="cyan">
                <div className="mb-3 flex items-center gap-2 font-display text-[10px] tracking-[0.25em] text-neon-cyan/70">
                  <User2 size={14} /> BIO DATA
                </div>
                <p className="font-body text-base leading-relaxed text-white/80">
                  Sou desenvolvedor com foco em criação de sistemas web e mobile,
                  utilizando tecnologias modernas para desenvolver soluções
                  funcionais, intuitivas e escaláveis. Tenho interesse em
                  Engenharia de Software, Inteligência Artificial, automações,
                  sistemas distribuídos e desenvolvimento de aplicações que
                  resolvam problemas reais.
                </p>
                <p className="mt-4 font-body text-base leading-relaxed text-white/80">
                  Gosto de transformar ideias em sistemas práticos, com boa
                  interface, organização de código e boa experiência de usuário.
                </p>
              </HologramCard>
            </section>

            {/* ===================== FORMAÇÃO ===================== */}
            <section id="education" className="relative mx-auto max-w-4xl px-6 py-24">
              <SectionHeader index="02" title="FORMAÇÃO" subtitle="ACADEMIC RECORD" />
              <HologramCard className="mt-10 p-8" glow="purple">
                <div className="mb-3 flex items-center gap-2 font-display text-[10px] tracking-[0.25em] text-neon-purple/80">
                  <GraduationCap size={15} /> DEGREE UNLOCKED
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Bacharelado em Ciência da Computação
                </h3>
                <p className="mt-1 font-body text-base text-neon-cyan/90">
                  Centro Universitário UDF
                </p>
                <p className="mt-1 font-display text-xs tracking-widest text-white/50">
                  2022 — 2026 · FORMAÇÃO ACADÊMICA
                </p>
                <p className="mt-4 font-body text-sm leading-relaxed text-white/70">
                  Foco em Engenharia de Software, Inteligência Artificial e
                  Sistemas Distribuídos.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-neon-green/40 bg-neon-green/5 px-3 py-1.5">
                  <Rocket size={13} className="text-neon-green" />
                  <span className="font-display text-xs tracking-widest text-neon-green">
                    CRA: 9.1
                  </span>
                </div>
              </HologramCard>
            </section>

            {/* ===================== DEMAIS SEÇÕES ===================== */}
            <TechStack />
            <ProjectsSection />
            <ExperienceTimeline />
            <ContactSection />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}

/* Barra HUD fixa no topo do Hero */
function TopHud() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4 font-display text-[10px] tracking-[0.25em] text-neon-cyan/60">
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-neon-green shadow-[0_0_8px_#22ff99]" />
        DEVELOPER ORBIT
      </span>
      <span className="hidden items-center gap-2 sm:flex">
        ORBIT STABILIZED
        <span className="text-neon-cyan/30">//</span>
        <span className="text-neon-cyan/40">2026</span>
      </span>
    </div>
  );
}

/* Trilho lateral de telemetria — texto vertical nas bordas, sem cortar */
function SideRail({ side = "left", items = [] }) {
  const isLeft = side === "left";
  return (
    <div
      className={`pointer-events-none absolute top-1/2 z-20 hidden -translate-y-1/2 lg:flex ${
        isLeft ? "left-3 flex-col items-start" : "right-3 flex-col items-end"
      }`}
    >
      <div
        className="flex items-center gap-6"
        style={{
          writingMode: "vertical-rl",
          transform: isLeft ? "rotate(180deg)" : "none",
        }}
      >
        {items.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.6 }}
            className="font-display text-[9px] tracking-[0.4em] text-neon-cyan/50"
          >
            {t}
          </motion.span>
        ))}
      </div>
      <span
        className={`mt-3 h-16 w-[1px] bg-gradient-to-b from-neon-cyan/50 to-transparent ${
          isLeft ? "" : ""
        }`}
      />
    </div>
  );
}
