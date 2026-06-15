"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Cable,
  CalendarDays,
  Droplet,
  Lock,
  Shield,
  Wrench,
} from "lucide-react";

type AnchorItem = { id: string; label: string };

const anchors: AnchorItem[] = [
  { id: "services", label: "Services" },
  { id: "reviews", label: "Reviews" },
  { id: "dispatch", label: "Dispatch" },
];

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
            <div className="text-sm font-semibold text-white">Industrial Dispatch Console</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {anchors.map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              className="min-h-[44px] rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:border-purple-400/30 hover:bg-white/[0.06]"
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function SpecBoard({
  query,
  onChange,
}: {
  query: string;
  onChange: (v: string) => void;
}) {
  const options = [
    { label: "Designing system framework for a", value: "6,000 SF Residence" },
    { label: "requiring", value: "Smart-Home Thermal Zoning" },
    { label: "with", value: "Acoustic Pipe Insulation Layers" },
    { label: "and", value: "Tankless Water Matrix" },
  ];

  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5 sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-white/80" />
            <div className="text-xs uppercase tracking-[0.35em] text-white/60">System Parameter Selector</div>
          </div>
          <h2 className="mt-2 font-mono text-xl font-semibold text-white">Engineering Spec Board</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Natural-language selector matrix mimicking a technical spec room. No network calls.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-purple-400/25 bg-gradient-to-br from-[#9333ea]/15 to-transparent p-4 text-sm">
          <div className="text-xs uppercase tracking-[0.35em] text-purple-200">Status</div>
          <div className="mt-1 font-semibold text-white">Ready for quote + dispatch</div>
          <div className="mt-1 text-slate-300">Live preview updates instantly</div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {options.map((o, idx) => (
          <div key={o.value} className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase tracking-[0.35em] text-white/50">
              Segment {idx + 1}
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="text-sm text-slate-300">{o.label}</div>
              <button
                type="button"
                className="min-h-[44px] rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-mono text-white/80 transition hover:border-purple-400/30"
                onClick={() => onChange(`${query} ${o.value}`.trim().replace(/\s+/g, " "))}
              >
                Add “{o.value}”
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
        <div className="text-xs uppercase tracking-[0.35em] text-white/50">Preview</div>
        <div className="mt-2 font-mono text-sm leading-6 text-white">{query}</div>
      </div>
    </div>
  );
}

type SystemSpec = {
  key: string;
  name: string;
  telemetry: string[];
  recommendedTier: "Tier A" | "Tier B" | "Tier C";
  access: string;
};

const systems: SystemSpec[] = [
  {
    key: "hydroflow",
    name: "Hydroflow Matrix",
    telemetry: [
      "8-zone pressure choreography",
      "anti-cavitation microflow",
      "smart actuator calibration",
    ],
    recommendedTier: "Tier A",
    access: "Priority response + on-site validation",
  },
  {
    key: "tankless",
    name: "Tankless Water Grid",
    telemetry: [
      "thermal balancing algorithm",
      "rapid recovery modules",
      "safety valve envelope",
    ],
    recommendedTier: "Tier B",
    access: "Dispatch + staged component check",
  },
  {
    key: "acoustic",
    name: "Acoustic Drainage Vault",
    telemetry: [
      "vibration isolation layers",
      "pressure-surge dampers",
      "sealed inspection chamber",
    ],
    recommendedTier: "Tier A",
    access: "Dispatch + noise-floor verification",
  },
  {
    key: "smartvalve",
    name: "Smart Valve System",
    telemetry: [
      "predictive flow scheduling",
      "secure control handshake",
      "thermostat-aware routing",
    ],
    recommendedTier: "Tier C",
    access: "Dispatch + control interface audit",
  },
];

function SystemCard({
  sys,
  onSelect,
  active,
}: {
  sys: SystemSpec;
  onSelect: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={
        "text-left rounded-[2rem] border p-5 sm:p-6 transition min-h-[44px] " +
        (active
          ? "border-purple-400/40 bg-[#9333ea]/10"
          : "border-white/10 bg-white/[0.02] hover:border-purple-400/25")
      }
      aria-pressed={active}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-white/55">Mechanical system</div>
          <div className="mt-2 font-mono text-lg font-semibold text-white">{sys.name}</div>
          <div className="mt-2 text-sm text-slate-300">Telemetry & engineered behavior</div>
        </div>
        <div className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs font-mono text-white/70">
          {sys.recommendedTier}
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {sys.telemetry.map((t) => (
          <div key={t} className="flex items-center gap-2 text-sm text-slate-200">
            <BadgeCheck className="h-4 w-4 text-purple-200" />
            <span>{t}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-slate-400">{sys.access}</div>
    </button>
  );
}

function SlideOverDispatch({
  open,
  sys,
  onClose,
}: {
  open: boolean;
  sys: SystemSpec | null;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [submitted, setSubmitted] = useState(false);

  return (
    <AnimatePresence>
      {open && sys ? (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close dispatch console"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-black/85 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-slate-400">24/7 dispatch</div>
                <div className="mt-1 font-mono text-sm font-semibold text-white">{sys.name}</div>
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
              <div className="rounded-[1.5rem] border border-purple-400/25 bg-[#9333ea]/10 p-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-200" />
                  <div className="text-xs uppercase tracking-[0.35em] text-purple-200">Secured request</div>
                </div>
                <div className="mt-2 text-sm font-semibold text-white">Request Mechanical Consultation</div>
                <div className="mt-1 text-xs text-slate-300">Sample form: no data leaves the browser.</div>
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Technical spec ledger</div>
                <div className="mt-2 grid gap-2 text-sm text-slate-200">
                  {sys.telemetry.map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <Cable className="h-4 w-4 text-purple-200" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-slate-400">Recommended {sys.recommendedTier} · {sys.access}</div>
              </div>

              <div className="mt-4 grid gap-3">
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="min-h-[44px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-purple-400/40"
                    placeholder="Your name"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Service address</span>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="min-h-[44px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-purple-400/40"
                    placeholder="Street + unit"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Priority notes</span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-purple-400/40"
                    placeholder="What system behavior should we triage first?"
                  />
                </label>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-purple-200" />
                    <div className="text-sm font-semibold text-white">Typical response window</div>
                  </div>
                  <div className="mt-1 text-xs text-slate-300">Within 45–90 minutes (sample)</div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="min-h-[44px] rounded-2xl bg-[#9333ea]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea]"
                >
                  {submitted ? "Request Captured" : "Submit Request"}
                </button>

                {submitted ? (
                  <div className="rounded-[1.5rem] border border-purple-400/25 bg-[#9333ea]/10 p-4 text-sm text-slate-200">
                    <div className="font-semibold text-white">Dispatch packet generated (sample)</div>
                    <div className="mt-1">We’ll pre-load the technician with the spec ledger and your priority notes.</div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function PlumbingShowcasePage() {
  const [specQuery, setSpecQuery] = useState(
    "Designing system framework for a 6,000 SF Residence requiring Smart-Home Thermal Zoning"
  );
  const [selectedKey, setSelectedKey] = useState<string | null>(systems[0].key);

  const selected = useMemo(() => systems.find((s) => s.key === selectedKey) ?? null, [selectedKey]);

  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#09090b] via-black to-[#9333ea]/10 p-6 sm:p-10">
            <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#9333ea]/20 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#22d3ee]/10 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
                <Droplet className="h-4 w-4 text-purple-200" />
                Industrial Blueprint Matrix
              </div>

              <h1 className="mt-4 font-mono text-4xl font-semibold tracking-tight sm:text-5xl">
                HydroForce Commercial & Residential
              </h1>

              <div className="mt-4 rounded-[2rem] border border-white/10 bg-black/25 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Overlay</div>
                    <div className="mt-2 font-mono text-xl font-semibold text-slate-100">
                      24/7 PRIORITY DISPATCH METRICS
                    </div>
                    <div className="mt-1 text-sm text-slate-300">
                      Brushed-chrome panels · neon-teal telemetry · secure request overlay.
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-purple-400/25 bg-[#9333ea]/10 p-4">
                    <div className="text-xs uppercase tracking-[0.35em] text-purple-200">Live status</div>
                    <div className="mt-2 text-2xl font-semibold text-white">Operational</div>
                    <div className="mt-1 text-xs text-slate-300">Queue: <span className="text-white">2</span> · SLA: <span className="text-white">45–90m</span></div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <BackToShowcase />
          <StickySubNav />

          <section id="dispatch" className="space-y-6">
            <SpecBoard query={specQuery} onChange={setSpecQuery} />

            <div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Multi-tier mechanical showcases</div>
                  <h2 className="mt-2 font-mono text-2xl font-semibold">Industrial spec book (sample)</h2>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] px-4 py-3 text-xs text-slate-300">
                  Click a system card → opens slide-over consultation console
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {systems.map((sys) => (
                  <SystemCard
                    key={sys.key}
                    sys={sys}
                    active={sys.key === selectedKey}
                    onSelect={() => {
                      setSelectedKey(sys.key);
                      setOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Services</div>
            <h2 className="mt-2 font-semibold text-3xl">Dispatch-first categories (sample)</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { t: "24/7 emergency triage", b: "High-visibility dispatch-first flow and technician handoff." },
                { t: "Smart-home thermal zoning", b: "Precision routing for comfort + energy efficiency metrics." },
                { t: "Acoustic drainage vaulting", b: "Noise control engineered with isolation layers and sealed chambers." },
              ].map((x) => (
                <div key={x.t} className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-semibold text-white">{x.t}</div>
                  <div className="mt-2 text-sm text-slate-300">{x.b}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="reviews" className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Reviews</div>
            <h2 className="mt-2 font-semibold text-3xl">Trust forward</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { t: "“Precision triage.”", b: "We got a clear system tier and technician-ready spec packet." },
                { t: "“Secure and calm.”", b: "The slide-over console felt modern, protected, and usable." },
                { t: "“Fast scheduling.”", b: "Dispatch windows presented clearly with next steps." },
              ].map((x) => (
                <div key={x.t} className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-semibold text-white">{x.t}</div>
                  <div className="mt-2 text-sm text-slate-300">{x.b}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-2">
            <BackToShowcase />
          </div>
        </div>
      </div>

      <SlideOverDispatch
        open={open}
        sys={selected}
        onClose={() => {
          setOpen(false);
        }}
      />
    </main>
  );
}

