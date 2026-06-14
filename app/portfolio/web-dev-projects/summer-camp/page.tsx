"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

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

function ParentConciergeChat() {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [typed, setTyped] = useState("");

  const run = async () => {
    setThinking(true);
    setTyped("");
    await new Promise((r) => setTimeout(r, 650));

    const safe = input.trim() || "(no question provided)";

    const result = `Camp Concierge (Sample)

Parent question:
- ${safe}

Instant personalized answer:
• Safety protocols: explained in simple terms with cabin-level walkthroughs
• Weekly cadence: morning activities · lunch · afternoon specialty sessions · evening traditions
• Packing guidance: “must-haves” + weather-ready recommendations

Suggested next step:
- Agent generates a printable checklist + a short counselor script for drop-off day.`;

    // Simulated typing
    const text = result;
    let i = 0;
    const step = 16;
    const id = window.setInterval(() => {
      i = Math.min(text.length, i + step);
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setThinking(false);
      }
    }, 18);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
            <Sparkles className="h-4 w-4 text-purple-200" />
            Lake Harbor Concierge
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white">Parent Concierge Chat</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Ask anything about safety, schedules, packing, or cabin arrangements. Returns a counselor-ready summary.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-amber-400/20 bg-gradient-to-br from-[#9333ea]/10 to-transparent p-4 text-sm text-slate-200">
          <div className="text-sm font-semibold text-white">Family-first UX</div>
          <div className="mt-1 text-slate-300">Simulated offline agent output.</div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Your question</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            placeholder="e.g. How do you handle allergies? What’s the weekly schedule? What should we pack for cabin life?"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-purple-400/40"
          />

          <button
            type="button"
            onClick={run}
            disabled={thinking}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#9333ea]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {thinking ? "Answering…" : "Get Instant Answers"}
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-3 text-xs text-slate-400">
            Replace with real concierge logic and an FAQ policy knowledge base.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Concierge response</div>
              <div className="mt-2 text-sm font-semibold text-white">Instantly curated guidance (sample)</div>
            </div>
            <div className="text-xs text-slate-500">{typed.length ? `${typed.length} chars` : "—"}</div>
          </div>
          <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">{typed}</pre>
        </div>
      </div>
    </div>
  );
}

export default function SummerCampShowcasePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <BackToHub />

          <header className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
              <span>Web Dev Showcase</span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Lake Harbor Summer Camp</h1>
            <p className="mt-4 max-w-3xl text-slate-300">
              Warm, modern nostalgia framework with a parent concierge chat that outputs printable checklists.
            </p>
          </header>

          <ParentConciergeChat />

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">What this demo covers</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• FAQ + policy knowledge base for grounded answers.</li>
                  <li>• Safety explanations in parent-friendly language.</li>
                  <li>• Counselor-ready scripts and printable outputs.</li>
                </ul>
              </div>
              <div className="rounded-[1.5rem] border border-purple-400/20 bg-gradient-to-br from-[#9333ea]/10 to-transparent p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Chat contract</p>
                <p className="mt-2 leading-6">
                  The agent should return: safety section, weekly schedule, packing list, and an “on drop-off day” counselor note.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

