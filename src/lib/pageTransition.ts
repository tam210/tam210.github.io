/**
 * Fade corto entre rutas (ClientRouter / View Transitions).
 * Solo opacity — sin translate/blur para no retrasar el paint.
 */
export const pageLayer = {
  forwards: {
    old: {
      name: "pageExit",
      duration: "120ms",
      easing: "ease-out",
      fillMode: "forwards" as const,
    },
    new: {
      name: "pageEnter",
      duration: "140ms",
      easing: "ease-out",
      fillMode: "backwards" as const,
    },
  },
  backwards: {
    old: {
      name: "pageExit",
      duration: "120ms",
      easing: "ease-out",
      fillMode: "forwards" as const,
    },
    new: {
      name: "pageEnter",
      duration: "140ms",
      easing: "ease-out",
      fillMode: "backwards" as const,
    },
  },
};

/** @deprecated Use pageLayer */
export const fadeThroughWhite = pageLayer;
