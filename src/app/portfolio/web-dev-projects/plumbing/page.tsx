"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bolt,
  CalendarDays,
  Gauge,
  ShieldCheck,
  Sparkles,
  Table,
  Thermometer,
  Wrench,
} from "lucide-react";

type Tier = "Tier A" | "Tier B" | "Tier C";

type ContractorSystem = {
  key: string;
  name: string;
  tier: Tier;
  telemetry: string[];
  recommended: string;
};

const CONTRACTOR_SYSTEMS: ContractorSystem[] = [
  {
    key: "hydroforce",
    name: "HydroForce Commercial Matrix",
    tier: "Tier A",
    telemetry: [
      "8-zone pressure choreography",
      "anti-cavitation microflow",
      "smart actuator calibration",
    ],
    recommended: "Priority response + on-site validation",
  },
  {
    key: "tankless",
    name: "Tankless Water Grid",
    tier: "Tier B",
    telemetry: [
      "thermal balancing algorithm",
      "rapid recovery modules",
      "safety valve envelope",
    ],
    recommended: "Dispatch + staged component check",
  },
  {
    key: "acoustic",
    name: "Acoustic Drainage Vaulting",
    tier: "Tier A",
    telemetry: [
      "vibration isolation layers",
      "pressure-surge dampers",
      "sealed inspection chamber",
    ],
    recommended: "Dispatch + noise-floor verification",
  },
  {
    key: "smartvalve",
    name: "Smart Valve System",
    tier: "Tier C",
    telemetry: [
      "predictive flow scheduling",
      "secure control handshake",
      "thermostat-aware routing",
    ],
    recommended: "Dispatch + control interface audit",
  },
];

type Metric = {
  label: string;
  value: number;
  unit: string;
  delta: string;
};

const METRICS: Metric[] = [
  { label: "Qualified leads", value: 184, unit: "/30d", delta: "+12%" },
  { label: "Avg. first response", value: 52, unit: "min", delta: "-9%" },
  { label: "Dispatch success", value: 96, unit: "%", delta: "+3.2" },
  { label: "Technician utilization", value: 71, unit: "%", delta: "+6%" },
];

function sandBoxClass() {
  return "sand-line rounded-[2rem] border border-[#D1D1C7]/40 bg-zinc-950/40";
}

function CTAButton({
  href,
  children,
  glow,
}: {
  href: string;
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition " +
        (glow
          ? "bg-[#06b6d4]/15 text-[#FDFBF7] hover:bg-[#06b6d4]/25 border border-[#06b6d4]/30"
          : "bg-[#FDFBF7] text-black hover:opacity-95")
      }
    >
      {children}
      <ArrowRight
        className={
          "transition-transform " + (glow ? "text-[#06b6d4] group-hover:translate-x-0.5" : "group-hover:translate-x-0.5")
        }
        size={16}
      />
    </Link>
  );
}

function MetricTile({ m }: { m: Metric }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.35em] text-white/55">
            {m.label}
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="font-mono text-3xl font-semibold text-white">
              {m.value}
            </div>
            <div className="text-sm font-inter text-white/70">{m.unit}</div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-mono text-white/70">
          {m.delta}
        </div>
      </div>
    </div>
  );
}

function SpecQueryPanel({
  query,
  onChange,
}: {
  query: string;
  onChange: (v: string) => void;
}) {
  const options = useMemo(
    () => [
      "Designing system framework for a 6,000 SF Residence",
      "requiring Smart-Home Thermal Zoning",
      "with Acoustic Pipe Insulation Layers",
      "and Tankless Water Matrix",
    ],
    []
  );

  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6 sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-white/80" />
            <div className="text-xs font-mono uppercase tracking-[0.35em] text-white/60">
              Engineering funnel selector
            </div>
          </div>
          <h2 className="mt-2 font-mono text-xl font-semibold text-white">
            Spec Board (Telemetry-first)
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Select segments to assemble a technician-ready request. No network calls.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-[#06b6d4]/20 bg-[#06b6d4]/10 p-4 text-sm">
          <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#67e8f9]">
            Status
          </div>
          <div className="mt-1 font-semibold text-white">Ready for quote + dispatch</div>
          <div className="mt-1 text-xs text-slate-300">Preview updates instantly</div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {options.map((label) => (
          <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs font-mono uppercase tracking-[0.35em] text-white/50">
              Segment
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="text-sm text-slate-300">{label.replace(/Designing system framework for a|requiring|with|and/g, "").trim() || label}</div>
              <button
                type="button"
                onClick={() => onChange((query + " " + label).replace(/\s+/g, " ").trim())}
                className="min-h-[44px] rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-mono text-white/80 transition hover:border-[#06b6d4]/30"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
        <div className="text-xs font-mono uppercase tracking-[0.35em] text-white/55">Preview</div>
        <div className="mt-2 font-mono text-sm leading-6 text-white">{query}</div>
      </div>
    </div>
  );
}

function SlideOver({
  open,
  system,
  onClose,
  defaultSpec,
}: {
  open: boolean;
  system: ContractorSystem | null;
  onClose: () => void;
  defaultSpec: string;
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setNotes(defaultSpec);
    }
  }, [open, defaultSpec]);

  if (!system) return null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button
            type="button"
            aria-label="Close dispatch console"
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-zinc-950/90 backdrop-blur-[20px]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">24/7 dispatch</div>
                <div className="mt-1 font-mono text-sm font-semibold text-white">{system.name}</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/90 transition hover:bg-white/[0.06]"
              >
                Close
              </button>
            </div>

            <div className="h-[calc(100%-76px)] overflow-y-auto px-5 py-5">
              <div className="rounded-[1.75rem] border border-[#06b6d4]/20 bg-[#06b6d4]/10 p-4">
                <div className="flex items-center gap-2">
                  <Bolt className="h-4 w-4 text-[#67e8f9]" />
                  <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#67e8f9]">Secured request</div>
                </div>
                <div className="mt-2 text-sm font-semibold text-white">Request field consultation</div>
                <div className="mt-1 text-xs text-slate-300">Sample form: stays in-browser</div>
              </div>

              <div className="mt-4 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Technical spec ledger</div>
                <div className="mt-3 grid gap-2">
                  {system.telemetry.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm text-slate-200">
                      <Gauge className="h-4 w-4 text-[#67e8f9]" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-slate-400">
                  Recommended {system.tier} · {system.recommended}
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <label className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-500">Name</div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="min-h-[44px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-[#06b6d4]/40"
                    placeholder="Your name"
                  />
                </label>

                <label className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-500">Service address</div>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="min-h-[44px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-[#06b6d4]/40"
                    placeholder="Street + unit"
                  />
                </label>

                <label className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-500">Priority notes</div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#06b6d4]/40"
                    placeholder="What system behavior should we triage first?"
                  />
                </label>

                <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[#67e8f9]" />
                    <div className="text-sm font-semibold text-white">Typical response window</div>
                  </div>
                  <div className="mt-1 text-xs text-slate-300">Within 45–90 minutes (sample)</div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="min-h-[44px] rounded-2xl bg-[#06b6d4]/80 px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#06b6d4] disabled:cursor-not-allowed"
                >
                  {submitted ? "Request Captured" : "Submit Request"}
                </button>

                {submitted ? (
                  <div className="rounded-[1.75rem] border border-[#67e8f9]/30 bg-[#06b6d4]/10 p-4 text-sm text-slate-200">
                    <div className="font-semibold text-white">Dispatch packet generated (mock)</div>
                    <div className="mt-1 text-slate-200">
                      We’ll pre-load the technician with the ledger and your priority notes.
                    </div>
                  </div>
                ) : null}

                <div className="mt-2 rounded-[1.75rem] border border-white/10 bg-black/25 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#67e8f9]" />
                    <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">
                      Upgrade path
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-slate-200">
                    For complex systems, open the AI Field Assistant to generate diagnostic checklists.
                  </div>

                  <div className="mt-4">
                    <CTAButton href="/portfolio/web-dev-projects/plumbing/copilot" glow>
                      Open Integrated AI Field Assistant
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function PlumbingShowcasePage() {
  const prefersReducedMotion = useReducedMotion();

  const [specQuery, setSpecQuery] = useState(
    "Designing system framework for a 6,000 SF Residence requiring Smart-Home Thermal Zoning"
  );
  const [selectedKey, setSelectedKey] = useState<string>(CONTRACTOR_SYSTEMS[0].key);
  const selected = useMemo(
    () => CONTRACTOR_SYSTEMS.find((s) => s.key === selectedKey) ?? CONTRACTOR_SYSTEMS[0],
    [selectedKey]
  );

  const [slideOpen, setSlideOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-[#06b6d4]/10 p-6 sm:p-10">
            <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#06b6d4]/20 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#22d3ee]/10 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                <Table className="h-4 w-4 text-[#67e8f9]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-white/70">
                  Telemetry Contractor Dashboard
                </span>
              </div>

              <h1 className="mt-5 font-playfair text-5xl tracking-tight leading-[1.02] text-[#FDFBF7]">
                HydroForce Contractor
                <span className="block text-[#FDFBF7]/70">Acquisition Platform</span>
              </h1>

              <p className="mt-5 max-w-2xl font-inter text-sm leading-7 text-[#FDFBF7]/75">
                A conversion-focused dashboard for contractor funnels: bold metric grids, engineered spec
                requests, and an AI Field Assistant upgrade path.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5">
                  <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Operational overlay</div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.03] grid place-items-center">
                      <Thermometer className="h-5 w-5 text-[#67e8f9]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Live status: Operational</div>
                      <div className="mt-1 text-xs text-slate-300">
                        Queue: <span className="text-white">2</span> · SLA: <span className="text-white">45–90m</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <CTAButton href="/portfolio/web-dev-projects/plumbing/copilot" glow={!prefersReducedMotion}>
                    Open Integrated AI Field Assistant
                  </CTAButton>
                  <div className="text-xs text-slate-300">
                    Technician-ready diagnostics + measurement breakdowns (mock).
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Upgrade-ready metrics</div>
              <div className="mt-2 font-mono text-2xl font-semibold text-white">Active metric grid</div>
            </div>
            <Link
              href="/portfolio/web-dev-projects"
              className="sand-line rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-[0.28em] text-white/75 hover:text-white transition"
            >
              Back to Web Dev Hub
            </Link>
          </div>

          <section className="grid gap-4 md:grid-cols-4">
            {METRICS.map((m) => (
              <MetricTile key={m.label} m={m} />
            ))}
          </section>

          <SpecQueryPanel query={specQuery} onChange={setSpecQuery} />

          <section className="rounded-[2.5rem] border border-white/10 bg-black/20 p-6 sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Service acquisition funnel</div>
                <h2 className="mt-2 font-playfair text-3xl text-white">
                  Choose a mechanical tier
                </h2>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">How it converts</div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-200">
                  <BadgeCheck className="h-4 w-4 text-[#67e8f9]" />
                  Click a card → open dispatch console
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {CONTRACTOR_SYSTEMS.map((sys) => (
                <button
                  key={sys.key}
                  type="button"
                  onClick={() => {
                    setSelectedKey(sys.key);
                    setSlideOpen(true);
                  }}
                  className={
                    "text-left rounded-[2rem] border p-5 sm:p-6 transition min-h-[150px] " +
                    (sys.key === selectedKey
                      ? "border-[#06b6d4]/40 bg-[#06b6d4]/10"
                      : "border-white/10 bg-white/[0.02] hover:border-[#06b6d4]/30 hover:bg-white/[0.03]")
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-[0.35em] text-white/55">Mechanical system</div>
                      <div className="mt-2 font-mono text-lg font-semibold text-white">{sys.name}</div>
                      <div className="mt-2 text-sm text-slate-300">Telemetry & engineered behavior</div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs font-mono text-white/70">
                      {sys.tier}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2">
                    {sys.telemetry.slice(0, 3).map((t) => (
                      <div key={t} className="flex items-center gap-2 text-sm text-slate-200">
                        <BadgeCheck className="h-4 w-4 text-[#67e8f9]" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-slate-400">{sys.recommended}</div>
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                t: "24/7 emergency triage",
                b: "High-visibility dispatch-first flow and technician handoff.",
              },
              {
                t: "Smart-home thermal zoning",
                b: "Precision routing for comfort + energy efficiency metrics.",
              },
              {
                t: "Acoustic drainage vaulting",
                b: "Noise control engineered with isolation layers and sealed chambers.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
                <div className="text-sm font-semibold text-white">{x.t}</div>
                <div className="mt-2 text-sm text-slate-300">{x.b}</div>
              </div>
            ))}
          </section>

          <section className="rounded-[2.5rem] border border-white/10 bg-black/20 p-6 sm:p-8">
            <div className="text-xs font-mono uppercase tracking-[0.35em] text-slate-400">Trust-forward</div>
            <h2 className="mt-3 font-playfair text-3xl text-white">Proof that upgrades convert</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  t: "Precision triage.",
                  b: "We got a clear system tier and technician-ready spec packet.",
                },
                {
                  t: "Secure and calm.",
                  b: "The console felt modern, protected, and instantly usable.",
                },
                {
                  t: "Fast scheduling.",
                  b: "Dispatch windows presented clearly with next steps.",
                },
              ].map((x) => (
                <div key={x.t} className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
                  <div className="text-sm font-semibold text-white">{x.t}</div>
                  <div className="mt-2 text-sm text-slate-300">{x.b}</div>
                </div>
              ))}
            </div>
          </section>

          <AnimatePresence>
            <SlideOver
              open={slideOpen}
              system={selected}
              defaultSpec={specQuery}
              onClose={() => setSlideOpen(false)}
            />
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

