"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GameEngine } from "./GameEngine";

export default function SuperSamuraiShowcase() {
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated Background Gradients */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#9333ea]/20 via-transparent to-transparent opacity-75" />
      <div className="pointer-events-none fixed right-0 top-28 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none fixed left-0 bottom-0 h-80 w-80 rounded-full bg-pink-400/10 blur-3xl" />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="space-y-1">
            <a
              href="/"
              className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-violet-300 transition"
            >
              ← Back
            </a>
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Super Samurai: Land of Yotei
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="relative mx-auto max-w-5xl px-4 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
            <span className="inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-sm uppercase tracking-[0.35em] text-violet-200">
              ✨ Custom Physics Engine
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight text-white">
              Super Samurai
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              A premium 2D platformer showcasing custom physics, collision detection, and AI. Play as <span className="text-cyan-300 font-bold">Rai</span>, a samurai ronin, to rescue the Princess from the Shogun's fortress in the historic Land of Yotei.
            </p>
          </div>

          {/* Arcade Cabinet Wrapper */}
          <div className="rounded-[2rem] border-4 border-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 bg-slate-950 p-6 shadow-2xl shadow-violet-500/40 overflow-hidden">
            {/* Cabinet bezel */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-black p-4 shadow-inner">
              {/* Top info bar */}
              <div className="mb-4 flex justify-between items-center px-4 py-2 bg-black/50 rounded-lg border border-white/10">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Score</p>
                  <p className="text-2xl font-bold text-yellow-400">{score.toString().padStart(6, "0")}</p>
                </div>

                {/* Health Bar */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Health</p>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: health > i ? 1 : 0.7 }}
                        className={`w-6 h-6 text-lg ${health > i ? "opacity-100" : "opacity-20"}`}
                      >
                        ❤️
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Status</p>
                  <p className="text-sm font-bold text-cyan-300">Ready</p>
                </div>
              </div>

              {/* Game Container */}
              <div className="relative bg-black rounded-xl overflow-hidden border-2 border-violet-500/50 shadow-inner">
                <GameEngine onScoreChange={setScore} onHealthChange={setHealth} />
              </div>

              {/* Control Instructions */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300">
                <div className="p-2 bg-black/50 rounded border border-white/10">
                  <p className="font-semibold text-white">Move</p>
                  <p className="text-xs">← → / A D</p>
                </div>
                <div className="p-2 bg-black/50 rounded border border-white/10">
                  <p className="font-semibold text-white">Jump</p>
                  <p className="text-xs">SPACE / W</p>
                </div>
                <div className="p-2 bg-black/50 rounded border border-white/10">
                  <p className="font-semibold text-white">Attack</p>
                  <p className="text-xs">F / Click</p>
                </div>
                <div className="p-2 bg-black/50 rounded border border-white/10">
                  <p className="font-semibold text-white">Objective</p>
                  <p className="text-xs">Rescue Princess</p>
                </div>
              </div>
            </div>
          </div>

          {/* Game Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 space-y-2">
              <div className="text-2xl">🗾</div>
              <h3 className="font-semibold text-white">Land of Yotei</h3>
              <p className="text-xs text-slate-400">Journey through feudal Japanese landscapes to the Shogun's fortress</p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 space-y-2">
              <div className="text-2xl">⚙️</div>
              <h3 className="font-semibold text-white">Physics Engine</h3>
              <p className="text-xs text-slate-400">Custom 2D gravity, collision detection, and rigid body dynamics</p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 space-y-2">
              <div className="text-2xl">🤖</div>
              <h3 className="font-semibold text-white">Enemy AI</h3>
              <p className="text-xs text-slate-400">Ashigaru guards with patrol logic and player detection</p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 space-y-2">
              <div className="text-2xl">⚔️</div>
              <h3 className="font-semibold text-white">Combat System</h3>
              <p className="text-xs text-slate-400">Katana attacks with hitbox detection and cooldown management</p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 space-y-2">
              <div className="text-2xl">💰</div>
              <h3 className="font-semibold text-white">Collectibles</h3>
              <p className="text-xs text-slate-400">Koban coins (10pts) and Mon crests (50pts) for bonus score</p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 space-y-2">
              <div className="text-2xl">📱</div>
              <h3 className="font-semibold text-white">Responsive</h3>
              <p className="text-xs text-slate-400">Touch-optimized controls for mobile and desktop play</p>
            </div>
          </motion.div>

          {/* Feature Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">🎮 Core Gameplay</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-cyan-300 font-semibold">Player: Rai the Samurai</p>
                  <p className="text-xs text-slate-300">
                    A skilled ronin with 3 health points. Navigate through multi-tiered platforms while defeating enemies and collecting treasure.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-pink-300 font-semibold">Enemies: Ashigaru Guards</p>
                  <p className="text-xs text-slate-300">
                    Three enemy units with patrol AI. They detect and chase the player within range. Defeat them with katana attacks.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">⚙️ Technical Architecture</h3>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <span className="text-violet-300 font-semibold">Game Loop:</span> requestAnimationFrame-based main loop with physics updates and rendering
                </p>
                <p>
                  <span className="text-violet-300 font-semibold">Collision Detection:</span> AABB (Axis-Aligned Bounding Box) collision system for platforms, enemies, and collectibles
                </p>
                <p>
                  <span className="text-violet-300 font-semibold">Physics:</span> Gravity, velocity, acceleration, and friction calculations with ground detection
                </p>
                <p>
                  <span className="text-violet-300 font-semibold">AI System:</span> Patrol/chase state machine with detection range and movement vectors
                </p>
                <p>
                  <span className="text-violet-300 font-semibold">Input Handling:</span> Keyboard events with state tracking for smooth movement and attack timing
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">🎨 Design Elements</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-yellow-300 font-semibold">📍 Platforms</p>
                  <p className="text-xs text-slate-300">
                    Castle wall platforms with tile-roof aesthetic. Strategic layout creates skill-based progression.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-yellow-300 font-semibold">💎 Collectibles</p>
                  <p className="text-xs text-slate-300">
                    Koban gold coins and Mon clan crests provide scoring and reward exploration.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-[2rem] border border-gradient-to-r from-violet-400/30 to-pink-400/30 bg-gradient-to-br from-violet-500/10 to-pink-500/10 p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Master the Land of Yotei?</h3>
            <p className="text-slate-300 mb-6">
              This is a fully playable game demonstrating custom physics, AI, collision detection, and responsive design—all built from scratch.
            </p>
            <a
              href="/"
              className="inline-flex rounded-[1.75rem] border border-violet-300/40 bg-violet-500/10 px-8 py-4 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/20 hover:border-violet-300/60"
            >
              Back to Portfolio
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
