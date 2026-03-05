import Link from "next/link";
import { getCheckoutLinks } from "@/lib/config";

export function BuyButtons() {
  const links = getCheckoutLinks();

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((item) => (
        <Link
          key={item.label}
          href={item.url}
          className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium hover:bg-black hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
