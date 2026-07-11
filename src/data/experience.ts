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
const experienceLayerSet = [
  { key: "problem" as const, label: "Desafío", field: "problem" as const },
  { key: "decision" as const, label: "Trabajo realizado", field: "approach" as const },
  { key: "result" as const, label: "Resultado", field: "result" as const },
];

export const experienceScenes: ExperienceSceneConfig[] = [
  {
    caseId: "duffco",
    headline: "Software para digitalizar la operación en construcción",
    highlightStack: ["Laravel", "Vue.js", "React Native", "MySQL", "GCP", "Docker", "Power BI"],
    motifs: ["field", "alerts", "reports", "mobile"],
    layers: experienceLayerSet,
  },
  {
    caseId: "stracon-tech",
    headline: "Automatización de procesos dentro del ecosistema Microsoft",
    highlightStack: [
      "Power Apps",
      "Power Automate",
      "Copilot Studio",
      "Microsoft Teams",
      "Microsoft 365",
    ],
    motifs: ["teams", "approvals", "routes", "bot"],
    layers: experienceLayerSet,
  },
  {
    caseId: "dem",
    headline: "Digitalización del seguimiento y evaluación de candidatos",
    highlightStack: ["OCR", "Procesamiento de datos", "Dashboards", "Desarrollo web"],
    motifs: ["web", "data"],
    layers: experienceLayerSet,
  },
  {
    caseId: "agrofamily",
    headline: "Sistema para centralizar inventario e información del negocio",
    highlightStack: ["C#", "WPF", "MVVM", "Scrum", "Gestión de inventario", "Prototipado"],
    motifs: ["ops"],
    layers: experienceLayerSet,
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

/** Microsoft 4-color logo as data URI (reliable; CDN slug 404) */
export const MICROSOFT_ICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>`,
  );

/** C# brand mark (cdn.simpleicons.org/csharp → 404) */
export const CSHARP_ICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#512BD4" d="M1.194 7.543v8.913c0 1.103.588 2.122 1.544 2.674l7.718 4.456a3.086 3.086 0 0 0 3.088 0l7.718-4.456a3.087 3.087 0 0 0 1.544-2.674V7.543a3.084 3.084 0 0 0-1.544-2.673L13.544.414a3.086 3.086 0 0 0-3.088 0L2.738 4.87a3.085 3.085 0 0 0-1.544 2.673Zm5.403 2.914v3.087a.77.77 0 0 0 .772.772.773.773 0 0 0 .772-.772v-3.087a.773.773 0 0 0-.772-.772.77.77 0 0 0-.772.772Zm3.859 0v3.087a.77.77 0 0 0 .772.772.773.773 0 0 0 .772-.772v-3.087a.773.773 0 0 0-.772-.772.77.77 0 0 0-.772.772Zm3.087 1.543c0-.425.348-.772.773-.772h1.543c.425 0 .772.347.772.772s-.347.772-.772.772h-.772v.772h.772c.425 0 .772.347.772.771a.773.773 0 0 1-.772.773H14.316a.77.77 0 0 1-.773-.773v-2.315Zm3.087 0c0-.425.347-.772.772-.772h1.543c.425 0 .772.347.772.772s-.347.772-.772.772h-.771v.772h.771c.425 0 .772.347.772.771a.773.773 0 0 1-.772.773h-1.543a.77.77 0 0 1-.772-.773v-2.315Z"/></svg>`,
  );

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
    { name: "Power Apps", icon: MICROSOFT_ICON },
    { name: "Power Automate", icon: MICROSOFT_ICON },
    { name: "Microsoft 365", icon: MICROSOFT_ICON },
    { name: "C#", icon: CSHARP_ICON },
    { name: "WPF", icon: "dotnet" },
    { name: "Figma", icon: "figma" },
    { name: "Android Studio", icon: "androidstudio" },
    { name: "Cloudflare", icon: "cloudflare" },
    { name: "Microsoft Copilot Studio", icon: MICROSOFT_ICON },
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
  "power apps": { name: "Power Apps", icon: MICROSOFT_ICON },
  "power automate": { name: "Power Automate", icon: MICROSOFT_ICON },
  postgresql: { name: "PostgreSQL", icon: "postgresql" },
  python: { name: "Python", icon: "python" },
  graphql: { name: "GraphQL", icon: "graphql" },
  rabbitmq: { name: "RabbitMQ", icon: "rabbitmq" },
  angular: { name: "Angular", icon: "angular" },
  go: { name: "Go", icon: "go" },
  golang: { name: "Go", icon: "go" },
  git: { name: "Git", icon: "git" },
  azure: { name: "Azure", icon: "/images/icons/azure.svg" },
  "microsoft lists": { name: "Microsoft Lists", icon: MICROSOFT_ICON },
  "copilot studio": { name: "Copilot Studio", icon: MICROSOFT_ICON },
  "graph api": { name: "Graph API", icon: MICROSOFT_ICON },
  "multi-tenant": { name: "Multi-tenant", icon: "" },
  rbac: { name: "RBAC", icon: "" },
  "power bi": { name: "Power BI", icon: MICROSOFT_ICON },
  "microsoft teams": { name: "Microsoft Teams", icon: MICROSOFT_ICON },
  "microsoft 365": { name: "Microsoft 365", icon: MICROSOFT_ICON },
  ocr: { name: "OCR", icon: "python" },
  "procesamiento de datos": { name: "Procesamiento de datos", icon: "python" },
  dashboards: { name: "Dashboards", icon: MICROSOFT_ICON },
  "desarrollo web": { name: "Desarrollo web", icon: "html5" },
  "c#": { name: "C#", icon: CSHARP_ICON },
  csharp: { name: "C#", icon: CSHARP_ICON },
  wpf: { name: "WPF", icon: "dotnet" },
  figma: { name: "Figma", icon: "figma" },
  "android studio": { name: "Android Studio", icon: "androidstudio" },
  androidstudio: { name: "Android Studio", icon: "androidstudio" },
  cloudflare: { name: "Cloudflare", icon: "cloudflare" },
  "microsoft copilot studio": { name: "Microsoft Copilot Studio", icon: MICROSOFT_ICON },
  "copilot studio": { name: "Copilot Studio", icon: MICROSOFT_ICON },
  mvvm: { name: "MVVM", icon: "dotnet" },
  scrum: { name: "Scrum", icon: "scrumalliance" },
  jira: { name: "Jira", icon: "atlassian" },
  atlassian: { name: "Atlassian", icon: "atlassian" },
  "gestión de inventario": { name: "Gestión de inventario", icon: "mysql" },
  prototipado: { name: "Prototipado", icon: "figma" },
};

export function resolveTechBadge(label: string): { name: string; icon: string } {
  const mapped = TECH_ICON_MAP[label.toLowerCase().trim()];
  if (mapped) return mapped;
  return { name: label, icon: "" };
}
