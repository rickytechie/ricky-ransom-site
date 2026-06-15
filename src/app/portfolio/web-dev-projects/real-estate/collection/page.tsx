"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, MapPin, Search, Sparkles } from "lucide-react";

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
  highlights: string[];
  mediaProfile: {
    aperture: number;
    clipStart: number;
  };
};

const MOCK_ESTATES: Estate[] = [
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
    highlights: [
      "Sunset terrace axis",
      "Gallery-grade living room",
      "Salt-spray resilient exterior system",
    ],
    mediaProfile: { aperture: 14, clipStart: 0.18 },
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
    highlights: [
      "Courtyard soundscape",
      "Chef’s kitchen with specimen lighting",
      "Private guest wing flow",
    ],
    mediaProfile: { aperture: 12, clipStart: 0.22 },
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
    highlights: [
      "Pool pavilion geometry",
      "Breakfast sun orientation",
      "Sunset viewing deck",
    ],
    mediaProfile: { aperture: 16, clipStart: 0.14 },
  },
  {
    id: "midnight-loom-04",
    name: "Midnight Loom Townhouse",
    market: "NYC",
    neighborhood: "Tribeca Tactile Row",
    beds: 3,
    baths: 3,
    sqft: 3200,
    priceFromM: 4.2,
    vibeTags: ["gallery lounge", "quiet luxury", "library wall"],
    highlights: [
      "Library wall + warm backlight",
      "Gallery lounge geometry",
      "Elevator-grade privacy",
    ],
    mediaProfile: { aperture: 10, clipStart: 0.25 },
  },
  {
    id: "harbor-gilt-05",
    name: "Harbor Gilt Modern Estate",
    market: "Long Island",
    neighborhood: "Cold Spring Harbor",
    beds: 5,
    baths: 4,
    sqft: 5900,
    priceFromM: 9.6,
    vibeTags: ["smart shading", "brushed metal", "lake wind"],
    highlights: [
      "Smart shading system",
      "Brushed metal detailing",
      "Lake wind terrace corridor",
    ],
    mediaProfile: { aperture: 13, clipStart: 0.2 },
  },
];

function BrandLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-[#D1D1C7]/60" />
      <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
        {children}
      </span>
    </div>
  );
}

function MediaAperture({ estate }: { estate: Estate }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-[1.75rem] border border-[#D1D1C7]/40 bg-zinc-950/50"
      style={{
        aspectRatio: "16/10",
      }}
      initial={{ opacity: 0.98 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(147,51,234,0.35), transparent 60%), radial-gradient(circle at 70% 60%, rgba(34,197,94,0.22), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.55))",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: `inset(${estate.mediaProfile.clipStart * 100}% 0% 0% 0%)`,
        }}
        animate={{
          clipPath: `inset(0% 0% ${estate.mediaProfile.clipStart * 100}%) 0%)`,
        }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D1D1C7]/40 bg-[#FDFBF7]/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-[#FDFBF7]/70">
              <MapPin size={14} className="text-[#D1D1C7]/80" />
              {estate.market} · {estate.neighborhood}
            </div>
            <div className="mt-3 font-playfair text-xl text-[#FDFBF7]">
              {estate.name}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {estate.vibeTags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="sand-line rounded-full border border-[#D1D1C7]/40 bg-zinc-950/40 px-3 py-1 text-[10px] font-mono text-[#FDFBF7]/75"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SearchControls({
  initial,
  estates,
  onChange,
}: {
  initial: { market: string; q: string; minPrice: string };
  estates: Estate[];
  onChange: (next: { market: string; q: string; minPrice: string }) => void;
}) {
  const [market, setMarket] = useState(initial.market);
  const [q, setQ] = useState(initial.q);
  const [minPrice, setMinPrice] = useState(initial.minPrice);

  useEffect(() => {
    onChange({ market, q, minPrice });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market, q, minPrice]);

  const markets = useMemo(() => {
    const set = new Set<string>();
    estates.forEach((e) => set.add(e.market));
    return Array.from(set);
  }, [estates]);

  return (
    <div className="rounded-[2rem] border border-[#D1D1C7]/40 bg-zinc-950/40 p-5 sm:p-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-lg">
          <BrandLine>MLS Filter Grid</BrandLine>
          <h2 className="mt-3 font-playfair text-3xl text-[#FDFBF7]">
            Curated selection, ranked.
          </h2>
          <p className="mt-3 font-inter text-sm leading-6 text-[#FDFBF7]/75">
            Refine by market, keyword, and minimum price (from, in millions).
            The collection is fully mocked for instant production behavior.
          </p>
        </div>

        <div className="w-full md:max-w-md">
          <div className="flex flex-col gap-4">
            <label className="block">
              <div className="mb-2 text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                Market
              </div>
              <select
                className="w-full rounded-2xl border border-[#D1D1C7]/40 bg-zinc-950/50 px-4 py-3 text-sm text-[#FDFBF7] outline-none focus:border-[#D1D1C7]/70"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
              >
                <option value="All">All</option>
                {markets.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <div className="mb-2 text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                Keyword
              </div>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D1D1C7]/60"
                />
                <input
                  className="w-full rounded-2xl border border-[#D1D1C7]/40 bg-zinc-950/50 py-3 pl-11 pr-4 text-sm text-[#FDFBF7] outline-none focus:border-[#D1D1C7]/70"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="ocean, courtyard, quiet luxury…"
                />
              </div>
            </label>

            <label className="block">
              <div className="mb-2 text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                Min price (from, M)
              </div>
              <input
                className="w-full rounded-2xl border border-[#D1D1C7]/40 bg-zinc-950/50 px-4 py-3 text-sm text-[#FDFBF7] outline-none focus:border-[#D1D1C7]/70"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                inputMode="decimal"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function LightGrade({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return <div className="absolute inset-0 pointer-events-none" />;
}

function CollectionBody() {
  const searchParams = useSearchParams();

  const initial = useMemo(() => {
    const market = searchParams.get("market") ?? "All";
    const q = searchParams.get("q") ?? "";
    const minPrice = searchParams.get("minPrice") ?? "0";
    return { market, q, minPrice };
  }, [searchParams]);

  const [filters, setFilters] = useState(initial);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.85]);

  const [clientReady, setClientReady] = useState(false);
  useEffect(() => {
    setClientReady(true);
  }, []);

  const gradedStyles = useMemo(() => {
    // local time-based sepia/brightness matrix shift
    // mount-safe via clientReady
    if (!clientReady) return { filter: "none" };
    const h = new Date().getHours();
    const t = h / 24;
    const sepia = 0.08 + 0.24 * Math.sin(Math.PI * (t - 0.25));
    const brightness = 0.92 + 0.18 * Math.cos(Math.PI * (t - 0.1));
    return {
      filter: `sepia(${sepia.toFixed(3)}) brightness(${brightness.toFixed(3)})`,
    };
  }, [clientReady]);

  const filtered = useMemo(() => {
    const market = filters.market;
    const q = filters.q.trim().toLowerCase();
    const minPrice = Number(filters.minPrice || 0);

    const scored = MOCK_ESTATES.map((e) => {
      let score = 0;
      if (market !== "All" && e.market === market) score += 22;
      if (q) {
        const hay = `${e.name} ${e.neighborhood} ${e.market} ${e.vibeTags.join(" ")} ${e.highlights.join(" ")}`.toLowerCase();
        if (hay.includes(q)) score += 18;
        // lightweight token bump
        q.split(/\s+/).filter(Boolean).forEach((tok) => {
          if (hay.includes(tok)) score += 4;
        });
      }
      if (Number(e.priceFromM) >= minPrice) score += 12;
      // premium bias
      score += (e.beds >= 5 ? 2 : 0) + (e.sqft >= 5000 ? 2 : 0);
      return { e, score };
    })
      .filter(({ e }) => {
        const minOk = e.priceFromM >= (minPrice || 0);
        const marketOk = market === "All" ? true : e.market === market;
        const qOk = q
          ? `${e.name} ${e.neighborhood} ${e.vibeTags.join(" ")}`
              .toLowerCase()
              .includes(q)
          : true;
        return minOk && marketOk && qOk;
      })
      .sort((a, b) => b.score - a.score);

    return scored.map((x) => x.e);
  }, [filters]);

  return (
    <div className="relative">
      <LightGrade enabled={clientReady} />

      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-10 sm:px-6">
        <motion.div
          style={{ opacity, y }}
          className="rounded-[2.2rem] border border-[#D1D1C7]/40 bg-black/20 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="frosted-nav rounded-full border border-[#D1D1C7]/40 bg-[#FDFBF7]/5 p-3">
                <Sparkles size={18} className="text-[#D1D1C7]" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                  {"Luminous Pedigree"}
                </div>
                <div className="font-playfair text-3xl text-[#FDFBF7]">
                  Collection Ledger
                </div>
              </div>
            </div>
            <div className="text-sm text-[#FDFBF7]/75">
              Showing <span className="text-[#FDFBF7] font-semibold">{filtered.length}</span> of {MOCK_ESTATES.length}
            </div>
          </div>
        </motion.div>

        <div className="mt-6" style={gradedStyles}>
          <Suspense fallback={<div className="h-24" />}> 
            <SearchControls
              initial={initial}
              estates={MOCK_ESTATES}
              onChange={(next) => setFilters(next)}
            />
          </Suspense>
        </div>

        <div
          className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          style={gradedStyles}
        >
          <AnimatePresence>
            {filtered.map((estate, idx) => (
              <motion.div
                key={estate.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.28, delay: idx * 0.02 }}
              >
                <Link
                  href={`/portfolio/web-dev-projects/real-estate/property/${estate.id}`}
                  className="block"
                >
                  <MediaAperture estate={estate} />

                  <div className="mt-4 rounded-[1.5rem] border border-[#D1D1C7]/40 bg-zinc-950/40 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-inter text-sm font-semibold text-[#FDFBF7]">
                        From ${estate.priceFromM.toFixed(2)}M
                      </div>
                      <div className="sand-line text-[10px] font-mono uppercase tracking-[0.28em] text-[#D1D1C7]/70">
                        {estate.beds} BD · {estate.baths} BA
                      </div>
                    </div>
                    <div className="mt-2 font-inter text-sm text-[#FDFBF7]/75">
                      {estate.sqft.toLocaleString()} sqft · Editorial notes included
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.28em] text-[#FDFBF7]/75 hover:text-[#FDFBF7] transition">
                      View property
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-10 rounded-[2rem] border border-[#D1D1C7]/40 bg-black/25 p-6 sm:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                Inquiry routing
              </div>
              <h3 className="mt-2 font-playfair text-2xl text-[#FDFBF7]">
                Detail pages generated from a technical ledger.
              </h3>
            </div>
            <div className="text-sm text-[#FDFBF7]/75">
              Click any card to open the ledger-style property intake.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage() {
  return <CollectionBody />;
}

