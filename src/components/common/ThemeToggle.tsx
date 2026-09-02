"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("careercraft-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("careercraft-theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="h-8 w-8 rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-850" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 active:scale-95"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-indigo-600" />
      ) : (
        <Sun className="h-4 w-4 text-amber-400" />
      )}
    </button>
  );
}
