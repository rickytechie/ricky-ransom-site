"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SentimentHeadline } from "./types";

interface SentimentStreamProps {
  headlines: SentimentHeadline[];
}

export const SentimentStream: React.FC<SentimentStreamProps> = ({ headlines }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 5000); // Change headline every 5 seconds

    return () => clearInterval(interval);
  }, [headlines.length]);

  const currentHeadline = headlines[currentIndex];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-green-400";
      case "negative":
        return "text-red-400";
      default:
        return "text-slate-300";
    }
  };

  const getImpactBg = (impact: string) => {
    switch (impact) {
      case "positive":
        return "bg-green-500/10 border-green-500/30";
      case "negative":
        return "bg-red-500/10 border-red-500/30";
      default:
        return "bg-slate-500/10 border-slate-500/30";
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return "📈";
      case "negative":
        return "📉";
      default:
        return "📊";
    }
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Live Sentiment Stream</p>
          <h3 className="text-2xl font-semibold text-white">Real-Time Headlines</h3>
        </div>
        <div className="flex gap-2">
          {headlines.map((_, idx) => (
            <motion.div
              key={idx}
              animate={{ scale: idx === currentIndex ? 1.2 : 1 }}
              className={`h-2 rounded-full transition ${
                idx === currentIndex ? "bg-cyan-400 w-8" : "bg-white/20 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentHeadline.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`space-y-6 rounded-[1.75rem] border ${getImpactBg(
            currentHeadline.impact
          )} p-6`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getImpactIcon(currentHeadline.impact)}</span>
                <span className={`text-xs font-bold uppercase tracking-[0.35em] ${getImpactColor(
                  currentHeadline.impact
                )}`}>
                  {currentHeadline.impact}
                </span>
              </div>
              <p className="text-lg font-semibold text-white leading-relaxed">
                {currentHeadline.text}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                {currentHeadline.category}
              </span>
              <span className="text-xs text-slate-500">{currentHeadline.timestamp}</span>
            </div>
            <div className="text-xs text-slate-400">
              {currentIndex + 1} / {headlines.length}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Headline Queue Preview */}
      <div className="mt-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Next Headlines</p>
        <div className="space-y-2">
          {headlines
            .slice(currentIndex + 1, Math.min(currentIndex + 4, headlines.length))
            .map((headline, idx) => (
              <motion.div
                key={headline.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 rounded-lg border border-white/5 bg-black/50 px-4 py-3"
              >
                <span className="mt-0.5 text-lg">{getImpactIcon(headline.impact)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400 truncate">{headline.text}</p>
                  <p className="text-xs text-slate-600 mt-1">{headline.timestamp}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};
