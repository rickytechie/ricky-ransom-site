"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ContextualAggregator } from "./ContextualAggregator";
import { SentimentStream } from "./SentimentStream";
import { StrategyMatrix } from "./StrategyMatrix";
import { TickerTape } from "./TickerTape";
import {
  dataSources,
  investorPersonas,
  marketAssets,
  sentimentHeadlines,
  strategiesByPersona,
} from "./data";

export default function TradematePage() {
  const [tickerSymbol, setTickerSymbol] = useState("NVDA");
  const [showDemo, setShowDemo] = useState(true);

  const marketOverview = useMemo(() => marketAssets.slice(0, 10), []);

  const signalSummary = useMemo(
    () => ({
      title: "AI Precision Confidence",
      description: "Top signals are generated from cross-domain macro analysis and real-time market momentum.",
      score: 96.4,
      trend: "+14.2%",
    }),
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#9333ea]/20 via-transparent to-transparent opacity-75" />
      <div className="pointer-events-none fixed right-0 top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="space-y-1">
            <a href="/" className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-violet-300 transition">
              ← Back
            </a>
            <h1 className="text-xl font-semibold tracking-tight text-white">Trademate</h1>
          </div>
          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#dashboard" className="transition hover:text-violet-300">Dashboard</a>
            <a href="#sentiment" className="transition hover:text-violet-300">Sentiment</a>
            <a href="#strategy" className="transition hover:text-violet-300">Strategy</a>
          </div>
        </div>
      </header>

      <section id="dashboard" className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-violet-500/10">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_0.8fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-violet-300/80">Enterprise Fintech Intelligence</p>
              <h2 className="text-4xl font-semibold text-white sm:text-5xl">Trademate — Multi-Market Macro Trading Dashboard</h2>
              <p className="max-w-3xl text-slate-300">
                A high-fidelity trader console built for Nasdaq, DOW, NYSE, gold, crude, and crypto market flows. It merges AI-driven signal inference with enterprise-grade monitoring and strategy output.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Signal Consensus</p>
                <p className="mt-3 text-4xl font-semibold text-cyan-300">{signalSummary.score}%</p>
                <p className="mt-2 text-sm text-slate-400">AI precision engine confidence</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Performance Trend</p>
                <p className="mt-3 text-4xl font-semibold text-white">{signalSummary.trend}</p>
                <p className="mt-2 text-sm text-slate-400">Macro alpha capture rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:pb-14">
        <TickerTape assets={marketAssets} />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:pb-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Market Overview</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Multi-Asset Market Colors</h2>
                </div>
                <div className="rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-200">
                  Live market pulse
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {marketOverview.map((asset) => (
                  <button
                    key={asset.symbol}
                    type="button"
                    onClick={() => setTickerSymbol(asset.symbol)}
                    className={`group rounded-[1.75rem] border p-4 text-left transition ${
                      tickerSymbol === asset.symbol
                        ? "border-cyan-300/40 bg-cyan-400/5"
                        : "border-white/10 bg-black/60 hover:border-cyan-300/30 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{asset.category.toUpperCase()}</p>
                        <p className="mt-2 text-xl font-semibold text-white">{asset.symbol}</p>
                        <p className="text-sm text-slate-400">{asset.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">
                          {asset.category === "crypto" ? "$" : ""}
                          {asset.price.toFixed(2)}
                        </p>
                        <p className={`text-sm font-semibold ${
                          asset.changeDirection === "up" ? "text-green-400" : "text-red-400"
                        }`}>
                          {asset.change > 0 ? "+" : ""}
                          {asset.change.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-violet-300/80">AI Precision Signal</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Live Confidence Dashboard</h2>
                </div>
                <div className="rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm text-slate-200">
                  {signalSummary.trend}
                </div>
              </div>
              <p className="mt-4 text-slate-300">Signal strength and allocation bias are updated continuously from macro risk and flow analytics.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.75rem] border border-white/10 bg-black/60 p-5 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Confidence</p>
                  <p className="mt-3 text-4xl font-semibold text-cyan-300">{signalSummary.score}%</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-black/60 p-5 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Selected Ticker</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{tickerSymbol}</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-black/60 p-5 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Mode</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Macro Alpha</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-violet-300/80">AI Contextual Core</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">100-Source Aggregator</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDemo((prev) => !prev)}
                  className="rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-200 transition hover:border-cyan-300/40"
                >
                  {showDemo ? "Hide" : "Show"}
                </button>
              </div>
              <p className="mt-4 text-slate-300">A premium interface that visualizes the engine's multi-domain signal ingestion and contextual analysis architecture.</p>
            </div>

            {showDemo && (
              <ContextualAggregator dataSources={dataSources} totalSources={dataSources.reduce((sum, row) => sum + row.count, 0)} />
            )}

            <SentimentStream headlines={sentimentHeadlines} />
          </div>
        </div>
      </section>

      <section id="strategy" className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
          <p className="text-xs uppercase tracking-[0.35em] text-violet-300/80">Strategy Simulator</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">Persona-Based Recommendation Matrix</h2>
          <p className="mt-4 text-slate-300">Interact with the model to create customized macro strategies for different investor archetypes.</p>

          <div className="mt-8">
            <StrategyMatrix personas={investorPersonas} strategies={strategiesByPersona} />
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-16 text-slate-300">
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-violet-300/80">Trademate</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Elite Fintech Intelligence</h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">A premium dashboard built for enterprise teams that need fast, actionable macro insights across exchanges, commodities, and crypto.</p>
          </div>
          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-black/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Market Coverage</p>
            <p className="text-lg font-semibold text-white">Nasdaq · DOW · NYSE · Gold · Crude · BTC · ETH</p>
          </div>
          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-black/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Delivery</p>
            <p className="text-lg font-semibold text-white">Real-time dashboards · AI signal synthesis · strategy templating</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
