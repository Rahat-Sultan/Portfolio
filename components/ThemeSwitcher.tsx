"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

import { themes, type ThemeId } from "@/lib/themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full border border-border" />;
  }

  const activeTheme =
    themes.find((item) => item.id === theme) ?? themes[0];

  function selectTheme(themeId: ThemeId) {
    setTheme(themeId);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-border-strong hover:bg-hover"
        aria-label="Change theme"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span
          className="h-4 w-4 rounded-full border border-border-strong"
          style={{ backgroundColor: activeTheme.swatch }}
        />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="Theme options"
          className="absolute right-0 top-11 z-50 min-w-[160px] rounded-xl border border-border bg-surface p-2 shadow-lg"
        >
          {themes.map((item) => {
            const isActive = item.id === theme;

            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => selectTheme(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-hover ${
                  isActive ? "bg-hover font-medium" : "text-muted"
                }`}
              >
                <span
                  className="h-4 w-4 shrink-0 rounded-full border border-border-strong"
                  style={{ backgroundColor: item.swatch }}
                />
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
