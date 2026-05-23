"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function PawsAndPixel() {
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
  const products = useMemo(
    () => [
      { id: 'p1', name: 'Smart Collar', price: 49 },
      { id: 'p2', name: 'PetCam', price: 129 },
      { id: 'p3', name: 'NFT Pet Portrait', price: 250 }
    ],
    []
  );

  function addToCart(p: any) {
    setCart((c) => {
      const found = c.find((x) => x.id === p.id);
      if (found) return c.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      return [...c, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const bogo = cart.length > 1 ? Math.min(...cart.map((i) => i.price)) : 0;
  const total = subtotal - Math.floor(bogo * 0.5);

  return (
    <main className="min-h-screen p-8 bg-black text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">Paws & Pixel — Growth Case Study</h1>
        <p className="text-slate-300 mt-2">Audience growth, product conversion, and an AI-powered pet ecosystem.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="rounded-2xl bg-[#06121a] p-5 border border-white/10">
            <div className="text-sm text-slate-400">Growth Signals</div>
            <div className="mt-4 text-3xl font-semibold">+18%</div>
            <div className="mt-2 text-slate-300">Projected uplift in checkout conversion.</div>
            <div className="mt-6 rounded-2xl bg-[#07121a] p-4 text-slate-300">
              AI assistant suggests BOGO offers and recurring care routines to boost retention.
            </div>
          </div>

          <div className="rounded-2xl bg-[#06121a] p-5 border border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Store</h3>
              <span className="rounded-full bg-[#111827] px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">Live</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {products.map((p) => (
                <div key={p.id} className="rounded-2xl bg-[#07121a] p-4 border border-white/10 flex flex-col">
                  <div className="flex-1 text-white">{p.name}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-slate-400">${p.price}</div>
                    <button onClick={() => addToCart(p)} className="rounded-2xl bg-[#0b1220] px-3 py-1 text-sm">Add</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[#07121a] p-4 border border-white/10 text-sm text-slate-200">
              <div className="flex items-center justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
              <div className="flex items-center justify-between mt-2"><span>AI BOGO savings</span><span>-${Math.floor(bogo * 0.5)}</span></div>
              <div className="mt-3 border-t border-white/10 pt-3 flex items-center justify-between text-white font-semibold"><span>Total</span><span>${total}</span></div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-[#06121a] p-6 border border-white/10">
          <h3 className="font-semibold">AI Concierge</h3>
          <p className="mt-2 text-slate-300">Simulated assistant: "Recommend Smart Collar to first-time buyers and bundle a PetCam upsell with 10% off."</p>
          <p className="mt-4 text-slate-400">This page showcases how AI-driven messaging can turn product data into higher cart value and smarter promotions.</p>
        </div>
      </div>
    </main>
  );
}
