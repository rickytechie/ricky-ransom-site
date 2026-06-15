"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Leaf, MessageSquare, ShieldCheck, Sparkles, Trees } from "lucide-react";

const SCHEDULE = [
  {
    block: "Morning",
    window: "9:00–12:00",
    items: ["Cabin check-in + warm badge starter", "Trail Adventures · guided observation", "Hands-on nature lab (station rotation)"],
  },
  {
    block: "Late Afternoon",
    window: "1:30–4:30",
    items: ["TrailCraft badge quests", "Craft bench + photo log", "Campfire rehearsal + story circles"],
  },
  {
    block: "Evening",
    window: "5:30–7:45",
    items: ["Campfire Nights · counselor Q&A", "Signature outdoor games", "Reflection journal + soft landing routine"],
  },
];

const ACTIVITIES = [
  { title: "Lakefront Arts", body: "Sunrise sketch sessions + cabin murals. Calm pacing, premium craft materials." },
  { title: "Trail Adventures", body: "Nature walks, badge hunts, and photo logs with counselor-guided discovery." },
  { title: "Campfire Nights", body: "Stories, songs, and counselor Q&A—designed for confidence and belonging." },
  { title: "Harbor Lab", body: "Outdoor science stations with safe measurement rituals and observation journals." },
  { title: "Cabin Craft Bench", body: "Hands-on crafts with a small prototype kit and a counselor-ready checklist." },
  { title: "Night Sky Stories", body: "Quiet astronomy storytelling—soft lights, gentle engagement, and bedtime flow." },
];

type RegistrationHook = {
  label: string;
  value: string;
  hint: string;
};

const REG_HOOKS: RegistrationHook[] = [
  {
    label: "Age band",
    value: "9–11",
    hint: "Used to route to the correct counselor pairing and pace.",
  },
  {
    label: "Outdoor interest",
    value: "Nature + badges",
    hint: "Optimizes schedule blocks and activity station routing.",
  },
  {
    label: "Preferred rhythm",
    value: "Mornings + late afternoons",
    hint: "Coordinates daily cadence with parent scheduling blocks.",
  },
];

function sandLine() {
  return "sand-line rounded-full border border-[#D1D1C7]/40";
}

function SoftTimeline() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {SCHEDULE.map((s, idx) => (
        <motion.div
          key={s.block}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: idx * 0.04 }}
          className="rounded-[2rem] border border-emerald-900/15 bg-white/50 p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/60">{s.block}</div>
              <div className="mt-2 font-playfair text-2xl text-zinc-900">{s.window}</div>
            </div>
            <div className="h-11 w-11 rounded-2xl border border-emerald-900/15 bg-moss-900/10 grid place-items-center">
              <CalendarDays className="h-5 w-5 text-emerald-800" />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {s.items.map((it) => (
              <div key={it} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-700" />
                <p className="font-inter text-sm leading-6 text-zinc-900/70">{it}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ActivityGrid() {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {ACTIVITIES.map((a) => (
        <motion.div
          key={a.title}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
          className="rounded-[2rem] border border-emerald-900/15 bg-white/45 p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/60">Activity</div>
              <h3 className="mt-2 font-playfair text-2xl text-zinc-900">{a.title}</h3>
            </div>
            <div className="rounded-full border border-emerald-900/20 bg-moss-900/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-emerald-900/70">
              premium
            </div>
          </div>
          <p className="mt-4 font-inter text-sm leading-6 text-zinc-900/70">{a.body}</p>
        </motion.div>
      ))}
    </div>
  );
}

function RegistrationPanel({ onOpenAssistant }: { onOpenAssistant: () => void }) {
  return (
    <div className="mt-10 rounded-[2.5rem] border border-emerald-900/20 bg-white/45 p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/20 bg-moss-900/10 px-4 py-2">
            <Sparkles className="text-emerald-800" size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-emerald-900/70">Registration Pipeline</span>
          </div>
          <h2 className="mt-4 font-playfair text-4xl text-zinc-900 leading-[1.05]">Convert parent criteria into the right track.</h2>
          <p className="mt-4 font-inter text-sm leading-7 text-zinc-900/70">
            This portal provides a warm overview of the schedule and activity matrix. For real-time recommendations, parents
            open the AI Camp Placement Assistant.
          </p>
        </div>

        <div className="w-full max-w-md rounded-[2rem] border border-emerald-900/20 bg-moss-900/10 p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-800" />
            <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">Safety-forward UX</div>
          </div>
          <div className="mt-2 text-sm text-zinc-900/70">A gentle checklist flow that feels calm, not clinical.</div>

          <div className="mt-6 grid gap-3">
            {REG_HOOKS.map((h) => (
              <div key={h.label} className="rounded-[1.75rem] border border-emerald-900/15 bg-white/50 p-4">
                <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/60">{h.label}</div>
                <div className="mt-2 font-inter font-semibold text-zinc-900">{h.value}</div>
                <div className="mt-2 text-xs text-zinc-900/65">{h.hint}</div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenAssistant}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-cream hover:opacity-95 transition"
          >
            <MessageSquare size={16} />
            Open AI Placement Assistant
          </button>

          <Link
            href="/portfolio/web-dev-projects/summer-camp/assistant"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-900/20 bg-white/50 px-6 py-3 text-sm font-semibold text-emerald-900/80 hover:bg-white/70 transition"
          >
            Direct Route
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SummerCampPortalPage() {
  const [openAssistant, setOpenAssistant] = useState(false);

  const assistantHref = "/portfolio/web-dev-projects/summer-camp/assistant";

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-zinc-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-220px] top-[-160px] h-[520px] w-[520px] rounded-full bg-emerald-900/10 blur-3xl" />
        <div className="absolute right-[-260px] top-[240px] h-[620px] w-[620px] rounded-full bg-emerald-800/10 blur-3xl" />
        <div className="absolute left-1/2 top-[520px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-900/7 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <header className="rounded-[2.5rem] border border-emerald-900/20 bg-white/45 p-6 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/20 bg-moss-900/10 px-4 py-2">
                  <Trees className="text-emerald-800" size={16} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-emerald-900/70">Camp Everwood</span>
                </div>

                <h1 className="mt-4 font-playfair text-5xl leading-[1.02]">
                  Organic summer systems with premium calm UX.
                </h1>

                <p className="mt-4 font-inter text-sm leading-7 text-zinc-900/70">
                  A warm, high-fidelity youth summer system portal. Includes schedule timelines, activity matrices, and
                  a registration pipeline hook into an AI Camp Placement Assistant.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Schedule timeline",
                    "Activity grid",
                    "Registration routing",
                    "AI counselor assistant",
                  ].map((t) => (
                    <span key={t} className={"sand-line rounded-full border border-emerald-900/20 bg-moss-900/10 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-900/70"}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-sm">
                <div className="rounded-[2rem] border border-emerald-900/20 bg-moss-900/10 p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl border border-emerald-900/20 bg-cream/70 grid place-items-center">
                      <Leaf className="h-5 w-5 text-emerald-800" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">Portal state</div>
                      <div className="mt-1 font-playfair text-2xl text-zinc-900">Ready to register</div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[1.75rem] border border-emerald-900/15 bg-white/50 p-4">
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/60">Conversion cue</div>
                    <div className="mt-2 text-sm font-semibold text-zinc-900">Open assistant to recommend tracks.</div>
                    <div className="mt-2 text-xs text-zinc-900/65">Instant mock recommendations based on criteria inputs.</div>
                  </div>

                  <Link
                    href={assistantHref}
                    className="mt-5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-cream hover:opacity-95 transition"
                  >
                    <MessageSquare size={16} />
                    Open AI Placement Assistant
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <SoftTimeline />

          <ActivityGrid />

          <RegistrationPanel onOpenAssistant={() => setOpenAssistant(true)} />

          <AnimatePresence>
            {openAssistant ? (
              <motion.div
                className="fixed inset-0 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  type="button"
                  aria-label="Close assistant modal"
                  className="absolute inset-0 bg-black/30 backdrop-blur-[6px]"
                  onClick={() => setOpenAssistant(false)}
                />
                <motion.aside
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  className="absolute right-0 top-0 h-full w-full max-w-md border-l border-emerald-900/20 bg-white/65 backdrop-blur-[18px] p-6"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-emerald-900/15 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl border border-emerald-900/20 bg-moss-900/10 grid place-items-center">
                        <MessageSquare size={18} className="text-emerald-800" />
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">AI Camp Placement Assistant</div>
                        <div className="mt-1 font-playfair text-2xl text-zinc-900">Recommendation session</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenAssistant(false)}
                      className="min-h-[40px] rounded-full border border-emerald-900/20 bg-cream/70 px-4 text-xs font-mono uppercase tracking-[0.28em] text-emerald-900/70 hover:bg-cream transition"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-5">
                    <div className="rounded-[2rem] border border-emerald-900/20 bg-moss-900/10 p-5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-emerald-800" />
                        <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">What to expect</div>
                      </div>
                      <div className="mt-2 text-sm text-zinc-900/70">
                        Enter age, outdoor interests, and schedule blocks. The assistant returns specialized camp tracks.
                      </div>
                      <div className="mt-4 flex flex-col gap-3">
                        <Link
                          href="/portfolio/web-dev-projects/summer-camp/assistant"
                          className="flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-cream hover:opacity-95 transition"
                        >
                          Launch Assistant
                          <ArrowUpRight size={16} />
                        </Link>
                        <Link
                          href="/portfolio/web-dev-projects/summer-camp"
                          className="flex items-center justify-center gap-2 rounded-full border border-emerald-900/20 bg-cream/70 px-6 py-3 text-sm font-semibold text-emerald-900/80 hover:bg-cream transition"
                        >
                          Back to Portal
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.aside>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

