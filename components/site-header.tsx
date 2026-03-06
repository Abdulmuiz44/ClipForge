import Link from "next/link";
import { GoogleAuthButton } from "@/components/google-auth-button";
import { getCurrentUser } from "@/lib/queries";

const nav = [
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/auth/signin", label: "Sign in" },
];

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="shell flex items-center justify-between py-5">
      <Link href="/" className="font-[var(--font-display)] text-3xl leading-none">
        ClipForge
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
        {user ? <GoogleAuthButton mode="signout" /> : null}
      </nav>
    </header>
  );
}
