"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DateItinerary, UserProfile } from "./types";
import { generateRandomItinerary } from "./data-venues";

interface DateGeneratorProps {
  isOpen: boolean;
  matchedProfile: UserProfile | null;
  onClose: () => void;
  onPanicButton?: () => void;
}

export function DateGenerator({
  isOpen,
  matchedProfile,
  onClose,
  onPanicButton,
}: DateGeneratorProps) {
  const [selectedItinerary, setSelectedItinerary] = useState<number | null>(null);
  const [showPanicActivation, setShowPanicActivation] = useState(false);
  const [itineraries, setItineraries] = useState<
    Array<{
      fitness: any;
      relaxation: any;
      dining: any;
    }>
  >([]);

  const generateItineraries = () => {
    const newItineraries = [
      generateRandomItinerary(),
      generateRandomItinerary(),
      generateRandomItinerary(),
    ];
    setItineraries(newItineraries);
    setSelectedItinerary(null);
  };

  const handlePanicButton = () => {
    setShowPanicActivation(true);
    onPanicButton?.();
    setTimeout(() => {
      setShowPanicActivation(false);
    }, 3000);
  };

  if (!matchedProfile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-30"
          />

          {/* Date Generator Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="relative w-full max-w-4xl my-8">
              {/* Header */}
              <motion.div
                className="rounded-t-3xl border border-b-0 border-violet-400/30 bg-gradient-to-r from-violet-600/20 to-purple-600/20 p-6 sm:p-8 text-center backdrop-blur-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Generate Your Perfect 3-Stage Date
                </h2>
                <p className="text-slate-300">
                  A curated NYC experience with {matchedProfile.name}
                </p>
              </motion.div>

              {/* Content */}
              <motion.div
                className="border-x border-b border-violet-400/30 bg-black/60 p-6 sm:p-8 backdrop-blur-xl space-y-8 rounded-b-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Generate Button */}
                {itineraries.length === 0 && (
                  <motion.button
                    onClick={generateItineraries}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full rounded-2xl border-2 border-gradient-to-r border-pink-400 bg-gradient-to-r from-pink-600/30 to-violet-600/30 px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:shadow-pink-500/50"
                  >
                    ✨ Generate Itineraries
                  </motion.button>
                )}

                {/* Itineraries */}
                {itineraries.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <p className="text-center text-slate-300 text-sm uppercase tracking-wider">
                      Choose one of three NYC experiences
                    </p>

                    <div className="grid gap-4 md:grid-cols-3">
                      {itineraries.map((itinerary, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() =>
                            setSelectedItinerary(selectedItinerary === idx ? null : idx)
                          }
                          whileHover={{ scale: 1.02 }}
                          className={`rounded-2xl border-2 p-4 text-left transition ${
                            selectedItinerary === idx
                              ? "border-pink-400 bg-pink-500/10 shadow-lg shadow-pink-500/30"
                              : "border-violet-400/30 bg-violet-500/5 hover:border-violet-400/50"
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="text-3xl">
                              {idx === 0
                                ? "💪"
                                : idx === 1
                                ? "🧘"
                                : "🎯"}
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-sm">Option {idx + 1}</h3>
                              <p className="text-xs text-slate-400 mt-1">
                                {itinerary.fitness.name} → {itinerary.relaxation.name} →{" "}
                                {itinerary.dining.name}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Selected Itinerary Details */}
                    {selectedItinerary !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6 space-y-6"
                      >
                        <h3 className="text-2xl font-bold text-white text-center">
                          Your Personalized Date Itinerary
                        </h3>

                        {/* Stage 1: Fitness */}
                        <ItineraryStage
                          stage={1}
                          icon="💪"
                          title="Fitness Connection"
                          description="Start with a shared workout experience"
                          venue={itineraries[selectedItinerary].fitness}
                          time="6:00 PM - 7:00 PM"
                        />

                        {/* Connector */}
                        <motion.div className="flex justify-center">
                          <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-2xl"
                          >
                            ⬇️
                          </motion.div>
                        </motion.div>

                        {/* Stage 2: Relaxation */}
                        <ItineraryStage
                          stage={2}
                          icon="🧘"
                          title="Relaxation & Recovery"
                          description="Transition into wellness and deeper connection"
                          venue={itineraries[selectedItinerary].relaxation}
                          time="7:30 PM - 8:30 PM"
                        />

                        {/* Connector */}
                        <motion.div className="flex justify-center">
                          <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                            className="text-2xl"
                          >
                            ⬇️
                          </motion.div>
                        </motion.div>

                        {/* Stage 3: Dining */}
                        <ItineraryStage
                          stage={3}
                          icon="🍽️"
                          title="Dining & Social"
                          description="Celebrate the connection over amazing cuisine"
                          venue={itineraries[selectedItinerary].dining}
                          time="9:00 PM - 11:00 PM"
                        />

                        {/* Summary */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="rounded-xl border border-green-400/30 bg-green-500/10 p-4 text-center"
                        >
                          <p className="text-sm text-green-300 font-semibold">
                            ✓ Total Duration: ~4 hours | Real NYC Venues | Curated for You
                          </p>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Regenerate Button */}
                    <motion.button
                      onClick={generateItineraries}
                      whileHover={{ scale: 1.02 }}
                      className="w-full rounded-xl border border-slate-500/50 bg-slate-900/50 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800/50"
                    >
                      🔄 Generate New Itineraries
                    </motion.button>
                  </motion.div>
                )}

                {/* Emergency Panic Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative pt-6 border-t border-red-400/20"
                >
                  <motion.button
                    onClick={handlePanicButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl border-2 border-red-500/50 bg-red-950/30 px-6 py-3 text-sm font-bold text-red-300 transition hover:bg-red-950/50 hover:border-red-500"
                  >
                    🚨 Emergency Panic Code
                  </motion.button>
                  <p className="mt-2 text-xs text-red-300/70 text-center">
                    One-tap emergency alert with location sharing
                  </p>

                  {/* Panic Activation Animation */}
                  <AnimatePresence>
                    {showPanicActivation && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 rounded-xl border-2 border-red-500 bg-red-500/20"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ duration: 0.8, repeat: 2 }}
                          className="absolute inset-0 rounded-xl border border-red-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.p
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: 2 }}
                            className="text-red-300 font-bold text-sm"
                          >
                            🚨 EMERGENCY ALERT SENT 🚨
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900/50 px-6 py-3 text-sm font-semibold text-slate-400 transition hover:bg-slate-800/50"
                >
                  ← Back to Swiping
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface ItineraryStageProps {
  stage: number;
  icon: string;
  title: string;
  description: string;
  venue: any;
  time: string;
}

function ItineraryStage({
  stage,
  icon,
  title,
  description,
  venue,
  time,
}: ItineraryStageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: stage * 0.1 }}
      className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5"
    >
      <div className="flex gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/20 text-xl shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-violet-300/80">
                Stage {stage}
              </p>
              <h4 className="text-lg font-bold text-white mt-1">{title}</h4>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">{time}</p>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-300">{description}</p>

          {/* Venue Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 rounded-lg bg-slate-900/50 border border-slate-700/50 p-3"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg mt-1">{venue.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-cyan-300">{venue.name}</p>
                <p className="text-xs text-slate-400 mt-1">{venue.address}</p>
                <p className="text-xs text-slate-500 mt-1">📍 {venue.neighborhood}</p>
                <p className="text-xs text-slate-300 mt-2 italic">{venue.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
