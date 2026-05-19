"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvestorPersona, InvestmentStrategy } from "./types";

interface StrategyMatrixProps {
  personas: InvestorPersona[];
  strategies: Record<string, InvestmentStrategy[]>;
}

export const StrategyMatrix: React.FC<StrategyMatrixProps> = ({ personas, strategies }) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState(personas[0].id);
  const [expandedStrategyId, setExpandedStrategyId] = useState<string | null>(null);

  const selectedPersona = personas.find((p) => p.id === selectedPersonaId)!;
  const selectedStrategies = strategies[selectedPersonaId] || [];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-500/10 border-green-500/30 text-green-300";
      case "medium":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-300";
      case "high":
        return "bg-red-500/10 border-red-500/30 text-red-300";
      default:
        return "bg-slate-500/10 border-slate-500/30 text-slate-300";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
      <div className="mb-8 space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">5-Tier Recommendation Matrix</p>
        <h3 className="text-2xl font-semibold text-white">AI-Customized Investment Strategies</h3>
        <p className="text-slate-400">
          Select your investor profile to see personalized strategies with risk/reward analysis
        </p>
      </div>

      {/* Persona Selector */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {personas.map((persona) => (
          <motion.button
            key={persona.id}
            onClick={() => setSelectedPersonaId(persona.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative overflow-hidden rounded-[1.75rem] border px-4 py-5 text-left transition ${
              selectedPersonaId === persona.id
                ? "border-violet-400/60 bg-violet-500/20 shadow-lg shadow-violet-500/30"
                : "border-white/10 bg-black/70 hover:border-violet-400/30"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/0 opacity-0 transition group-hover:opacity-100" />
            <div className="relative space-y-2">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{persona.timeHorizon}</p>
              <p className="font-semibold text-white text-sm">{persona.name}</p>
              <div className={`inline-flex rounded-full border ${getRiskColor(persona.riskProfile)} px-2 py-1 text-xs font-medium`}>
                {persona.riskProfile} Risk
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Selected Persona Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPersonaId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="mb-8 rounded-[1.75rem] border border-violet-400/20 bg-violet-500/5 p-6"
        >
          <h4 className="text-lg font-semibold text-white">{selectedPersona.name}</h4>
          <p className="mt-2 text-sm text-slate-300">{selectedPersona.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedPersona.preferredAssets.map((asset) => (
              <span
                key={asset}
                className="inline-flex rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-medium text-cyan-200"
              >
                {asset}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Strategies Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {selectedStrategies.map((strategy, idx) => (
          <motion.div
            key={strategy.id}
            variants={itemVariants}
            className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/70 transition hover:border-violet-400/30 hover:bg-black/90"
          >
            <motion.button
              onClick={() =>
                setExpandedStrategyId(expandedStrategyId === strategy.id ? null : strategy.id)
              }
              className="w-full px-6 py-5 text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/10 font-semibold text-violet-200 text-sm">
                      {idx + 1}
                    </span>
                    <h4 className="font-semibold text-white">{strategy.title}</h4>
                  </div>
                  <p className="text-sm text-slate-400">{strategy.description}</p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                      Confidence
                    </p>
                    <p className="text-lg font-bold text-cyan-300">{strategy.confidenceScore}%</p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedStrategyId === strategy.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl text-slate-400"
                  >
                    ▼
                  </motion.div>
                </div>
              </div>
            </motion.button>

            <AnimatePresence>
              {expandedStrategyId === strategy.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-white/10"
                >
                  <div className="px-6 py-6 space-y-6">
                    {/* Risk/Reward and Asset Allocation */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-400 mb-2">
                          Risk / Reward Ratio
                        </p>
                        <p className="text-2xl font-bold text-white">{strategy.riskReward}</p>
                        <p className="text-xs text-slate-500 mt-2">Return per unit of risk</p>
                      </div>

                      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-400 mb-2">
                          Allocation Breakdown
                        </p>
                        <div className="flex gap-1 h-3 rounded-full overflow-hidden mt-2">
                          {strategy.allocations.map((alloc) => (
                            <div
                              key={alloc.asset}
                              style={{ width: `${alloc.percentage}%` }}
                              className={`${alloc.color} transition group-hover:opacity-80`}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-slate-500 mt-2 space-y-1">
                          {strategy.allocations.map((alloc) => (
                            <div key={alloc.asset} className="flex justify-between">
                              <span>{alloc.asset}</span>
                              <span className="font-semibold">{alloc.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Rationale */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.32em] text-slate-400 mb-2">
                        AI Precision Rationale
                      </p>
                      <p className="text-sm text-slate-200 leading-relaxed">{strategy.rationale}</p>
                    </div>

                    {/* Top Tickers */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.32em] text-slate-400 mb-3">
                        Top Ticker Recommendations
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {strategy.topTickers.map((ticker) => (
                          <motion.span
                            key={ticker}
                            whileHover={{ y: -2 }}
                            className="inline-flex rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-cyan-400/30 px-4 py-2 font-semibold text-cyan-200 text-sm hover:border-cyan-400/60 transition"
                          >
                            {ticker}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary */}
      <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-black/50 p-6">
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-white">Note:</span> Each strategy is tailored to{" "}
          <span className="text-cyan-300 font-semibold">{selectedPersona.name}</span> profiles with
          AI-calculated confidence scores based on historical backtests, market regime analysis, and
          real-time sentiment feeds. Allocations should be personalized based on your risk tolerance.
        </p>
      </div>
    </div>
  );
};
