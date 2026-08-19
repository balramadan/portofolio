import {
  defineConfig,
  presetWind4,
  presetAttributify,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons(),
  ],
  theme: {
    fontFamily: {
      jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
      inter: ["Inter", "sans-serif"],
      lato: ["Lato", "sans-serif"],
      mono: ['"Fira Code"', "monospace"],
      fira: ['"Fira Code"', "monospace"],
    },
    colors: {
      primary: "#1E201E",
      secondary: "#3C3D37",
      grass: "#697565",
      light: "#E2DFD0",
      bright: "#F97300",
      surface: "#2a2c26",
      dark: "#0f100e",
      "bright-glow": "rgba(249, 115, 0, 0.15)",
      "bright-border": "rgba(249, 115, 0, 0.3)",
      "light-muted": "#a09d8e",
    },
  },
  shortcuts: {
    "glass-card":
      "bg-secondary/30 backdrop-blur-md border border-white/10 rounded-2xl",
    "section-label":
      "text-bright text-xs font-mono tracking-[0.25em] uppercase",
    "section-divider": "flex items-center gap-3",
    "live-badge": "flex items-center gap-2 text-sm font-mono",
  },
  rules: [
    [
      "animate-glow-pulse",
      {
        animation: "glow-pulse 2s ease-in-out infinite",
      },
    ],
    [
      "animate-float-slow",
      {
        animation: "float-slow 6s ease-in-out infinite",
      },
    ],
  ],
});
