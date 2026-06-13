"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Activity,
  BarChart3,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Trophy,
  Shield,
  Clock3,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

type SportsEvent = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers?: Array<{
    key: string;
    title: string;
    markets: Array<{
      key: string;
      outcomes: Array<{
        name: string;
        price: number | string;
      }>;
    }>;
  }>;
};

type Matchup = {
  id: string;
  teams: string;
  sport: string;
  play: string;
  confidence: string;
  tier: "Elite" | "Premium" | "High Value";
  odds: string;
  market: string;
  moneyline: string;
  spread: string;
  pickWinner: string;
  commenceTime: string;
};

type BestBets = {
  moneyline: string;
  pickWinner: string;
  spread: string;
};

const defaultBestBets: BestBets = {
  moneyline: "Waiting for fresh moneyline data",
  pickWinner: "Waiting for fresh pick winner data",
  spread: "Waiting for fresh spread data",
};

const sidebarLinks = [
  { label: "Dashboard", icon: Activity },
  { label: "Live Feeds", icon: BarChart3 },
  { label: "Risk Signals", icon: ShieldCheck },
  { label: "Value Alerts", icon: Sparkles },
];

const tierStyles = {
  Elite: "bg-emerald-400/10 text-emerald-300 border border-emerald-300/10",
  Premium: "bg-sky-400/10 text-sky-300 border border-sky-300/10",
  "High Value": "bg-violet-400/10 text-violet-300 border border-violet-300/10",
};

function calculateConfidence(odds: number): string {
  const probability = (1 / odds) * 100;
  if (probability >= 70) return "Elite";
  if (probability >= 55) return "Premium";
  return "High Value";
}

function formatPrice(price: number | string | undefined) {
  const parsed = Number(price);
  if (Number.isFinite(parsed)) {
    return parsed.toFixed(2);
  }
  return typeof price === "string" ? price : "-";
}

function extractOdds(event: SportsEvent): string {
  if (!event.bookmakers || event.bookmakers.length === 0) return "-";
  const bookmaker = event.bookmakers[0];
  const moneylineMarket = bookmaker.markets?.find(
    (market) => market.key === "h2h" || market.key === "moneyline"
  );
  if (moneylineMarket?.outcomes?.length) {
    return formatPrice(moneylineMarket.outcomes[0].price);
  }

  const spreadMarket = bookmaker.markets?.find((market) => market.key === "spreads");
  if (spreadMarket?.outcomes?.length) {
    return formatPrice(spreadMarket.outcomes[0].price);
  }

  const defaultMarket = bookmaker.markets?.[0];
  return defaultMarket?.outcomes?.[0]
    ? formatPrice(defaultMarket.outcomes[0].price)
    : "-";
}

function extractBestPlay(event: SportsEvent): string {
  if (!event.bookmakers || event.bookmakers.length === 0) {
    return `Monitor line: ${event.home_team} vs ${event.away_team}`;
  }

  const bookmaker = event.bookmakers[0];
  const moneylineMarket = bookmaker.markets?.find(
    (market) => market.key === "h2h" || market.key === "moneyline"
  );
  if (moneylineMarket?.outcomes?.length) {
    const outcome = moneylineMarket.outcomes[0];
    return `${outcome.name} @ ${formatPrice(outcome.price)}`;
  }

  const spreadMarket = bookmaker.markets?.find((market) => market.key === "spreads");
  if (spreadMarket?.outcomes?.length) {
    const outcome = spreadMarket.outcomes[0];
    return `${outcome.name} @ ${formatPrice(outcome.price)}`;
  }

  const defaultMarket = bookmaker.markets?.[0];
  const defaultOutcome = defaultMarket?.outcomes?.[0];
  return defaultOutcome
    ? `${defaultOutcome.name} @ ${formatPrice(defaultOutcome.price)}`
    : "Value spot detected";
}

function extractMoneyline(event: SportsEvent): string {
  if (!event.bookmakers || event.bookmakers.length === 0) return "No moneyline available";
  const bookmaker = event.bookmakers[0];
  const moneylineMarket = bookmaker.markets?.find(
    (market) => market.key === "h2h" || market.key === "moneyline"
  );
  if (!moneylineMarket?.outcomes?.length) return "No moneyline available";
  const outcome = moneylineMarket.outcomes[0];
  return `${outcome.name} @ ${formatPrice(outcome.price)}`;
}

function extractSpread(event: SportsEvent): string {
  if (!event.bookmakers || event.bookmakers.length === 0) return "No spread available";
  const bookmaker = event.bookmakers[0];
  const spreadMarket = bookmaker.markets?.find((market) => market.key === "spreads");
  const outcome = spreadMarket?.outcomes?.[0];
  return outcome ? `${outcome.name} @ ${formatPrice(outcome.price)}` : "No spread available";
}

export default function PlaymakaPage() {
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bestBets, setBestBets] = useState<BestBets>(defaultBestBets);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [companyDescription, setCompanyDescription] = useState<string>("");
  const [agentResult, setAgentResult] = useState<string>("");
  const [agentHooks, setAgentHooks] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [agentError, setAgentError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!companyDescription.trim()) {
      setAgentError("Please enter a business description first.");
      return;
    }

    setGenerating(true);
    setAgentError(null);
    setAgentResult("");
    setAgentHooks([]);

    try {
const response = await fetch("http://10.255.255.254:8000/api/run-content-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_description: companyDescription,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Backend error: ${errorBody}`);
      }

      const data = await response.json();
      setAgentResult(data.result ?? "");
      setAgentHooks(Array.isArray(data.hooks) ? data.hooks : []);
    } catch (err) {
      setAgentError(
        err instanceof Error ? err.message : "Unable to reach the backend agent."
      );
    } finally {
      setGenerating(false);
    }
  };

  // Fetch real-time sports data
  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/odds");

        if (!response.ok) {
          throw new Error("Failed to fetch live odds data");
        }

        const data = await response.json();
        const events = data.combinedEvents || data.events || [];

        // Transform API events to matchup format
        const transformedMatchups: Matchup[] = events
          .slice(0, 12)
          .map((event: SportsEvent, index: number) => {
            const odds = extractOdds(event);
            const oddsValue = parseFloat(odds) || 1.5;
            const tier = calculateConfidence(oddsValue) as
              | "Elite"
              | "Premium"
              | "High Value";

            return {
              id: event.id || `event-${index}`,
              teams: `${event.away_team} @ ${event.home_team}`,
              sport: event.sport_title || "Sports",
              play: extractBestPlay(event),
              confidence: `${Math.round((1 / oddsValue) * 100)}%`,
              tier,
              odds: odds,
              moneyline: extractMoneyline(event),
              spread: extractSpread(event),
              pickWinner: extractMoneyline(event),
              market: event.bookmakers?.[0]?.markets?.[0]?.key || "spreads",
              commenceTime: event.commence_time,
            };
          });

        setMatchups(transformedMatchups);
        if (transformedMatchups.length > 0 && !selectedId) {
          setSelectedId(transformedMatchups[0].id);
        }

        setBestBets({
          moneyline:
            data.bestBets?.moneyline || "No moneyline recommendation available",
          pickWinner:
            data.bestBets?.pickWinner || "No pick winner recommendation available",
          spread:
            data.bestBets?.spread || "No spread recommendation available",
        });

        setError(null);
        setLastUpdate(new Date());
      } catch (err) {
        console.error("Error fetching sports data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load sports data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSportsData();

    // Auto-refresh every 60 seconds
    const interval = autoRefresh ? setInterval(fetchSportsData, 60000) : null;
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, selectedId]);

  const selectedMatchup = useMemo(
    () => matchups.find((m) => m.id === selectedId) ?? matchups[0],
    [selectedId, matchups]
  );

  const sportSummary = useMemo(
    () =>
      matchups.reduce(
        (acc, row) => {
          acc[row.sport] = (acc[row.sport] ?? 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
    [matchups]
  );

  const topPick = useMemo(() => {
    const eliteMatches = matchups.filter((m) => m.tier === "Elite");
    return eliteMatches[0] || matchups[0];
  }, [matchups]);

  const updateTime = useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - lastUpdate.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes === 0) return "just now";
    return `${minutes}m ago`;
  }, [lastUpdate]);

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
                Live sports data aggregator
              </div>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">PLAYMAKA</p>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Real-time sports market analysis for optimal play discovery.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Live sports events, real-time odds aggregation, and intelligent confidence scoring to help bettors identify high-probability value plays across multiple markets and sportsbooks.
                </p>
              </div>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2 lg:w-[320px]">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-4 text-slate-300">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Status</p>
                <p className="mt-3 text-xl font-semibold text-white">
                  {loading ? "Loading..." : "Live"}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-4 text-slate-300">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Updated</p>
                <p className="mt-3 text-xl font-semibold text-emerald-300">
                  {updateTime}
                </p>
              </div>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-[2rem] border border-amber-400/20 bg-amber-400/5 p-4 text-amber-300">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="grid flex-1 gap-6 xl:grid-cols-[300px_1fr]">
          <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-slate-900/40">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Navigation
                </p>
                <h2 className="text-2xl font-semibold text-white">PLAYMAKA</h2>
              </div>
              <button
                type="button"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`rounded-full p-2 transition ${
                  autoRefresh
                    ? "bg-cyan-400/10 text-cyan-300"
                    : "bg-slate-800/50 text-slate-400"
                }`}
                title={autoRefresh ? "Auto-refresh on" : "Auto-refresh off"}
              >
                <RefreshCw className="h-4 w-4" />
              </button>
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
                <span>Events</span>
                <span>{matchups.length}</span>
              </div>
              <div className="mt-5 space-y-3">
                {Object.entries(sportSummary).map(([sport, count]) => (
                  <div
                    key={sport}
                    className="flex items-center justify-between rounded-3xl border border-white/5 bg-slate-950/70 px-4 py-3 text-sm text-slate-200"
                  >
                    <span>{sport}</span>
                    <span className="font-semibold text-white">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedMatchup && (
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                      Selected
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {selectedMatchup.sport}
                    </p>
                  </div>
                  <Clock3 className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <p>{selectedMatchup.teams}</p>
                  <p>{selectedMatchup.play}</p>
                  <p className="text-slate-400">Moneyline: {selectedMatchup.moneyline}</p>
                  <p className="text-slate-400">Spread: {selectedMatchup.spread}</p>
                  <p className="text-slate-400">Pick Winner: {selectedMatchup.pickWinner}</p>
                </div>
              </div>
            )}

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                    AI Content Generator
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Generate LinkedIn hooks from a business description
                  </p>
                </div>
                <Sparkles className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="mt-4 space-y-4">
                <textarea
                  value={companyDescription}
                  onChange={(event) => setCompanyDescription(event.target.value)}
                  rows={5}
                  placeholder="Describe your business, product, or campaign..."
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
                />
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {generating ? "Generating..." : "Generate Hooks"}
                </button>

                {agentError && (
                  <div className="rounded-3xl border border-rose-400/20 bg-rose-400/5 p-4 text-sm text-rose-200">
                    {agentError}
                  </div>
                )}

                {agentHooks.length > 0 && (
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-200">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                      Generated Hooks
                    </p>
                    <div className="mt-3 space-y-3">
                      {agentHooks.map((hook, index) => (
                        <div key={index} className="rounded-3xl border border-white/10 bg-slate-900/80 p-3">
                          <p className="font-semibold text-white">Hook {index + 1}</p>
                          <p className="mt-2 text-slate-300">{hook}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {agentResult && agentHooks.length === 0 && (
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-200">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                      Raw Agent Output
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-slate-300">
                      {agentResult}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-3">
              {topPick && (
                <>
                  <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-900/20 lg:col-span-2">
                    <div className="flex items-center gap-3 text-cyan-300">
                      <TrendingUp className="h-5 w-5" />
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                        Top Algorithm Pick
                      </p>
                    </div>
                    <p className="mt-5 text-3xl font-semibold text-white">
                      {topPick.teams}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {topPick.play} · Confidence: {topPick.confidence}
                    </p>
                  </article>
                  <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-900/20">
                    <div className="flex items-center gap-3 text-emerald-300">
                      <Trophy className="h-5 w-5" />
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                        Confidence Score
                      </p>
                    </div>
                    <p className="mt-5 text-3xl font-semibold text-white">
                      {topPick.confidence}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Market edge detected from odds aggregation
                    </p>
                  </article>
                  <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-900/20">
                    <div className="flex items-center gap-3 text-sky-300">
                      <Shield className="h-5 w-5" />
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                        Best Bets
                      </p>
                    </div>
                    <div className="mt-5 space-y-4 text-sm text-slate-200">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                          Moneyline
                        </p>
                        <p className="mt-2 text-base font-semibold text-white">
                          {bestBets.moneyline}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                          Pick Winner
                        </p>
                        <p className="mt-2 text-base font-semibold text-white">
                          {bestBets.pickWinner}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                          Spread
                        </p>
                        <p className="mt-2 text-base font-semibold text-white">
                          {bestBets.spread}
                        </p>
                      </div>
                    </div>
                  </article>
                </>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-900/20">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Interactive match matrix
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    {loading ? "Loading events..." : "Live value plays"}
                  </h2>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-300">
                  <BarChart3 className="h-4 w-4 text-cyan-300" />
                  Real-time odds from top sportsbooks
                </div>
              </div>

              {loading ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-8 text-center">
                  <RefreshCw className="mx-auto h-8 w-8 animate-spin text-cyan-300" />
                  <p className="mt-4 text-slate-400">
                    Fetching live sports data...
                  </p>
                </div>
              ) : matchups.length === 0 ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-8 text-center">
                  <AlertCircle className="mx-auto h-8 w-8 text-amber-300" />
                  <p className="mt-4 text-slate-400">
                    No events available at this time
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-950/90 text-slate-400">
                      <tr>
                        <th className="px-4 py-4">Event</th>
                        <th className="px-4 py-4">Sport</th>
                        <th className="px-4 py-4">Play</th>
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
                            row.id === selectedId
                              ? "bg-slate-900/90"
                              : "hover:bg-slate-900/70"
                          }`}
                          onClick={() => setSelectedId(row.id)}
                        >
                          <td className="px-4 py-4 align-middle text-sm text-slate-100">
                            <div className="font-semibold text-white">
                              {row.teams}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-200">
                            {row.sport}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-200">
                            {row.play}
                          </td>
                          <td className="px-4 py-4 text-sm text-emerald-300">
                            {row.confidence}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${
                                tierStyles[row.tier]
                              }`}
                            >
                              {row.tier}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-200">
                            {row.odds}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
