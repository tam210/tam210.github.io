/**
 * Transición de capa entre rutas (Astro ClientRouter / View Transitions).
 * Solo opacity + transform (sin filter/blur) para mantener 60fps.
 */
export const pageLayer = {
  forwards: {
    old: {
      name: "pageExit",
      duration: "240ms",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fillMode: "forwards" as const,
    },
    new: {
      name: "pageEnter",
      duration: "420ms",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fillMode: "backwards" as const,
    },
  },
  backwards: {
    old: {
      name: "pageExit",
      duration: "240ms",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fillMode: "forwards" as const,
    },
    new: {
      name: "pageEnter",
      duration: "420ms",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fillMode: "backwards" as const,
    },
  },
};

/** @deprecated Use pageLayer */
export const fadeThroughWhite = pageLayer;
