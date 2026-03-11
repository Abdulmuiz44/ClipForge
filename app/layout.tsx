import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <SiteHeader />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
