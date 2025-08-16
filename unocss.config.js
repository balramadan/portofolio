import {
  defineConfig,
  presetWind4,
  presetAttributify,
  presetIcons,
  presetMini,
  presetWebFonts,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons(),
    presetMini(),
    presetWebFonts({
      provider: "google",
      fonts: {
        inter: "Inter",
        lato: "Lato"
      }
    }),
  ],
  theme: {
    colors: {
      primary: "#1E201E",
      secondary: "#3C3D37",
      grass: "#697565",
      light: "#E2DFD0",
      bright: "#F97300",
    },
  },
});
