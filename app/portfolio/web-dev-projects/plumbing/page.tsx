"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, AlertTriangle, CalendarDays, Droplets, Wrench } from "lucide-react";

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

const anchors = [
  { id: "services", label: "Services" },
  { id: "reviews", label: "Reviews" },
  { id: "dispatch", label: "Dispatch" },
];

function StickySubNav() {
  return (
    <nav className="sticky top-0 z-20 mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Wrench className="h-4 w-4 text-purple-300" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-white/60">HydroForce</div>
            <div className="text-sm font-semibold text-white">Dispatch Navigation</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {anchors.map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              className="min-h-[44px] rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.06] hover:border-purple-400/30"
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

type Symptom = "Clogged drain" | "Slow leak" | "Water backing up" | "No hot water" | "Gurgling pipes";

type CostTier = { tier: "Low" | "Mid" | "High"; range: string; next: string };

const symptomData: Record<Symptom, { desc: string; tier: CostTier; confidence: string }> = {
  "Clogged drain": {
    desc: "Kitchen or bath drain not clearing, standing water, repeated slow-drain behavior.",
    tier: { tier: "Low", range: "$125–$240", next: "Camera check if partial blockage persists." },
    confidence: "~0.78",
  },
  "Slow leak": {
    desc: "Moisture around fixtures or ceilings; intermittent drip patterns.",
    tier: { tier: "Mid", range: "$240–$520", next: "Pressure test + line pinpointing." },
    confidence: "~0.66",
  },
  "Water backing up": {
    desc: "Toilet/sink backing up; gurgling and sewer line indicators.",
    tier: { tier: "High", range: "$520–$1,050", next: "Priority dispatch + possible sewer scope." },
    confidence: "~0.71",
  },
  "No hot water": {
    desc: "Cold water only; heater/thermostat or supply flow concerns.",
    tier: { tier: "Mid", range: "$250–$640", next: "Diagnostic on heater + valve inspection." },
    confidence: "~0.62",
  },
  "Gurgling pipes": {
    desc: "Bubbling sounds; venting restriction or trapped debris possible.",
    tier: { tier: "Low", range: "$145–$320", next: "Venting test + cleanout guidance." },
    confidence: "~0.74",
  },
};

function Terminal({ onTier }: { onTier: (tier: CostTier) => void }) {
  const symptoms = useMemo(() => Object.keys(symptomData) as Symptom[], []);
  const [idx, setIdx] = useState(0);

  const symptom = symptoms[idx];
  const data = symptomData[symptom];

  // Push tier to parent (calendar prompt)
  const tier = data.tier;
  onTier(tier);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
            <Droplets className="h-4 w-4 text-purple-200" />
            Instant Diagnostics & Smart Dispatch
          </div>
          <h2 className="mt-4 text-3xl font-semibold">HydroForce Commercial & Residential</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Terminal slider selects a plumbing symptom. The UI estimates a cost tier and reveals a scheduling calendar.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-purple-400/25 bg-gradient-to-br from-[#9333ea]/10 to-transparent p-4 text-sm text-slate-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-purple-200" />
            <span className="font-semibold text-white">Emergency-high-visibility actions</span>
          </div>
          <div className="mt-1 text-slate-300">Fast UI response for urgent dispatch workflows.</div>
        </div>
      </div>

      <div id="dispatch" className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Symptom selection</div>
              <div className="mt-2 text-sm font-semibold text-white">{symptom}</div>
            </div>
            <div className="text-xs text-slate-500">Confidence {data.confidence}</div>
          </div>

          <div className="mt-4">
            <input
              type="range"
              min={0}
              max={symptoms.length - 1}
              value={idx}
              onChange={(e) => setIdx(Number(e.target.value))}
              className="w-full accent-purple-500"
              aria-label="Select plumbing symptom"
            />
            <div className="mt-2 grid grid-cols-2 gap-2">
              {symptoms.slice(0, 4).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setIdx(symptoms.indexOf(s))}
                  className={
                    "min-h-[44px] rounded-xl border px-3 py-2 text-xs text-white/80 transition " +
                    (s === symptom
                      ? "border-purple-400/40 bg-[#9333ea]/20"
                      : "border-white/10 bg-white/[0.03] hover:border-purple-400/30")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-300">
            {data.desc}
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Estimated cost tier</div>
            <div className="mt-2 text-2xl font-semibold text-white">{tier.tier}</div>
            <div className="mt-1 text-sm text-slate-200">{tier.range}</div>
            <div className="mt-2 text-xs text-slate-400">Next: {tier.next}</div>
          </div>
        </div>

        <CalendarRevealer tier={tier} />
      </div>
    </div>
  );
}

function CalendarRevealer({ tier }: { tier: CostTier }) {
  const [open, setOpen] = useState(false);
  const days = useMemo(() => {
    const base = new Date();
    return Array.from({ length: 5 }).map((_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return {
        label: d.toLocaleDateString(undefined, { weekday: "short" }),
        date: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      };
    });
  }, []);

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Scheduling</div>
          <div className="mt-2 text-sm font-semibold text-white">Smart Dispatch Calendar</div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="min-h-[44px] rounded-2xl bg-[#9333ea]/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#9333ea]"
        >
          {open ? "Hide" : "Schedule"}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22 }}
            className="mt-4"
          >
            <div className="rounded-[1.5rem] border border-purple-400/25 bg-gradient-to-br from-[#9333ea]/12 to-transparent p-4">
              <div className="text-sm font-semibold text-white">Tier {tier.tier}</div>
              <div className="mt-1 text-xs text-slate-200">{tier.range}</div>
              <div className="mt-2 text-xs text-slate-300">Auto-note: {tier.next}</div>
            </div>

            <div className="mt-4 grid gap-3">
              {days.map((d, i) => (
                <div key={d.date} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {d.label} · {d.date}
                      </div>
                      <div className="mt-1 text-xs text-slate-300">Dispatch window (sample)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-purple-200" />
                      <div className="text-xs text-slate-200">{i === 0 ? "Today" : "Soon"}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {["8–10am", "10–12pm", "1–3pm"].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className="min-h-[44px] rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/80 transition hover:border-purple-400/30 hover:bg-black/15"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Technician note</div>
              <div className="mt-2 text-sm text-slate-200">
                “Focus on symptom triage first, then apply the tier’s recommended diagnostic.”
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function PlumbingShowcasePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-slate-950/60 via-black to-[#9333ea]/5 p-6 sm:p-10">
            <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#9333ea]/20 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#22d3ee]/10 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
                <span>HydroForce Commercial & Residential</span>
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Emergency Dispatch UX</h1>
              <p className="mt-4 max-w-3xl text-slate-300">
                Ultra-clean trust-focused navy + metallic gray grid emphasizing responsive, high-visibility emergency
                dispatch actions.
              </p>
            </div>
          </header>

          <BackToShowcase />
          <StickySubNav />

          <Terminal onTier={() => {}} />

          <section id="services" className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="text-sm uppercase tracking-[0.35em] text-slate-500">Services</div>
            <div className="mt-2 text-2xl font-semibold text-white">Immediate response categories (sample)</div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                "Emergency clog triage",
                "Fixture & leak pinpointing",
                "Water heater diagnostics",
              ].map((s) => (
                <div key={s} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white">{s}</div>
                  <div className="mt-2 text-sm text-slate-300">High-visibility dispatch-first experience.</div>
                </div>
              ))}
            </div>
          </section>

          <section id="reviews" className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="text-sm uppercase tracking-[0.35em] text-slate-500">Reviews</div>
            <div className="mt-2 text-2xl font-semibold text-white">Trust Forward</div>
            <div className="mt-2 text-sm text-slate-300">Sample reviews emphasizing speed, clarity, and next-step transparency.</div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { t: "“They answered fast.”", b: "We got a clear cost tier and schedule window immediately." },
                { t: "“No guesswork.”", b: "Diagnostics notes were organized and technician-ready." },
                { t: "“Professional and calm.”", b: "Emergency UX kept everyone informed without chaos." },
              ].map((x) => (
                <div key={x.t} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white">{x.t}</div>
                  <div className="mt-2 text-sm text-slate-300">{x.b}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

