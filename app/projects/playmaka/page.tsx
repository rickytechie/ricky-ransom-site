"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Football,
  Basketball,
  Trophy,
  Shield,
  Clock3,
} from "lucide-react";

type Matchup = {
  id: number;
  teams: string;
  sport: string;
  play: string;
  confidence: string;
  tier: "Elite" | "Premium" | "High Value";
  odds: string;
  market: string;
};

const sidebarLinks = [
  { label: "Dashboard", icon: Activity },
  { label: "Live Feeds", icon: BarChart3 },
  { label: "Risk Signals", icon: ShieldCheck },
  { label: "Value Alerts", icon: Sparkles },
];

const kpis = [
  {
    label: "Top Algorithm Pick",
    value: "MIA vs. ATL",
    detail: "76.8% model edge with cross-market arbitrage.",
    icon: TrendingUp,
  },
  {
    label: "Aggregated Feeds",
    value: "12 sources",
    detail: "Live market, lines, liquidity, and sentiment fused.",
    icon: BarChart3,
  },
  {
    label: "Risk Mitigation",
    value: "95% coverage",
    detail: "Auto hedge and volatility exposure signals applied.",
    icon: Shield,
  },
];

const matchups: Matchup[] = [
  {
    id: 1,
    teams: "Miami Heat vs. Atlanta Hawks",
    sport: "NBA",
    play: "Under 215.5, 1H",
    confidence: "76%",
    tier: "Elite",
    odds: "-110",
    market: "Total/Spread",
  },
  {
    id: 2,
    teams: "Liverpool vs. Arsenal",
    sport: "Soccer",
    play: "Value draw, 2H",
    confidence: "71%",
    tier: "Premium",
    odds: "+180",
    market: "Match Result",
  },
  {
    id: 3,
    teams: "New York Yankees vs. Boston Red Sox",
    sport: "MLB",
    play: "Over 8.5 runs",
    confidence: "69%",
    tier: "High Value",
    odds: "-125",
    market: "Totals",
  },
  {
    id: 4,
    teams: "Golden State Warriors vs. Phoenix Suns",
    sport: "NBA",
    play: "Warriors +4.5",
    confidence: "74%",
    tier: "Elite",
    odds: "+140",
    market: "Spread",
  },
  {
    id: 5,
    teams: "Dallas Cowboys vs. Philadelphia Eagles",
    sport: "NFL",
    play: "Cowboys -3, live",
    confidence: "72%",
    tier: "Premium",
    odds: "-150",
    market: "Spread/Live",
  },
];

const tierStyles = {
  Elite: "bg-emerald-400/10 text-emerald-300 border border-emerald-300/10",
  Premium: "bg-sky-400/10 text-sky-300 border border-sky-300/10",
  "High Value": "bg-violet-400/10 text-violet-300 border border-violet-300/10",
};

export default function PlaymakaPage() {
  const [selectedId, setSelectedId] = useState(matchups[0].id);

  const selectedMatchup = useMemo(
    () => matchups.find((row) => row.id === selectedId) ?? matchups[0],
    [selectedId]
  );

  const sportSummary = useMemo(
    () =>
      matchups.reduce((acc, row) => {
        acc[row.sport] = (acc[row.sport] ?? 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-gradient-to-b from-slate-900/95 via-transparent to-transparent opacity-90" />
      <div className="pointer-events-none fixed right-0 top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-8 lg:py-10">
        <header className="mb-8 rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-300">
                <Sparkles className="h-4 w-4" />
                Desktop-first market intelligence
              </div>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">PLAYMAKA</p>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  A premium sports data aggregator dashboard for optimal value plays.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  High-performance desktop analytics that blends live market feeds, probability modeling, and confidence-tier scoring to surface the next best plays with enterprise-grade precision.
                </p>
              </div>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2 lg:w-[320px]">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-4 text-slate-300">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Status</p>
                <p className="mt-3 text-xl font-semibold text-white">Live aggregation</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-4 text-slate-300">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Edge</p>
                <p className="mt-3 text-xl font-semibold text-emerald-300">Algorithmic alpha</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid flex-1 gap-6 xl:grid-cols-[300px_1fr]">
          <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-slate-900/40">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Navigation</p>
              <h2 className="text-2xl font-semibold text-white">PLAYMAKA Console</h2>
            </div>

            <nav className="space-y-2">
              {sidebarLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-3xl border border-white/5 bg-slate-900/80 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-300/30 hover:bg-slate-900"
                  >
                    <Icon className="h-4 w-4 text-cyan-300" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-500">
                <span>Live sport mix</span>
                <span>{matchups.length} events</span>
              </div>
              <div className="mt-5 space-y-3">
                {Object.entries(sportSummary).map(([sport, count]) => (
                  <div key={sport} className="flex items-center justify-between rounded-3xl border border-white/5 bg-slate-950/70 px-4 py-3 text-sm text-slate-200">
                    <span>{sport}</span>
                    <span className="font-semibold text-white">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Selected play</p>
                  <p className="mt-2 text-lg font-semibold text-white">{selectedMatchup.sport}</p>
                </div>
                <Clock3 className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>{selectedMatchup.teams}</p>
                <p>{selectedMatchup.play}</p>
                <p className="text-slate-400">Market: {selectedMatchup.market}</p>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-3">
              {kpis.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.label} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-900/20">
                    <div className="flex items-center gap-3 text-cyan-300">
                      <Icon className="h-5 w-5" />
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{item.label}</p>
                    </div>
                    <p className="mt-5 text-3xl font-semibold text-white">{item.value}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{item.detail}</p>
                  </article>
                );
              })}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-900/20">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Interactive match matrix</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Suggested value plays</h2>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-300">
                  <TrendingUp className="h-4 w-4 text-cyan-300" />
                  Market plays ranked by confidence and edge
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-950/90 text-slate-400">
                    <tr>
                      <th className="px-4 py-4">Matchup</th>
                      <th className="px-4 py-4">Sport</th>
                      <th className="px-4 py-4">Suggested Play</th>
                      <th className="px-4 py-4">Confidence</th>
                      <th className="px-4 py-4">Tier</th>
                      <th className="px-4 py-4">Odds</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-slate-950/80">
                    {matchups.map((row) => (
                      <tr
                        key={row.id}
                        className={`cursor-pointer transition ${
                          row.id === selectedId ? "bg-slate-900/90" : "hover:bg-slate-900/70"
                        }`}
                        onClick={() => setSelectedId(row.id)}
                      >
                        <td className="px-4 py-4 align-middle text-sm text-slate-100">
                          <div className="font-semibold text-white">{row.teams}</div>
                          <div className="mt-1 text-xs text-slate-500">{row.market}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-200">{row.sport}</td>
                        <td className="px-4 py-4 text-sm text-slate-200">{row.play}</td>
                        <td className="px-4 py-4 text-sm text-emerald-300">{row.confidence}</td>
                        <td className="px-4 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${tierStyles[row.tier]}`}>
                            {row.tier}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-200">{row.odds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Trophy className="h-4 w-4 text-amber-300" />
                    <span>Highest confidence signal</span>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white">{selectedMatchup.teams}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{selectedMatchup.play} at {selectedMatchup.confidence} confidence.</p>
                </article>
                <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <ArrowRight className="h-4 w-4 text-cyan-300" />
                    <span>Player-focused edge</span>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white">{selectedMatchup.play}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Market: {selectedMatchup.market} · Odds: {selectedMatchup.odds}</p>
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
