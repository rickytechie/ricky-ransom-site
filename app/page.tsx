"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

const missionStatement =
  "I deliver end-to-end consulting designed to future-proof your business by intersecting art and intelligence. My primary focus areas include high-impact AI Consulting & Training, full-scale Media Services, and dynamic Keynote Speaking. Additionally, I architect growth through data-driven Digital Marketing, custom Web Design & Development, and robust Software Consulting. Whether optimizing workflows, crafting high-end digital media assets, or building scalable software applications, I provide the precise strategic oversight and technical execution needed to elevate your brand's potential.";

const services = [
  {
    id: "ai-consulting",
    title: "AI Consulting & Training",
    subtitle: "Custom intelligence strategy and team enablement.",
    bullets: [
      "Custom LLM API pipelines and enterprise agent design.",
      "Prompt engineering labs for business teams and creative staff.",
      "Workflow automation using Zapier, Make, and custom scripts.",
      "AI adoption roadmaps with governance and ROI modeling.",
      "Executive workshops that demystify machine intelligence." ,
    ],
  },
  {
    id: "media-services",
    title: "Media Services",
    subtitle: "Brand storytelling through premium digital production.",
    bullets: [
      "Video, podcast, and social asset production for modern brands.",
      "Creative direction for campaigns, product launches, and events.",
      "Motion graphics, creative edit suites, and visual identity systems.",
      "Audio polish, narrative scripting, and distribution planning.",
      "Cross-channel media strategy tuned for attention-rich audiences.",
    ],
  },
  {
    id: "keynote-speaking",
    title: "Keynote Speaking",
    subtitle: "Inspiring audiences at the intersection of art and technology.",
    bullets: [
      "Signature talks on digital creativity, AI adoption, and brand evolution.",
      "Custom keynote decks built around audience goals and event themes.",
      "Engaging storytelling with practical creative technology takeaways.",
      "Live demos, executive Q&A, and immersive presentation design.",
      "Workshop-style breakout sessions that activate teams." ,
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "Performance-driven campaigns for creative businesses.",
    bullets: [
      "Intent-driven strategy for paid, organic, and owned media.",
      "Customer journey mapping and conversion-focused landing experiences.",
      "Creative audience targeting that merges data with design.",
      "Analytics, tracking, and iteration for measurable growth.",
      "Brand voice, content systems, and digital campaign launch support.",
    ],
  },
  {
    id: "web-design",
    title: "Web Design & Development",
    subtitle: "High-end web experiences designed for creative entrepreneurs.",
    bullets: [
      "Premium UX/UI systems for service and product storytelling.",
      "Next.js and Tailwind builds optimized for speed and polish.",
      "Responsive design, motion, and immersive interface details.",
      "CMS, analytics, and launch support for digital business growth.",
      "Brand refinement through artful interaction design." ,
    ],
  },
  {
    id: "software-consulting",
    title: "Software Consulting",
    subtitle: "Strategic software execution with creative precision.",
    bullets: [
      "Product planning, technical architecture, and delivery roadmaps.",
      "API strategy, integration planning, and automation blueprints.",
      "Developer coaching for design-led engineering teams.",
      "Platform evaluation, MVP consulting, and build oversight.",
      "Creative-technical alignment for polished product experiences.",
    ],
  },
];

const portfolioItems = [
  {
    title: "Trademate",
    subtitle: "AI-precision trading macro dashboard for enterprise capital allocation.",
    description:
      "A flagship fintech intelligence experience with multi-market tickers, AI contextual aggregation, sentiment stream, and persona-driven strategy recommendations.",
    link: "/projects/trademate",
    featured: true,
  },
  {
    title: "VibeVenue",
    subtitle: "Hospitality-tech dashboard for venue atmosphere optimization, revenue capture, and IoT-driven operations.",
    description:
      "A premium hospitality case study showcasing AI/IoT integration, real-time analytics, and automated promotional workflows for luxury venues.",
    link: "/projects/vibevenue",
    featured: true,
  },
  {
    title: "Paws & Pixel",
    subtitle: "Pet-tech e-commerce growth dashboard for AI support and personalized conversion automation.",
    description:
      "A case study showing how pet retail revenue scaled from $10k to $300k with AI troubleshooting and checkout personalization.",
    link: "/portfolio/paws-and-pixel",
    featured: true,
  },
  {
    title: "ClassyHop",
    subtitle: "Browser-based DAW simulator blending classical composition with modern production.",
    description:
      "A premium audio workstation demo that pairs legendary classical motifs with Hip Hop, Pop, and Jazz loop engines in a dark studio interface.",
    link: "/portfolio/classyhop",
    featured: true,
  },
  {
    title: "Super Samurai",
    subtitle: "2D platformer arcade showcase with custom physics engine and AI-driven combat.",
    description:
      "A fully playable game that demonstrates custom canvas rendering, collision physics, and enemy AI in a premium portfolio presentation.",
    link: "/projects/super-samurai",
    featured: true,
  },
  {
    title: "Gym Mingle",
    subtitle: "Web & Mobile Fitness Dating App with Local Business Integration",
    description:
      "A revolutionary 3-stage date platform blending digital matching with curated physical experiences. Drives local foot traffic through orchestrated fitness, wellness, and dining itineraries.",
    link: "/projects/gym-mingle",
    featured: true,
  },
  {
    title: "Crown & Sole",
    subtitle: "E-commerce logistics and immersive retail storytelling.",
    description:
      "A modern commerce platform built for premium brand motion, product flow, and scalable customer experiences.",
  },
  {
    title: "The Outback (Deadside Server)",
    subtitle: "Digital community infrastructure with creative edge.",
    description:
      "A resilient digital environment for growing communities, blended with crafted systems and reliable backend engineering.",
  },
  {
    title: "SKOOL TOOLS",
    subtitle: "Media and EdTech tools designed for high-impact learning.",
    description:
      "A creative toolkit for education brands that need polished content workflows and smart digital product design.",
    link: "/projects/skool-tools",
  },
];

const latestProjects = portfolioItems.filter((project) => project.featured).slice(0, 4);

export default function Home() {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const activeService = useMemo(
    () => services.find((service) => service.id === activeServiceId) ?? null,
    [activeServiceId]
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#9333ea]/20 via-transparent to-transparent opacity-75" />
      <div className="pointer-events-none absolute right-0 top-28 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">RICKY RANSOM, LLC</p>
            <h1 className="text-xl font-semibold tracking-tight text-white">Engineering Creativity</h1>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#services" className="transition hover:text-violet-300">Services</a>
            <a href="#lab" className="transition hover:text-violet-300">The Lab</a>
            <a href="#contact" className="transition hover:text-violet-300">Contact</a>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_32px_120px_-52px_rgba(147,51,234,0.7)] backdrop-blur-3xl">
              <span className="inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-sm uppercase tracking-[0.35em] text-violet-200">
                Premium digital strategy
              </span>
              <h2 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Where Art Meets Intelligence.
              </h2>
              <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-300">
                {missionStatement}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "AI Consulting & Training",
                "Media Services",
                "Keynote Speaking",
                "Digital Marketing",
                "Web Design & Development",
                "Software Consulting",
              ].map((label) => (
                <div
                  key={label}
                  className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 px-6 py-5 text-sm text-slate-200 shadow-xl shadow-violet-500/10 backdrop-blur-xl"
                >
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-3xl"
          >
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Signature Experience</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Digital consulting with creative precision.</h3>
            <ul className="mt-8 space-y-4 text-slate-300">
              <li className="rounded-3xl border border-white/10 bg-white/5 p-5">Strategic roadmaps for creative leaders and emerging brands.</li>
              <li className="rounded-3xl border border-white/10 bg-white/5 p-5">Story-led digital experiences built for technology-first growth.</li>
              <li className="rounded-3xl border border-white/10 bg-white/5 p-5">Premium execution across AI, marketing, web, and media.</li>
            </ul>
            <div className="rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-[#07020e] via-[#120b1f] to-[#140313] p-6 shadow-2xl shadow-violet-500/20">
              <p className="text-xs uppercase tracking-[0.35em] text-violet-200/80">Featured Case Study</p>
              <div className="mt-5 grid gap-4 rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">VibeVenue</p>
                    <p className="mt-2 text-xl font-semibold text-white">Hospitality-tech intelligence</p>
                  </div>
                  <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs uppercase tracking-[0.35em] text-violet-200">Live Demo</span>
                </div>
                <div className="relative overflow-hidden rounded-[1.75rem] border border-violet-500/20 bg-gradient-to-br from-[#09010e] via-[#1b0d31] to-[#100718] p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(147,51,234,0.35),_transparent_40%)]" />
                  <div className="relative space-y-3 text-sm text-slate-300">
                    <div className="flex items-center justify-between gap-3">
                      <span className="h-3 w-20 rounded-full bg-violet-400/50" />
                      <span className="h-3 w-12 rounded-full bg-slate-600/70" />
                    </div>
                    <div className="h-2 rounded-full bg-slate-700/90" />
                    <div className="h-2 rounded-full bg-violet-400/40 w-5/6" />
                    <div className="grid gap-2 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/5 p-3 text-xs text-slate-300">Ambient & traffic signals</div>
                      <div className="rounded-2xl bg-white/5 p-3 text-xs text-slate-300">Playlist automation</div>
                      <div className="rounded-2xl bg-white/5 p-3 text-xs text-slate-300">Dynamic menu triggers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Services</p>
            <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Core Six Service Studio</h2>
          </div>
          <p className="max-w-xl text-slate-400">
            Explore the core service offerings built to help creative entrepreneurs capture, understand, and apply modern arts and technologies.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <motion.button
              key={service.id}
              type="button"
              onClick={() => setActiveServiceId(service.id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 text-left shadow-xl shadow-violet-500/10 transition hover:border-violet-300/40 hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/0 opacity-0 transition group-hover:opacity-100" />
              <span className="relative inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-violet-200">
                Core Service
              </span>
              <h3 className="relative mt-6 text-2xl font-semibold text-white">{service.title}</h3>
              <p className="relative mt-3 text-sm leading-7 text-slate-300">{service.subtitle}</p>
              <div className="relative mt-6 text-sm font-medium text-cyan-300 transition group-hover:text-cyan-200">
                Learn more →
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xl"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-black/60"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-violet-300/80">{activeService.title}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">{activeService.subtitle}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveServiceId(null)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                >
                  Close
                </button>
              </div>

              <div className="mt-8 space-y-6">
                <p className="text-slate-300">
                  Dive deeper into the strategic and creative features that power each service offering.
                </p>
                <div className="space-y-4 rounded-[1.75rem] bg-white/5 p-6 shadow-lg shadow-violet-500/10">
                  {activeService.bullets.map((point) => (
                    <div key={point} className="flex gap-4 text-slate-100">
                      <span className="mt-1 inline-flex h-3 w-3 shrink-0 rounded-full bg-cyan-400" />
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/70 p-5 text-sm text-slate-300">
                    <p className="font-semibold text-white">Delivery style</p>
                    <p className="mt-3 leading-7">Creative consulting, high-touch technical planning, and hands-on training delivered by an industry-focused strategist.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/70 p-5 text-sm text-slate-300">
                    <p className="font-semibold text-white">Ideal for</p>
                    <p className="mt-3 leading-7">Creative entrepreneurs, founders, teams, and digital brands seeking elegant, growth-oriented transformation.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="featured" className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Featured Work</p>
            <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Latest portfolio highlights</h2>
          </div>
          <p className="max-w-xl text-slate-400">
            The freshest enterprise-level case studies showcasing AI, fintech, product design, and immersive platform engineering.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {latestProjects.map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[2rem] border border-violet-400/30 bg-gradient-to-br from-violet-500/10 to-transparent shadow-2xl shadow-violet-500/20 p-8 text-white"
            >
              <div className="space-y-4">
                <div className="rounded-3xl border border-violet-400/40 bg-violet-500/10 p-4 text-sm uppercase tracking-[0.35em] text-violet-200">
                  ⭐ Featured
                </div>
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-slate-400">{project.subtitle}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300 transition group-hover:text-white">
                  {project.description}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    className="mt-6 inline-flex rounded-full border border-violet-300/40 bg-violet-500/10 px-5 py-2 text-xs font-semibold text-violet-200 transition hover:bg-violet-500/20 hover:border-violet-300/60"
                  >
                    View Case Study →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="lab" className="mx-auto max-w-7xl px-6 pb-20 lg:pb-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">The Lab</p>
            <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">All projects in the portfolio</h2>
          </div>
          <p className="max-w-xl text-slate-400">
            A complete showcase of premium engagements, technical demos, and boutique digital systems from Ricky Ransom, LLC.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {portfolioItems.map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ y: -6 }}
              className={`group overflow-hidden rounded-[2rem] border transition duration-300 ${
                project.featured
                  ? "lg:col-span-2 border-violet-400/30 bg-gradient-to-br from-violet-500/10 to-transparent shadow-2xl shadow-violet-500/20"
                  : "border-white/10 bg-white/5 shadow-2xl shadow-violet-500/5"
              } p-8 text-white`}
            >
              <div className="space-y-4">
                <div className={`rounded-3xl border p-4 text-sm uppercase tracking-[0.35em] ${
                  project.featured
                    ? "border-violet-400/40 bg-violet-500/10 text-violet-200"
                    : "border-white/10 bg-black/50 text-violet-200"
                }`}>
                  {project.featured ? "⭐ Featured" : "Project"}
                </div>
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-slate-400">{project.subtitle}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300 transition group-hover:text-white">
                  {project.description}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    className="mt-6 inline-flex rounded-full border border-violet-300/40 bg-violet-500/10 px-5 py-2 text-xs font-semibold text-violet-200 transition hover:bg-violet-500/20 hover:border-violet-300/60"
                  >
                    View Case Study →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer id="contact" className="border-t border-white/10 bg-black/90 px-6 py-16 text-slate-300 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Contact</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Let’s build the next chapter.</h3>
            <p className="mt-4 max-w-xl text-slate-400">
              I help creative entrepreneurs and visionary organizations turn technology, media, and experience into measurable momentum.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 px-8 py-7 text-sm text-slate-200 shadow-xl shadow-violet-500/10 backdrop-blur-xl">
            <p className="font-semibold text-white">E: rickyransomcompany@gmail.com</p>
            <p className="mt-3 font-semibold text-white">W: 929.379.7612</p>
            <p className="mt-3 text-slate-400">Ricky Ransom, LLC</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
