"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type VenueCondition = {
  id: string;
  label: string;
  description: string;
  roomTone: string;
  playlist: string;
  menuOverride: string;
  schedulerNote: string;
  bgClass: string;
  accentClass: string;
};

type Kpi = {
  label: string;
  value: string;
  description: string;
};

const conditions: VenueCondition[] = [
  {
    id: "rainy-friday",
    label: "Rainy Friday Night",
    description: "Warm ambient dim tone, premium wine and comfort food focus.",
    roomTone: "Ambient gold with soft candle glow",
    playlist: "Low-tempo soul / electronic lounge",
    menuOverride: "Highlight comfort dishes and premium wine pairings",
    schedulerNote: "Auto-deploy 2 floor hosts and deep-clean crew for night shift.",
    bgClass: "from-[#10071d] via-[#1c122f] to-[#120b17]",
    accentClass: "text-amber-300",
  },
  {
    id: "sunny-brunch",
    label: "Sunny Sunday Brunch",
    description: "Bright, airy mood with light bites, fresh daypart automation, and warm guest flow.",
    roomTone: "Soft matte gold and deep charcoal",
    playlist: "Chill indie pop / modern acoustic",
    menuOverride: "Feature brunch boards, craft coffee, and fresh citrus spritzes",
    schedulerNote: "Scale back staffing for seamless front-of-house flow.",
    bgClass: "from-[#071018] via-[#121f33] to-[#031014]",
    accentClass: "text-cyan-300",
  },
  {
    id: "happy-hour",
    label: "Peak Happy Hour Rush",
    description: "Electric lounge energy with fast drink service and occupancy optimization.",
    roomTone: "Neon violet highlights with deep black contrast",
    playlist: "Upbeat tech-house and rhythmic club mixes",
    menuOverride: "Push rapid-inventory draft cocktails and snack pairings",
    schedulerNote: "Trigger AI shift helper and open two express bars.",
    bgClass: "from-[#120615] via-[#1b0f28] to-[#09020c]",
    accentClass: "text-violet-300",
  },
];

const kpis: Kpi[] = [
  { label: "+42%", value: "Table Turnover Efficiency", description: "Improved seat rotation through intelligent table pacing." },
  { label: "+28%", value: "Beverage Revenue Increase", description: "Dynamic menu adjustments drive premium spend." },
  { label: "18h", value: "Weekly Shift Automation Savings", description: "Automated schedules free operations time." },
];

const broadcastMessages = [
  "Live alert sent to 1,840 nearby VIP guests with a personal BOGO cocktail invitation.",
  "Localized flash promotion broadcast to dinner guests within 2 miles.",
  "Surplus nacho & craft draft alert triggered for late-night lounge traffic.",
];

export default function VibeVenuePage() {
  const [activeConditionId, setActiveConditionId] = useState("happy-hour");
  const [promotionText, setPromotionText] = useState<string | null>(null);

  const activeCondition = useMemo(
    () => conditions.find((condition) => condition.id === activeConditionId) ?? conditions[0],
    [activeConditionId]
  );

  const handleTriggerPromotion = () => {
    const nextMessage = broadcastMessages[
      Math.floor(Math.random() * broadcastMessages.length)
    ];
    setPromotionText(nextMessage);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#9333ea]/25 via-transparent to-transparent opacity-80" />
      <div className="pointer-events-none fixed right-0 top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="space-y-1">
            <a href="/" className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-violet-300 transition">
              ← Back
            </a>
            <h1 className="text-xl font-semibold tracking-tight text-white">VibeVenue</h1>
          </div>
          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#overview" className="transition hover:text-violet-300">Overview</a>
            <a href="#simulator" className="transition hover:text-violet-300">Simulator</a>
            <a href="#promo" className="transition hover:text-violet-300">Promo Engine</a>
          </div>
        </div>
      </header>

      <section id="overview" className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
            <p className="text-xs uppercase tracking-[0.35em] text-violet-300/80">AI + IoT Hospitality</p>
            <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white sm:text-6xl">VibeVenue</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A premium venue intelligence platform for multi-unit restaurants, luxury lounges, and experiential retail spaces. VibeVenue blends smart sensor telemetry, ambient analytics, and automated operational decisions to maximize spend, retention, and experience quality.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-[1.75rem] border border-white/10 bg-black/70 p-6">
                  <p className="text-3xl font-semibold text-white">{kpi.label}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-400">{kpi.value}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{kpi.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-[#0b0410] via-[#120b1f] to-[#140313] p-8 shadow-2xl shadow-violet-500/20">
            <div className="rounded-[2rem] border border-white/10 bg-black/60 p-6 shadow-inner shadow-violet-500/10">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Venue dashboard accent</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-3 rounded-[1.75rem] bg-[#09040d]/80 p-4">
                  <div className="h-2 w-24 rounded-full bg-violet-400/30" />
                  <div className="h-2 w-full rounded-full bg-slate-700/80" />
                  <div className="h-2 w-4/5 rounded-full bg-violet-500/40" />
                  <div className="mt-4 text-sm text-slate-300">Smart sensor blend of foot traffic, audio, light, and weather signals.</div>
                </div>
                <div className="rounded-[1.75rem] bg-[#0f0417]/80 p-4 text-sm text-slate-300">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-slate-400">Venue pulse</span>
                    <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs uppercase tracking-[0.35em] text-violet-200">Live</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 rounded-full bg-violet-400/50" />
                    <div className="h-3 rounded-full bg-cyan-400/20" />
                    <div className="h-3 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-violet-200/80">Success metrics</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Operational performance designed to impress stakeholders and teams.</h3>
            <ul className="mt-8 space-y-4 text-slate-300">
              <li className="rounded-3xl border border-white/10 bg-black/60 p-4">Real-time environmental adaptation across lighting, sound, and traffic.</li>
              <li className="rounded-3xl border border-white/10 bg-black/60 p-4">Predictive inventory movement that reduces spoilage and clears excess stock.</li>
              <li className="rounded-3xl border border-white/10 bg-black/60 p-4">AI-driven guest personalization through venue atmosphere orchestration.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="simulator" className="mx-auto max-w-7xl px-6 pb-14 lg:pb-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-violet-300/80">Live Venue Atmosphere Optimizer</p>
              <h2 className="mt-4 text-4xl font-semibold text-white">Interactive environment simulation</h2>
              <p className="mt-4 max-w-2xl text-slate-300">
                Toggle external conditions to see VibeVenue adjust playlists, menus, staffing, and ambience instantly.
              </p>
            </div>
            <div className="grid w-full max-w-md grid-cols-3 gap-3">
              {conditions.map((condition) => (
                <button
                  key={condition.id}
                  type="button"
                  onClick={() => setActiveConditionId(condition.id)}
                  className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${
                    activeConditionId === condition.id
                      ? "border-violet-300 bg-violet-500/20 text-white"
                      : "border-white/10 bg-black/60 text-slate-300 hover:border-violet-300 hover:bg-violet-500/10"
                  }`}
                >
                  <p className="font-semibold">{condition.label}</p>
                  <p className="mt-2 text-xs text-slate-400">Tap to simulate</p>
                </button>
              ))}
            </div>
          </div>

          <div className={`mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${activeCondition.bgClass} p-8 shadow-2xl shadow-violet-500/20 transition`}> 
            <div className="grid gap-8 lg:grid-cols-[0.9fr_0.95fr]">
              <div className="space-y-6">
                <div className="rounded-[1.75rem] border border-white/10 bg-black/60 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Condition</p>
                  <h3 className={`mt-3 text-3xl font-semibold ${activeCondition.accentClass}`}>{activeCondition.label}</h3>
                  <p className="mt-3 text-slate-300">{activeCondition.description}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-white/10 bg-black/60 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Room tone</p>
                    <p className="mt-3 text-lg font-semibold text-white">{activeCondition.roomTone}</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-black/60 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Scheduler</p>
                    <p className="mt-3 text-lg font-semibold text-white">{activeCondition.schedulerNote}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-black/70 p-6">
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Smart Playlist</p>
                    <p className="mt-4 text-xl font-semibold text-white">{activeCondition.playlist}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Digital Menu Override</p>
                    <p className="mt-4 text-xl font-semibold text-white">{activeCondition.menuOverride}</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-violet-300/20 bg-gradient-to-r from-violet-500/10 to-transparent p-5 text-slate-200">
                  <p className="text-xs uppercase tracking-[0.35em] text-violet-200">Live room readout</p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                    <li>Foot traffic density: <span className="font-semibold text-white">{activeConditionId === "happy-hour" ? "Peak" : activeConditionId === "rainy-friday" ? "Steady" : "Moderate"}</span></li>
                    <li>Ambient noise: <span className="font-semibold text-white">{activeConditionId === "happy-hour" ? "High" : activeConditionId === "rainy-friday" ? "Low" : "Medium"}</span></li>
                    <li>Lighting setpoint: <span className="font-semibold text-white">{activeConditionId === "rainy-friday" ? "Warm dim" : activeConditionId === "sunny-brunch" ? "Warm bright" : "Neon vibrant"}</span></li>
                    <li>Weather impact: <span className="font-semibold text-white">{activeConditionId === "rainy-friday" ? "Rain-driven comfort" : activeConditionId === "sunny-brunch" ? "Outdoor flow optimized" : "Rush hour ready"}</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="promo" className="mx-auto max-w-7xl px-6 pb-20 lg:pb-24">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-violet-300/80">AI BOGO & Flash Promotion Engine</p>
                <h2 className="mt-4 text-4xl font-semibold text-white">Trigger surplus promotion</h2>
                <p className="mt-4 max-w-2xl text-slate-300">
                  One click launches a localized broadcast to nearby loyal guests, filling empty tables and clearing surplus inventory with a premium mobile offer.
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-black/70 p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Available promotion</p>
                    <p className="mt-4 text-xl font-semibold text-white">BOGO Cocktail + Dessert Boost</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Target audience</p>
                    <p className="mt-4 text-xl font-semibold text-white">Nearby loyal customers in the app radius</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleTriggerPromotion}
                  className="mt-8 inline-flex items-center justify-center rounded-full border border-violet-300/50 bg-violet-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-violet-500/30"
                >
                  Trigger Surplus Promotion
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-[#07020e] via-[#160c26] to-[#0b0213] p-8 shadow-lg shadow-violet-600/10">
              <p className="text-xs uppercase tracking-[0.35em] text-violet-200/70">Live Broadcast</p>
              <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-black/60 p-6 text-slate-300">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Mobile alert status</p>
                <div className="mt-6 min-h-[170px] rounded-[1.5rem] border border-violet-400/10 bg-slate-950/90 p-5 text-sm leading-7 text-slate-200">
                  {promotionText ? (
                    <>
                      <p className="text-sm text-slate-400">Broadcast complete.</p>
                      <p className="mt-4 text-lg font-semibold text-white">{promotionText}</p>
                      <p className="mt-4 text-slate-400">Engagement matched to nearby loyal patrons and inventory pressure signals.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-400">No active broadcast yet.</p>
                      <p className="mt-4">Click the trigger button to simulate a live customer outreach alert.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-20 text-slate-300">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-black/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-violet-300/80">VibeVenue</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Premium hospitality-tech intelligence.</h3>
            <p className="mt-4 text-slate-400">A showcase of how real-time venue analytics, AI-driven automation, and IoT operational dashboards work together for smarter hospitality delivery.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Capabilities</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Adaptive venue atmosphere orchestration</li>
              <li>Smart menu and playlist automation</li>
              <li>Real-time occupancy and ambient sensing</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Deliverables</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Interactive operational dashboard case study</li>
              <li>IoT-enabled venue experience simulation</li>
              <li>AI-driven revenue capture workflow</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
