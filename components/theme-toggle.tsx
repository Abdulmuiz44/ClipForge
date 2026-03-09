"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "@/components/icons";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1">
      <button
        onClick={() => setTheme("light")}
        className={`rounded-full p-1.5 transition-colors ${
          theme === "light" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        title="Light mode"
      >
        <Sun className="size-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`rounded-full p-1.5 transition-colors ${
          theme === "dark" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        title="Dark mode"
      >
        <Moon className="size-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`rounded-full p-1.5 transition-colors ${
          theme === "system" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        title="System theme"
      >
        <Laptop className="size-4" />
      </button>
    </div>
  );
}
