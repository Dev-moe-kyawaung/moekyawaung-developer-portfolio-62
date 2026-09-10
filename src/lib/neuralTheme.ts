// Neural Bio-Tech Theme Tokens & Palette
// Inspired by deep-sea bioluminescence and neural tissue microscopy

export const NEURAL_PALETTE = {
  abyss: "#040812",
  void: "#0a1428",
  deep: "#081020",
  neuralPink: "#ff6ec7",
  synapticCyan: "#00e5ff",
  bioGreen: "#00ff9d",
  plasma: "#8b5cf6",
  plasmaDeep: "#5b21b6",
  signal: "#e8f4ff",
  warm: "#ffebc7",
  axon: "#c4b5fd",
};

export const CLUSTER_CATEGORIES = {
  Android: { color: NEURAL_PALETTE.neuralPink, glow: "rgba(255, 110, 199, 0.5)" },
  Web: { color: NEURAL_PALETTE.synapticCyan, glow: "rgba(0, 229, 255, 0.5)" },
  Game: { color: NEURAL_PALETTE.bioGreen, glow: "rgba(0, 255, 157, 0.5)" },
  AI: { color: NEURAL_PALETTE.plasma, glow: "rgba(139, 92, 246, 0.5)" },
  Utility: { color: NEURAL_PALETTE.warm, glow: "rgba(255, 235, 199, 0.5)" },
};

// Organic motion easing curves
export const EASE = {
  organic: "cubic-bezier(0.25, 1.5, 0.35, 1)",
  bioPulse: "cubic-bezier(0.65, 0, 0.35, 1)",
  fluidIn: "cubic-bezier(0.16, 1, 0.3, 1)",
};
