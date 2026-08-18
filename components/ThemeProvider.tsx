"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import type { ThemeId } from "@/lib/themes";
import { themes } from "@/lib/themes";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      themes={themes.map((theme) => theme.id) as ThemeId[]}
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
