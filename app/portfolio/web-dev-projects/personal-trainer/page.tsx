"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Dumbbell, Sparkles } from "lucide-react";

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
  { id: "programs", label: "Programs" },
  { id: "transformations", label: "Transformations" },
  { id: "ai-planner", label: "AI Planner" },
];

function StickySubNav() {
  return (
    <nav className="sticky top-0 z-20 mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Dumbbell className="h-4 w-4 text-purple-300" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-white/60">Apex Kinetic</div>
            <div className="text-sm font-semibold text-white">Onboarding Navigation</div>
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

type WizardInputs = {
  age: number;
  goal: "Cut" | "Bulk" | "Performance";
  experience: "Beginner" | "Intermediate" | "Advanced";
  sessionsPerWeek: number;
};

type DayKey = "Day 1" | "Day 2" | "Day 3" | "Day 4" | "Day 5" | "Day 6" | "Day 7";

type WorkoutDay = { day: DayKey; focus: string; volume: string };

function buildSplit(inp: WizardInputs): WorkoutDay[] {
  const base = inp.goal === "Cut" ? "Lean" : inp.goal === "Bulk" ? "Mass" : "Performance";
  const intensity = inp.experience === "Beginner" ? "Controlled" : inp.experience === "Intermediate" ? "Focused" : "Driven";

  const split: WorkoutDay[] = [
    { day: "Day 1", focus: `Strength · ${base} lower + core`, volume: `${intensity} sets · 35–55 min` },
    { day: "Day 2", focus: `Hypertrophy · push + pull`, volume: `${intensity} supersets · 45–60 min` },
    { day: "Day 3", focus: `Conditioning · intervals + mobility`, volume: `Zone work · 25–40 min` },
    { day: "Day 4", focus: `Strength · upper + unilateral`, volume: `${intensity} work · 40–55 min` },
    { day: "Day 5", focus: `Hypertrophy · legs accessory + back`, volume: `Pump-focused · 45–60 min` },
    { day: "Day 6", focus: `Recovery · zone-2 + breathing`, volume: `Easy cardio · 25–35 min` },
    { day: "Day 7", focus: `Peak session · goal circuit`, volume: `Performance finish · 30–50 min` },
  ];

  return split;
}

function StepButton({ onClick, children, disabled }: { onClick: () => void; children: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-2xl bg-[#9333ea]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}

function Wizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [inp, setInp] = useState<WizardInputs>({ age: 29, goal: "Performance", experience: "Intermediate", sessionsPerWeek: 4 });

  const [thinking, setThinking] = useState(false);
  const [days, setDays] = useState<WorkoutDay[] | null>(null);

  const summary = useMemo(() => `${inp.goal} · ${inp.experience} · ${inp.sessionsPerWeek} sessions/week`, [inp]);
  const split = useMemo(() => buildSplit(inp), [inp]);

  const generate = async () => {
    setThinking(true);
    setDays(null);
    await new Promise((r) => setTimeout(r, 700));
    setDays(split);
    setThinking(false);
  };

  useEffect(() => {
    // When step changes to 3, don’t auto-generate; generation is deliberate.
  }, [step]);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
      <section id="ai-planner" className="space-y-4">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-purple-200" />
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-white/60">AI Fitness Planner Wizard</div>
              <div className="mt-1 text-2xl font-semibold text-white">Onboard → Generate → Animate</div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Step {step} of 3</div>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <motion.div
                  className="h-2 rounded-full bg-[#9333ea]"
                  initial={false}
                  animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                />
              </div>
            </div>

            {step === 1 ? (
              <>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Age</span>
                  <input
                    type="number"
                    value={inp.age}
                    onChange={(e) => setInp((s) => ({ ...s, age: Number(e.target.value) }))}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-purple-400/40"
                    min={16}
                    max={75}
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Goal</span>
                  <select
                    value={inp.goal}
                    onChange={(e) => setInp((s) => ({ ...s, goal: e.target.value as WizardInputs["goal"] }))}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-purple-400/40"
                  >
                    <option>Cut</option>
                    <option>Bulk</option>
                    <option>Performance</option>
                  </select>
                </label>

                <div className="sm:col-span-2">
                  <StepButton
                    disabled={inp.age < 16 || inp.age > 75}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </StepButton>
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Experience</span>
                  <select
                    value={inp.experience}
                    onChange={(e) => setInp((s) => ({ ...s, experience: e.target.value as WizardInputs["experience"] }))}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-purple-400/40"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Sessions / week</span>
                  <input
                    type="number"
                    value={inp.sessionsPerWeek}
                    onChange={(e) => setInp((s) => ({ ...s, sessionsPerWeek: Number(e.target.value) }))}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-purple-400/40"
                    min={1}
                    max={7}
                  />
                </label>

                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="min-h-[44px] rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/[0.06]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="min-h-[44px] rounded-2xl bg-[#9333ea]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea]"
                  >
                    Review
                  </button>
                </div>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <div className="sm:col-span-2 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Your plan inputs</div>
                  <div className="mt-2 text-sm font-semibold text-white">{summary}</div>
                  <div className="mt-2 text-sm text-slate-300">Click generate to animate a custom 7-day workout split.</div>
                </div>

                <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="min-h-[44px] rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/[0.06]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={generate}
                    disabled={thinking}
                    className="min-h-[44px] rounded-2xl bg-[#9333ea]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {thinking ? "Generating…" : "Generate 7-Day Split"}
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <aside id="programs" className="space-y-4">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="text-xs uppercase tracking-[0.35em] text-slate-500">7-Day Workout Split</div>
          <div className="mt-2 text-2xl font-semibold text-white">Smooth Animated Layout</div>
          <div className="mt-2 text-sm text-slate-300">Each day card slides in with Framer Motion.</div>

          <div className="mt-6 space-y-3">
            <AnimatePresence mode="popLayout">
              {thinking ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4"
                >
                  <div className="h-3 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="mt-3 h-3 w-2/3 animate-pulse rounded bg-white/10" />
                  <div className="mt-3 text-xs text-slate-200">AI planner is assembling your split…</div>
                </motion.div>
              ) : null}

              {days ? (
                <motion.div
                  key="days"
                  className="grid gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {days.map((d, i) => (
                    <motion.div
                      key={d.day}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 250, damping: 22, delay: i * 0.04 }}
                      className="rounded-[1.75rem] border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-white">{d.day}</div>
                        <div className="rounded-full border border-purple-400/25 bg-[#9333ea]/10 px-3 py-1 text-xs text-purple-200">
                          Day focus
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-slate-200">{d.focus}</div>
                      <div className="mt-2 text-xs text-slate-400">{d.volume}</div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>

            {!days && !thinking ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Waiting for generation</div>
                <div className="mt-2 text-sm text-slate-300">Complete step 3 then click Generate 7-Day Split.</div>
              </div>
            ) : null}
          </div>
        </div>

        <div id="transformations" className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Transformations</div>
          <div className="mt-2 text-2xl font-semibold text-white">Bold, Electric Purple Accents</div>
          <div className="mt-2 text-sm leading-6 text-slate-300">
            Sample testimonial cards emphasize energy, bold typography grids, and conversion-ready program clarity.
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { t: "Week 1:", b: "Stability + technique lock-in." },
              { t: "Week 3:", b: "Progressive overload with cleaner recovery." },
              { t: "Week 5:", b: "Stronger conditioning + measurable output." },
              { t: "Week 7:", b: "Peak circuit performance + momentum." },
            ].map((x) => (
              <div key={x.t} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">{x.t}</div>
                <div className="mt-2 text-sm text-slate-300">{x.b}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <BackToShowcase />
        </div>
      </aside>
    </div>
  );
}

export default function PersonalTrainerShowcasePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-6 sm:p-10">
            <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#9333ea]/20 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#9333ea]/10 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
                <span>Apex Kinetic Performance</span>
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">AI Fitness Planner Wizard</h1>
              <p className="mt-4 max-w-3xl text-slate-300">
                High-energy dark slate base with glowing Electric Purple accents and a multi-step onboarding flow that
                animates a tailored 7-day workout split.
              </p>
            </div>
          </header>

          <BackToShowcase />

          <StickySubNav />

          <Wizard />
        </div>
      </div>
    </main>
  );
}

