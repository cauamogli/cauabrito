// Skills "desbloqueadas" estilo videogame.
// "level" é só visual (0-100). "tier" agrupa as cores.

export const technologies = [
  { name: "Flutter", tier: "mobile", level: 92 },
  { name: "Dart", tier: "mobile", level: 90 },
  { name: "React", tier: "frontend", level: 95 },
  { name: "JavaScript", tier: "frontend", level: 94 },
  { name: "TypeScript", tier: "frontend", level: 85 },
  { name: "HTML", tier: "frontend", level: 96 },
  { name: "CSS", tier: "frontend", level: 92 },
  { name: "Tailwind CSS", tier: "frontend", level: 93 },
  { name: "Node.js", tier: "backend", level: 88 },
  { name: "Java", tier: "backend", level: 84 },
  { name: "PHP", tier: "backend", level: 78 },
  { name: "Supabase", tier: "data", level: 90 },
  { name: "Firebase", tier: "data", level: 88 },
  { name: "PostgreSQL", tier: "data", level: 87 },
  { name: "MySQL", tier: "data", level: 85 },
  { name: "Git", tier: "tools", level: 90 },
  { name: "Docker", tier: "tools", level: 80 },
  { name: "Power BI", tier: "tools", level: 82 },
  { name: "Figma", tier: "tools", level: 84 },
  { name: "APIs REST", tier: "backend", level: 91 },
];

// Cores neon por categoria de skill
export const tierColors = {
  frontend: "#22d3ee", // ciano
  backend: "#3b82f6", // azul
  mobile: "#a855f7", // roxo
  data: "#22ff99", // verde
  tools: "#ec4899", // rosa
};
