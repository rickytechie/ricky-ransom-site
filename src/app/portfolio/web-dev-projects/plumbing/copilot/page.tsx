"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, CheckCircle2, Clipboard, Gauge, Lock, RefreshCw, Ruler, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import Link from "next/link";

type TranscriptRole = "user" | "assistant";

type TranscriptMsg = {
  id: string;
  role: TranscriptRole;
  content: string;
  ts: number;
};

type Diagnostic = {
  summary: string;
  measurements: {
    label: string;
    value: number;
    unit: string;
    range: [number, number];
  }[];
  safetyChecklist: string[];
  calculations: {
    title: string;
    lines: string[];
  }[];
  nextActions: string[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function buildMockDiagnostic(input: string): Diagnostic {
  const lower = input.toLowerCase();
  const wantsBTU = /btu|heating|heat/.test(lower);
  const wantsFlow = /flow|gpm|water|pressure/.test(lower);
  const wantsDrain = /drain|waste|siphon|trap/.test(lower);

  const baseFlow = wantsFlow ? 10.5 : 7.8;
  const flow = clamp(baseFlow + (lower.includes("high") ? 2.6 : 0) + (lower.includes("low") ? -1.6 : 0), 2.5, 22.0);

  const deltaT = wantsBTU ? 18 : 12;
  const btuH = 500 * flow * deltaT; // mock-ish

  const pressurePsi = clamp(42 + (lower.includes("leak") ? -10 : 0) + (lower.includes("restrict") ? 8 : 0), 18, 85);

  const tempF = clamp(145 + (lower.includes("cold") ? -25 : 0) + (lower.includes("hot") ? 14 : 0), 45, 190);

  const risk = lower.includes("gas") || lower.includes("carbon") || /co\b/.test(lower);

  return {
    summary:
      "Parsed trade terms into a technician-ready diagnostic packet (mock calculations; no external calls).",
    measurements: [
      {
        label: "Estimated system flow",
        value: Number(flow.toFixed(1)),
        unit: "GPM",
        range: [4, 18],
      },
      {
        label: "Temperature differential (ΔT)",
        value: deltaT,
        unit: "°F",
        range: [8, 26],
      },
      {
        label: "Indicative discharge pressure",
        value: Number(pressurePsi.toFixed(0)),
        unit: "psi",
        range: [25, 75],
      },
      {
        label: "Reported coil/tank surface temp",
        value: Number(tempF.toFixed(0)),
        unit: "°F",
        range: [70, 180],
      },
    ],
    safetyChecklist: [
      "Verify power-isolation and service lockout/tagout per site SOP.",
      "Confirm venting/draft if combustion-adjacent components are involved.",
      "Pressure-test only after isolation valves are confirmed closed.",
      "Do not run diagnostic cycles with covers removed unless authorized.",
      ...(risk
        ? [
            "High-priority: monitor for CO/combustion products; evacuate if readings exceed thresholds.",
          ]
        : ["Proceed with cautious vent verification (visual + airflow check)."]),
    ],
    calculations: [
      {
        title: "Thermal capacity (mock)",
        lines: [
          `Q ≈ 500 × flow × ΔT`,
          `Q ≈ 500 × ${flow.toFixed(1)} × ${deltaT} ≈ ${Math.round(btuH).toLocaleString()} BTU/hr`,
          wantsDrain ? "Drain scope detected → flag for parallel inspection." : "No drain scope detected → focus on supply loop." ,
        ],
      },
      {
        title: "Pressure envelope (mock)",
        lines: [
          `P_target range: ${18}-${90} psi`,
          `P_est ≈ ${pressurePsi} psi → ${pressurePsi < 30 ? "LOW" : pressurePsi > 70 ? "HIGH" : "within band"}`,
          "Recommend staged valve actuation and sensor re-read after stabilization window.",
        ],
      },
      {
        title: "Measurement breakdown (mock)",
        lines: [
          `Temp_est: ${tempF} °F`,
          `Flow_est: ${flow.toFixed(1)} GPM`,
          `ΔT_est: ${deltaT} °F`,
        ],
      },
    ],
    nextActions: [
      "Generate a field checklist packet and carry it to the job site.",
      "Confirm measurements against nameplate specs and site baseline readings.",
      "If symptoms persist, escalate to a component-level inspection workflow.",
    ],
  };
}

function TerminalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-zinc-950/60 p-4 sm:p-6">
      <div aria-hidden className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute -left-24 top-[-60px] h-[220px] w-[220px] rounded-full bg-[#22d3ee]/20 blur-3xl" />
        <div className="absolute right-[-90px] bottom-[-100px] h-[280px] w-[280px] rounded-full bg-[#9333ea]/15 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function formatTranscript(msg: TranscriptMsg) {
  const time = new Date(msg.ts);
  return `${msg.role.toUpperCase()} · ${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}\n\n${msg.content}`;
}

export default function PlumbingCopilotPage() {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState(
    "Describe symptoms: intermittent low pressure, possible restrictor, and heating demand."
  );
  const [thinking, setThinking] = useState(false);
  const [activePanel, setActivePanel] = useState<"terminal" | "diagnostics">("terminal");

  const [transcript, setTranscript] = useState<TranscriptMsg[]>(() => {
    const seed: TranscriptMsg[] = [
      {
        id: "seed-1",
        role: "assistant",
        content:
          "Field Assistant online. Paste a trade input (symptoms, measurements, constraints) and I’ll return a technician-ready diagnostic packet (mock).",
        ts: Date.now(),
      },
    ];
    return seed;
  });

  const transcriptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [transcript, thinking]);

  const diagnostic = useMemo(() => buildMockDiagnostic(input), [input]);

  const appendMsg = (role: TranscriptRole, content: string) => {
    setTranscript((prev) => [
      ...prev,
      {
        id: `${role}-${Math.random().toString(16).slice(2)}`,
        role,
        content,
        ts: Date.now(),
      },
    ]);
  };

  const run = async () => {
    setThinking(true);
    appendMsg("user", input.trim() || "(empty trade input)");

    await new Promise((r) => setTimeout(r, 700));

    const packet = buildMockDiagnostic(input);
    appendMsg(
      "assistant",
      [
        `Diagnostic Summary:\n${packet.summary}`,
        "",
        "Measurements:\n" + packet.measurements.map((m) => `- ${m.label}: ${m.value}${m.unit} (range ${m.range[0]}–${m.range[1]}${m.unit})`).join("\n"),
        "",
        "Safety Checklist:\n" + packet.safetyChecklist.map((s) => `- ${s}`).join("\n"),
        "",
        "Calculations:\n" + packet.calculations.map((c) => `• ${c.title}\n  - ${c.lines.join("\n  - ")}`).join("\n"),
        "",
        "Next Actions:\n" + packet.nextActions.map((a) => `- ${a}`).join("\n"),
      ].join("\n")
    );

    setActivePanel("diagnostics");
    setThinking(false);
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                <Bot size={16} className="text-[#67e8f9]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/90">
                  Field Computing Terminal
                </span>
              </div>
              <h1 className="mt-4 font-playfair text-5xl tracking-tight leading-[1.02]">Integrated AI Field Assistant</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Paste complex trade inputs and get instant mock calculations, measurement breakdowns, and
                diagnostic safety checklist scripts—engineered to feel like a real technician console.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/portfolio/web-dev-projects/plumbing"
                className="sand-line rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-[0.28em] text-white/75 hover:text-white"
              >
                ← Back to Plumbing Platform
              </Link>
              <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-4">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-[#67e8f9]" />
                  <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Privacy</div>
                </div>
                <div className="mt-2 text-sm text-slate-200">All computations are mocked in-browser.</div>
              </div>
            </div>
          </div>

          <TerminalFrame>
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Trade input</div>
                      <div className="mt-2 font-semibold text-white">Describe symptoms + constraints</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setInput("Intermittent low pressure, possible restrictor, heating demand. Include any observed leak hints.");
                        setActivePanel("terminal");
                      }}
                      className="min-h-[40px] rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-mono text-white/70 hover:bg-white/[0.06]"
                    >
                      Reset
                    </button>
                  </div>

                  <label className="mt-4 block">
                    <div className="mb-2 text-xs font-mono uppercase tracking-[0.35em] text-slate-500">Input payload</div>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={8}
                      className="w-full resize-none rounded-[1.25rem] border border-white/10 bg-zinc-950/40 p-3 text-sm text-white outline-none focus:border-[#67e8f9]/50"
                    />
                  </label>

                  <div className="mt-4 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={run}
                      disabled={thinking}
                      className="min-h-[44px] rounded-[1.25rem] bg-[#06b6d4]/90 px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#06b6d4] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {thinking ? "Parsing trade input…" : "Run Field Diagnostics"}
                    </button>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <RefreshCw size={14} className="text-[#67e8f9]" />
                      Updates are instantaneous and mock-only.
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-white/10 bg-black/25 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#9333ea]" />
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Suggested prompts</div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Low pressure + possible restrictor, heating demand."
                      ,
                      "Unusual noise + intermittent drain backing. Include floor area estimates."
                      ,
                      "Thermal drop after warm-up; describe any leaks or sensor readings."
                      ,
                      "HVAC zoning issue: discomfort in room group A; provide rough duct length."
                    ].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setInput(p);
                          setActivePanel("terminal");
                        }}
                        className="min-h-[40px] rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-mono text-white/70 hover:bg-white/[0.06]"
                      >
                        {p.slice(0, 26)}…
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Console transcript</div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActivePanel("terminal")}
                        className={
                          "min-h-[36px] rounded-full border px-3 text-xs font-mono uppercase tracking-[0.28em] " +
                          (activePanel === "terminal"
                            ? "border-[#67e8f9]/40 bg-[#67e8f9]/10 text-[#67e8f9]"
                            : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white")
                        }
                      >
                        Live Output
                      </button>
                      <button
                        type="button"
                        onClick={() => setActivePanel("diagnostics")}
                        className={
                          "min-h-[36px] rounded-full border px-3 text-xs font-mono uppercase tracking-[0.28em] " +
                          (activePanel === "diagnostics"
                            ? "border-[#06b6d4]/40 bg-[#06b6d4]/10 text-[#67e8f9]"
                            : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white")
                        }
                      >
                        Diagnostic Packet
                      </button>
                    </div>
                  </div>

                  <div
                    ref={transcriptRef}
                    className="h-[420px] overflow-auto rounded-[1.75rem] border border-white/10 bg-zinc-950/40 p-4"
                  >
                    <AnimatePresence>
                      {transcript.map((m) => (
                        <motion.div
                          key={m.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className={"mb-4 rounded-[1.25rem] border border-white/10 p-3 " + (m.role === "user" ? "bg-black/20" : "bg-black/10")}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                                {m.role === "user" ? (
                                  <Clipboard size={16} className="text-[#67e8f9]" />
                                ) : (
                                  <CheckCircle2 size={16} className="text-[#06b6d4]" />
                                )}
                              </span>
                              <div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-slate-400">
                                  {m.role === "user" ? "Trade Input" : "Assistant"}
                                </div>
                                <div className="mt-1 text-xs text-slate-200">{new Date(m.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => navigator.clipboard?.writeText(m.content)}
                              className="min-h-[34px] rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-mono text-white/60 hover:text-white"
                            >
                              Copy
                            </button>
                          </div>
                          <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-5 text-slate-200">{m.content}</pre>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <AnimatePresence>
                      {thinking ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="rounded-[1.25rem] border border-white/10 bg-black/20 p-3"
                        >
                          <div className="flex items-center gap-2 text-slate-200">
                            <Gauge size={16} className="text-[#67e8f9]" />
                            <div className="text-sm font-semibold">Computing mock diagnostics…</div>
                          </div>
                          <div className="mt-2 text-xs text-slate-400">Running parse → measurement breakdown → safety script generation.</div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence>
                    {activePanel === "diagnostics" ? (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-[1.75rem] border border-white/10 bg-zinc-950/40 p-4"
                      >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <div className="flex items-center gap-2">
                              <ShieldCheck size={16} className="text-[#06b6d4]" />
                              <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Technician packet</div>
                            </div>
                            <div className="mt-2 font-playfair text-2xl text-white">Diagnostic Console Output</div>
                            <div className="mt-2 text-sm text-slate-300">{diagnostic.summary}</div>
                          </div>
                          <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                            <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Mode</div>
                            <div className="mt-2 text-sm font-semibold text-white">Mock calculations</div>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                          {diagnostic.measurements.map((m) => (
                            <div key={m.label} className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                              <div className="flex items-center justify-between gap-3">
                                <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">{m.label}</div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-white/70">
                                  <Ruler size={14} className="text-[#67e8f9]" />
                                  {m.value}
                                  {m.unit}
                                </span>
                              </div>
                              <div className="mt-3 text-sm text-slate-200">
                                Range: {m.range[0]}–{m.range[1]} {m.unit}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5">
                          <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Safety checklist</div>
                          <ul className="mt-3 space-y-2">
                            {diagnostic.safetyChecklist.map((s) => (
                              <li key={s} className="flex gap-3 text-sm text-slate-200">
                                <span className="mt-2 h-2 w-2 rounded-full bg-[#06b6d4]" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-5">
                          <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Calculations</div>
                          <div className="mt-3 space-y-3">
                            {diagnostic.calculations.map((c) => (
                              <div key={c.title} className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                                <div className="flex items-center gap-2">
                                  <Wrench size={16} className="text-[#67e8f9]" />
                                  <div className="font-semibold text-white">{c.title}</div>
                                </div>
                                <div className="mt-2 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-5">
                                  {c.lines.map((l) => `• ${l}`).join("\n")}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5">
                          <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Next actions</div>
                          <div className="mt-3 grid gap-2">
                            {diagnostic.nextActions.map((a) => (
                              <div key={a} className="flex items-start gap-3 rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                                <CheckCircle2 size={16} className="text-[#06b6d4] mt-0.5" />
                                <div className="text-sm text-slate-200">{a}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5">
                          <Link
                            href="/portfolio/web-dev-projects/plumbing/copilot"
                            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.06]"
                          >
                            Refresh packet
                            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 transition" />
                          </Link>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {!mounted ? (
              <div className="mt-4 text-xs text-slate-500">Mounting client console…</div>
            ) : null}
          </TerminalFrame>
        </div>
      </div>
    </main>
  );
}

