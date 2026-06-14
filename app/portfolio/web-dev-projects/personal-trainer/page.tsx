"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Clock, Dumbbell, Sparkles } from "lucide-react";

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

type Goal = "Cut" | "Bulk" | "Performance";

function macroEstimate(age: number, goal: Goal) {
  const kcal = goal === "Cut" ? 2200 - age * 2 : goal === "Bulk" ? 2700 - age * 1 : 2450 - age * 1;
  const protein = Math.round((kcal * 0.32) / 4);
  const carbs = Math.round((kcal * 0.44) / 4);
  const fats = Math.round((kcal * 0.24) / 9);
  return { kcal: Math.max(1600, kcal), protein, carbs, fats };
}

export default function PersonalTrainerShowcasePage() {
  const [age, setAge] = useState(29);
  const [goal, setGoal] = useState<Goal>("Performance");
  const [training, setTraining] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [activity, setActivity] = useState(3);

  const [thinking, setThinking] = useState(false);
  const [typed, setTyped] = useState("");
  const [error, setError] = useState<string | null>(null);

  const estimate = useMemo(() => macroEstimate(age, goal), [age, goal]);

  const preview = async () => {
    setError(null);
    setTyped("");

    if (age < 16 || age > 75) {
      setError("Enter an age between 16 and 75 for realistic macro calculations.");
      return;
    }

    setThinking(true);
    await new Promise((r) => setTimeout(r, 650));

    const routine = `7-Day Routine Preview (Sample)

Inputs detected:
- Age: ${age}
- Goal: ${goal}
- Training level: ${training}
- Weekly activity: ${activity} sessions

Macro concepts:
- Calories: ${estimate.kcal} kcal/day
- Protein: ${estimate.protein}g
- Carbs: ${estimate.carbs}g
- Fats: ${estimate.fats}g

Day 1 (Strength): lower body focus + core finisher
Day 2 (Hypertrophy): push + pull supersets
Day 3 (Conditioning): intervals + mobility
Day 4 (Strength): upper body + unilateral work
Day 5 (Hypertrophy): legs accessory + back pump
Day 6 (Recovery): zone-2 + breathing + light walk
Day 7 (Peak Session): goal-specific performance circuit

Conversion note:
- Agent includes a “start date” recommendation + lead capture summary.`;

    // Simulated typing
    const text = routine;
    let i = 0;
    const step = 14;
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
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <BackToHub />

          <header className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
              <span>Web Dev Showcase</span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Apex Kinetic Performance</h1>
            <p className="mt-4 max-w-3xl text-slate-300">
              Bold, performance-first concept featuring an AI Fitness Planner and onboarding wizard.
            </p>
          </header>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-purple-200" />
                  <p className="text-sm uppercase tracking-[0.35em] text-white/70">AI Fitness Planner</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Choose inputs, then preview a generated 7-day routine block (sample).
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-purple-400/20 bg-gradient-to-br from-[#9333ea]/10 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-200" />
                  <span className="text-sm font-semibold text-white">Macro concept</span>
                </div>
                <div className="mt-2 text-sm text-slate-200">
                  {estimate.kcal} kcal/day · P {estimate.protein}g · C {estimate.carbs}g · F {estimate.fats}g
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-purple-400/40"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as Goal)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-purple-400/40"
                >
                  <option>Cut</option>
                  <option>Bulk</option>
                  <option>Performance</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Training level</label>
                <select
                  value={training}
                  onChange={(e) => setTraining(e.target.value as typeof training)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-purple-400/40"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Weekly training sessions</label>
                <input
                  type="number"
                  min={1}
                  max={7}
                  value={activity}
                  onChange={(e) => setActivity(Number(e.target.value))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-purple-400/40"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Dumbbell className="h-4 w-4 text-purple-200" />
                Performance-first blueprint preview
              </div>
              <button
                type="button"
                onClick={preview}
                disabled={thinking}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#9333ea]/90 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {thinking ? "Previewing…" : "Preview 7-Day Routine"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {error ? (
              <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</div>
            ) : null}

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-[0.35em] text-slate-500">AI output</div>
                <div className="text-xs text-slate-500">{typed.length ? `${typed.length} chars` : "—"}</div>
              </div>
              <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">{typed}</pre>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">What to plug in next</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• Persist lead payload (name/email + plan summary) to your CRM.</li>
                  <li>• Replace macro estimate with real nutrition targets.</li>
                  <li>• Render structured routine blocks from agent JSON.</li>
                </ul>
              </div>
              <div className="rounded-[1.5rem] border border-purple-400/20 bg-gradient-to-br from-[#9333ea]/10 to-transparent p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">UI contract</p>
                <p className="mt-2 leading-6">
                  The wizard should output: macro targets, daily focus notes, and a conversion-friendly next-step summary.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

