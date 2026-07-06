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
  variant?: "folder" | "glass" | "cassette";
}

/** @deprecated Use CaseFile */
export type Project = CaseFile;

export const caseFiles: CaseFile[] = [
  {
    id: "construckit",
    name: "ConstruckIT",
    company: "ConstruckIT",
    year: "2026",
    tagline: "Suite multiempresa para operación en obra",
    context:
      "Constructoras y empresas de servicios en faena necesitan coordinar reportes, combustible, mantención y personal desde terreno y oficina — con datos que no pueden perderse por mala señal.",
    problem:
      "La operación en obra dependía de planillas, WhatsApp y registros sueltos. No había un sistema confiable, multiempresa y usable en terreno.",
    approach:
      "Mapeé flujos reales con operadores y administración antes de definir módulos. Prioricé estados claros, permisos por rol y una app móvil que funcione sin conexión.",
    built:
      "Arquitectura multi-tenant, API Laravel, panel Inertia, app React Native offline, RBAC y módulos de reportes, combustible y mantención. Deploy en Cloud Run.",
    result: "En producción. Uso diario en campo y administración por varias empresas.",
    impact:
      "Operación centralizada por empresa, trazabilidad de combustible y mantención, y menos dependencia de Excel en faena.",
    role: "Full-stack · Arquitectura · UX de flujos · Deploy",
    stack: ["Laravel", "Vue / Inertia", "React Native", "GCP", "Multi-tenant", "RBAC"],
    uxDecisions: [
      {
        title: "Vistas por rol, no por pantalla",
        rationale:
          "Operador, supervisor y admin ven solo lo que necesitan. Reduce ruido y errores en terreno.",
      },
      {
        title: "Estados explícitos en cada flujo",
        rationale:
          "Borrador → enviado → aprobado. El usuario siempre sabe dónde está el registro.",
      },
      {
        title: "Mobile offline-first",
        rationale:
          "En faena la señal falla. Los datos se guardan localmente y sincronizan al volver la conexión.",
      },
    ],
    techDecisions: [
      {
        title: "Multi-tenant por empresa",
        rationale: "Aislamiento de datos y configuración independiente sin duplicar infraestructura.",
      },
      {
        title: "Laravel + Inertia para el panel",
        rationale: "Velocidad de desarrollo con control total sobre reglas de negocio complejas.",
      },
      {
        title: "Cloud Run + CI/CD",
        rationale: "Deploy reproducible y escalable sin gestionar servidores.",
      },
    ],
    learnings:
      "En productos de operación, el diseño de estados y permisos es tan crítico como la arquitectura técnica.",
    tags: ["saas", "multi-tenant", "mobile", "live"],
    status: "live",
    live: true,
    featured: true,
    logo: "/images/construckit-logo.png",
    variant: "folder",
  },
  {
    id: "duffco",
    name: "Duffco",
    company: "Duffco",
    year: "2025",
    tagline: "Plataforma web y móvil para constructoras",
    context:
      "Constructoras medianas gestionan obras, combustible, costos y cobros con herramientas fragmentadas. Gerencia necesita visibilidad; terreno necesita velocidad.",
    problem:
      "En obra, la información seguía en planillas, WhatsApp y registros sueltos. Poca visibilidad operativa para gerencia.",
    approach:
      "Diseñé flujos de registro operativo simples para terreno y paneles de resumen para gerencia. Offline en móvil desde el inicio.",
    built:
      "SaaS web y móvil offline first: registro operativo, alertas de combustible, cobros automatizados, costos por obra y reportes para gerencia.",
    result: "Menos Excel, más visibilidad operativa para terreno y gerencia.",
    impact:
      "Registro unificado de operación, alertas tempranas de combustible y reportes accesibles sin depender de consolidación manual.",
    role: "Full-stack · Producto · UX · Móvil",
    stack: ["Laravel", "Vue / Inertia", "React Native", "GCP", "Cloud Run", "MySQL"],
    uxDecisions: [
      {
        title: "Registro en pocos pasos",
        rationale: "En terreno cada segundo cuenta. Formularios cortos con defaults inteligentes.",
      },
      {
        title: "Alertas accionables",
        rationale: "No solo notificar: cada alerta lleva al contexto donde se resuelve.",
      },
      {
        title: "Jerarquía obra → actividad → registro",
        rationale: "Refleja cómo piensan los operadores, no cómo está modelada la base de datos.",
      },
    ],
    techDecisions: [
      {
        title: "Offline sync con cola local",
        rationale: "React Native persiste operaciones y las sincroniza con resolución de conflictos simple.",
      },
      {
        title: "API única para web y móvil",
        rationale: "Una fuente de verdad para reglas de negocio compartidas.",
      },
    ],
    learnings:
      "El mejor panel de gerencia es el que se alimenta solo del trabajo diario en terreno.",
    tags: ["saas", "mobile", "construction"],
    status: "shipped",
    featured: true,
    logo: "/images/duffco-logo.jpeg",
    variant: "glass",
  },
  {
    id: "stracon-pases",
    name: "Stracon Pases",
    company: "Stracon Tech",
    year: "2024",
    tagline: "Automatización de pases de visita a faena",
    context:
      "En minería, solicitar un pase de visita a faena implica múltiples aprobadores según el perfil del solicitante y el destino.",
    problem: "Pedir un pase de visita era lento y dependía de muchos pasos manuales entre correos y planillas.",
    approach:
      "Observé el flujo real de aprobación y lo traduje a automatización en Teams, donde ya trabajaba el equipo.",
    built: "App en Microsoft Teams con flujos de aprobación automatizados según el perfil del solicitante.",
    result: "Tiempos de gestión mucho menores y más autonomía para quienes solicitan ingreso.",
    impact: "Reducción drástica de tiempo de gestión y menos fricción para visitas a faena.",
    role: "Automatización · Diseño de flujos · Power Platform",
    stack: ["Power Apps", "Power Automate", "Azure", "Microsoft Lists"],
    uxDecisions: [
      {
        title: "Dentro de Teams",
        rationale: "No pedir al usuario que aprenda otra herramienta. El flujo vive donde ya trabaja.",
      },
      {
        title: "Rutas de aprobación por perfil",
        rationale: "El solicitante solo ve los pasos que le corresponden, sin ruido de reglas internas.",
      },
    ],
    techDecisions: [
      {
        title: "Power Automate para lógica de aprobación",
        rationale: "Rápido de iterar con usuarios reales sin ciclo de deploy largo.",
      },
      {
        title: "Lists como fuente de datos",
        rationale: "Trazabilidad y auditoría sin montar base de datos desde cero.",
      },
    ],
    learnings:
      "A veces el mejor producto no es una app nueva: es el flujo correcto en la herramienta que ya usan.",
    tags: ["automation", "enterprise"],
    status: "shipped",
    featured: true,
    logo: "/images/stracon-tech-logo.jpeg",
    variant: "cassette",
  },
  {
    id: "stracon-bot",
    name: "Asistente Teams",
    company: "Stracon Tech",
    year: "2024",
    tagline: "Bot en Copilot Studio conectado a Microsoft Graph",
    context: "Equipo interno con información repartida entre Planner, Outlook y documentos.",
    problem: "La información estaba repartida entre Planner, Outlook y documentos internos.",
    approach: "Diseñé diálogos acotados para consultas frecuentes del equipo.",
    built: "Bot con diálogos pensados para consultas del equipo, sin salir de Teams.",
    result: "Consultas más rápidas para el equipo.",
    impact: "Menos tiempo buscando información en múltiples sistemas.",
    role: "Automatización",
    stack: ["Copilot Studio", "Power Automate", "Graph API"],
    uxDecisions: [
      {
        title: "Diálogos acotados",
        rationale: "El bot resuelve consultas concretas, no pretende ser un asistente general.",
      },
    ],
    techDecisions: [
      {
        title: "Graph API para datos en tiempo real",
        rationale: "Conexión directa a Planner y calendario sin duplicar datos.",
      },
    ],
    learnings: "Un bot útil es uno que hace pocas cosas muy bien.",
    tags: ["automation", "enterprise"],
    status: "archived",
    logo: "/images/stracon-tech-logo.jpeg",
    variant: "cassette",
  },
  {
    id: "dem-ecommerce",
    name: "E-commerce microservicios",
    company: "DEM",
    year: "2023",
    tagline: "Tienda online con pagos y servicios independientes",
    context: "Tienda que necesitaba escalar catálogo, pagos y tráfico con servicios modulares.",
    problem: "La tienda necesitaba crecer con pagos seguros y servicios modulares.",
    approach: "Separé dominios de catálogo, pagos y notificaciones en servicios independientes.",
    built: "Backend en microservicios con Transbank, mensajería asíncrona y APIs documentadas.",
    result: "Base modular lista para escalar catálogo y tráfico.",
    impact: "Arquitectura preparada para crecer sin reescribir el núcleo.",
    role: "Backend",
    stack: ["Golang", "NestJS", "GraphQL", "RabbitMQ", "Docker"],
    uxDecisions: [
      {
        title: "Checkout con estados claros",
        rationale: "El usuario siempre sabe si el pago está procesando, confirmado o falló.",
      },
    ],
    techDecisions: [
      {
        title: "Microservicios por dominio",
        rationale: "Pagos, catálogo y notificaciones escalan y despliegan de forma independiente.",
      },
      {
        title: "RabbitMQ para eventos",
        rationale: "Desacopla procesos sin bloquear la experiencia de compra.",
      },
    ],
    learnings: "La modularidad tiene costo operativo; vale la pena cuando el dominio lo justifica.",
    tags: ["backend", "ecommerce"],
    status: "archived",
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
    caseLink: "stracon-pases",
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
    caseLink: "construckit",
    icon: "pen",
  },
  {
    num: "04",
    title: "Build",
    desc: "Desarrollo backend, frontend y móvil.",
    example: "API multi-tenant, panel web y app offline con la misma lógica de negocio.",
    caseLink: "construckit",
    icon: "code",
  },
  {
    num: "05",
    title: "Ship",
    desc: "Llevo el producto a producción.",
    example: "Cloud Run, CI/CD y monitoreo para usuarios reales.",
    caseLink: "construckit",
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
