"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { CardStack } from "./CardStack";
import { MatchOverlay } from "./MatchOverlay";
import { DateGenerator } from "./DateGenerator";
import { userProfiles } from "./data-profiles";
import { nycVenues } from "./data-venues";
import { UserProfile, SwipeAction } from "./types";

export default function GymMingleShowcase() {
  // State Management
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState<number[]>([]);
  const [matchedProfile, setMatchedProfile] = useState<UserProfile | null>(null);
  const [showMatchOverlay, setShowMatchOverlay] = useState(false);
  const [showDateGenerator, setShowDateGenerator] = useState(false);
  const [swipeStats, setSwipeStats] = useState({ passes: 0, likes: 0 });

  // Handle swipe actions
  const handleSwipe = useCallback((action: SwipeAction) => {
    if (action.type === "like") {
      setLikedProfiles((prev) => [...prev, action.profileId]);
      setSwipeStats((prev) => ({ ...prev, likes: prev.likes + 1 }));
    } else {
      setSwipeStats((prev) => ({ ...prev, passes: prev.passes + 1 }));
    }
    setCurrentProfileIndex((prev) => prev + 1);
  }, []);

  // Handle match trigger
  const handleMatch = useCallback((profileId: number) => {
    const profile = userProfiles.find((p) => p.id === profileId);
    if (profile) {
      setMatchedProfile(profile);
      setShowMatchOverlay(true);
    }
  }, []);

  // Handle proceed to date generator
  const handleProceedToDateGenerator = () => {
    setShowMatchOverlay(false);
    setShowDateGenerator(true);
  };

  // Handle date generator close
  const handleDateGeneratorClose = () => {
    setShowDateGenerator(false);
    setShowMatchOverlay(false);
    // Reset to continue swiping
    setMatchedProfile(null);
  };

  // Handle panic button
  const handlePanicButton = () => {
    console.log("🚨 Emergency alert triggered with location data");
  };

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
              Gym Mingle: Live Tinder for Fitness
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <p className="text-xs uppercase tracking-wider text-slate-400">Swipes</p>
              <p className="text-lg font-bold text-white">
                {swipeStats.passes + swipeStats.likes}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-2xl">💚</span>
              <span className="text-sm font-semibold text-pink-300">{swipeStats.likes}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="relative mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
            <span className="inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-sm uppercase tracking-[0.35em] text-violet-200">
              ✨ Live Interactive Demo
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight text-white">
              Experience Gym Mingle's Tinder-Style Swiping
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Drag, swipe, and connect with real fitness enthusiasts in NYC. Match with compatible
              partners and discover personalized 3-stage dates across the city's best venues.
            </p>
          </div>

          {/* Swiping Interface */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Card Stack - Main Swiping Area */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Profile {currentProfileIndex + 1} of {userProfiles.length}
                  </h3>
                  <div className="text-sm text-slate-400">
                    {currentProfileIndex >= userProfiles.length && (
                      <span className="text-violet-300">All profiles explored!</span>
                    )}
                  </div>
                </div>

                <CardStack
                  profiles={userProfiles}
                  currentIndex={currentProfileIndex}
                  onSwipe={handleSwipe}
                  onMatch={handleMatch}
                />

                {/* Manual Swipe Buttons */}
                {currentProfileIndex < userProfiles.length && (
                  <div className="flex gap-4 justify-center pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSwipe({ type: "pass", profileId: userProfiles[currentProfileIndex].id, direction: "left" })}
                      className="rounded-full border border-slate-400 bg-slate-500/10 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-500/20"
                    >
                      ✕ Pass
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleSwipe({ type: "like", profileId: userProfiles[currentProfileIndex].id, direction: "right" });
                        handleMatch(userProfiles[currentProfileIndex].id);
                      }}
                      className="rounded-full border border-pink-400 bg-pink-500/20 px-6 py-3 text-sm font-semibold text-pink-300 transition hover:bg-pink-500/30"
                    >
                      ♥ Like & Match!
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Stats & Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {/* Stats Card */}
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Your Activity</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Profiles Viewed</span>
                    <span className="font-bold text-white">{currentProfileIndex}</span>
                  </div>
                  <motion.div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentProfileIndex / userProfiles.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-2xl">💚</span>
                    <div className="flex-1">
                      <p className="text-slate-400">Likes</p>
                      <p className="font-bold text-white">{swipeStats.likes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-2xl">👋</span>
                    <div className="flex-1">
                      <p className="text-slate-400">Passes</p>
                      <p className="font-bold text-white">{swipeStats.passes}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Venues */}
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">NYC Venue Categories</h3>
                <div className="space-y-2">
                  {nycVenues.slice(0, 5).map((category) => (
                    <motion.div
                      key={category.name}
                      whileHover={{ x: 4 }}
                      className="rounded-lg bg-white/5 border border-white/10 p-3 text-sm cursor-pointer transition hover:border-violet-400/50"
                    >
                      <p className="font-semibold text-white">
                        {category.icon} {category.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {category.venues.length} venues
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div className="rounded-[1.75rem] border border-violet-400/30 bg-violet-500/10 p-6 space-y-3">
                <h3 className="font-semibold text-white text-sm">How It Works</h3>
                <ol className="space-y-2 text-xs text-slate-300">
                  <li>✓ 1. Swipe left to pass, right to like</li>
                  <li>✓ 2. Get matched with compatible profiles</li>
                  <li>✓ 3. Generate custom 3-stage dates</li>
                  <li>✓ 4. Explore real NYC venues together</li>
                </ol>
              </div>
            </motion.div>
          </div>

          {/* Bottom Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="text-2xl mb-2">🧘‍♀️</div>
              <h3 className="font-semibold text-white mb-1">8+ Fitness Profiles</h3>
              <p className="text-xs text-slate-400">Real NYC enthusiasts with detailed bios</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-semibold text-white mb-1">50+ Real Venues</h3>
              <p className="text-xs text-slate-400">Gyms, spas, parks, shops & more</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="text-2xl mb-2">📅</div>
              <h3 className="font-semibold text-white mb-1">Custom Date Gen</h3>
              <p className="text-xs text-slate-400">3-stage itineraries across NYC</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Match Overlay */}
      <MatchOverlay
        isOpen={showMatchOverlay}
        profile={matchedProfile}
        onClose={() => setShowMatchOverlay(false)}
        onProceedToDateGenerator={handleProceedToDateGenerator}
      />

      {/* Date Generator */}
      <DateGenerator
        isOpen={showDateGenerator}
        matchedProfile={matchedProfile}
        onClose={handleDateGeneratorClose}
        onPanicButton={handlePanicButton}
      />
    </main>
  );
}
