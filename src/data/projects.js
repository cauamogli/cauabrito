// Cada projeto = uma "fase" desbloqueável do jogo.
// Edite livremente: links, tecnologias e descrições.

export const projects = [
  {
    id: 1,
    phase: "FASE 01",
    title: "Portal Interno",
    codename: "INTERNAL_OPS",
    description:
      "Sistema web voltado à organização, gestão e acompanhamento de processos internos, com recursos administrativos, controle de usuários e integração com dados operacionais.",
    tech: ["React", "Supabase", "PostgreSQL", "Tailwind CSS"],
    difficulty: "AVANÇADO",
    status: "COMPLETO",
    links: {
      details: "#",
      github: "https://github.com/",
    },
  },
  {
    id: 2,
    phase: "FASE 02",
    title: "Sistema de Vistorias",
    codename: "INSPECTION_GRID",
    description:
      "Sistema para acompanhamento de vistorias, consultores, supervisores, planilhas, formulários e automação de processos relacionados à análise de empresas.",
    tech: ["React", "Supabase", "PostgreSQL", "APIs REST", "SharePoint"],
    difficulty: "AVANÇADO",
    status: "COMPLETO",
    links: {
      details: "#",
      github: "https://github.com/",
    },
  },
  {
    id: 3,
    phase: "FASE 03",
    title: "Automação de PDFs",
    codename: "DOC_EXTRACTOR",
    description:
      "Sistema para leitura automática de boletos e comprovantes em PDF, extração de dados e geração de planilhas de controle de despesas (lançamento, descrição, vencimento, pagamento, valor original, valor pago e banco).",
    tech: ["Python", "OCR", "PDF Parser", "React", "PostgreSQL"],
    difficulty: "INTERMEDIÁRIO",
    status: "COMPLETO",
    links: {
      details: "#",
      github: "https://github.com/",
    },
  },
  {
    id: 4,
    phase: "FASE 04",
    title: "KidSecurity / InTrouble",
    codename: "SOS_GUARDIAN",
    description:
      "Aplicativo de segurança e proteção com botão SOS, geolocalização, envio de alertas, registro de ocorrências e acompanhamento em tempo real.",
    tech: ["Flutter", "Dart", "Firebase", "Firestore", "Firebase Storage"],
    difficulty: "AVANÇADO",
    status: "COMPLETO",
    links: {
      details: "#",
      github: "https://github.com/",
    },
  },
  {
    id: 5,
    phase: "FASE 05",
    title: "Grade Maker",
    codename: "SCHEDULE_FORGE",
    description:
      "Sistema acadêmico para organização automática de grades de aula, envolvendo professores, disciplinas, cursos, turnos e disponibilidade.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "React", "Vite"],
    difficulty: "AVANÇADO",
    status: "COMPLETO",
    links: {
      details: "#",
      github: "https://github.com/",
    },
  },
];
