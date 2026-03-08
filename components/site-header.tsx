import Link from "next/link";

const nav = [
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/auth/signin", label: "Sign in" },
];

export function SiteHeader() {
  return (
    <header className="app-frame pb-0">
      <div className="panel flex items-center justify-between gap-3 px-4 py-4 md:px-6">
        <div>
          <Link href="/" className="font-[var(--font-display)] text-3xl leading-none text-white md:text-4xl">
            ClipForge
          </Link>
          <p className="mt-1 text-xs uppercase tracking-[0.28em] text-white/45">AI video control center</p>
        </div>
        <nav className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-white/72 transition hover:bg-white hover:text-[#09131f]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
