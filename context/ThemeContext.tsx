import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "aidit-theme";

export type ThemeValue = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme(): ThemeValue {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") return stored;
  return "system";
}

function applyTheme(value: ThemeValue) {
  const effective = value === "system" ? getSystemTheme() : value;
  document.documentElement.setAttribute("data-theme", effective);
}

interface ThemeContextValue {
  theme: ThemeValue;
  setTheme: (value: ThemeValue) => void;
  effectiveTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeValue>("system");
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
    const effective = stored === "system" ? getSystemTheme() : stored;
    setEffectiveTheme(effective);
    applyTheme(stored);
  }, []);

  useEffect(() => {
    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const effective = media.matches ? "dark" : "light";
      setEffectiveTheme(effective);
      document.documentElement.setAttribute("data-theme", effective);
      const handler = () => {
        const next = media.matches ? "dark" : "light";
        setEffectiveTheme(next);
        document.documentElement.setAttribute("data-theme", next);
      };
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
    setEffectiveTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (value: ThemeValue) => {
    setThemeState(value);
    localStorage.setItem(STORAGE_KEY, value);
    applyTheme(value);
    setEffectiveTheme(value === "system" ? getSystemTheme() : value);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
