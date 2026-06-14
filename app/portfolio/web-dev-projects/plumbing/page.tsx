"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, HeartHandshake, Shield, Wrench } from "lucide-react";

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

function SmartDispatchTerminal() {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [output, setOutput] = useState("");

  const run = async () => {
    setThinking(true);
    setOutput("");
    await new Promise((r) => setTimeout(r, 650));

    const safe = input.trim() || "(no issue description provided)";

    setOutput(`Diagnosis (Sample)

Issue description:
- ${safe}

Likely failure modes:
1) Drain line partial blockage with pressure fluctuation
2) Venting restriction causing slow-drain + gurgle
3) Fixture trap debris / buildup

Estimated cost range (priority):
- $145–$320 labor + basic parts
- $320–$590 if camera inspection is required

Priority booking window:
- Next availability within: 45–90 minutes
- Choose a slot + dispatch notes: “Focus on drain flow + vent test”

Guaranteed next step:
- Agent produces dispatch checklist for the technician.`);
    setThinking(false);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
            <Wrench className="h-4 w-4 text-purple-200" />
            HydroForce Smart Dispatch
          </div>
          <h2 className="mt-4 text-2xl font-semibold">Instant Diagnostics Terminal</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Describe the plumbing issue. The terminal returns a priority estimate + a dispatch checklist (sample).
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-sky-400/20 bg-gradient-to-br from-[#22d3ee]/10 to-transparent p-4 text-sm text-slate-200">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-purple-200" />
            <span className="font-semibold text-white">Emergency-first UX</span>
          </div>
          <div className="mt-1 text-slate-300">Structured outputs for faster booking.</div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-4">
          <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Issue description</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            placeholder="e.g. water backing up in sink, gurgling pipes, intermittent low pressure, landlord says it's 'probably a clog'"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-purple-400/40"
          />

          <button
            type="button"
            onClick={run}
            disabled={thinking}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#9333ea]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {thinking ? "Diagnosing…" : "Diagnose & Schedule"}
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-3">
              <HeartHandshake className="h-5 w-5 text-purple-200" />
              <p className="text-sm font-semibold text-white">Trust-forward concept</p>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• Cost range + failure mode cards with confidence notes</li>
              <li>• Dispatch notes ready for technicians</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">AI output</div>
              <div className="mt-2 text-sm font-semibold text-white">Diagnosis & booking window</div>
            </div>
            <div className="text-xs text-slate-500">{output.length ? `${output.length} chars` : "—"}</div>
          </div>
          <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default function PlumbingShowcasePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <BackToHub />

          <header className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
              <span>Web Dev Showcase</span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">HydroForce Plumbing</h1>
            <p className="mt-4 max-w-3xl text-slate-300">
              Premium dispatch concept with an instant diagnostics terminal and structured priority booking output.
            </p>
          </header>

          <SmartDispatchTerminal />

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">Next wiring step</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• Replace simulated output with a real diagnostics agent API route.</li>
                  <li>• Convert cost ranges + time slots into a booking UI payload.</li>
                  <li>• Render technician checklist from structured JSON.</li>
                </ul>
              </div>
              <div className="rounded-[1.5rem] border border-purple-400/20 bg-gradient-to-br from-[#9333ea]/10 to-transparent p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Emergency mode</p>
                <p className="mt-2 leading-6">
                  Add a “Priority emergency” toggle to route the agent into a faster, higher-confidence response mode.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

