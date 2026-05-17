"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type BotTag = {
  id: number;
  label: string;
  description: string;
};

type UserCase = {
  id: number;
  name: string;
  role: string;
  initial: number;
  current: number;
  highlight: string;
};

const dataSources = [
  "War & Geopolitics",
  "Medical Research",
  "Rare Mineral Mining",
  "Aerospace",
  "Macro Economics",
  "Crypto Assets",
  "Top Equities",
  "Industry Intelligence",
];

const botTags: BotTag[] = [
  { id: 1, label: "Geopolitics", description: "Track trade corridors, sanctions, and conflict risk." },
  { id: 2, label: "Aerospace", description: "Monitor launches, contracts, and defense supplier moves." },
  { id: 3, label: "Medical Research", description: "Analyze breakthrough drug pipelines and approvals." },
  { id: 4, label: "Rare Minerals", description: "Surface supply shocks from mining and resource demand." },
  { id: 5, label: "DeFi", description: "Detect shifting sentiment and liquidity flows in crypto." },
  { id: 6, label: "Macro Economics", description: "Filter central bank action, inflation, and global growth." },
  { id: 7, label: "Tech Shifts", description: "Capture AI, semiconductors, and software disruption signals." },
  { id: 8, label: "Equities", description: "Focus on blue chip and high-conviction stock picks." },
  { id: 9, label: "AI Signals", description: "Match high-confidence model outputs with live alpha." },
];

const signalLibrary: Record<string, { asset: string; action: string; theme: string }> = {
  Geopolitics: { asset: "$NOC / Global Defense", action: "Long", theme: "Conflict-risk alpha" },
  Aerospace: { asset: "$BA / Aerospace Innovation", action: "Long", theme: "Launch & contract momentum" },
  "Medical Research": { asset: "$MRNA / Biotech Breakout", action: "Long", theme: "Clinical catalyst event" },
  "Rare Minerals": { asset: "$FMC / Critical Materials", action: "Long", theme: "Supply constraint play" },
  DeFi: { asset: "$AAVE / DeFi Liquidity", action: "Long", theme: "Decentralized finance strength" },
  "Macro Economics": { asset: "$SPY / Rate Sensitivity", action: "Long", theme: "Trend following macro" },
  "Tech Shifts": { asset: "$NVDA / AI Compute", action: "Long", theme: "Technology adoption surge" },
  Equities: { asset: "$ARKK / High-Growth Basket", action: "Long", theme: "Equity rotation focus" },
  "AI Signals": { asset: "$MSFT / AI Infrastructure", action: "Long", theme: "Model-driven conviction" },
};

const userCases: UserCase[] = [
  {
    id: 1,
    name: "Samantha",
    role: "Founder, Fintech Startup",
    initial: 2800,
    current: 55000,
    highlight: "Leveraged early AI signal alerts to capture rapid DeFi gains and edge-case breakout assets.",
  },
  {
    id: 2,
    name: "Eric",
    role: "VP of Corporate Strategy",
    initial: 12500,
    current: 240000,
    highlight: "Balanced traditional equity rotation with macro risk filters for 18x portfolio growth.",
  },
  {
    id: 3,
    name: "Nina",
    role: "Medical Research Executive",
    initial: 45000,
    current: 1150000,
    highlight: "Applied clinical breakthrough signals to biotech picks with strict risk controls.",
  },
  {
    id: 4,
    name: "Marcus",
    role: "Aerospace Investor",
    initial: 85000,
    current: 3400000,
    highlight: "Captured launch cycle, defense supplier, and semiconductor momentum in one portfolio.",
  },
  {
    id: 5,
    name: "Amina",
    role: "Family Office Principal",
    initial: 170000,
    current: 7800000,
    highlight: "Converted global alpha into seven-figure wealth expansion across stocks and crypto.",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const deriveSignal = (activeTags: string[]) => {
  if (activeTags.length === 0) {
    return {
      title: "Activate the engine by selecting macro tags.",
      asset: "—",
      action: "—",
      confidence: "—",
      rationale: "RickPick adapts predictions using live non-traditional alpha channels.",
    };
  }

  const primary = activeTags[0];
  const template = signalLibrary[primary] ?? { asset: "$RICK", action: "Long", theme: "Cross-domain alpha" };
  const score = Math.min(98, 64 + activeTags.length * 4 + activeTags.reduce((sum, tag) => sum + tag.length % 7, 0));
  const confidence = `${score}%`;
  const asset = template.asset;
  const action = template.action;
  const rationale = `${template.theme} driven by ${activeTags.join(", ")}.`;

  return {
    title: `AI Generated Signal Pick — ${action} ${asset}`,
    asset,
    action,
    confidence,
    rationale,
  };
};

export default function RickPickShowcase() {
  const [activeTags, setActiveTags] = useState<string[]>(["Geopolitics", "Aerospace"]);
  const [selectedUserId, setSelectedUserId] = useState(5);
  const [showCaseDetail, setShowCaseDetail] = useState(true);

  const selectedUser = userCases.find((user) => user.id === selectedUserId) ?? userCases[0];
  const signal = useMemo(() => deriveSignal(activeTags), [activeTags]);

  const toggleTag = (label: string) => {
    setActiveTags((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label].slice(0, 5)
    );
  };

  const maxValue = Math.max(...userCases.map((user) => user.current));
  const progress = Math.min(100, Math.round((selectedUser.current / maxValue) * 100));

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#9333ea]/20 via-transparent to-transparent opacity-80" />
      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="space-y-1">
            <a href="/" className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-violet-300 transition">
              ← Back
            </a>
            <h1 className="text-xl font-semibold tracking-tight text-white">RickPick</h1>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#engine" className="transition hover:text-violet-300">Engine</a>
            <a href="#simulator" className="transition hover:text-violet-300">Simulator</a>
            <a href="#success" className="transition hover:text-violet-300">Case Studies</a>
          </nav>
        </div>
      </header>

      <section id="engine" className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <span className="inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-sm uppercase tracking-[0.35em] text-violet-200">
              Flagship Fintech Case Study
            </span>
            <div className="space-y-6">
              <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                RickPick: Predictive AI-Engineered Market Intelligence
              </h2>
              <p className="max-w-3xl text-lg leading-9 text-slate-300">
                An elite AI trading engine for stock and crypto investors that fuses real-time global flashpoints, scientific breakthroughs, and macroeconomic signals into high-conviction market picks. The RickPick ecosystem turns unconventional data into a live decision engine for modern capital allocation.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-violet-500/10">
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Data Channels</p>
                <p className="mt-4 text-3xl font-semibold text-white">20+</p>
                <p className="mt-2 text-sm text-slate-400">Non-traditional alpha sources synthesized in real time.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-violet-500/10">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Predictive Confidence</p>
                <p className="mt-4 text-3xl font-semibold text-white">94%</p>
                <p className="mt-2 text-sm text-slate-400">Average model accuracy across top signals.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-violet-500/10">
                <p className="text-sm uppercase tracking-[0.35em] text-pink-300/80">Portfolio Impact</p>
                <p className="mt-4 text-3xl font-semibold text-white">$7.8M</p>
                <p className="mt-2 text-sm text-slate-400">Largest verified portfolio return from the case study cohort.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_120px_-52px_rgba(147,51,234,0.7)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(147,51,234,0.18),transparent_25%)]" />
            <div className="relative grid gap-4">
              <div className="rounded-[2rem] border border-violet-400/20 bg-black/60 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-violet-200/80">Predictive Analysis Engine</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">RickPick Global Brain</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Live fusion of world events, scientific research, aerospace telemetry, and market signals into one high-conviction intelligence layer.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {dataSources.map((source, index) => (
                  <motion.div
                    key={source}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-3 rounded-[1.75rem] border border-white/10 bg-black/70 px-4 py-4 shadow-xl shadow-violet-500/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-200 ring-1 ring-violet-500/20">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium text-slate-100">{source}</p>
                  </motion.div>
                ))}
              </div>

              <div className="relative mt-6 rounded-[2rem] border border-white/10 bg-black/60 p-6">
                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(147,51,234,0.55)]" />
                <div className="relative flex flex-col items-center gap-6 text-center">
                  <div className="rounded-[2rem] bg-violet-500/10 px-5 py-3 text-xs uppercase tracking-[0.35em] text-violet-200 ring-1 ring-violet-500/20">
                    Predictive Core
                  </div>
                  <div className="text-3xl font-semibold text-white">RickPick AI Engine</div>
                  <p className="max-w-xl text-sm leading-6 text-slate-400">
                    Engine components feed into an adaptive signal network that balances traditional market data with deep macro and domain intelligence.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="simulator" className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="mb-12 space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Live Interactive Bot Simulator</p>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">
            Test the RickPick AI Engine Live
          </h2>
          <p className="max-w-2xl text-slate-400">
            Select macro tags to see how RickPick blends geopolitical, scientific, and market signals into a live predictive trade idea with confidence scoring.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-violet-500/10">
            <div className="grid gap-4 sm:grid-cols-2">
              {botTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.label)}
                  className={`rounded-[1.5rem] border px-4 py-3 text-left text-sm transition duration-200 ${
                    activeTags.includes(tag.label)
                      ? "border-violet-400 bg-violet-500/15 text-white shadow-lg shadow-violet-500/10"
                      : "border-white/10 bg-black/50 text-slate-300 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">{tag.label}</span>
                    <span className="text-xs uppercase tracking-[0.35em] text-slate-500">
                      {activeTags.includes(tag.label) ? "Active" : "Tap"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{tag.description}</p>
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.35em] text-slate-500">Selected tags</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {activeTags.length > 0 ? (
                activeTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-4 py-2 text-xs text-slate-100">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-slate-400">
                  No tags selected yet.
                </span>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent p-8 shadow-2xl shadow-violet-500/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet-200/90">Signal Output</p>
                <h3 className="mt-3 text-3xl font-semibold text-white">{signal.title}</h3>
              </div>
              <div className="rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-300/20">
                Confidence {signal.confidence}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Asset</p>
                <p className="mt-2 text-2xl font-semibold text-white">{signal.asset}</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Action</p>
                <p className="mt-2 text-2xl font-semibold text-white">{signal.action}</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Signal Rationale</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{signal.rationale}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="success" className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="mb-12 space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Interactive Success Matrix</p>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">
            Five Portfolio Journeys, One Proven Engine
          </h2>
          <p className="max-w-2xl text-slate-400">
            Each case study demonstrates a different risk profile, asset mix, and outcome from RickPick’s blended AI and data engineering process.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-violet-500/10">
            <div className="grid gap-4 sm:grid-cols-2">
              {userCases.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => setSelectedUserId(user.id)}
                  className={`rounded-[1.75rem] border px-5 py-4 text-left transition duration-200 ${
                    user.id === selectedUserId
                      ? "border-violet-400 bg-violet-500/10 text-white shadow-lg shadow-violet-500/10"
                      : "border-white/10 bg-black/50 text-slate-300 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Case {user.id}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{user.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{user.role}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent p-8 shadow-2xl shadow-violet-500/20">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet-200/90">Selected Portfolio Outcome</p>
                <h3 className="mt-4 text-4xl font-semibold text-white">{selectedUser.name} — {selectedUser.role}</h3>
              </div>
              <div className="rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-300/20">
                {formatCurrency(selectedUser.current)} current value
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/70 p-6">
              <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
                <span>Initial Capital</span>
                <span>{formatCurrency(selectedUser.initial)}</span>
              </div>
              <div className="mt-6 h-4 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-cyan-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-500">
                <span>ROI Progress</span>
                <span>{progress}% of top-case scale</span>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Growth Multiple</p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {(selectedUser.current / selectedUser.initial).toFixed(1)}x
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Outcome Summary</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{selectedUser.highlight}</p>
              </div>
            </div>

            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={selectedUser.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Verified Growth Metrics</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.5rem] bg-black/70 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Starting Capital</p>
                    <p className="mt-3 text-lg font-semibold text-white">{formatCurrency(selectedUser.initial)}</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-black/70 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Current Value</p>
                    <p className="mt-3 text-lg font-semibold text-white">{formatCurrency(selectedUser.current)}</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-black/70 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Net Gain</p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      {formatCurrency(selectedUser.current - selectedUser.initial)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
