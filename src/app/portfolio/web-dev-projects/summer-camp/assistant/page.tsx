"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Bot, CheckCircle2, Compass, Leaf, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

type AgeBand = "6-8" | "9-11" | "12-14";

type Criteria = {
  age: number;
  interests: string[];
  scheduleBlocks: string[];
  outdoors: "Yes" | "Sometimes" | "No";
  comfortNeeds: string[];
};

type CampTrack = {
  id: string;
  name: string;
  ageBands: AgeBand[];
  outdoorsWeight: number; // 0..1
  interests: string[];
  scheduleFit: string[];
  counselorStyle: string[];
  deliverables: string[];
};

const TRACKS: CampTrack[] = [
  {
    id: "trailcraft",
    name: "TrailCraft Explorers",
    ageBands: ["6-8", "9-11"],
    outdoorsWeight: 0.95,
    interests: ["nature", "photography", "badge hunts", "wildlife"],
    scheduleFit: ["mornings", "late afternoons"],
    counselorStyle: ["story-led", "badge-driven", "gentle pacing"],
    deliverables: ["photo log", "nature badge set", "guided observation script"],
  },
  {
    id: "campfire",
    name: "Campfire Creators",
    ageBands: ["9-11", "12-14"],
    outdoorsWeight: 0.7,
    interests: ["music", "crafts", "campfire stories", "writing"],
    scheduleFit: ["late afternoons", "evenings"],
    counselorStyle: ["performance warm-up", "craft bench coaching", "small-circle reflections"],
    deliverables: ["story arc worksheet", "craft prototype kit", "cabin presentation script"],
  },
  {
    id: "harbor-learn",
    name: "Harbor Lab (Outdoor Science)",
    ageBands: ["12-14"],
    outdoorsWeight: 0.85,
    interests: ["science", "engineering", "observations", "measurement"],
    scheduleFit: ["mornings"],
    counselorStyle: ["hands-on", "safe measurement rituals", "curiosity challenges"],
    deliverables: ["field measurement breakdown", "experiment checklist", "observation journal page"],
  },
];

function scoreTrack(track: CampTrack, c: Criteria) {
  const ageOk = track.ageBands.includes(c.age <= 8 ? "6-8" : c.age <= 11 ? "9-11" : "12-14") ? 1 : 0;
  const outdoorsTarget = c.outdoors === "Yes" ? 1 : c.outdoors === "Sometimes" ? 0.65 : 0.2;
  const outdoorsScore = 1 - Math.abs(track.outdoorsWeight - outdoorsTarget);

  const interestHits = c.interests.filter((i) => track.interests.includes(i)).length;
  const interestScore = Math.min(1, interestHits / 3);

  const scheduleHits = c.scheduleBlocks.filter((s) => track.scheduleFit.includes(s)).length;
  const scheduleScore = Math.min(1, scheduleHits / 2);

  const comfortPenalty = c.comfortNeeds.length > 0 ? 0.03 * c.comfortNeeds.length : 0;

  return Math.max(0, ageOk * 0.34 + outdoorsScore * 0.28 + interestScore * 0.24 + scheduleScore * 0.14 - comfortPenalty);
}

function computeRecommendations(c: Criteria) {
  const ranked = TRACKS.map((t) => ({ track: t, score: scoreTrack(t, c) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return ranked;
}

function TerminalLikeTranscript({
  transcript,
}: {
  transcript: { id: string; role: "parent" | "assistant"; content: string }[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [transcript]);

  return (
    <div ref={ref} className="h-[420px] overflow-auto rounded-[2rem] border border-amber-900/20 bg-moss-900/25 p-4">
      <div className="space-y-3">
        {transcript.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={
              "rounded-[1.5rem] border p-4 " +
              (m.role === "parent" ? "border-emerald-800/20 bg-cream/60" : "border-amber-900/20 bg-zinc-950/30")
            }
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  {m.role === "parent" ? <MessageSquare size={16} className="text-emerald-700" /> : <Bot size={16} className="text-amber-400" />}
                </span>
                <div className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-800/70">
                  {m.role === "parent" ? "Parent Input" : "AI Camp Assistant"}
                </div>
              </div>
              <div className="text-xs font-mono text-zinc-700/60">—</div>
            </div>
            <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-5 text-zinc-900/80">
              {m.content}
            </pre>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function CampPlacementAssistantPage() {
  const [criteria, setCriteria] = useState<Criteria>({
    age: 10,
    interests: ["nature", "badge hunts"],
    scheduleBlocks: ["mornings", "late afternoons"],
    outdoors: "Sometimes",
    comfortNeeds: [],
  });

  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [transcript, setTranscript] = useState<
    { id: string; role: "assistant" | "parent"; content: string }[]
  >(() => [
    {
      id: "seed",
      role: "assistant",
      content:
        "AI Camp Placement Assistant online. Provide age, outdoor preferences, interests, and schedule blocks. I will recommend specialized registration tracks in real-time (mock logic).",
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ranked = useMemo(() => computeRecommendations(criteria), [criteria]);

  const assistantReply = (userText: string) => {
    const lines: string[] = [];
    lines.push("Placement recommendation (mock):");
    lines.push("");
    ranked.forEach((r, idx) => {
      lines.push(`${idx + 1}) ${r.track.name} · score ${(r.score * 100).toFixed(0)}%`);
      lines.push(`   Age bands: ${r.track.ageBands.join(", ")}`);
      lines.push(`   Counselor style: ${r.track.counselorStyle.join(" · ")}`);
      lines.push(`   Schedule fit: ${r.track.scheduleFit.join(" + ")}`);
      lines.push(`   Deliverables: ${r.track.deliverables.join(" · ")}`);
      lines.push("");
    });

    lines.push("Assistant notes:");
    lines.push(`- Outdoor alignment: ${criteria.outdoors}`);
    lines.push(`- Interests selected: ${criteria.interests.join(", ")}`);
    lines.push(`- Schedule blocks: ${criteria.scheduleBlocks.join(", ")}`);

    lines.push("");
    lines.push("Next step:");
    lines.push("- I generate a parent-ready checklist + counselor route summary (mock)." );

    if (userText.trim()) {
      lines.push("");
      lines.push("Parent message captured:");
      lines.push(userText.trim());
    }

    return lines.join("\n");
  };

  const send = async () => {
    const t = input.trim();
    if (!t) return;

    setThinking(true);
    setTranscript((prev) => [
      ...prev,
      { id: `p-${Date.now()}`, role: "parent", content: t },
    ]);

    await new Promise((r) => setTimeout(r, 650));

    const reply = assistantReply(t);
    setTranscript((prev) => [
      ...prev,
      { id: `a-${Date.now()}`, role: "assistant", content: reply },
    ]);

    setThinking(false);
    setInput("");
  };

  const toggleInterest = (k: string) => {
    setCriteria((prev) => {
      const has = prev.interests.includes(k);
      const next = has ? prev.interests.filter((x) => x !== k) : [...prev.interests, k];
      return { ...prev, interests: next.slice(0, 5) };
    });
  };

  const toggleBlock = (k: string) => {
    setCriteria((prev) => {
      const has = prev.scheduleBlocks.includes(k);
      const next = has ? prev.scheduleBlocks.filter((x) => x !== k) : [...prev.scheduleBlocks, k];
      return { ...prev, scheduleBlocks: next.slice(0, 3) };
    });
  };

  return (
    <main className="min-h-screen bg-cream text-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/20 bg-moss-900/10 px-4 py-2">
                <Bot size={16} className="text-emerald-800" />
                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-emerald-900/70">
                  Camp Assistant
                </span>
              </div>
              <h1 className="mt-4 font-playfair text-5xl leading-[1.02]">
                AI Camp Placement Assistant
              </h1>
              <p className="mt-4 max-w-2xl font-inter text-sm leading-7 text-zinc-900/70">
                Parents input criteria (age, outdoor interests, scheduling blocks). The assistant recommends specialized
                registration tracks in real-time using mock scoring.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/portfolio/web-dev-projects/summer-camp"
                className="sand-line inline-flex items-center justify-center rounded-full border border-emerald-900/20 bg-moss-900/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.28em] text-emerald-900/70 hover:text-emerald-950 transition"
              >
                ← Back to Camp Portal
              </Link>
              <div className="rounded-[2rem] border border-emerald-900/20 bg-moss-900/10 p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-800" />
                  <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">
                    Safe mock mode
                  </div>
                </div>
                <div className="mt-2 text-sm text-zinc-900/70">
                  No data leaves the browser.
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="rounded-[2rem] border border-emerald-900/20 bg-white/40 p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl border border-emerald-900/20 bg-moss-900/10 grid place-items-center">
                    <Compass size={18} className="text-emerald-800" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">
                      Parent criteria
                    </div>
                    <div className="font-playfair text-2xl">Build a recommendation profile</div>
                  </div>
                </div>

                <div className="mt-6 grid gap-5">
                  <label className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">
                      Age
                    </div>
                    <input
                      type="number"
                      value={criteria.age}
                      min={5}
                      max={14}
                      onChange={(e) => setCriteria((p) => ({ ...p, age: Number(e.target.value) }))}
                      className="w-full rounded-2xl border border-emerald-900/20 bg-cream px-4 py-3 text-sm outline-none focus:border-emerald-800"
                    />
                  </label>

                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">
                      Outdoor preference
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(["Yes", "Sometimes", "No"] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setCriteria((p) => ({ ...p, outdoors: v }))}
                          className={
                            "min-h-[40px] rounded-full border px-4 text-xs font-mono uppercase tracking-[0.28em] transition " +
                            (criteria.outdoors === v
                              ? "border-emerald-800/40 bg-moss-900/15 text-emerald-900"
                              : "border-emerald-900/20 bg-cream/60 text-emerald-900/70 hover:bg-cream")
                          }
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">
                      Outdoor interests
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["nature", "photography", "badge hunts", "wildlife", "science", "crafts", "music", "engineering"].map((k) => {
                        const active = criteria.interests.includes(k);
                        return (
                          <button
                            key={k}
                            type="button"
                            onClick={() => toggleInterest(k)}
                            className={
                              "min-h-[40px] rounded-full border px-4 text-xs font-mono uppercase tracking-[0.28em] transition " +
                              (active
                                ? "border-emerald-800/40 bg-moss-900/15 text-emerald-900"
                                : "border-emerald-900/20 bg-cream/60 text-emerald-900/70 hover:bg-cream")
                            }
                          >
                            {k}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">
                      Scheduling blocks
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(["mornings", "late afternoons", "evenings"] as const).map((k) => {
                        const active = criteria.scheduleBlocks.includes(k);
                        return (
                          <button
                            key={k}
                            type="button"
                            onClick={() => toggleBlock(k)}
                            className={
                              "min-h-[40px] rounded-full border px-4 text-xs font-mono uppercase tracking-[0.28em] transition " +
                              (active
                                ? "border-emerald-800/40 bg-moss-900/15 text-emerald-900"
                                : "border-emerald-900/20 bg-cream/60 text-emerald-900/70 hover:bg-cream")
                            }
                          >
                            {k}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-emerald-900/20 bg-white/50 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-emerald-800" />
                      <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">
                        Live shortlist
                      </div>
                    </div>
                    <div className="text-xs font-mono text-zinc-900/55">mock</div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {ranked.map((r) => (
                      <div key={r.track.id} className="rounded-[1.5rem] border border-emerald-900/15 bg-cream/70 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold text-zinc-900">{r.track.name}</div>
                            <div className="mt-1 text-xs text-zinc-900/65">Score {(r.score * 100).toFixed(0)}%</div>
                          </div>
                          <div className="rounded-full border border-emerald-900/20 bg-moss-900/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-emerald-900/70">
                            track
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {r.track.interests.slice(0, 3).map((t) => (
                            <span key={t} className="sand-line rounded-full border border-emerald-900/20 bg-cream/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-900/70">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <TerminalLikeTranscript transcript={transcript} />

              <div className="mt-5 rounded-[2rem] border border-emerald-900/20 bg-white/40 p-5">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Leaf size={16} className="text-emerald-800" />
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-900/65">
                      Ask the assistant
                    </div>
                  </div>
                  <div className="text-xs text-zinc-900/60">
                    {mounted ? "Ready" : "Mounting…"}
                  </div>
                </div>

                <div className="mt-3">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-[1.75rem] border border-emerald-900/20 bg-cream px-4 py-3 text-sm outline-none focus:border-emerald-800"
                    placeholder="e.g. Age 10, loves badges + nature walks; can do mornings and late afternoons."
                  />
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={send}
                    disabled={thinking || !input.trim()}
                    className="min-h-[44px] rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-cream hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 transition"
                  >
                    {thinking ? "Recommending…" : "Recommend Tracks"}
                  </button>

                  <div className="flex items-center gap-2 text-sm text-zinc-900/65">
                    <CheckCircle2 size={16} className="text-emerald-700" />
                    {"Instant mock recommendations"}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Our schedule is mornings only and she loves nature badges.",
                  "He prefers quieter indoor science games too—any track with low sensory overwhelm?",
                  "We can do late afternoons + evenings. Interested in crafts and campfire stories.",
                ].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setInput(p)}
                    className="min-h-[40px] rounded-full border border-emerald-900/20 bg-cream/60 px-4 text-xs font-mono uppercase tracking-[0.28em] text-emerald-900/70 hover:bg-cream transition"
                  >
                    {p.slice(0, 26)}…
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

