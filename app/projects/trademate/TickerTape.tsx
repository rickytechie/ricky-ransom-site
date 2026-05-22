"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MarketAsset } from "./types";

interface TickerTapeProps {
  assets: MarketAsset[];
}

export const TickerTape: React.FC<TickerTapeProps> = ({ assets }) => {
  const [displayAssets, setDisplayAssets] = useState<MarketAsset[]>(assets);

  useEffect(() => {
    // Simulate live price updates every 2 seconds
    const interval = setInterval(() => {
      setDisplayAssets((prev) =>
        prev.map((asset) => {
          const change = (Math.random() - 0.5) * 2;
          return {
            ...asset,
            price: asset.price + change,
            change: asset.change + (Math.random() - 0.5) * 0.5,
            changeDirection: asset.change > 0 ? "up" : asset.change < 0 ? "down" : "neutral",
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const duplicatedAssets = [...displayAssets, ...displayAssets];

  return (
    <div className="relative overflow-hidden border border-white/10 bg-black/60 backdrop-blur-sm">
      <div className="flex items-center gap-1 overflow-x-hidden py-3">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex min-w-max gap-4 px-4"
        >
          {duplicatedAssets.map((asset, idx) => (
            <div
              key={`${asset.symbol}-${idx}`}
              className="flex min-w-max items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-4 py-2"
            >
              <div>
                <p className="text-xs font-bold uppercase text-cyan-300">{asset.symbol}</p>
                <p className="text-sm text-slate-300">{asset.name}</p>
              </div>
              <div className="border-l border-white/10 pl-3">
                <p className="text-sm font-semibold text-white">
                  {asset.category === "crypto" ? "$" : ""}
                  {asset.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-1">
                  {asset.changeDirection === "up" ? (
                    <span className="text-lg text-green-400">📈</span>
                  ) : (
                    <span className="text-lg text-red-400">📉</span>
                  )}
                  <span
                    className={`text-xs font-bold ${
                      asset.changeDirection === "up"
                        ? "text-green-400"
                        : asset.changeDirection === "down"
                          ? "text-red-400"
                          : "text-slate-400"
                    }`}
                  >
                    {asset.change > 0 ? "+" : ""}
                    {asset.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient overlays for visual effect */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
};
