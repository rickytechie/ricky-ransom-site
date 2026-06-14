"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Building2, Shield, Sparkles } from "lucide-react";

function BackToShowcase() {
  return (
    <Link
      href="/portfolio/web-dev-projects"
      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
    >
      <ArrowLeft className="h-4 w-4 text-purple-300" />
      Back to Showcase
    </Link>
  );
}

function SubNav() {
  const items = [
    { id: "properties", label: "Properties" },
    { id: "testimonials", label: "Testimonials" },
    { id: "agent-search", label: "Agent Search" },
  ];

  return (
    <nav className="sticky top-0 z-20 mt-6 rounded-[1.5rem] border border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Building2 className="h-4 w-4 text-purple-300" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-white/60">Vanguard Prestige</div>
            <div className="text-sm font-semibold text-white">Sub-Route Navigation</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className="min-h-[44px] rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:border-purple-400/30"
            >
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function ParallaxAmbient() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[-5%] top-[-10%] h-[360px] w-[360px] rounded-full bg-[#9333ea]/15 blur-3xl"
        initial={{ opacity: 0.5, y: 26 }}
        whileInView={{ opacity: 0.9, y: -6 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[22%] h-[300px] w-[300px] rounded-full bg-[#22d3ee]/10 blur-3xl"
        initial={{ opacity: 0.35, y: 22 }}
        whileInView={{ opacity: 0.8, y: -12 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}

type CuratorConfig = {
  estate: string;
  town: string;
};

function CuratorsFilter() {
  const [config, setConfig] = useState<CuratorConfig>({ estate: "Estate", town: "Sagaponack" });
  const [thinking, setThinking] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const curatorQuery = useMemo(() => {
    return `I am seeking an ${config.estate} in ${config.town}… with privacy, twilight ambiance, and curated tour scheduling.`;
  }, [config]);

  const curate = async () => {
    setThinking(true);
    setOutput(null);
    await new Promise((r) => setTimeout(r, 750));

    setOutput(
      `Curator's Filter Output (Sample)\n\nRequest:\n${curatorQuery}\n\nCurated Estates (sample):\n1) Luminous Dune Residence — 5 bed · sand-etched stonework · ocean-facing terraces\n2) Atlantic Ink Courtyard House — 4 bed · gallery lounge · private guest wing\n3) Oyster Shell Meadow Villa — 6 bed · pool pavilion · sunset viewing deck\n\nConcierge Inquiry Protocol (sample):\n- Confirm must-haves\n- Select 2 tour windows\n- Provide preferred contact time`
    );
    setThinking(false);
    setDrawerOpen(true);
  };

  return (
    <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#fbf6ee]/10 p-6 sm:p-8">
      <ParallaxAmbient />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
            <Sparkles className="h-4 w-4 text-[#9333ea]" />
            Vanguard Prestige Properties
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-5xl dark:text-white">
            Luminous Pedigree (Coastal Brutalism Mock)
          </h1>

          <p className="text-sm leading-6 text-slate-300">
            Split-layer viewport mockup with a Curator's Filter natural-language select-box and a responsive concierge
            slide-over inquiry protocol.
          </p>

          <div className="mt-6 rounded-[1.75rem] border border-[#d9c7b0]/30 bg-[#000000]/25 p-4">
            <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Curator's Filter</div>
            <div className="mt-2 text-sm font-semibold text-slate-200">Natural-language estate request</div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Estate</span>
                <select
                  value={config.estate}
                  onChange={(e) => setConfig((s) => ({ ...s, estate: e.target.value }))}
                  className="w-full min-h-[44px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#9333ea]/50"
                >
                  <option>Estate</option>
                  <option>Coastal Villa</option>
                  <option>Courtyard House</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Town</span>
                <select
                  value={config.town}
                  onChange={(e) => setConfig((s) => ({ ...s, town: e.target.value }))}
                  className="w-full min-h-[44px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#9333ea]/50"
                >
                  <option>Sagaponack</option>
                  <option>East Hampton</option>
                  <option>Water Mill</option>
                  <option>Bridgehampton</option>
                </select>
              </label>
            </div>

            <div className="mt-4 rounded-[1.25rem] border border-[#d9c7b0]/30 bg-[#000000]/30 p-4">
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">I am seeking…</div>
              <div className="mt-2 text-sm font-semibold text-[#0a0a0a] dark:text-white">{curatorQuery}</div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={curate}
                disabled={thinking}
                className="min-h-[44px] w-full rounded-2xl bg-[#9333ea]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {thinking ? "Curating…" : "Curate Estates"}
              </button>
              <div className="text-xs text-slate-400">Curate opens the concierge slide-over.</div>
            </div>
          </div>
        </div>

        <div className="lg:w-[420px]">
          <div className="rounded-[1.5rem] border border-[#9333ea]/35 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#9333ea]" />
              <span className="text-sm font-semibold text-white">Private intake</span>
            </div>
            <div className="mt-1 text-sm text-slate-200">Crisp sand-etched line rules + zero external calls.</div>
          </div>

          <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
            <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Viewport mock</div>
            <div className="mt-2 text-sm font-semibold text-white">Twilight Estate Brief</div>
            <div className="mt-2 text-sm text-slate-300">
              Ambient coastal brutalism: warm oyster shell + Atlantic ink charcoal tokens.
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen ? (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close concierge inquiry"
              className="absolute inset-0 min-h-screen w-full bg-black/60 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-black/85 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Concierge</div>
                  <div className="text-sm font-semibold text-white">Private inquiry protocol</div>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="min-h-[44px] rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/90 transition hover:bg-white/[0.06]"
                >
                  Close
                </button>
              </div>

              <div className="h-[calc(100%-72px)] overflow-y-auto px-5 py-5">
                <div className="rounded-[1.5rem] border border-[#9333ea]/30 bg-[#000000]/40 p-4">
                  <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Concierge steps</div>
                  <div className="mt-2 text-sm font-semibold text-white">What we’ll ask next (sample)</div>
                  <div className="mt-2 text-sm text-slate-300">
                    Confirm must-haves · select tour windows · provide preferred contact time.
                  </div>
                </div>

                <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Curator output</div>
                  <pre className="mt-2 whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">
                    {thinking ? "Synthesizing concierge protocol…" : output || "Curate Estates to render the concierge protocol."}
                  </pre>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function RealEstateShowcasePage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <div>
            <BackToShowcase />
          </div>

          <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            <div aria-hidden className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#9333ea]/15 blur-2xl" />
            <div aria-hidden className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#22d3ee]/10 blur-2xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
                <span>Web Dev Showcase</span>
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Vanguard Prestige Properties</h1>
              <p className="mt-4 max-w-3xl text-slate-300">
                Coastal Brutalism mockup with a natural-language Curator's Filter and a slide-over concierge inquiry protocol.
              </p>
            </div>
          </header>

          <SubNav />

          <div id="agent-search">
            <CuratorsFilter />
          </div>

          <section id="properties" className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="text-sm uppercase tracking-[0.35em] text-white/70">Properties</div>
            <div className="mt-2 text-2xl font-semibold text-white">Curator-ranked estate lineup (sample)</div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {["Luminous Dune Residence", "Atlantic Ink Courtyard House", "Oyster Shell Meadow Villa"].map((name) => (
                <div key={name} className="rounded-[1.75rem] border border-white/10 bg-black/25 p-4">
                  <div className="text-sm font-semibold text-white">{name}</div>
                  <div className="mt-2 text-sm text-slate-300">
                    Sand-etched details · curated tour windows · concierge-ready intake.
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="testimonials" className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="text-sm uppercase tracking-[0.35em] text-slate-500">Testimonials</div>
            <div className="mt-2 text-2xl font-semibold text-white">Long Island · The Hamptons</div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "“Coastal brutalism, but premium.”",
                  body: "The curator flow made our must-haves tangible, fast. The slide-over inquiry was immediately usable.",
                },
                {
                  title: "“Twilight brief clarity.”",
                  body: "Tokens and line rules felt deliberate—like a real platform for serious buyers.",
                },
                {
                  title: "“Fewer back-and-forths.”",
                  body: "We moved from preferences to tour windows with almost no friction.",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white">{c.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">{c.body}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8">
            <BackToShowcase />
          </div>
        </div>
      </div>
    </main>
  );
}

