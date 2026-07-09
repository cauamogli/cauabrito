import { projects } from "../data/projects";
import ProjectMissionCard from "./ProjectMissionCard";
import { SectionHeader } from "./TechStack";

/**
 * Seção de projetos = seleção de fases do jogo.
 */
export default function ProjectsSection() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        index="04"
        title="PROJETOS"
        subtitle="MISSION DATA FOUND"
      />

      <p className="mt-4 max-w-xl font-body text-sm text-white/50">
        Selecione uma fase. Cada missão representa um sistema construído e
        concluído. // SELECT YOUR STAGE
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectMissionCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
