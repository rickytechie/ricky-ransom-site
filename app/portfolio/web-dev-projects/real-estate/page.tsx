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

const subNav = [
  { id: "properties", label: "Properties" },
  { id: "testimonials", label: "Testimonials" },
  { id: "agent-search", label: "Agent Search" },
];

function StickySubNav() {
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
          {subNav.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              className="min-h-[44px] rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.06] hover:border-purple-400/30"
            >
              {i.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function ParallaxBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#9333ea]/10 blur-3xl"
        initial={{ opacity: 0.6, y: 40 }}
        whileInView={{ opacity: 1, y: -10 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      <motion.div
        className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#22d3ee]/10 blur-3xl"
        initial={{ opacity: 0.4, y: 30 }}
        whileInView={{ opacity: 0.9, y: -6 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}

function DrawerMatcher() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [preferences, setPreferences] = useState("");
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const prompt = useMemo(() => preferences.trim(), [preferences]);

  const run = async () => {
    setThinking(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 700));

    const safe = prompt || "(no preferences provided)";
    const text = `Tailored Property Portfolio (Sample)

Matched preferences:
- ${safe}

Recommended homes (sample):
1) Quiet Dune Estate — 5 bed · chef kitchen · private terraces
2) Harborline Modern — 4 bed · gallery lounge · privacy-first access
3) Coastline Vanguard — 6 bed · resort pool · late-summer events

Viewing plan (sample):
- Morning: 2 showings clustered by neighborhood
- Afternoon: 1 in-depth tour + agent debrief

Concierge next step (sample):
- Book a call slot and confirm must-haves.`;

    setResult(text);
    setThinking(false);
  };

  return (
    <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <ParallaxBackdrop />

      <div className="relative">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
              <Sparkles className="h-4 w-4 text-purple-300" />
              Autonomous Property Matcher
            </div>
            <h1 className="text-3xl font-semibold text-white">Vanguard Prestige Properties</h1>
            <p className="text-sm leading-6 text-slate-300">
              Enter preferences to generate a tailored property portfolio sheet. Includes a simulated drawer with an
              animated “matching” state using AnimatePresence.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-purple-400/25 bg-gradient-to-br from-[#9333ea]/10 to-transparent p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-200" />
              <span className="text-sm font-semibold text-white">Privacy-first demo</span>
            </div>
            <div className="mt-1 text-sm text-slate-200">No network calls. Sample output only.</div>
            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              className="mt-4 min-h-[44px] w-full rounded-2xl bg-[#9333ea]/90 px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea]"
            >
              {drawerOpen ? "Close Matcher Drawer" : "Open Matcher Drawer"}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <section id="agent-search" className="space-y-4">
            <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Lifestyle preferences</div>
              <textarea
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                rows={5}
                placeholder="e.g. beachfront privacy, chef-grade kitchen, near art galleries, weekend tennis"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-purple-400/40"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={run}
                  disabled={thinking}
                  className="min-h-[44px] inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#9333ea]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {thinking ? "Matching…" : "Generate Portfolio"}
                </button>
                <div className="text-xs text-slate-400">Simulated “agent” behavior for demo UX.</div>
              </div>
            </div>
          </section>

          <aside id="properties" className="space-y-4">
            <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Properties</div>
                  <div className="mt-2 text-sm font-semibold text-white">Preview highlights</div>
                </div>
                <div className="text-xs text-slate-500">4 sample cards</div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {["Quiet Coast Villa", "Dune-Lane Modern", "Harborline Estate", "Vanguard Point"].map((name) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-3"
                  >
                    <div className="text-sm font-semibold text-white">{name}</div>
                    <div className="mt-1 text-xs text-slate-300">Sample tour availability</div>
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {drawerOpen ? (
                <motion.div
                  key="drawer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="rounded-[1.25rem] border border-purple-400/25 bg-gradient-to-br from-[#9333ea]/12 to-transparent p-4"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-purple-200" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.35em] text-white/70">Matcher Drawer</div>
                      <div className="text-sm font-semibold text-white">Portfolio sheet</div>
                    </div>
                  </div>

                  <div className="mt-3 min-h-[140px]">
                    {thinking ? (
                      <div className="space-y-3">
                        <div className="h-3 w-3/4 animate-pulse rounded bg-white/10" />
                        <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
                        <div className="h-3 w-5/6 animate-pulse rounded bg-white/10" />
                        <div className="mt-3 text-xs text-slate-200">Optimizing matches…</div>
                      </div>
                    ) : (
                      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">
                        {result || "Open drawer + click Generate Portfolio to render the sample sheet."}
                      </pre>
                    )}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </aside>
        </div>

        <div id="testimonials" className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="text-sm uppercase tracking-[0.35em] text-slate-500">Testimonials</div>
          <div className="mt-2 text-2xl font-semibold text-white">Long Island · The Hamptons</div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "“Concierge-grade clarity.”",
                body: "The property matcher distilled our must-haves into a fast tour plan we could actually use.",
              },
              {
                title: "“Fewer calls, better decisions.”",
                body: "Our agent debrief had context. We spent less time repeating preferences.",
              },
              {
                title: "“Modern luxury without clutter.”",
                body: "A clean design system that felt premium, fast, and purpose-built.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">{c.title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-300">{c.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <BackToShowcase />
          <div className="text-xs text-slate-400">Anchors: properties · testimonials · agent-search</div>
        </div>
      </div>
    </div>
  );
}

export default function RealEstateShowcasePage() {
  return (
    <main className="min-h-screen bg-black text-white">
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
                <span>Vanguard Prestige Properties</span>
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Real Estate Showcase</h1>
              <p className="mt-4 max-w-3xl text-slate-300">
                Elegant cream + deep charcoal minimalist theme with smooth parallax layers on property layouts.
                Includes an Autonomous Property Matcher drawer powered by AnimatePresence.
              </p>
            </div>
          </header>

          <StickySubNav />

          <DrawerMatcher />
        </div>
      </div>
    </main>
  );
}

