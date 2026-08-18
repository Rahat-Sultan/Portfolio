export const themes = [
  {
    id: "dark",
    label: "Dark",
    swatch: "#6366f1",
  },
  {
    id: "light",
    label: "Light",
    swatch: "#ffffff",
  },
  {
    id: "minimal",
    label: "Minimal",
    swatch: "#fafafa",
  },
  {
    id: "violet",
    label: "Violet",
    swatch: "#3a2560",
  },
] as const;

export type ThemeId = (typeof themes)[number]["id"];
