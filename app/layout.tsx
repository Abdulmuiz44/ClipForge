import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "ClipForge | AI Video Generator",
    template: "%s | ClipForge",
  },
  description: "ClipForge is an AI video generator that turns a short prompt into a 10 to 30 second video clip.",
  keywords: [
    "AI video generator",
    "text to video",
    "AI video maker",
    "prompt to video",
    "short AI video clips",
  ],
  openGraph: {
    title: "ClipForge | AI Video Generator",
    description: "Create short AI videos from a simple text prompt.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} font-sans`}>
        <div className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(239,131,84,0.20),transparent_60%)]" />
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
