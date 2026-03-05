import Link from "next/link";

const nav = [
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/auth/signin", label: "Sign in" },
];

export function SiteHeader() {
  return (
    <header className="shell flex items-center justify-between py-5">
      <Link href="/" className="font-[var(--font-display)] text-3xl leading-none">
        PromptClips
      </Link>
      <nav className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 p-1 text-sm">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-2 text-black/70 hover:bg-black hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
