"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Bath, Bed, Building2, MapPin, Ruler, ShieldCheck, Sparkles } from "lucide-react";

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
  spec: {
    materials: string[];
    lifecycle: string[];
    systems: string[];
    riskNotes: string[];
    apertureProfile: { aperture: number; clipStart: number };
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
    spec: {
      materials: ["Sand-etched limestone facade", "Graphite aluminum trim", "Engineered oak thermal floors"],
      lifecycle: ["Coastal exterior maintenance every 18 months", "Sealant refresh cycle: 2–3 years", "HVAC coil inspection quarterly"],
      systems: ["Zoned climate choreography", "Thermal glazing stack", "Low-voltage perimeter sensing"],
      riskNotes: ["Brine exposure requires inspection cadence", "Wind-driven spray near terrace requires sealing checks"],
      apertureProfile: { aperture: 14, clipStart: 0.18 },
    },
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
    spec: {
      materials: ["Charcoal plaster interior", "Bronze tone hardware", "Courtyard micro-terracotta accents"],
      lifecycle: ["Lighting temperature calibration: annually", "Moisture check in courtyard corners: seasonally"],
      systems: ["Smart dimming layers", "Ventilated humidity management", "Acoustic insulation envelope"],
      riskNotes: ["Humidity spikes in rainy seasons—verify ventilation"],
      apertureProfile: { aperture: 12, clipStart: 0.22 },
    },
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
    spec: {
      materials: ["Warm oyster stonework", "Marine-grade decking", "Hidden channel drainage"],
      lifecycle: ["Deck sealing: annually", "Pool filtration validation: quarterly"],
      systems: ["Thermal zoning", "Pressure-balanced shower architecture", "Perimeter irrigation optimization"],
      riskNotes: ["Wind exposure: re-check fasteners on pavilion"],
      apertureProfile: { aperture: 16, clipStart: 0.14 },
    },
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
    spec: {
      materials: ["Velvet-matte wall treatment", "Smoked glass partitions", "Thermal blackout drapery"],
      lifecycle: ["HVAC filter swaps: every 60 days", "Backlight calibration: semi-annually"],
      systems: ["Acoustic climate layering", "Integrated lighting timeline", "Secure access zoning"],
      riskNotes: ["Noise transfer in party seasons—verify seals"],
      apertureProfile: { aperture: 10, clipStart: 0.25 },
    },
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
    spec: {
      materials: ["Brushed metal cladding", "Lake-bleached timber panels", "Shaded glass bays"],
      lifecycle: ["Shading motor inspection: 2× per year", "Coastal corrosion check: seasonally"],
      systems: ["Predictive shading timing", "Thermal glazing stack", "Low-voltage sensing"],
      riskNotes: ["Motor wear with salt exposure—inspect bearings"],
      apertureProfile: { aperture: 13, clipStart: 0.2 },
    },
  },
];

function SandLine() {
  return <div className="h-px w-full bg-[#D1D1C7]/50" />;
}

function formatSqft(n: number) {
  return n.toLocaleString();
}

function ApertureReveal({ aperture }: { aperture: number }) {
  // aperture visual reveal animation using clip-path inset
  return (
    <motion.div
      aria-hidden
      className="relative overflow-hidden rounded-[1.75rem] border border-[#D1D1C7]/40 bg-zinc-950/50"
      style={{ aspectRatio: "16/9" }}
      initial={{ opacity: 0.98 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 35%, rgba(147,51,234,0.35), transparent 60%), radial-gradient(circle at 70% 65%, rgba(34,197,94,0.20), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.68))",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0% 0% 0% 0%)`,
        }}
        animate={{ clipPath: `inset(0% 0% ${Math.max(0, 65 - aperture * 2)}% 0%)` }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D1D1C7]/40 bg-[#FDFBF7]/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-[#FDFBF7]/70">
              <Sparkles size={14} className="text-[#D1D1C7]/80" />
              Aperture · {aperture}°
            </div>
          </div>
          <div className="rounded-full border border-[#D1D1C7]/40 bg-black/30 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-[#D1D1C7]/70">
            Editorial Reveal
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const estate = useMemo(() => {
    const id = params.id;
    return MOCK_ESTATES.find((e) => e.id === id) ?? null;
  }, [params.id]);


  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState("");
  const [timeWindow, setTimeWindow] = useState("Twilight tour (6–7:30pm)");

  useEffect(() => {
    // open a delightful default on first mount if query matches
    if (estate) setNotes(`Interested in a private showing of ${estate.name}.`);
}, [estate]);

  if (!estate) {

    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-[#D1D1C7]/40 bg-zinc-950/40 p-6 sm:p-10">
          <h1 className="font-playfair text-3xl text-[#FDFBF7]">Property not found</h1>
          <p className="mt-3 font-inter text-[#FDFBF7]/75">
            The requested ledger id does not exist in this mocked dataset.
          </p>
          <Link
            href="/portfolio/web-dev-projects/real-estate/collection"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D1D1C7]/40 bg-zinc-950/40 px-4 py-2 text-sm font-semibold text-[#FDFBF7] hover:bg-zinc-950/60 transition"
          >
            <ArrowLeft size={16} /> Back to Collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/portfolio/web-dev-projects/real-estate/collection"
            className="sand-line rounded-full border border-[#D1D1C7]/40 bg-zinc-950/40 px-4 py-2 text-xs font-mono uppercase tracking-[0.28em] text-[#FDFBF7]/80 hover:text-[#FDFBF7] transition"
          >
            ← Back to Collection
          </Link>

          <button
            type="button"
            onClick={() => setInquiryOpen(true)}
            className="frosted-nav rounded-full border border-[#D1D1C7]/40 bg-[#FDFBF7]/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.28em] text-[#FDFBF7]/90 hover:bg-[#FDFBF7]/15 transition"
          >
            Open Inquiry Ledger
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ApertureReveal aperture={estate.spec.apertureProfile.aperture} />

            <div className="mt-6 rounded-[2rem] border border-[#D1D1C7]/40 bg-black/20 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                    {estate.market} · {estate.neighborhood}
                  </div>
                  <h1 className="mt-3 font-playfair text-4xl leading-[1.04] text-[#FDFBF7]">
                    {estate.name}
                  </h1>
                </div>
                <div className="rounded-[1.5rem] border border-[#D1D1C7]/40 bg-zinc-950/50 px-4 py-3">
                  <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#D1D1C7]/70">
                    From
                  </div>
                  <div className="mt-1 font-inter text-3xl font-semibold text-[#FDFBF7]">
                    ${estate.priceFromM.toFixed(2)}M
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-[#D1D1C7]/40 bg-zinc-950/40 p-4">
                  <div className="flex items-center gap-2 text-[#FDFBF7]/85">
                    <Bed size={16} className="text-[#D1D1C7]" />
                    <span className="font-mono text-sm">{estate.beds} Beds</span>
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-[#D1D1C7]/40 bg-zinc-950/40 p-4">
                  <div className="flex items-center gap-2 text-[#FDFBF7]/85">
                    <Bath size={16} className="text-[#D1D1C7]" />
                    <span className="font-mono text-sm">{estate.baths} Baths</span>
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-[#D1D1C7]/40 bg-zinc-950/40 p-4">
                  <div className="flex items-center gap-2 text-[#FDFBF7]/85">
                    <Ruler size={16} className="text-[#D1D1C7]" />
                    <span className="font-mono text-sm">{formatSqft(estate.sqft)} sqft</span>
                  </div>
                </div>
              </div>

              <SandLine />

              <div className="mt-6">
                <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                  Highlights
                </div>
                <ul className="mt-4 space-y-3">
                  {estate.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[#FDFBF7]/80">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#D1D1C7]" />
                      <span className="font-inter text-sm leading-6">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-[2rem] border border-[#D1D1C7]/40 bg-zinc-950/40 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-[#D1D1C7]/40 bg-black/30 grid place-items-center">
                  <Building2 size={18} className="text-[#D1D1C7]/80" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                    Technical ledger
                  </div>
                  <div className="font-playfair text-2xl text-[#FDFBF7]">Spec Pack</div>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <LedgerBlock title="Materials" items={estate.spec.materials} />
                <LedgerBlock title="Systems" items={estate.spec.systems} />
                <LedgerBlock title="Lifecycle" items={estate.spec.lifecycle} />
                <LedgerBlock title="Risk Notes" items={estate.spec.riskNotes} />
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-[#D1D1C7]/40 bg-black/25 p-4">
                <div className="flex items-center gap-2 text-[#FDFBF7]/90">
                  <ShieldCheck size={16} className="text-[#D1D1C7]/80" />
                  <div className="font-mono text-xs uppercase tracking-[0.35em]">
                    Safety + privacy
                  </div>
                </div>
                <p className="mt-2 font-inter text-sm leading-6 text-[#FDFBF7]/75">
                  All inquiry generation is mock-only and remains client-side.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-[#D1D1C7]/40 bg-black/20 p-6">
              <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                Quick route
              </div>
              <div className="mt-3 flex flex-col gap-3">
                <Link
                  href="/portfolio/web-dev-projects/real-estate/collection"
                  className="rounded-2xl border border-[#D1D1C7]/40 bg-zinc-950/40 px-4 py-3 text-sm font-semibold text-[#FDFBF7] hover:bg-zinc-950/60 transition"
                >
                  Continue Browsing
                </Link>
                <Link
                  href="/portfolio/web-dev-projects/real-estate/about"
                  className="rounded-2xl border border-[#D1D1C7]/40 bg-zinc-950/20 px-4 py-3 text-sm font-semibold text-[#FDFBF7] hover:bg-zinc-950/50 transition"
                >
                  Read Brand Philosophy
                </Link>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {inquiryOpen ? (
            <motion.div
              className="fixed inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                aria-label="Close inquiry ledger"
                className="absolute inset-0 bg-black/70 backdrop-blur-[10px]"
                onClick={() => setInquiryOpen(false)}
              />

              <motion.aside
                className="absolute right-0 top-0 h-full w-full max-w-md border-l border-[#D1D1C7]/40 bg-zinc-950/90 backdrop-blur-[20px]"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
              >
                <div className="flex items-center justify-between gap-4 border-b border-[#D1D1C7]/40 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl border border-[#D1D1C7]/40 bg-black/30 grid place-items-center">
                      <MapPin size={18} className="text-[#D1D1C7]/80" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                        Inquiry ledger
                      </div>
                      <div className="font-playfair text-xl text-[#FDFBF7]">Private intake</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setInquiryOpen(false)}
                    className="rounded-2xl border border-[#D1D1C7]/40 bg-[#FDFBF7]/5 px-4 py-2 text-sm font-semibold text-[#FDFBF7]/90 hover:bg-[#FDFBF7]/10 transition"
                  >
                    Close
                  </button>
                </div>

                <div className="h-[calc(100%-72px)] overflow-y-auto px-5 py-5">
                  <div className="rounded-[1.75rem] border border-[#D1D1C7]/40 bg-black/30 p-4">
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                      Property
                    </div>
                    <div className="mt-2 font-inter text-sm leading-6 text-[#FDFBF7]/90">
                      <span className="font-semibold">{estate.name}</span> · {estate.market} · {estate.neighborhood}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {estate.vibeTags.map((t) => (
                        <span
                          key={t}
                          className="sand-line rounded-full border border-[#D1D1C7]/40 bg-zinc-950/30 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-[#FDFBF7]/75"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4">
                    <label className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                        Contact handle
                      </div>
                      <input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Email or phone"
                        className="w-full rounded-2xl border border-[#D1D1C7]/40 bg-zinc-950/40 px-4 py-3 text-sm text-[#FDFBF7] outline-none focus:border-[#D1D1C7]/70"
                      />
                    </label>

                    <label className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                        Time window
                      </div>
                      <select
                        value={timeWindow}
                        onChange={(e) => setTimeWindow(e.target.value)}
                        className="w-full rounded-2xl border border-[#D1D1C7]/40 bg-zinc-950/40 px-4 py-3 text-sm text-[#FDFBF7] outline-none focus:border-[#D1D1C7]/70"
                      >
                        <option>Twilight tour (6–7:30pm)</option>
                        <option>Morning sun tour (9–10:30am)</option>
                        <option>Private midday session (12–1:30pm)</option>
                      </select>
                    </label>

                    <label className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                        Buyer notes
                      </div>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={6}
                        className="w-full resize-none rounded-[1.75rem] border border-[#D1D1C7]/40 bg-zinc-950/40 px-4 py-3 text-sm text-[#FDFBF7] outline-none focus:border-[#D1D1C7]/70"
                      />
                    </label>

                    <div className="rounded-[1.75rem] border border-[#D1D1C7]/40 bg-zinc-950/30 p-4">
                      <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                        Ledger preview (mock)
                      </div>
                      <pre className="mt-2 whitespace-pre-wrap font-mono text-[12px] leading-5 text-[#FDFBF7]/85">
{`INQUIRY PACKET\n\nProperty: ${estate.name}\nMarket: ${estate.market}\nNeighborhood: ${estate.neighborhood}\n\nTime: ${timeWindow}\nContact: ${contact || "—"}\n\nNotes:\n${notes || "(none)"}\n\nNext action: Concierge schedules private viewing window.`}
                      </pre>
                    </div>

                    <button
                      type="button"
                      onClick={() => setInquiryOpen(false)}
                      className="rounded-2xl bg-[#FDFBF7] px-5 py-3 text-sm font-semibold text-black hover:opacity-95 transition"
                    >
                      Confirm Inquiry Packet
                    </button>
                  </div>
                </div>
              </motion.aside>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

function LedgerBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
        {title}
      </div>
      <div className="mt-3 space-y-2">
        {items.map((it) => (
          <div key={it} className="flex gap-3 text-[#FDFBF7]/80">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#D1D1C7]" />
            <p className="font-inter text-sm leading-6">{it}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

