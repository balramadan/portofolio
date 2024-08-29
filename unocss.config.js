import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  presetMini,
  presetWebFonts,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetMini(),
    presetWebFonts(),
    {
      collections: {
        carbon: () =>
          import("@iconify-json/carbon/icons.json").then((i) => i.default),
      },
    },
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
