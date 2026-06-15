import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luminous Pedigree · Luxury Real Estate Brokerage",
  description:
    "Boutique Hamptons & NYC editorial brokerage templates with curated property discovery, MLS-style filters, and a technical inquiry ledger.",
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#000000] text-[#FDFBF7]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.65]">
        <div className="h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-zinc-950/70 blur-3xl" />
        <div className="absolute left-1/2 top-[240px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-zinc-950/50 blur-3xl" />
        <div className="absolute right-[-140px] top-[120px] h-[520px] w-[520px] rounded-full bg-zinc-950/60 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-[#D1D1C7]/50 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-[#D1D1C7]/40 bg-zinc-950/50 grid place-items-center">
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#D1D1C7]/80">
                VIP
              </span>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                Hamptons × NYC · Real Estate
              </div>
              <div className="font-playfair text-xl leading-none text-[#FDFBF7]">
                Luminous Pedigree
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <Link
              href="/portfolio/web-dev-projects/real-estate"
              className="sand-line rounded-full border border-[#D1D1C7]/40 bg-zinc-950/40 px-4 py-2 text-xs font-mono uppercase tracking-[0.28em] text-[#FDFBF7]/80 hover:text-[#FDFBF7] transition"
            >
              Home
            </Link>
            <Link
              href="/portfolio/web-dev-projects/real-estate/collection"
              className="sand-line rounded-full border border-[#D1D1C7]/40 bg-zinc-950/40 px-4 py-2 text-xs font-mono uppercase tracking-[0.28em] text-[#FDFBF7]/80 hover:text-[#FDFBF7] transition"
            >
              Collection
            </Link>
            <Link
              href="/portfolio/web-dev-projects/real-estate/about"
              className="sand-line rounded-full border border-[#D1D1C7]/40 bg-zinc-950/40 px-4 py-2 text-xs font-mono uppercase tracking-[0.28em] text-[#FDFBF7]/80 hover:text-[#FDFBF7] transition"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-[#D1D1C7]/50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
              Editorial brokerage templates · No external data calls
            </div>
            <div className="text-xs text-[#FDFBF7]/70">
              Built for premium conversion experiences.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

