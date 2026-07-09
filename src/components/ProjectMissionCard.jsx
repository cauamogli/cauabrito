import { motion } from "framer-motion";
import { Github, Eye, Layers, Lock } from "lucide-react";
import HologramCard from "./HologramCard";

/**
 * Card de um projeto = uma "missão/fase" desbloqueável.
 */
export default function ProjectMissionCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (index % 2) * 0.1, duration: 0.55 }}
    >
      <HologramCard glow={index % 2 === 0 ? "cyan" : "purple"} className="h-full p-6">
        {/* Topo: fase + status */}
        <div className="flex items-center justify-between">
          <span className="font-display text-xs tracking-[0.25em] text-neon-cyan text-glow-cyan">
            {project.phase}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-neon-green/40 bg-neon-green/5 px-2 py-0.5">
            <Lock size={9} className="text-neon-green" />
            <span className="font-display text-[8px] tracking-widest text-neon-green">
              {project.status}
            </span>
          </span>
        </div>

        {/* Codinome técnico */}
        <div className="mt-1 font-body text-[10px] tracking-[0.3em] text-white/30">
          // {project.codename}
        </div>

        {/* Título */}
        <h3 className="mt-3 font-display text-xl font-bold text-white">
          {project.title}
        </h3>

        {/* Dificuldade */}
        <div className="mt-2 flex items-center gap-2">
          <span className="font-display text-[9px] tracking-widest text-neon-purple/70">
            DIFFICULTY:
          </span>
          <span className="font-display text-[9px] tracking-widest text-white/70">
            {project.difficulty}
          </span>
        </div>

        {/* Descrição */}
        <p className="mt-3 font-body text-sm leading-relaxed text-white/70">
          {project.description}
        </p>

        {/* Tecnologias */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded border border-neon-cyan/25 bg-neon-cyan/5 px-2 py-1 font-body text-[11px] text-neon-cyan/90"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Botões */}
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={project.links.details}
            className="btn-hud inline-flex items-center gap-1.5 rounded px-3 py-2 text-[11px]"
          >
            <Eye size={13} /> Ver detalhes
          </a>
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="btn-hud inline-flex items-center gap-1.5 rounded px-3 py-2 text-[11px]"
          >
            <Github size={13} /> GitHub
          </a>
          <button className="btn-hud inline-flex items-center gap-1.5 rounded px-3 py-2 text-[11px]">
            <Layers size={13} /> Tecnologias
          </button>
        </div>
      </HologramCard>
    </motion.div>
  );
}
