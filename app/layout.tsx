import type { Metadata } from "next";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RKYRNSM PORTFOLIO",
  description: "High-end AI consulting, media services, keynote speaking, digital marketing, web design, and software consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">

          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm font-semibold tracking-wide text-white/90 hover:text-white transition">
                RICKY RANSOM
              </Link>
              <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/20" />
              <nav className="flex items-center gap-6 text-sm">
                <Link href="/" className="text-white/80 hover:text-white transition">
                  Home
                </Link>
                <Link href="/#projects" className="text-white/80 hover:text-white transition">
                  Portfolio
                </Link>
                <Link
                  href="/portfolio/web-dev-projects"
                  className="text-white/80 hover:text-white transition"
                >
                  Web Dev
                </Link>
                <Link href="/agentic-projects" className="text-white/80 hover:text-white transition">
                  Agentic Projects
                </Link>

              </nav>
            </div>
          </div>
        </header>
        {children}
      </body>

    </html>
  );
}
