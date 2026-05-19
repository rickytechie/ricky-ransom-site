"use client";

import React from "react";
import { motion } from "framer-motion";
import { DataSource } from "./types";

interface ContextualAggregatorProps {
  dataSources: DataSource[];
  totalSources: number;
}

export const ContextualAggregator: React.FC<ContextualAggregatorProps> = ({
  dataSources,
  totalSources,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500">
            <span className="text-xl">🧠</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">
              100+ Source Contextual Core
            </p>
            <h3 className="text-2xl font-semibold text-white">AI Aggregation Engine</h3>
          </div>
        </div>
        <p className="text-slate-400">
          Real-time ingestion from {totalSources}+ financial, geopolitical, scientific, and market intelligence feeds
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        {dataSources.map((source) => (
          <motion.div
            key={source.id}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/50 p-6 transition hover:border-violet-400/30 hover:bg-black/70"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/0 opacity-0 transition group-hover:opacity-100" />

            <div className="relative space-y-4">
              <div className="text-4xl">{source.icon}</div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-white">{source.category}</p>
                <p className="text-xs text-slate-400">{source.description}</p>
              </div>

              <div className="flex items-baseline gap-2 border-t border-white/10 pt-4">
                <p className="text-2xl font-bold text-cyan-300">{source.count}</p>
                <p className="text-xs text-slate-500">Sources</p>
              </div>

              {/* Progress bar */}
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(source.count / totalSources) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3 rounded-[1.5rem] border border-white/10 bg-black/70 p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-violet-300/80">Update Frequency</p>
          <p className="text-2xl font-bold text-white">Real-Time</p>
          <p className="text-xs text-slate-400">Every 30 seconds</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Data Coverage</p>
          <p className="text-2xl font-bold text-white">{totalSources}+</p>
          <p className="text-xs text-slate-400">Global sources monitored</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-pink-300/80">Processing</p>
          <p className="text-2xl font-bold text-white">Sub-100ms</p>
          <p className="text-xs text-slate-400">ML latency optimized</p>
        </div>
      </div>
    </div>
  );
};
