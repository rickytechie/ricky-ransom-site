"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Building2, Clock, Sparkles } from "lucide-react";

type Estate = {
  id: string;
  name: string;
  market: "Hamptons" | "NYC" | "Long Island";
  neighborhood: string;
  beds: number;
  baths: number;
  sqft: number;
  priceFromM: number;
  vibeTags: string[];
};

const MOCK_HERO: Estate[] = [
  {
    id: "luminous-dune-01",
    name: "Luminous Dune Residence",
    market: "Hamptons",
    neighborhood: "Sagaponack Edge",
    beds: 5,
    baths: 4.5,
    sqft: 6200,
    priceFromM: 8.95,
    vibeTags: ["ocean-facing", "sand-etched stone", "terrace drama"],
  },
  {
    id: "atlantic-ink-02",
    name: "Atlantic Ink Courtyard House",
    market: "Long Island",
    neighborhood: "Water Mill Quarter",
    beds: 4,
    baths: 3.5,
    sqft: 4880,
    priceFromM: 6.75,
    vibeTags: ["courtyard hush", "charcoal tokens", "evening-ready"],
  },
  {
    id: "oyster-shell-03",
    name: "Oyster Shell Meadow Villa",
    market: "Hamptons",
    neighborhood: "Bridgehampton Meadowline",
    beds: 6,
    baths: 5,
    sqft: 7450,
    priceFromM: 11.4,
    vibeTags: ["pool pavilion", "sunrise rituals", "view deck"],
  },
];

function useMountSafeClient() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready;
}

function LightingGrade({ enabled }: { enabled: boolean }) {
  // Safe client mounted time-based “sepia/brightness matrix”
  const [grade, setGrade] = useState({ sepia: 0.12, brightness: 1.0 });

  useEffect(() => {
    if (!enabled) return;
    const update = () => {
      const h = new Date().getHours() + new Date().getMinutes() / 60;
      const t = h / 24;
      const sepia = 0.06 + 0.28 * Math.sin(Math.PI * (t - 0.22));
      const brightness = 0.88 + 0.22 * Math.cos(Math.PI * (t - 0.12));
      setGrade({ sepia, brightness });
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [enabled]);

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 15% 10%, rgba(147,51,234,0.14), transparent 45%), radial-gradient(circle at 70% 30%, rgba(34,197,94,0.10), transparent 55%), radial-gradient(circle at 70% 85%, rgba(34,211,238,0.08), transparent 50%)",
        filter: `sepia(${grade.sepia.toFixed(3)}) brightness(${grade.brightness.toFixed(3)})`,
        transition: "filter 450ms ease",
      }}
    />
  );
}

function HeroSearchLink() {
  return (
    <Link
      href="/portfolio/web-dev-projects/real-estate/collection"
      className="sand-line group inline-flex items-center gap-2 rounded-full border border-[#D1D1C7]/40 bg-zinc-950/40 px-5 py-3 text-sm font-semibold text-[#FDFBF7] hover:bg-zinc-950/55 transition"
    >
      Explore the Ledger
      <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} />
    </Link>
  );
}

function CollectionQuickPanel() {
  // tie to collection node using useSearchParams safely encapsulated in Suspense
  const searchParams = useSearchParams();
  const market = searchParams.get("market") ?? "All";
  const q = searchParams.get("q") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "0";

  return (
    <div className="rounded-[2rem] border border-[#D1D1C7]/40 bg-zinc-950/40 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl border border-[#D1D1C7]/40 bg-[#FDFBF7]/5 grid place-items-center">
          <Sparkles size={18} className="text-[#D1D1C7]" />
        </div>
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
            Current filter node
          </div>
          <div className="font-playfair text-2xl text-[#FDFBF7]">
            Collection routing preview
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1.5rem] border border-[#D1D1C7]/40 bg-black/25 p-4">
          <div className="text-xs font-mono uppercase tracking-[0.28em] text-[#D1D1C7]/70">
            Market
          </div>
          <div className="mt-2 font-inter text-sm text-[#FDFBF7]">
            {market}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-[#D1D1C7]/40 bg-black/25 p-4">
          <div className="text-xs font-mono uppercase tracking-[0.28em] text-[#D1D1C7]/70">
            Keyword
          </div>
          <div className="mt-2 font-inter text-sm text-[#FDFBF7]">
            {q ? q : "—"}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-[#D1D1C7]/40 bg-black/25 p-4">
          <div className="text-xs font-mono uppercase tracking-[0.28em] text-[#D1D1C7]/70">
            Min price (M)
          </div>
          <div className="mt-2 font-inter text-sm text-[#FDFBF7]">
            {minPrice}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-[#FDFBF7]/75 text-sm">
          <Clock size={16} className="text-[#D1D1C7]" />
          Time-grade shifts automatically per local hour.
        </div>
        <HeroSearchLink />
      </div>
    </div>
  );
}

export default function RealEstateHomePage() {
  const clientReady = useMountSafeClient();

  const { scrollYProgress } = useScroll();
  const heroCompression = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroGlow = useTransform(scrollYProgress, [0, 0.65], [0.38, 0.15]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -12]);

  return (
    <div className="relative">
      <section className="relative overflow-hidden border-b border-[#D1D1C7]/40">
        <LightingGrade enabled={clientReady} />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-240px] top-[-140px] h-[520px] w-[520px] rounded-full bg-zinc-950/50 blur-3xl" />
          <div className="absolute right-[-220px] bottom-[-180px] h-[620px] w-[620px] rounded-full bg-zinc-950/45 blur-3xl" />
        </div>

        <motion.div
          style={{ opacity: heroGlow, y: heroY, scale: heroCompression }}
          className="mx-auto w-full max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-12"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#D1D1C7]/40 bg-[#FDFBF7]/5 px-4 py-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                  Boutique Brokerage Template
                </span>
              </div>

              <h1 className="mt-5 font-playfair text-5xl leading-[0.98] text-[#FDFBF7]">
                Luminous Pedigree
                <span className="block text-[#FDFBF7]/70">Curated real estate discovery</span>
              </h1>

              <p className="mt-5 font-inter text-sm leading-7 text-[#FDFBF7]/75">
                Hamptons & NYC editorial template featuring a ledger-style property
                intake, a mocked MLS-like filter grid, and dynamic time-based
                lighting grade for a premium conversion feel.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {[
                  "Live-Feel Discovery UI (Mocked)",
                  "Ledger-Driven Inquiry",
                  "Aperture Reveal Media Motion",
                ].map((t) => (
                  <span
                    key={t}
                    className="sand-line rounded-full border border-[#D1D1C7]/40 bg-zinc-950/40 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.28em] text-[#FDFBF7]/75"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/portfolio/web-dev-projects/real-estate/collection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#FDFBF7] px-5 py-3 text-sm font-semibold text-black hover:opacity-95 transition"
                >
                  Launch Collection Node
                </Link>
                <Link
                  href="/portfolio/web-dev-projects/real-estate/property/luminous-dune-01"
                  className="sand-line inline-flex items-center justify-center rounded-full border border-[#D1D1C7]/40 bg-zinc-950/40 px-5 py-3 text-sm font-semibold text-[#FDFBF7] hover:bg-zinc-950/55 transition"
                >
                  Open Detail Ledger
                </Link>
              </div>
            </div>

            <div className="w-full max-w-lg">
              <div className="rounded-[2rem] border border-[#D1D1C7]/40 bg-zinc-950/40 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                      Featured lineup
                    </div>
                    <div className="mt-2 font-playfair text-3xl text-[#FDFBF7]">
                      Editorial picks
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl border border-[#D1D1C7]/40 bg-black/30 grid place-items-center">
                    <Building2 size={20} className="text-[#D1D1C7]" />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {MOCK_HERO.map((x) => (
                    <Link
                      key={x.id}
                      href={`/portfolio/web-dev-projects/real-estate/property/${x.id}`}
                      className="block rounded-[1.75rem] border border-[#D1D1C7]/40 bg-black/20 p-4 transition hover:bg-black/30"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-[#FDFBF7]">
                            {x.name}
                          </div>
                          <div className="mt-1 text-xs font-inter text-[#FDFBF7]/70">
                            {x.market} · {x.neighborhood}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#D1D1C7]/70">
                            From
                          </div>
                          <div className="mt-1 font-inter text-sm font-semibold text-[#FDFBF7]">
                            ${x.priceFromM.toFixed(2)}M
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {x.vibeTags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="sand-line rounded-full border border-[#D1D1C7]/40 bg-zinc-950/40 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-[#FDFBF7]/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="h-24" />}>
              <CollectionQuickPanel />
            </Suspense>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-[2rem] border border-[#D1D1C7]/40 bg-zinc-950/40 p-6 sm:p-8">
              <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                Conversion edges
              </div>
              <h2 className="mt-3 font-playfair text-3xl text-[#FDFBF7]">
                Built for the next click.
              </h2>

              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Ranked ledger discovery",
                    body: "Cards reinforce intent with calm structure and technical clarity. No spammy interactions.",
                  },
                  {
                    title: "Aperture reveal media",
                    body: "Clean clip-path aperture motion creates premium editorial energy without heavy assets.",
                  },
                  {
                    title: "Inquiry sheet UX",
                    body: "Detail pages render a safety + privacy note and generate a mock intake packet instantly.",
                  },
                ].map((b) => (
                  <div
                    key={b.title}
                    className="rounded-[1.75rem] border border-[#D1D1C7]/40 bg-black/20 p-5"
                  >
                    <div className="font-inter text-sm font-semibold text-[#FDFBF7]">
                      {b.title}
                    </div>
                    <p className="mt-2 font-inter text-sm leading-6 text-[#FDFBF7]/75">
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <AnimatePresence>
                  <Link
                    href="/portfolio/web-dev-projects/real-estate/collection"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#FDFBF7] px-5 py-3 text-sm font-semibold text-black hover:opacity-95 transition"
                  >
                    Jump to MLS Filter Grid
                  </Link>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

