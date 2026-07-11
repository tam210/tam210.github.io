import { caseFiles, getCaseById, type CaseFile } from "./site";

export type ExperienceLayerKey = "problem" | "decision" | "result";

export interface ExperienceLayer {
  key: ExperienceLayerKey;
  label: string;
  /** Field from CaseFile used as body */
  field: keyof Pick<CaseFile, "problem" | "approach" | "result" | "built" | "impact">;
}

export interface ExperienceSceneConfig {
  caseId: string;
  /** Primary narrative line for the scene */
  headline: string;
  /** Max 4 techs shown on the scene */
  highlightStack: string[];
  /** Visual motif keys for ExperienceVisual */
  motifs: string[];
  /** Smaller scene (e.g. assistant bot) */
  compact?: boolean;
  layers: ExperienceLayer[];
}

/** Presentation only — content bodies come from caseFiles */
export const experienceScenes: ExperienceSceneConfig[] = [
  {
    caseId: "construckit",
    headline: "De operación fragmentada a una plataforma multiempresa usada en terreno.",
    highlightStack: ["Laravel", "React Native", "GCP", "Multi-tenant"],
    motifs: ["web", "mobile", "offline", "cloud", "rbac", "ops"],
    layers: [
      { key: "problem", label: "Problema", field: "problem" },
      { key: "decision", label: "Decisión", field: "approach" },
      { key: "result", label: "Resultado", field: "result" },
    ],
  },
  {
    caseId: "duffco",
    headline: "Digitalización de la operación diaria en construcción.",
    highlightStack: ["Laravel", "React Native", "GCP", "Cloud Run"],
    motifs: ["field", "alerts", "reports", "mobile"],
    layers: [
      { key: "problem", label: "Problema", field: "problem" },
      { key: "decision", label: "Decisión", field: "approach" },
      { key: "result", label: "Resultado", field: "result" },
    ],
  },
  {
    caseId: "stracon-pases",
    headline: "Automatizar sin obligar al usuario a cambiar su forma de trabajar.",
    highlightStack: ["Power Apps", "Power Automate", "Azure", "Microsoft Lists"],
    motifs: ["teams", "approvals", "routes"],
    layers: [
      { key: "problem", label: "Problema", field: "problem" },
      { key: "decision", label: "Decisión", field: "approach" },
      { key: "result", label: "Resultado", field: "result" },
    ],
  },
  {
    caseId: "stracon-bot",
    headline: "Información distribuida convertida en una interacción directa.",
    highlightStack: ["Copilot Studio", "Graph API", "Power Automate"],
    motifs: ["bot", "graph", "planner"],
    compact: true,
    layers: [
      { key: "problem", label: "Problema", field: "problem" },
      { key: "decision", label: "Decisión", field: "approach" },
      { key: "result", label: "Resultado", field: "result" },
    ],
  },
  {
    caseId: "dem-ecommerce",
    headline: "Arquitectura modular para servicios que necesitaban crecer.",
    highlightStack: ["Golang", "NestJS", "GraphQL", "RabbitMQ"],
    motifs: ["services", "payments", "queue", "docker"],
    layers: [
      { key: "problem", label: "Problema", field: "problem" },
      { key: "decision", label: "Decisión", field: "approach" },
      { key: "result", label: "Resultado", field: "result" },
    ],
  },
];

export interface ResolvedExperienceScene extends ExperienceSceneConfig {
  caseFile: CaseFile;
}

export function getExperienceScenes(): ResolvedExperienceScene[] {
  return experienceScenes
    .map((scene) => {
      const caseFile = getCaseById(scene.caseId);
      if (!caseFile) return null;
      return { ...scene, caseFile };
    })
    .filter((s): s is ResolvedExperienceScene => s !== null);
}

export function getExperienceYearNav(scenes: ResolvedExperienceScene[]) {
  const seen = new Set<string>();
  const items: { year: string; href: string }[] = [];
  for (const scene of scenes) {
    const year = scene.caseFile.year;
    if (seen.has(year)) continue;
    seen.add(year);
    items.push({ year, href: `#${scene.caseFile.id}` });
  }
  return items;
}

/** Indicators backed only by existing case data */
export function getExperienceIndicators() {
  const liveCount = caseFiles.filter((c) => c.live || c.status === "live").length;
  const domains = ["Web", "Móvil", "Cloud"] as const;
  return [
    {
      label: "Productos en producción",
      value: String(liveCount),
      hint: liveCount === 1 ? "caso marcado live" : "casos marcados live",
    },
    {
      label: "Experiencia en software y producto",
      value: null as string | null,
      hint: "De backend a sistemas operativos de punta a punta",
    },
    {
      label: "Sistemas web, móvil y cloud",
      value: null as string | null,
      hint: domains.join(" · "),
    },
  ];
}

export const evolutionSteps = [
  "Backend",
  "Automatización",
  "Full-stack",
  "Producto",
  "Arquitectura",
  "Operación real",
] as const;

export const experienceTech = {
  title: "Tecnologías",
  lead: "Herramientas con las que he construido y desplegado proyectos reales.",
  productionLabel: "Stack en producción",
  production: [
    { name: "Laravel", icon: "laravel" },
    { name: "Vue.js", icon: "vuedotjs" },
    { name: "React Native", icon: "react" },
    { name: "Google Cloud", icon: "googlecloud" },
    { name: "MySQL", icon: "mysql" },
    { name: "Docker", icon: "docker" },
    { name: "Tailwind", icon: "tailwindcss" },
    { name: "NestJS", icon: "nestjs" },
    { name: "Flask", icon: "flask" },
    { name: "Power Apps", icon: "/images/icons/power-apps.svg" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Python", icon: "python" },
    { name: "GraphQL", icon: "graphql" },
    { name: "RabbitMQ", icon: "rabbitmq" },
    { name: "Angular", icon: "angular" },
    { name: "React", icon: "react" },
    { name: "Go", icon: "go" },
    { name: "Git", icon: "git" },
  ],
  languages: "Español (nativo) · Inglés (avanzado)",
};

/** Resolve CDN or local icon path (colored brand marks) */
export function techIconSrc(icon: string): string {
  if (icon.startsWith("/") || icon.startsWith("http") || icon.startsWith("data:")) return icon;
  return `https://cdn.simpleicons.org/${icon}`;
}

const TECH_ICON_MAP: Record<string, { name: string; icon: string }> = {
  laravel: { name: "Laravel", icon: "laravel" },
  "vue / inertia": { name: "Vue / Inertia", icon: "vuedotjs" },
  vue: { name: "Vue.js", icon: "vuedotjs" },
  "vue.js": { name: "Vue.js", icon: "vuedotjs" },
  "react native": { name: "React Native", icon: "react" },
  react: { name: "React", icon: "react" },
  gcp: { name: "GCP", icon: "googlecloud" },
  "google cloud": { name: "Google Cloud", icon: "googlecloud" },
  "cloud run": { name: "Cloud Run", icon: "googlecloud" },
  mysql: { name: "MySQL", icon: "mysql" },
  docker: { name: "Docker", icon: "docker" },
  tailwind: { name: "Tailwind", icon: "tailwindcss" },
  nestjs: { name: "NestJS", icon: "nestjs" },
  flask: { name: "Flask", icon: "flask" },
  "power apps": { name: "Power Apps", icon: "/images/icons/power-apps.svg" },
  "power automate": { name: "Power Automate", icon: "/images/icons/power-automate.svg" },
  postgresql: { name: "PostgreSQL", icon: "postgresql" },
  python: { name: "Python", icon: "python" },
  graphql: { name: "GraphQL", icon: "graphql" },
  rabbitmq: { name: "RabbitMQ", icon: "rabbitmq" },
  angular: { name: "Angular", icon: "angular" },
  go: { name: "Go", icon: "go" },
  golang: { name: "Go", icon: "go" },
  git: { name: "Git", icon: "git" },
  azure: { name: "Azure", icon: "/images/icons/azure.svg" },
  "microsoft lists": { name: "Microsoft Lists", icon: "/images/icons/sharepoint.svg" },
  "copilot studio": { name: "Copilot Studio", icon: "githubcopilot" },
  "graph api": { name: "Graph API", icon: "/images/icons/microsoft.svg" },
  "multi-tenant": { name: "Multi-tenant", icon: "" },
  rbac: { name: "RBAC", icon: "" },
};

export function resolveTechBadge(label: string): { name: string; icon: string } {
  const mapped = TECH_ICON_MAP[label.toLowerCase().trim()];
  if (mapped) return mapped;
  return { name: label, icon: "" };
}
