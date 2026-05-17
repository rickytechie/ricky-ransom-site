"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const matchAttributes = [
  { category: "Top 5 Fitness Activities", examples: ["CrossFit", "Yoga", "Rock Climbing", "Swimming", "Pilates"] },
  { category: "Favorite Cuisine", examples: ["Italian", "Thai", "Japanese", "Vegan", "Mediterranean"] },
  { category: "Indoor vs. Outdoor", examples: ["Gym-Focused", "Outdoor Enthusiast", "Hybrid"] },
  { category: "Relationship Preference", examples: ["Short-term", "Long-term", "Casual", "Open"] },
  { category: "Date Vibe", examples: ["Adventurous", "Relaxed", "Romantic", "Social"] },
];

const dateStages = [
  {
    stage: 1,
    title: "Fitness Connection",
    description: "Start with a shared workout experience at a partner gym or outdoor fitness venue. Build chemistry through physical activity.",
    icon: "💪",
    businesses: "Gyms, CrossFit Boxes, Outdoor Parks",
  },
  {
    stage: 2,
    title: "Relaxation & Recovery",
    description: "Transition into wellness at partner spas, massage studios, or relaxation centers. Decompress and connect more deeply.",
    icon: "🧘",
    businesses: "Spas, Massage Studios, Wellness Centers",
  },
  {
    stage: 3,
    title: "Dining & Social",
    description: "Conclude the experience at curated local restaurants, cafes, or nightlife venues. Share a meal and celebrate the connection.",
    icon: "🍽️",
    businesses: "Restaurants, Cafes, Bars, Nightlife",
  },
];

const safetyFeatures = [
  {
    title: "Discreet Panic Code",
    description: "One-tap emergency activation that silently alerts pre-designated emergency contacts with location data.",
  },
  {
    title: "Law Enforcement Integration",
    description: "Compliant framework for rapid law enforcement coordination in critical situations.",
  },
  {
    title: "Safety Disclaimer",
    description: "Explicit pre-date legal acknowledgment and best practices. Meet in public spaces; inform a trusted contact.",
  },
  {
    title: "Verified Profiles",
    description: "Multi-step identity verification and community moderation to maintain trust and safety standards.",
  },
];

const filteringCapabilities = [
  "1,000+ Custom Preference Tags",
  "Advanced Niche Community Filters",
  "Spicy Preferences & Kinks Section",
  "Bio Keyword Matching",
  "Geo-Proximity Intelligence",
  "Activity-Based Compatibility",
];

export default function GymMingleShowcase() {
  const [activeStage, setActiveStage] = useState(1);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#9333ea]/20 via-transparent to-transparent opacity-75" />
      <div className="pointer-events-none absolute right-0 top-28 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="space-y-1">
            <a href="/" className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-violet-300 transition">
              ← Back
            </a>
            <h1 className="text-xl font-semibold tracking-tight text-white">Gym Mingle</h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#features" className="transition hover:text-violet-300">
              Features
            </a>
            <a href="#safety" className="transition hover:text-violet-300">
              Safety
            </a>
            <a href="#tech" className="transition hover:text-violet-300">
              Technology
            </a>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_32px_120px_-52px_rgba(147,51,234,0.7)] backdrop-blur-3xl">
            <span className="inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-sm uppercase tracking-[0.35em] text-violet-200">
              Featured Full-Stack Case Study
            </span>
            <h2 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Gym Mingle: Redefining Digital Connection & Physical Interaction.
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-9 text-slate-300">
              A revolutionary web and mobile fitness dating platform that bridges digital connection with real-world experiences. Gym Mingle orchestrates curated 3-to-4-hour hybrid dates across three stages—fitness, relaxation, and dining—while actively driving sustainable traffic to local small businesses. Built on enterprise-grade matching algorithms, advanced safety protocols, and over 1,000+ community preference tags.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-violet-500/10">
              <div className="text-3xl font-bold text-cyan-300">3</div>
              <p className="mt-2 text-sm font-semibold text-white">Stage Date Architecture</p>
              <p className="mt-2 text-xs text-slate-400">Fitness → Relaxation → Dining</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-violet-500/10">
              <div className="text-3xl font-bold text-violet-400">1000+</div>
              <p className="mt-2 text-sm font-semibold text-white">Preference Tags</p>
              <p className="mt-2 text-xs text-slate-400">Advanced matching intelligence</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-violet-500/10">
              <div className="text-3xl font-bold text-pink-400">∞</div>
              <p className="mt-2 text-sm font-semibold text-white">Local Business Integration</p>
              <p className="mt-2 text-xs text-slate-400">Drive foot traffic to partners</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="mb-12 space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">The Match Matrix</p>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">
            Intelligent Compatibility Engine
          </h2>
          <p className="max-w-2xl text-slate-400">
            Users match across multiple dimensions—fitness activities, cuisine preferences, lifestyle vibe, and relationship goals—creating highly qualified, multi-faceted connections.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {matchAttributes.map((attr) => (
            <motion.div
              key={attr.category}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-violet-500/10 transition"
            >
              <h3 className="text-lg font-semibold text-white">{attr.category}</h3>
              <div className="mt-4 space-y-2">
                {attr.examples.map((example) => (
                  <div
                    key={example}
                    className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-200 w-fit"
                  >
                    {example}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="mb-12 space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">3-Stage Experience</p>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">
            The Perfect Date Journey
          </h2>
          <p className="max-w-2xl text-slate-400">
            An orchestrated experience that blends personal connection with local business discovery. Every stage is curated, measurable, and designed for mutual benefit.
          </p>
        </div>

        <div className="space-y-6">
          {dateStages.map((item) => (
            <motion.button
              key={item.stage}
              type="button"
              onClick={() => setActiveStage(item.stage)}
              whileHover={{ scale: 1.02 }}
              className={`w-full rounded-[2rem] border transition ${
                activeStage === item.stage
                  ? "border-violet-400 bg-violet-500/10 shadow-lg shadow-violet-500/20"
                  : "border-white/10 bg-white/5"
              } p-8 text-left shadow-xl`}
            >
              <div className="flex items-start gap-6">
                <div className="text-4xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-violet-300">Stage {item.stage}</div>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-slate-300">{item.description}</p>
                  <div className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                    {item.businesses}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-violet-500/10"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Value Delivered</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Local Business Impact</h3>
            </div>
            <div className="text-right space-y-2">
              <p className="text-sm text-slate-400">Direct foot traffic from 3-stage date itineraries</p>
              <p className="text-sm text-slate-400">Measurable revenue attribution per venue partner</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="safety" className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="mb-12 space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-pink-300/80">Enterprise-Grade Security</p>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">
            Safety by Design
          </h2>
          <p className="max-w-2xl text-slate-400">
            Gym Mingle prioritizes user safety with multi-layered protections, law enforcement partnerships, and transparent safety frameworks embedded into the platform architecture.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {safetyFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              onClick={() => setExpandedFeature(expandedFeature === feature.title ? null : feature.title)}
              whileHover={{ y: -4 }}
              className="group cursor-pointer overflow-hidden rounded-[2rem] border border-pink-300/30 bg-gradient-to-br from-pink-500/10 to-transparent p-8 shadow-xl shadow-pink-500/10 transition"
            >
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-4 text-slate-300">{feature.description}</p>
              <div className="mt-4 text-xs font-semibold text-pink-300">Click to expand →</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 rounded-[2rem] border border-pink-300/20 bg-pink-500/5 p-8 shadow-lg"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-pink-300/80">Legal Framework</p>
          <p className="mt-4 text-sm leading-8 text-slate-300">
            All users acknowledge the explicit safety disclaimer before accessing the platform. Users agree to meet in public spaces, inform trusted contacts of date plans, and utilize the in-app safety features. Gym Mingle maintains transparent partnerships with local law enforcement and emergency services for rapid coordination in critical situations.
          </p>
        </motion.div>
      </section>

      <section id="tech" className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="mb-12 space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Advanced Filtering</p>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">
            Sophisticated Matching Architecture
          </h2>
          <p className="max-w-2xl text-slate-400">
            The backend powering Gym Mingle leverages a custom preference filtering engine capable of handling 1,000+ tag combinations with millisecond latency, including specialized community filters and niche preference categories.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteringCapabilities.map((capability) => (
            <motion.div
              key={capability}
              whileHover={{ scale: 1.05 }}
              className="rounded-[1.75rem] border border-white/10 bg-cyan-500/5 p-6 shadow-xl shadow-cyan-500/10 transition"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
                <p className="text-sm font-semibold text-white">{capability}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-xl shadow-violet-500/10"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold text-white">Technology Stack</h3>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li>• Next.js 16+ frontend with real-time matching</li>
                <li>• Custom Node.js/Python backend for preference matching</li>
                <li>• PostgreSQL for user data and safety logs</li>
                <li>• Redis for geo-proximity and real-time features</li>
                <li>• AWS Lambda for emergency alert orchestration</li>
                <li>• Twilio integration for SMS/emergency notifications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">Key Metrics</h3>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li>• Sub-200ms matching latency at 10k+ concurrent users</li>
                <li>• 99.95% uptime SLA with redundant safety systems</li>
                <li>• 1,000+ preference tags with semantic search</li>
                <li>• Real-time location data with privacy preservation</li>
                <li>• Multi-stage date tracking and completion analytics</li>
                <li>• Partner venue analytics and ROI attribution</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-violet-500/10"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Product Outcome</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            A New Category: Tech-Enabled Local Commerce
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg leading-9 text-slate-300">
            Gym Mingle represents a breakthrough integration of digital social connection, physical experience curation, and local business enablement. By architecting every feature—from matching algorithms to safety protocols to business partnerships—around sustainable community growth, Gym Mingle transforms the dating category into a revenue engine for small businesses.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex rounded-[1.75rem] border border-violet-300/40 bg-violet-500/10 px-8 py-4 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/20 hover:border-violet-300/60"
          >
            Back to Services
          </a>
        </motion.div>
      </section>
    </main>
  );
}
