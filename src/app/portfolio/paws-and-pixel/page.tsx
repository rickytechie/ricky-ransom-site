"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface SupportIssue {
  id: string;
  label: string;
  customerNote: string;
  aiResponse: string;
  handoff: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface UpsellOffer {
  title: string;
  description: string;
  price: number;
  acceptedLabel: string;
}

const supportIssues: SupportIssue[] = [
  {
    id: "sync-collar",
    label: "Collar won't sync",
    customerNote: "My new smart collar stopped pairing with my phone.",
    aiResponse:
      "Checking device status and nudging firmware sync. I’m validating network paths and recommending a fresh Bluetooth handshake.",
    handoff: "Elevated to a human concierge support agent for guided pairing and VIP guest outreach.",
  },
  {
    id: "delivery-delay",
    label: "Order delivery delayed",
    customerNote: "The pet tech order says shipped but still hasn’t arrived.",
    aiResponse:
      "Pulling fulfillment tracking and applying priority routing. I’m checking warehouse handoff and delivery ETA for your order.",
    handoff: "Handed off to logistics support with automated customer notification and expedited delivery token.",
  },
  {
    id: "subscription-error",
    label: "Subscription billing issue",
    customerNote: "The service plan billed twice this month.",
    aiResponse:
      "Reviewing recent checkout events and payment logs. I’m preparing a refund credit and confirming plan continuity.",
    handoff: "Transferred to account care with proactive customer message and retention offer.",
  },
];

const productCatalog: CartItem[] = [
  {
    id: "smart-collar",
    name: "Smart Collar",
    price: 129,
    description: "AI-enabled tracking and mood sensing for pets.",
  },
  {
    id: "camera-hub",
    name: "Pet Camera Hub",
    price: 199,
    description: "Live video, motion alerts, and pet activity analytics.",
  },
  {
    id: "wellness-kit",
    name: "Wellness Sensor Kit",
    price: 79,
    description: "Smart health monitoring attachments for companion animals.",
  },
];

const upsellOffer: UpsellOffer = {
  title: "AI BOGO Bot Engine",
  description: "Add the personalized grooming text offer to drive checkout conversions and inventory velocity.",
  price: 24,
  acceptedLabel: "Add personalized BOGO upsell",
};

const animationBeats = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut" },
};

export default function PawsAndPixelPage() {
  const [selectedIssue, setSelectedIssue] = useState<SupportIssue | null>(null);
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [handoffText, setHandoffText] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [upsellVisible, setUpsellVisible] = useState(false);
  const [upsellAccepted, setUpsellAccepted] = useState(false);

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price, 0) + (upsellAccepted ? upsellOffer.price : 0),
    [cartItems, upsellAccepted]
  );

  useEffect(() => {
    if (!selectedIssue) {
      setChatLog([]);
      setHandoffText(null);
      return;
    }

    setChatLog([`Customer: ${selectedIssue.customerNote}`]);
    setHandoffText(null);

    const firstTimer = window.setTimeout(() => {
      setChatLog((previous) => [...previous, `AI: ${selectedIssue.aiResponse}`]);
    }, 900);

    const secondTimer = window.setTimeout(() => {
      setChatLog((previous) => [...previous, "AI: I’m routing this to the best human specialist while preserving the session context."]);
      setHandoffText(selectedIssue.handoff);
    }, 1900);

    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
    };
  }, [selectedIssue]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((current) => [...current, item]);
    setUpsellVisible(true);
  };

  const handleAcceptUpsell = () => {
    setUpsellAccepted(true);
    setUpsellVisible(false);
  };

  const handleDismissUpsell = () => {
    setUpsellVisible(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] p-10 sm:p-14">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#f77a69]">Paws & Pixel Tech</p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Growth case study for an AI-powered pet tech e-commerce platform.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Designed to narrate a revenue expansion from $10k to $300k and showcase interactive AI support, shopping optimization, and personalized conversion workflows.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-slate-200 bg-[#fff4f1] p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.35em] text-[#de6c55]">Overview</p>
                  <p className="mt-3 text-slate-700">
                    A data-driven pet retail story that scaled revenue with frictionless support automation and an AI BOGO engine tailored to pet parents.
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-[#f7f1ef] p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.35em] text-[#de6c55]">Impact</p>
                  <p className="mt-3 text-slate-700">
                    Demonstrates how modern UX, support intelligence, and checkout personalization can drive measurable e-commerce momentum.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              {...animationBeats}
              className="rounded-[2rem] border border-slate-200 bg-[#fff4f1] p-8 shadow-xl shadow-[#f0c6bb]/40"
            >
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.35em] text-[#de6c55]">Fast facts</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Q1 Revenue</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-950">$10k</p>
                    <p className="mt-2 text-sm text-slate-500">Baseline launch quarter.</p>
                  </div>
                  <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Q2 Revenue</p>
                    <p className="mt-4 text-4xl font-semibold text-[#de6c55]">$300k</p>
                    <p className="mt-2 text-sm text-slate-500">Accelerated growth after AI-driven optimization.</p>
                  </div>
                </div>
                <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-sm">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Conversion boost</p>
                  <p className="mt-4 text-5xl font-semibold">+340%</p>
                  <p className="mt-2 text-sm text-slate-300">Conversion lift from personalized checkout experiences.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <section className="mt-10 grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.15)]">
            <h2 className="text-3xl font-semibold text-slate-950">Case study summary</h2>
            <p className="mt-4 text-slate-600">
              Paws & Pixel combined pet-tech product storytelling with AI-first support and checkout automation to move from a $10k launch quarter to a $300k growth milestone.
            </p>
            <div className="mt-8 space-y-5 text-slate-700">
              <div className="rounded-[1.75rem] bg-[#fff4f1] p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-[#de6c55]">Revenue trajectory</p>
                <p className="mt-3 text-base">Rapid onboarding of pet owners and optimized cart incentives created a scalable growth loop.</p>
              </div>
              <div className="rounded-[1.75rem] bg-[#f7f1ef] p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-[#de6c55]">Support intelligence</p>
                <p className="mt-3 text-base">AI triaged common issues instantly and preserved premium handoff to human support.</p>
              </div>
              <div className="rounded-[1.75rem] bg-[#fff4f1] p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-[#de6c55]">Cart personalization</p>
                <p className="mt-3 text-base">Dynamic BOGO offers and tailored checkout prompts improved conversion by 340%.</p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-[#fff8f5] p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.12)]">
            <p className="text-sm uppercase tracking-[0.35em] text-[#f77a69]">Study at a glance</p>
            <div className="mt-6 space-y-4 text-slate-700">
              <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Customer sentiment</p>
                <p className="mt-3 text-base">Positive digital interactions with proactive support and tailored offers.</p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Retention signal</p>
                <p className="mt-3 text-base">Repeat purchase velocity increased through subscription-friendly merchandising.</p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Operational benefit</p>
                <p className="mt-3 text-base">Human support capacity improved with AI-assisted triage and handoff workflows.</p>
              </div>
            </div>
          </aside>
        </section>

        <div className="mt-12 grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.section
            {...animationBeats}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.15)]"
          >
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-[#f77a69]">Interactive AI Support Simulator</p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950">Troubleshoot common pet-parent issues in real time.</h2>
                <p className="mt-3 text-slate-600">
                  Simulate a support session for smart pet products and see how AI triages problems before handing off to a human agent.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.75fr_1fr]">
                <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-[#fff7f5] p-6">
                  <div className="flex flex-wrap gap-3">
                    {supportIssues.map((issue) => (
                      <button
                        key={issue.id}
                        type="button"
                        onClick={() => setSelectedIssue(issue)}
                        className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${
                          selectedIssue?.id === issue.id
                            ? "border-[#de6c55] bg-[#fdecea] text-slate-950"
                            : "border-slate-200 bg-white text-slate-700 hover:border-[#de6c55] hover:bg-[#fff2ef]"
                        }`}
                      >
                        <p className="font-semibold">{issue.label}</p>
                        <p className="mt-2 text-sm text-slate-500">Tap to simulate the session.</p>
                      </button>
                    ))}
                  </div>

                  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Session log</p>
                    <div className="mt-4 min-h-[220px] space-y-3 text-sm text-slate-700">
                      {chatLog.length > 0 ? (
                        chatLog.map((line, index) => (
                          <div key={`${line}-${index}`} className="rounded-2xl bg-[#fff4f1] p-3 text-slate-800">
                            {line}
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-500">Select an issue to begin the AI support flow.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-slate-200 bg-[#fef4ef] p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#de6c55]">Handoff status</p>
                  <div className="mt-5 min-h-[220px] rounded-[1.5rem] bg-white p-5 text-slate-700 shadow-sm">
                    {handoffText ? (
                      <>
                        <p className="text-sm text-slate-500">AI completed diagnostics and prepares the handoff.</p>
                        <p className="mt-4 text-base font-semibold text-slate-950">{handoffText}</p>
                      </>
                    ) : (
                      <p className="text-slate-500">AI will display the handoff summary once diagnostics complete.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            {...animationBeats}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.15)]"
          >
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-[#f77a69]">AI BOGO Bot Engine</p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950">Personalized checkout optimization.</h2>
                <p className="mt-3 text-slate-600">
                  Add pet-tech items to the cart and trigger a tailored upsell offer to lift average order value and conversion.
                </p>
              </div>

              <div className="grid gap-6 rounded-[1.75rem] border border-slate-200 bg-[#fff2ee] p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {productCatalog.map((item) => (
                    <div key={item.id} className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">{item.name}</h3>
                          <p className="mt-2 text-sm text-slate-500">{item.description}</p>
                        </div>
                        <p className="text-xl font-semibold text-[#de6c55]">${item.price}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#de6c55] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c0493f]"
                      >
                        Add to cart
                      </button>
                    </div>
                  ))}
                </div>

                {upsellVisible && !upsellAccepted && (
                  <div className="rounded-[1.75rem] border border-[#de6c55] bg-white p-6 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#de6c55]">Personalized upsell</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-950">{upsellOffer.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{upsellOffer.description}</p>
                      </div>
                      <div className="space-y-3 rounded-[1.5rem] bg-[#fff3f0] p-4">
                        <p className="text-base font-semibold text-[#de6c55]">+${upsellOffer.price}</p>
                        <button
                          type="button"
                          onClick={handleAcceptUpsell}
                          className="inline-flex w-full items-center justify-center rounded-full bg-[#de6c55] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c0493f]"
                        >
                          {upsellOffer.acceptedLabel}
                        </button>
                        <button
                          type="button"
                          onClick={handleDismissUpsell}
                          className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                        >
                          No thanks
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Cart total</p>
                    <p className="text-2xl font-semibold text-slate-950">${cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-[#fff7f5] p-3">
                          <span>{item.name}</span>
                          <span className="font-semibold text-slate-900">${item.price}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500">Your cart is empty — add a product to activate the AI upsell workflow.</p>
                    )}
                    {upsellAccepted && (
                      <div className="flex items-center justify-between rounded-2xl border border-[#ffd4cd] bg-[#fff2ee] p-3 text-sm text-slate-900">
                        <span>Personalized upsell</span>
                        <span className="font-semibold">+${upsellOffer.price}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        <motion.section
          {...animationBeats}
          className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.15)]"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#f77a69]">Growth narrative</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">How design, data, and AI delivered the leap.</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] bg-[#fff4f1] p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#de6c55]">Conversion strategy</p>
              <p className="mt-4 text-slate-700">Personalized product messaging and cart incentives drove a 340% uplift in revenue per session.</p>
            </div>
            <div className="rounded-[1.75rem] bg-[#f7f1ef] p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#de6c55]">Support automation</p>
              <p className="mt-4 text-slate-700">AI support handled common issues instantly while preserving warm handoff to human staff for premium complex cases.</p>
            </div>
            <div className="rounded-[1.75rem] bg-[#fff4f1] p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#de6c55]">Retention engine</p>
              <p className="mt-4 text-slate-700">Cart personalization and retention nudges were built to keep customers engaged with pet wellness subscriptions.</p>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
