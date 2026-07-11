export interface CaseDecision {
  title: string;
  rationale: string;
}

export interface CaseFile {
  id: string;
  name: string;
  company: string;
  year: string;
  tagline: string;
  context: string;
  problem: string;
  approach: string;
  built: string;
  result: string;
  impact: string;
  role: string;
  stack: string[];
  uxDecisions: CaseDecision[];
  techDecisions: CaseDecision[];
  learnings: string;
  tags: string[];
  status: "live" | "shipped" | "archived";
  live?: boolean;
  featured?: boolean;
  logo?: string;
  /** External company / product link for the scene arrow */
  companyUrl?: string;
  variant?: "folder" | "glass" | "cassette";
}

/** @deprecated Use CaseFile */
export type Project = CaseFile;

export const caseFiles: CaseFile[] = [
  {
    id: "duffco",
    name: "DUFFCO Ingeniería & Construcción",
    company: "DUFFCO Ingeniería & Construcción",
    year: "2025",
    tagline: "Software para digitalizar la operación en construcción",
    context:
      "Constructoras que necesitan centralizar maquinaria, combustible, mantenimientos y reportes con usuarios en terreno y oficina.",
    problem:
      "La gestión de maquinaria, combustible, mantenimientos y reportes dependía de registros en papel, planillas y comunicaciones dispersas. La información era difícil de consolidar y los usuarios en terreno necesitaban seguir trabajando incluso sin conexión.",
    approach:
      "Diseñé y desarrollé desde cero una plataforma SaaS web y móvil para centralizar la operación. Implementé arquitectura full-stack, APIs REST, modelos de datos, permisos, pruebas, infraestructura cloud y funcionalidades offline para usuarios en faena. También construí procesos ETL, dashboards e indicadores para transformar datos operacionales en información útil para la gestión.",
    built:
      "Plataforma SaaS web y móvil con APIs REST, permisos, offline en faena, ETL y dashboards operativos.",
    result:
      "Plataforma desplegada en producción para gestionar reportes diarios, reportes mecánicos, combustible, mantenimientos, traslados de maquinaria y control operacional. Digitalización del 100% del flujo de reportes diarios y mecánicos, reemplazando registros en papel por formularios con validaciones, evidencia y reportería centralizada.",
    impact:
      "Digitalización del 100% del flujo de reportes diarios y mecánicos, con operación centralizada en producción.",
    role: "Software Engineer · Full-stack · Backend · Cloud · Datos",
    stack: ["Laravel", "Vue.js", "React Native", "MySQL", "GCP", "Docker", "Power BI"],
    uxDecisions: [],
    techDecisions: [],
    learnings:
      "En operación de terreno, offline, validaciones y evidencia importan tanto como la arquitectura cloud.",
    tags: ["saas", "mobile", "construction", "data"],
    status: "shipped",
    featured: true,
    logo: "/images/duffco-logo.jpeg",
    companyUrl: "https://cl.linkedin.com/company/duffco-ingenier%C3%ADa-construcci%C3%B3n",
    variant: "glass",
  },
  {
    id: "stracon-tech",
    name: "STRACON Tech",
    company: "STRACON Tech",
    year: "2024",
    tagline: "Automatización de procesos dentro del ecosistema Microsoft",
    context:
      "Equipos internos que gestionan solicitudes, aprobaciones y consulta de información dentro de Microsoft 365 y Teams.",
    problem:
      "Procesos internos como solicitudes, aprobaciones y búsqueda de información dependían de correos, planillas y consultas manuales entre distintas plataformas.",
    approach:
      "Desarrollé aplicaciones y flujos automatizados con Power Apps y Power Automate, integrados directamente en Microsoft Teams. Diseñé rutas de aprobación según el perfil del usuario y construí un asistente interno con Copilot Studio para facilitar el acceso a información distribuida entre distintas herramientas.",
    built:
      "Apps y flujos en Power Platform dentro de Teams, con rutas de aprobación por perfil y asistente en Copilot Studio.",
    result:
      "Reducción de un 70% en el intercambio manual de correos y de un 75% en el tiempo de búsqueda de información por parte de los usuarios.",
    impact:
      "Menos fricción operativa en aprobaciones y búsqueda de información dentro del ecosistema Microsoft.",
    role: "Power Apps Developer · Automatización · Integraciones · IA aplicada",
    stack: ["Power Apps", "Power Automate", "Copilot Studio", "Microsoft Teams", "Microsoft 365"],
    uxDecisions: [],
    techDecisions: [],
    learnings:
      "La mejor automatización es la que vive donde el equipo ya trabaja, sin forzar herramientas nuevas.",
    tags: ["automation", "enterprise", "microsoft"],
    status: "shipped",
    featured: true,
    logo: "/images/stracon-tech-logo.jpeg",
    companyUrl: "https://www.linkedin.com/company/stracon-tech",
    variant: "cassette",
  },
  {
    id: "dem",
    name: "Departamento de Educación Municipal",
    company: "Departamento de Educación Municipal",
    year: "2023",
    tagline: "Digitalización del seguimiento y evaluación de candidatos",
    context:
      "Proceso de evaluación de postulantes que requería consolidar información y apoyar la revisión con herramientas digitales.",
    problem:
      "La evaluación de postulantes requería revisar currículums manualmente y consolidar información desde distintas fuentes, dificultando el seguimiento y la comparación de candidatos.",
    approach:
      "Desarrollé una plataforma para registrar candidatos, mantener trazabilidad de sus estados y facilitar su evaluación. Incorporé OCR para extraer información desde currículums e identificar habilidades relevantes, junto con un panel de análisis para apoyar la revisión de postulantes.",
    built:
      "Plataforma de seguimiento de candidatos con OCR, extracción de habilidades y panel de análisis.",
    result:
      "Proceso de evaluación más estructurado, con información centralizada, mayor trazabilidad y menor dependencia de la revisión manual de documentos. También brindé soporte técnico a los usuarios durante la adopción de la plataforma.",
    impact:
      "Mayor trazabilidad y menos dependencia de la revisión manual de documentos en la evaluación de postulantes.",
    role: "Software Engineer Intern · Desarrollo web · Datos · OCR",
    stack: ["OCR", "Procesamiento de datos", "Dashboards", "Desarrollo web"],
    uxDecisions: [],
    techDecisions: [],
    learnings:
      "El soporte durante la adopción es parte del producto: sin él, la digitalización no se consolida.",
    tags: ["web", "data", "ocr", "internship"],
    status: "shipped",
    featured: true,
    logo: "/images/dem-logo.jpg",
    companyUrl: "https://www.linkedin.com/company/ilustre-municipalidad-de-ovalle/",
    variant: "folder",
  },
  {
    id: "agrofamily",
    name: "AgroFamily",
    company: "AgroFamily",
    year: "2022",
    tagline: "Sistema para centralizar inventario e información del negocio",
    context:
      "Negocio que necesitaba organizar inventario, usuarios e indicadores en una sola solución.",
    problem:
      "El negocio necesitaba organizar información de inventario, usuarios e indicadores relevantes dentro de una única solución.",
    approach:
      "Participé en el levantamiento de requerimientos, prototipado visual, desarrollo y documentación técnica de una solución para administrar inventario y usuarios. Incorporé indicadores económicos para entregar mayor visibilidad y apoyar decisiones del negocio.",
    built:
      "Solución de inventario y usuarios con indicadores económicos, bajo Scrum y patrón MVVM.",
    result:
      "Sistema centralizado para consultar inventario, administrar usuarios y visualizar información relevante para la operación. El desarrollo se realizó bajo metodología Scrum y patrón MVVM.",
    impact:
      "Visibilidad centralizada de inventario, usuarios e indicadores para la operación del negocio.",
    role: "Software Engineer · Análisis de requerimientos · Desarrollo · Prototipado",
    stack: ["C#", "WPF", "MVVM", "Scrum", "Gestión de inventario", "Prototipado"],
    uxDecisions: [],
    techDecisions: [],
    learnings:
      "El levantamiento de requerimientos y el prototipado evitan construir la solución equivocada.",
    tags: ["inventory", "scrum", "mvvm"],
    status: "archived",
    featured: true,
    logo: "/images/agrofamily-logo.png",
    variant: "folder",
  },
];

export const featuredCaseFiles = caseFiles.filter((c) => c.featured);
export const archivedCaseFiles = caseFiles.filter((c) => !c.featured);

/** @deprecated Use caseFiles */
export const featuredProjects = featuredCaseFiles;
/** @deprecated Use archivedCaseFiles */
export const otherProjects = archivedCaseFiles;

export function getCaseById(id: string): CaseFile | undefined {
  return caseFiles.find((c) => c.id === id);
}

export interface StackCapability {
  category: string;
  items: { name: string; use: string }[];
}

export const stackCapabilities: StackCapability[] = [
  {
    category: "Product Engineering",
    items: [
      { name: "Laravel", use: "APIs, multi-tenant y reglas de negocio" },
      { name: "Vue / Inertia", use: "Paneles web productivos con feedback inmediato" },
      { name: "PHP / REST", use: "Servicios estables y documentados" },
    ],
  },
  {
    category: "Mobile & Field",
    items: [{ name: "React Native", use: "Apps offline-first para operación en terreno" }],
  },
  {
    category: "Cloud & Ops",
    items: [
      { name: "GCP / Cloud Run", use: "Deploy real, escalable y sin servidores fijos" },
      { name: "Docker", use: "Entornos reproducibles en CI/CD" },
    ],
  },
  {
    category: "Data",
    items: [{ name: "MySQL", use: "Datos operativos con modelos claros y migraciones" }],
  },
  {
    category: "Design & UX",
    items: [
      { name: "Figma", use: "Flujos y prototipos antes de escribir código" },
      { name: "Design systems", use: "Componentes reutilizables con criterio de producto" },
      { name: "Astro", use: "Sitios rápidos con arquitectura de contenido clara" },
      { name: "Tailwind", use: "Sistemas de UI consistentes y mantenibles" },
    ],
  },
  {
    category: "Automation",
    items: [
      { name: "Power Platform", use: "Flujos empresariales dentro del ecosistema Microsoft" },
      { name: "Copilot Studio", use: "Asistentes acotados para equipos internos" },
    ],
  },
];

export const processSteps = [
  {
    num: "01",
    title: "Understand",
    desc: "Escucho el flujo real antes de diseñar.",
    example: "Mapeo cómo se pide un pase de faena hoy, quién aprueba y dónde se pierde tiempo.",
    caseLink: "stracon-tech",
    icon: "ear",
  },
  {
    num: "02",
    title: "Frame",
    desc: "Defino el problema y los constraints del producto.",
    example: "¿Quién usa esto en terreno? ¿Qué pasa sin señal? ¿Qué necesita gerencia?",
    caseLink: "duffco",
    icon: "pen",
  },
  {
    num: "03",
    title: "Design",
    desc: "Bajo el problema a interfaces y flujos claros.",
    example: "Pantallas, estados y permisos antes de la primera línea de código.",
    caseLink: "duffco",
    icon: "pen",
  },
  {
    num: "04",
    title: "Build",
    desc: "Desarrollo backend, frontend y móvil.",
    example: "API, panel web y app offline con la misma lógica de negocio.",
    caseLink: "duffco",
    icon: "code",
  },
  {
    num: "05",
    title: "Ship",
    desc: "Llevo el producto a producción.",
    example: "Cloud, CI/CD y monitoreo para usuarios reales.",
    caseLink: "duffco",
    icon: "cloud",
  },
  {
    num: "06",
    title: "Learn",
    desc: "Itero con feedback real.",
    example: "Ajusto flujos según lo que reportan operadores y gerencia.",
    caseLink: "duffco",
    icon: "loop",
  },
];

export const principles = [
  {
    num: "01",
    title: "Claridad antes que ruido",
    desc: "Interfaces y arquitectura que se entienden sin manual.",
  },
  {
    num: "02",
    title: "Producto antes que decoración",
    desc: "Cada decisión visual responde a un problema real del usuario.",
  },
  {
    num: "03",
    title: "Código que llega a producción",
    desc: "Software desplegado, mantenible y pensado para operar en el mundo real.",
  },
];

export const profilePositioning = {
  headline: "Diseño y construyo para operación real.",
  focus: ["SaaS", "móvil en terreno", "automatización", "info architecture"],
};

export const connectInfo = {
  interests: [
    "SaaS con usuarios en terreno",
    "Flujos + full-stack",
    "Operación, construcción, industria",
  ],
  notLookingFor: [
    "Landings sin producto",
    "Sin acceso a usuarios reales",
  ],
};

export const navModules = [
  { id: "cases", label: "Proyectos", href: "/cases/", path: "/cases/", window: "proyectos.sys" },
  { id: "systems", label: "Sistemas", href: "/systems/", path: "/systems/", window: "sistemas.sys" },
  { id: "thinking", label: "Criterio", href: "/thinking/", path: "/thinking/", window: "criterio.sys" },
  { id: "connect", label: "Contacto", href: "/connect/", path: "/connect/", window: "contacto.exe" },
];

/** @deprecated Use navModules */
export const navItems = [
  { id: "home", label: "Overview", href: "/", path: "/", window: "tamara_os" },
  ...navModules,
];

export const sectionMeta: Record<string, { num: string; tag: string }> = {
  cases: { num: "01", tag: "proyectos.sys" },
  systems: { num: "02", tag: "sistemas.sys" },
  thinking: { num: "03", tag: "criterio.sys" },
  connect: { num: "04", tag: "contacto.exe" },
};
