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
