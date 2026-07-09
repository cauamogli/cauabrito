import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionHeader } from "./TechStack";

const missions = [
  {
    log: "MISSION LOG 01",
    title: "Interface Development",
    desc: "Criação de interfaces, componentização e melhoria da experiência de usuário em sistemas web.",
  },
  {
    log: "MISSION LOG 02",
    title: "Database Integration",
    desc: "Integração com bancos de dados, estruturação de regras de negócio e modelagem de dados.",
  },
  {
    log: "MISSION LOG 03",
    title: "Process Automation",
    desc: "Automação de processos manuais, levantamento de requisitos e criação de ferramentas internas.",
  },
  {
    log: "MISSION LOG 04",
    title: "System Optimization",
    desc: "Otimização de sistemas, suporte técnico, organização de dados e apoio à evolução das soluções.",
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-24">
      <SectionHeader
        index="05"
        title="EXPERIÊNCIA"
        subtitle="MISSION HISTORY"
      />

      <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/60">
        Atuação no desenvolvimento e melhoria de sistemas web, automação de
        processos, criação de interfaces, integração com banco de dados,
        estruturação de regras de negócio e apoio na construção de soluções
        digitais. Também tenho experiência com suporte técnico, levantamento de
        requisitos, organização de dados e criação de ferramentas para facilitar
        processos manuais.
      </p>

      <div className="relative mt-12 pl-8">
        {/* Linha vertical */}
        <div className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-[2px] bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent" />

        {missions.map((m, i) => (
          <motion.div
            key={m.log}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="relative mb-8 last:mb-0"
          >
            {/* Nó */}
            <span className="absolute -left-[30px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-neon-cyan/50 bg-space-900 shadow-neon">
              <CheckCircle2 size={13} className="text-neon-green" />
            </span>

            <div className="glass holo-border rounded-lg p-5">
              <div className="font-display text-[10px] tracking-[0.25em] text-neon-cyan/80">
                {m.log} <span className="text-neon-green">// COMPLETE</span>
              </div>
              <h3 className="mt-1 font-display text-lg font-bold text-white">
                {m.title}
              </h3>
              <p className="mt-2 font-body text-sm text-white/65">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
