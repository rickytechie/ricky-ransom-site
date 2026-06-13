"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Shield,
  Clock,
  HeartHandshake,
  ArrowRight,
  Building2,
  Dumbbell,
  Wrench,
  Sun,
} from "lucide-react";

type NavItem = {
  key: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
};

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function TypingBlock({
  prompt,
  buttonLabel,
  placeholder,
  accent,
  onSubmit,
}: {
  prompt: string;
  buttonLabel: string;
  placeholder: string;
  accent: string;
  onSubmit: (input: string) => Promise<string>;
}) {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [typed, setTyped] = useState("");
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setError(null);
    setTyped("");
    if (!input.trim()) {
      setError("Enter a few details so the agent can personalize the result.");
      return;
    }
    setThinking(true);
    try {
      const result = await onSubmit(input);
      // Simulate a premium "agent typing" effect.
      const text = result;
      let i = 0;
      const step = 12;
      const t = window.setInterval(() => {
        i = Math.min(text.length, i + step);
        setTyped(text.slice(0, i));
        if (i >= text.length) window.clearInterval(t);
      }, 22);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error.");
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">AI Agent Concierge</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{prompt}</h3>
        </div>
        <div className={classNames("rounded-full border px-3 py-2 text-xs uppercase tracking-[0.25em]", accent)}>
          Simulated Agent
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-300">
        {"Chat-style input to generate a customized output sheet with premium reasoning + constraints."}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Lifestyle preferences</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder={placeholder}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-white/20"
          />
        </div>

        <button
          type="button"
          onClick={run}
          disabled={thinking}
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60 md:mt-8 md:w-auto"
        >
          {thinking ? "Thinking…" : buttonLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Curated result</p>
            <p className="mt-2 text-sm text-slate-200">
              {thinking ? "Drafting your concierge portfolio…" : "Ready when you are."}
            </p>
          </div>
          <div className="text-xs text-slate-500">{typed.length ? `${typed.length} chars` : "—"}</div>
        </div>

        {error ? (
          <div className="mt-3 rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">{typed || ""}</pre>
      </div>
    </div>
  );
}

function PremiumTestimonial({
  quote,
  name,
  location,
  tone,
}: {
  quote: string;
  name: string;
  location: string;
  tone: "cream" | "neon" | "blue" | "earth";
}) {
  const toneStyles: Record<typeof tone, string> = {
    cream: "border-amber-200/20 bg-amber-400/5 text-amber-50",
    neon: "border-fuchsia-300/20 bg-fuchsia-400/5 text-fuchsia-50",
    blue: "border-sky-300/20 bg-sky-400/5 text-sky-50",
    earth: "border-amber-300/20 bg-amber-500/5 text-amber-50",
  };

  return (
    <div className={classNames("rounded-3xl border p-6", toneStyles[tone])}>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5" />
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Verified Client</p>
          <p className="mt-1 text-sm font-semibold">{name}</p>
          <p className="text-xs text-slate-300">{location}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7">“{quote}”</p>
    </div>
  );
}

function ProjectShell({
  eyebrow,
  title,
  description,
  gradient,
  children,
  testimonial,
}: {
  eyebrow: string;
  title: string;
  description: string;
  gradient: string;
  children: React.ReactNode;
  testimonial: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.02]">
      <div className={classNames("absolute -inset-40", gradient)} />
      <div className="relative p-6 md:p-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-300">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">{children}</div>
          <div className="space-y-6">{testimonial}</div>
        </div>
      </div>
    </div>
  );
}

export default function WebDevProjectsPage() {
  const nav = useMemo<NavItem[]>(
    () => [
      {
        key: "estate",
        title: "Luxury Real Estate",
        subtitle: "Autonomous Property Matcher Agent",
        icon: <Building2 className="h-4 w-4" />,
        href: "#estate",
      },
      {
        key: "fitness",
        title: "Elite Trainer",
        subtitle: "Fitness Planner & Onboarding Agent",
        icon: <Dumbbell className="h-4 w-4" />,
        href: "#fitness",
      },
      {
        key: "plumbing",
        title: "Plumbing Dispatch",
        subtitle: "Instant Diagnostics & Smart Dispatch Agent",
        icon: <Wrench className="h-4 w-4" />,
        href: "#plumbing",
      },
      {
        key: "camp",
        title: "Lake Harbor Summer Camp",
        subtitle: "Parent Concierge & Counselor Agent",
        icon: <Sun className="h-4 w-4" />,
        href: "#camp",
      },
    ],
    []
  );

  const fakeAgent = async (result: string) => {
    // Small delay to make the UI feel alive.
    await new Promise((r) => setTimeout(r, 650));
    return result;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Web Dev Projects</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Premium small-business landing pages — designed to look real
            </h1>
            <p className="mt-4 max-w-3xl text-slate-300">
              This page scaffolds a high-end portfolio showcase. Each section simulates an AI agent interaction:
              concierge chat, onboarding wizard, instant diagnostics, and parent concierge—built with modular React components.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
              >
                <span className="text-cyan-300">{item.icon}</span>
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-8">
          <section id="estate">
            <ProjectShell
              eyebrow="BOUTIQUE LUXURY REAL ESTATE FIRM"
              title="Coastal exclusivity, curated by an autonomous concierge"
              description="Ultra-minimal, high-contrast luxury design inspired by estate-grade coastal living. Users chat with an agent that parses lifestyle preferences and outputs a curated luxury property portfolio sheet."
              gradient="bg-gradient-to-r from-amber-200/10 via-slate-950/0 to-cyan-200/10"
              testimonial={
                <PremiumTestimonial
                  tone="cream"
                  quote="We told the agent the vibe we wanted, and within minutes it delivered a portfolio that felt handpicked—down to the neighborhood lifestyle details."
                  name="Evelyn R."
                  location="East Hampton, NY"
                />
              }
            >
              <TypingBlock
                prompt="Autonomous Property Matcher Agent"
                buttonLabel="Generate Concierge Portfolio"
                placeholder="e.g. beachfront privacy, chef-grade kitchen, near art galleries, weekend tennis, low-traffic roads"
                accent="border-amber-200/30 text-amber-100"
                onSubmit={(input) =>
                  fakeAgent(
                    `Property Matches (Sample)

Preferences detected:
- ${input}

Portfolio highlights:
1) The Quiet Coast Villa — 4 bed · chef kitchen · sunset-facing terraces
2) Dune-Lane Modern Residence — open-plan luxury · gallery-wall lounge · walkable vibe
3) Harborline Estate — privacy-first · resort-style pool · late-summer events

Neighborhood deep-dives:
- Access patterns, micro-climates, and lifestyle rhythm

Next step:
- Agent draft includes viewing plan + concierge call script.`
                  )
                }
              />

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-amber-200" />
                  <p className="text-sm font-semibold text-white">AI integration concept</p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li>• Replace the simulated chat with a real API route that calls your concierge agent.</li>
                  <li>• Send user preferences as structured JSON (e.g., lifestyle tags + constraints).</li>
                  <li>• Render the result as a “portfolio sheet” with cards, neighborhood notes, and a viewing checklist.</li>
                </ul>
              </div>
            </ProjectShell>
          </section>

          <section id="fitness">
            <ProjectShell
              eyebrow="ELITE PERSONAL TRAINER LANDING PAGE"
              title="Transformation begins with an AI-calculated training blueprint"
              description="Bold typography, asymmetric energy, and performance-first coaching. The agent onboarding wizard calculates macro concepts and previews a custom 7-day routine block to capture high-intent leads."
              gradient="bg-gradient-to-r from-fuchsia-200/10 via-slate-950/0 to-cyan-200/10"
              testimonial={
                <PremiumTestimonial
                  tone="neon"
                  quote="The onboarding wizard nailed my macros and pacing. The weekly plan looked like it was built from my exact life—my results peaked fast."
                  name="Marcus T."
                  location="St. James, NY"
                />
              }
            >
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">AI Agent Feature</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">AI Fitness Planner & Onboarding Agent</h3>
                    <p className="mt-3 text-sm text-slate-300">
                      Step through inputs. When you click “Preview 7-Day Routine,” the agent types a custom schedule and metric targets.
                    </p>
                  </div>
                  <div className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/5 px-3 py-2 text-xs uppercase tracking-[0.25em] text-fuchsia-100">
                    Lead Capture
                  </div>
                </div>

                <FitnessWizard onAgentResult={fakeAgent} />
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-fuchsia-200" />
                  <p className="text-sm font-semibold text-white">AI integration concept</p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li>• Frontend collects age, training history, and goal (cut/bulk/compete).</li>
                  <li>• Agent outputs macro targets + 7-day block structure with progressive intensity notes.</li>
                  <li>• Persist the lead payload (name/email + plan summary) to your CRM.</li>
                </ul>
              </div>
            </ProjectShell>
          </section>

          <section id="plumbing">
            <ProjectShell
              eyebrow="PREMIUM COMMERICAL & RESIDENTIAL PLUMBING COMPANY"
              title="Instant diagnostics + smart dispatch in one click"
              description="Crisp, trust-forward UI with emergency-first actions and confident clarity. The agent diagnoses the likely plumbing failure, estimates a cost range, and opens an immediate priority booking window."
              gradient="bg-gradient-to-r from-sky-200/10 via-slate-950/0 to-blue-200/10"
              testimonial={
                <PremiumTestimonial
                  tone="blue"
                  quote="We described the issue and got a realistic range plus next-available priority dispatch. They arrived fast and explained everything clearly."
                  name="Nadine S."
                  location="Queens, NY"
                />
              }
            >
              <TypingBlock
                prompt="Instant Diagnostics & Smart Dispatch Agent"
                buttonLabel="Diagnose & Schedule"
                placeholder="e.g. water backing up in sink, gurgling pipes, intermittent low pressure, landlord says it's 'probably a clog'"
                accent="border-sky-200/30 text-sky-100"
                onSubmit={(input) =>
                  fakeAgent(
                    `Diagnosis (Sample)

Issue description:
- ${input}

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
- Agent produces dispatch checklist for the technician.`
                  )
                }
              />

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <HeartHandshake className="h-5 w-5 text-sky-200" />
                  <p className="text-sm font-semibold text-white">AI integration concept</p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li>• Add a “priority emergency” submission mode with structured diagnosis outputs.</li>
                  <li>• Render cost range + failure mode cards with confidence notes.</li>
                  <li>• Connect agent output to a booking widget (time slots + dispatch payload).</li>
                </ul>
              </div>
            </ProjectShell>
          </section>

          <section id="camp">
            <ProjectShell
              eyebrow="LOCAL SUMMER CAMP: LAKE HARBOR SUMMER CAMP"
              title="A friendly parent concierge for every cabin question"
              description="Warm, vibrant, family-friendly design with organic shapes and modern nostalgia. Parents ask complex questions about safety protocols, schedules, packing lists, or cabin arrangements—and get instant personalized answers."
              gradient="bg-gradient-to-r from-amber-200/10 via-slate-950/0 to-emerald-200/10"
              testimonial={
                <PremiumTestimonial
                  tone="earth"
                  quote="We had a hundred questions. The concierge answered instantly and made us feel confident about safety, schedules, and what to pack."
                  name="Jordan K."
                  location="Suffolk County, NY"
                />
              }
            >
              <TypingBlock
                prompt="Parent Concierge & Camp Counselor Agent"
                buttonLabel="Get Instant Answers"
                placeholder="e.g. How do you handle allergies? What’s the weekly schedule? What should we pack for cabin life?"
                accent="border-amber-200/30 text-amber-100"
                onSubmit={(input) =>
                  fakeAgent(
                    `Camp Concierge (Sample)

Parent question:
- ${input}

Instant personalized answer:
• Safety protocols: explained in simple terms with cabin-level walkthroughs
• Weekly cadence: morning activities · lunch · afternoon specialty sessions · evening traditions
• Packing guidance: “must-haves” + weather-ready recommendations

Suggested next step:
- Agent generates a printable checklist + a short counselor script for drop-off day.`
                  )
                }
              />

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-amber-200" />
                  <p className="text-sm font-semibold text-white">AI integration concept</p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li>• Provide an FAQ + policy knowledge base to the agent.</li>
                  <li>• Keep answers grounded and cite policies (optional) to increase trust.</li>
                  <li>• Offer downloadable outputs: packing list, schedule overview, and cabin guidance.</li>
                </ul>
              </div>
            </ProjectShell>
          </section>
        </div>

        <footer className="mt-12 text-center text-sm text-slate-500">
          Built as a modular scaffold: swap the simulated agent with real API calls per project.
        </footer>
      </div>
    </main>
  );
}

function FitnessWizard({ onAgentResult }: { onAgentResult: (result: string) => Promise<string> }) {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState(29);
  const [goal, setGoal] = useState<"Cut" | "Bulk" | "Performance">("Performance");
  const [training, setTraining] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [activity, setActivity] = useState(3);

  const [thinking, setThinking] = useState(false);
  const [typed, setTyped] = useState("");
  const [error, setError] = useState<string | null>(null);

  const macroEstimate = useMemo(() => {
    // Simple deterministic mock logic.
    const kcal = goal === "Cut" ? 2200 - age * 2 : goal === "Bulk" ? 2700 - age * 1 : 2450 - age * 1;
    const protein = Math.round((kcal * 0.32) / 4);
    const carbs = Math.round((kcal * 0.44) / 4);
    const fats = Math.round((kcal * 0.24) / 9);
    return { kcal: Math.max(1600, kcal), protein, carbs, fats };
  }, [age, goal]);

  const runPreview = async () => {
    setError(null);
    setTyped("");

    if (age < 16 || age > 75) {
      setError("Enter an age between 16 and 75 for realistic macro calculations.");
      return;
    }

    setThinking(true);
    try {
      const routine = `7-Day Routine Preview (Sample)

Inputs detected:
- Age: ${age}
- Goal: ${goal}
- Training level: ${training}
- Weekly activity: ${activity} sessions

Macro concepts:
- Calories: ${macroEstimate.kcal} kcal
- Protein: ${macroEstimate.protein}g
- Carbs: ${macroEstimate.carbs}g
- Fats: ${macroEstimate.fats}g

Day 1 (Strength): lower body focus + core finisher
Day 2 (Hypertrophy): push + pull supersets
Day 3 (Conditioning): intervals + mobility
Day 4 (Strength): upper body + unilateral work
Day 5 (Hypertrophy): legs accessory + back pump
Day 6 (Recovery): zone-2 + breathing + light walk
Day 7 (Peak Session): goal-specific performance circuit

Conversion note:
- Agent includes a “start date” recommendation + lead capture summary.`;

      const result = await onAgentResult(routine);

      let i = 0;
      const text = result;
      const stepSize = 14;
      const t = window.setInterval(() => {
        i = Math.min(text.length, i + stepSize);
        setTyped(text.slice(0, i));
        if (i >= text.length) window.clearInterval(t);
      }, 20);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error.");
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="mt-6 space-y-5">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/30 p-3">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(s)}
            className={classNames(
              "rounded-xl px-3 py-2 text-xs uppercase tracking-[0.25em] transition",
              step === s
                ? "border border-white/20 bg-white/10 text-white"
                : "border border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/5"
            )}
          >
            Step {s}
          </button>
        ))}
      </div>

      {step === 1 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-white/20"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as typeof goal)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-white/20"
            >
              <option>Cut</option>
              <option>Bulk</option>
              <option>Performance</option>
            </select>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Training level</label>
            <select
              value={training}
              onChange={(e) => setTraining(e.target.value as typeof training)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-white/20"
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
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-white/20"
            />
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Macro concept estimate</p>
              <p className="mt-2 text-lg font-semibold text-white">{macroEstimate.kcal} kcal/day</p>
            </div>
            <div className="text-right text-xs text-slate-400">
              Protein {macroEstimate.protein}g · Carbs {macroEstimate.carbs}g · Fats {macroEstimate.fats}g
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Scheduling</p>
              <p className="mt-2 text-sm text-slate-200">Progressive intensity + recovery blocks</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Lead Capture</p>
              <p className="mt-2 text-sm text-slate-200">Plan summary + next session CTA</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">AI Coach Notes</p>
              <p className="mt-2 text-sm text-slate-200">Macro reasoning + quick win targets</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(3, s + 1))}
            disabled={step === 3}
            className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Next
          </button>
        </div>

        <button
          type="button"
          onClick={runPreview}
          disabled={thinking}
          className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {thinking ? "Previewing…" : "Preview 7-Day Routine"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Agent output</p>
          <p className="text-xs text-slate-500">{typed.length ? `${typed.length} chars` : "—"}</p>
        </div>

        {error ? (
          <div className="mt-3 rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">{typed}</pre>
      </div>
    </div>
  );
}

