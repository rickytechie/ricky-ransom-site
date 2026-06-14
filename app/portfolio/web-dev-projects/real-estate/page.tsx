"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Building2, Shield } from "lucide-react";

function BackToHub() {
  return (
    <Link
      href="/portfolio/web-dev-projects"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
    >
      <span className="text-purple-300">←</span>
      Back to Web Dev Hub
    </Link>
  );
}

function PropertyMatcherDrawer() {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [output, setOutput] = useState<string>("");

  const run = async () => {
    setThinking(true);
    setOutput("");
    await new Promise((r) => setTimeout(r, 650));

    const safe = input.trim() || "(no preferences provided)";

    setOutput(`Property Matches (Sample)

Preferences detected:
- ${safe}

Portfolio highlights:
1) The Quiet Coast Villa — 4 bed · chef kitchen · sunset terraces
2) Dune-Lane Modern Residence — open-plan luxury · gallery-wall lounge
3) Harborline Estate — privacy-first · resort pool · late-summer events

Neighborhood deep-dives:
- Access patterns, micro-climates, lifestyle rhythm

Next step:
- Viewing plan + concierge call script (sample).`);
    setThinking(false);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/80">
            <Building2 className="h-4 w-4 text-purple-300" />
            Vanguard Matcher Drawer
          </div>
          <h2 className="text-2xl font-semibold text-white">Autonomous Property Matcher</h2>
          <p className="text-sm leading-6 text-slate-300">
            Type a vibe. The drawer generates a curated “portfolio sheet” with sample matches and next steps.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-purple-400/20 bg-gradient-to-br from-[#9333ea]/15 to-transparent px-4 py-3 text-sm text-slate-200">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-purple-200" />
            <span className="font-semibold text-white">Privacy-first demo</span>
          </div>
          <div className="mt-1 text-slate-300">No network calls. Simulated agent output.</div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Lifestyle preferences</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            placeholder="e.g. beachfront privacy, chef-grade kitchen, near art galleries, weekend tennis, low-traffic roads"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-purple-400/40"
          />
          <button
            type="button"
            onClick={run}
            disabled={thinking}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#9333ea]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {thinking ? "Matching…" : "Generate Concierge Portfolio"}
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-xs text-slate-400">
            Sample only — replace with real agent calls when wiring APIs.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Portfolio sheet</div>
              <div className="mt-2 text-sm font-semibold text-white">Curated matches (sample)</div>
            </div>
            <div className="text-xs text-slate-500">{output.length ? `${output.length} chars` : "—"}</div>
          </div>
          <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function RealEstateShowcasePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <BackToHub />

          <header className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
              <span>Web Dev Showcase</span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Vanguard Prestige Properties
            </h1>
            <p className="mt-4 max-w-3xl text-slate-300">
              A luxury-first landing page concept with a “Property Matcher” drawer that turns lifestyle signals into
              a curated portfolio sheet.
            </p>
          </header>

          <PropertyMatcherDrawer />

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">What this demo covers</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Preference capture and structured “portfolio sheet” rendering.</li>
                  <li>• Concierge-style next steps for human follow-up.</li>
                  <li>• Electric Purple highlights for confidence and focus.</li>
                </ul>
              </div>
              <div className="space-y-3 rounded-[1.5rem] border border-purple-400/20 bg-gradient-to-br from-[#9333ea]/10 to-transparent p-4">
                <p className="text-sm uppercase tracking-[0.35em] text-purple-200">Wiring note</p>
                <p className="text-sm leading-6 text-slate-200">
                  Swap the simulated agent output with a real API route returning JSON (matches, rationale, checklist).
                  Render that payload into the preformatted “portfolio sheet” template.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

