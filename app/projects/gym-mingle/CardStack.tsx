"use client";

import { motion } from "framer-motion";
import { UserProfile, SwipeAction } from "./types";

interface CardStackProps {
  profiles: UserProfile[];
  currentIndex: number;
  onSwipe: (action: SwipeAction) => void;
  onMatch?: (profileId: number) => void;
}

export function CardStack({ profiles, currentIndex, onSwipe, onMatch }: CardStackProps) {
  const currentProfile = profiles[currentIndex];

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50; // pixels to trigger swipe

    if (info.offset.x > threshold) {
      // Swiped right (like)
      onSwipe({
        type: "like",
        profileId: currentProfile.id,
        direction: "right",
      });
      onMatch?.(currentProfile.id);
    } else if (info.offset.x < -threshold) {
      // Swiped left (pass)
      onSwipe({
        type: "pass",
        profileId: currentProfile.id,
        direction: "left",
      });
    }
  };

  if (!currentProfile) {
    return (
      <div className="flex items-center justify-center h-96 rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
        <p className="text-xl font-semibold text-slate-300">No more profiles to explore</p>
      </div>
    );
  }

  return (
    <div className="relative h-96 sm:h-[600px] perspective">
      <motion.div
        key={currentProfile.id}
        drag
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        initial={{ opacity: 0, scale: 0.95, rotateY: 20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.95, rotateY: -20 }}
        whileHover={{ scale: 1.02 }}
        className="absolute inset-0 w-full cursor-grab active:cursor-grabbing"
      >
        <div className="relative h-full rounded-[2.5rem] border border-violet-400/30 bg-gradient-to-br from-violet-500/10 to-transparent p-6 sm:p-8 shadow-2xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-50" />

          {/* Profile Image */}
          <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden mb-6 flex-shrink-0">
            <img
              src={currentProfile.imageUrl}
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Match Score Badge */}
            <div className="absolute top-4 right-4 rounded-full bg-cyan-500/80 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
              {currentProfile.matchScore}% Match
            </div>

            {/* Spicy Tier Badge */}
            <div className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold text-white backdrop-blur-sm flex items-center gap-1"
              style={{
                backgroundColor:
                  currentProfile.spicyTier === "Vanilla"
                    ? "rgba(255, 255, 255, 0.3)"
                    : currentProfile.spicyTier === "Adventurous"
                    ? "rgba(245, 158, 11, 0.6)"
                    : currentProfile.spicyTier === "Spicy"
                    ? "rgba(239, 68, 68, 0.6)"
                    : "rgba(217, 70, 239, 0.6)",
              }}
            >
              🔥 {currentProfile.spicyTier}
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">{currentProfile.name}</h2>
                  <p className="text-sm text-slate-400 mt-1">{currentProfile.location}</p>
                </div>
              </div>
              <p className="mt-3 text-slate-300 text-sm sm:text-base line-clamp-2">{currentProfile.bio}</p>
              <p className="mt-2 text-violet-300 italic text-sm">"{currentProfile.motto}"</p>
            </div>

            {/* Fitness Activities */}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-violet-300/80">Top Activities</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentProfile.fitnessActivities.slice(0, 4).map((activity) => (
                  <div
                    key={activity.name}
                    className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300 border border-cyan-400/20"
                  >
                    {activity.icon} {activity.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-white/5 border border-white/10 p-2">
                <p className="text-violet-300/80 uppercase tracking-wider">Cuisine</p>
                <p className="text-white text-xs sm:text-sm mt-1">{currentProfile.cuisinePreference}</p>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-2">
                <p className="text-violet-300/80 uppercase tracking-wider">Vibe</p>
                <p className="text-white text-xs sm:text-sm mt-1">{currentProfile.dateVibe}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Drag Hint */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center text-xs text-slate-500 pointer-events-none">
        <p>Drag left to pass • Drag right to like</p>
      </div>
    </div>
  );
}
