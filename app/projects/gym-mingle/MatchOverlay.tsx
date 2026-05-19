"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserProfile } from "./types";

interface MatchOverlayProps {
  isOpen: boolean;
  profile: UserProfile | null;
  onClose: () => void;
  onProceedToDateGenerator: () => void;
}

export function MatchOverlay({
  isOpen,
  profile,
  onClose,
  onProceedToDateGenerator,
}: MatchOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && profile && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
          />

          {/* Match Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-w-2xl w-full">
              {/* Animated Hearts Background */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      x: Math.random() * 200 - 100,
                      y: Math.random() * 200 - 100,
                    }}
                    animate={{
                      opacity: [1, 0],
                      scale: [1, 1.5, 0],
                      y: [0, -100],
                      x: [0, Math.random() * 100 - 50],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    className="absolute text-4xl"
                  >
                    💕
                  </motion.div>
                ))}
              </div>

              {/* Main Content Card */}
              <motion.div
                className="relative rounded-3xl border-2 border-pink-400/50 bg-gradient-to-br from-pink-600/20 via-purple-600/10 to-violet-600/20 p-8 sm:p-12 text-center shadow-2xl shadow-pink-500/30 backdrop-blur-xl"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl blur-3xl bg-gradient-to-r from-pink-500/30 to-violet-500/30 -z-10 animate-pulse" />

                {/* Profile Images Overlap */}
                <div className="relative flex justify-center items-end mb-8 h-32">
                  <motion.div
                    initial={{ x: 40, rotateZ: -15 }}
                    animate={{ x: 40, rotateZ: -15 }}
                    className="absolute"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-cyan-400 overflow-hidden shadow-lg">
                      <img
                        src={profile.imageUrl}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="text-6xl sm:text-7xl"
                  >
                    💕
                  </motion.div>

                  <motion.div
                    initial={{ x: -40, rotateZ: 15 }}
                    animate={{ x: -40, rotateZ: 15 }}
                    className="absolute"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-violet-400 overflow-hidden shadow-lg flex items-center justify-center bg-gradient-to-br from-violet-600 to-purple-700">
                      <span className="text-5xl">😊</span>
                    </div>
                  </motion.div>
                </div>

                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4 mt-8"
                >
                  <motion.h2
                    className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                  >
                    It's a Match!
                  </motion.h2>

                  <p className="text-lg sm:text-xl text-white font-semibold">
                    You and{" "}
                    <span className="text-pink-300 font-bold">{profile.name}</span> are a
                    perfect fit! 🔥
                  </p>

                  <p className="text-slate-300 text-sm sm:text-base">
                    {profile.matchScore}% compatibility with shared passion for{" "}
                    <span className="text-cyan-300 font-semibold">
                      {profile.fitnessActivities[0].name}
                    </span>
                    {" "}and great vibes
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 sm:mt-10 space-y-3 flex flex-col"
                >
                  <button
                    onClick={onProceedToDateGenerator}
                    className="relative w-full rounded-2xl border-2 border-pink-400 bg-gradient-to-r from-pink-600 to-violet-600 px-6 py-3 sm:py-4 text-base sm:text-lg font-bold text-white shadow-lg shadow-pink-500/50 transition hover:shadow-pink-500/70 hover:scale-105 active:scale-95"
                  >
                    <span className="relative z-10">Generate Your 3-Stage Date 📅</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full rounded-2xl border-2 border-slate-500 bg-slate-900/50 px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-slate-300 transition hover:border-slate-400 hover:bg-slate-800/50"
                  >
                    Keep Swiping
                  </button>
                </motion.div>

                {/* Decoration */}
                <div className="mt-6 flex justify-center gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                      className="text-2xl"
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
