"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Generate" },
  { href: "/auth/signin", label: "Sign in" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <span className="text-2xl">⚡</span>
            <div className="hidden sm:block">
              <p className="font-bold leading-none">ClipForge</p>
              <p className="text-xs text-muted-foreground">AI text-to-video clips</p>
            </div>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/60 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
