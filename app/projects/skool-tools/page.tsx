"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  sku: string;
  desc?: string;
};

type Bundle = {
  id: number;
  title: string;
  price: number;
  items: number[]; // item ids
  desc?: string;
};

const brands = ["Five Star", "Mead", "Rocketbook", "Texas Instruments", "PastelIndie Co.", "PaperStudio", "StudioNote", "BrightClass"];

// Generate a hand-curated inventory of 50 distinct school supply items
const inventory: Item[] = [
  { id: 1, title: "Classic #2 Pencils (12pk)", brand: "Five Star", category: "Pencils", price: 4, sku: "FS-PEN-001" },
  { id: 2, title: "Colored Crayons (24ct)", brand: "Mead", category: "Art", price: 6, sku: "MD-ART-002" },
  { id: 3, title: "Wide-Ruled Filler Paper (200ct)", brand: "Mead", category: "Paper", price: 5, sku: "MD-PAP-003" },
  { id: 4, title: "Primary Notebook (K-2)", brand: "PastelIndie Co.", category: "Notebooks", price: 7, sku: "PI-NB-004" },
  { id: 5, title: "Durable Soft Backpack (Kids)", brand: "BrightClass", category: "Backpacks", price: 25, sku: "BC-BP-005" },
  { id: 6, title: "Gel Pens Set (8)", brand: "StudioNote", category: "Pens", price: 9, sku: "SN-PEN-006" },
  { id: 7, title: "Mechanical Pencil (0.7mm)", brand: "PaperStudio", category: "Pencils", price: 8, sku: "PS-PEN-007" },
  { id: 8, title: "Graphing Calculator (TI-Style)", brand: "Texas Instruments", category: "Calculators", price: 150, sku: "TI-CALC-008" },
  { id: 9, title: "Smart Digital Notebook (Cloud)", brand: "Rocketbook", category: "Digital Paper", price: 60, sku: "RB-DN-009" },
  { id: 10, title: 'Tablet 10" Study Pad', brand: "BrightClass", category: "Tablets", price: 299, sku: "BC-TAB-010" },
  { id: 11, title: "Stylus for Digital Paper", brand: "Rocketbook", category: "Accessories", price: 29, sku: "RB-STY-011" },
  { id: 12, title: "Portable Mini Whiteboard", brand: "PaperStudio", category: "Whiteboards", price: 24, sku: "PS-WB-012" },
  { id: 13, title: "Aesthetic Sticky Notes Pack", brand: "PastelIndie Co.", category: "Stationery", price: 8, sku: "PI-ST-013" },
  { id: 14, title: "Highlighter Set (5)", brand: "Five Star", category: "Pens", price: 7, sku: "FS-HL-014" },
  { id: 15, title: "Premium Notebook (Hardcover)", brand: "StudioNote", category: "Notebooks", price: 18, sku: "SN-NB-015" },
  { id: 16, title: "Eraser Bundle (3)", brand: "Mead", category: "Accessories", price: 3, sku: "MD-ER-016" },
  { id: 17, title: "USB-C Charging Cable (2m)", brand: "BrightClass", category: "Accessories", price: 12, sku: "BC-USB-017" },
  { id: 18, title: "Math Pro Workbooks (Set of 3)", brand: "Five Star", category: "Books", price: 22, sku: "FS-WB-018" },
  { id: 19, title: "Scientific Calculator (Basic)", brand: "Texas Instruments", category: "Calculators", price: 35, sku: "TI-CALC-019" },
  { id: 20, title: "Planner & Schedule Pad", brand: "PastelIndie Co.", category: "Stationery", price: 16, sku: "PI-PL-020" },
  { id: 21, title: "Ruler & Geometry Set", brand: "PaperStudio", category: "Accessories", price: 9, sku: "PS-GS-021" },
  { id: 22, title: "Ink Pen Refill (5)", brand: "StudioNote", category: "Pens", price: 6, sku: "SN-REF-022" },
  { id: 23, title: "Eco-Friendly Notebook", brand: "PastelIndie Co.", category: "Notebooks", price: 12, sku: "PI-ECO-023" },
  { id: 24, title: "Art Marker Set (12)", brand: "Mead", category: "Art", price: 14, sku: "MD-AM-024" },
  { id: 25, title: "Canvas Pencil Case", brand: "PaperStudio", category: "Accessories", price: 10, sku: "PS-PC-025" },
  { id: 26, title: "Premium Mechanical Pencil (0.5)", brand: "StudioNote", category: "Pencils", price: 22, sku: "SN-MP-026" },
  { id: 27, title: "Sticker Pack (Study Icons)", brand: "PastelIndie Co.", category: "Stationery", price: 7, sku: "PI-STK-027" },
  { id: 28, title: "Notebook Bundle (5 assorted)", brand: "Five Star", category: "Notebooks", price: 40, sku: "FS-NB-028" },
  { id: 29, title: "Portable Document Scanner", brand: "BrightClass", category: "Accessories", price: 89, sku: "BC-SCN-029" },
  { id: 30, title: "Wireless Earbuds (Study Mode)", brand: "BrightClass", category: "Accessories", price: 79, sku: "BC-EAR-030" },
  { id: 31, title: "Digital Whiteboard (Portable)", brand: "Rocketbook", category: "Digital Whiteboards", price: 180, sku: "RB-DWB-031" },
  { id: 32, title: "Index Cards (200ct)", brand: "Mead", category: "Paper", price: 6, sku: "MD-IC-032" },
  { id: 33, title: "Graph Paper Pad", brand: "Five Star", category: "Paper", price: 9, sku: "FS-GP-033" },
  { id: 34, title: "Aesthetic Pen Set (10)", brand: "PastelIndie Co.", category: "Pens", price: 20, sku: "PI-PEN-034" },
  { id: 35, title: "Ergonomic Desk Mat", brand: "StudioNote", category: "Accessories", price: 35, sku: "SN-DM-035" },
  { id: 36, title: "Sticky Flag Tabs (100)", brand: "PaperStudio", category: "Stationery", price: 5, sku: "PS-FL-036" },
  { id: 37, title: "High-Precision Compass", brand: "Five Star", category: "Accessories", price: 12, sku: "FS-CP-037" },
  { id: 38, title: 'Premium Binder (1")', brand: "Mead", category: "Accessories", price: 15, sku: "MD-BND-038" },
  { id: 39, title: "Notebook Skin Stickers", brand: "PastelIndie Co.", category: "Stationery", price: 9, sku: "PI-SK-039" },
  { id: 40, title: "Color-Coded Divider Set", brand: "PaperStudio", category: "Accessories", price: 8, sku: "PS-DV-040" },
  { id: 41, title: "Mini Desk Lamp (USB)", brand: "BrightClass", category: "Accessories", price: 24, sku: "BC-LMP-041" },
  { id: 42, title: "Reusable Study Planner", brand: "Rocketbook", category: "Notebooks", price: 25, sku: "RB-PL-042" },
  { id: 43, title: "Premium Pencil Sharpener", brand: "Five Star", category: "Accessories", price: 6, sku: "FS-PS-043" },
  { id: 44, title: "Fountain Pen Starter Kit", brand: "StudioNote", category: "Pens", price: 45, sku: "SN-FP-044" },
  { id: 45, title: "Waterproof Backpack (Tech)", brand: "BrightClass", category: "Backpacks", price: 89, sku: "BC-WBP-045" },
  { id: 46, title: "Notebook Refill Pack (60)", brand: "Mead", category: "Notebooks", price: 14, sku: "MD-RF-046" },
  { id: 47, title: "Sticker Labels (Classroom)", brand: "PaperStudio", category: "Stationery", price: 6, sku: "PS-LB-047" },
  { id: 48, title: "Color Pencils Set (24)", brand: "PastelIndie Co.", category: "Art", price: 11, sku: "PI-CP-048" },
  { id: 49, title: "Magnetic Whiteboard (Class)", brand: "Mead", category: "Whiteboards", price: 120, sku: "MD-MWB-049" },
  { id: 50, title: "Academic Backpack (Pro)", brand: "PastelIndie Co.", category: "Backpacks", price: 129, sku: "PI-BP-050" },
];

const bundles: Bundle[] = [
  {
    id: 1,
    title: "The Elementary Starter Bundle",
    price: 50,
    items: [1,2,3,4,5],
    desc: "Basic pencils, crayons, filler paper, primary notebook, and a durable soft backpack.",
  },
  {
    id: 2,
    title: "The Middle School Tech & Style Bundle",
    price: 100,
    items: [15,6,28,19,25],
    desc: "Indie notebooks, gel pens, geometric backpack, and basic scientific calculator.",
  },
  {
    id: 3,
    title: "The High School / Early College Power Bundle",
    price: 200,
    items: [8,9,44,45],
    desc: "High-end graphing calculator, digital smart notebook, premium pens, and tech backpack.",
  },
  {
    id: 4,
    title: "The Ultimate Digital Scholar Bundle",
    price: 500,
    items: [10,11,31,35],
    desc: "10-inch study tablet, stylus kit, portable digital whiteboard, and premium organizational accessories.",
  },
];

// Utility
const TAX_RATE = 0.08875; // example
const SHIPPING_FLAT = 9.99;

export default function SkoolToolsPage() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({}); // itemId -> qty
  const [cartBundles, setCartBundles] = useState<Record<number, number>>({}); // bundleId -> qty
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<null | { id: string; total: number }>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return inventory;
    return inventory.filter((it) => {
      return (
        it.title.toLowerCase().includes(q) ||
        it.brand.toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q) ||
        (it.desc || "").toLowerCase().includes(q)
      );
    });
  }, [query]);

  const addItem = (id: number) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setShowCart(true);
  };
  const removeItem = (id: number) => {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  };
  const changeQty = (id: number, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) {
        delete next[id];
      } else {
        next[id] = qty;
      }
      return next;
    });
  };

  const addBundle = (id: number) => {
    setCartBundles((b) => ({ ...b, [id]: (b[id] || 0) + 1 }));
    setShowCart(true);
  };

  const subtotalItems = useMemo(() => {
    let sum = 0;
    for (const [idStr, qty] of Object.entries(cart)) {
      const id = Number(idStr);
      const item = inventory.find((i) => i.id === id);
      if (item) sum += item.price * qty;
    }
    for (const [bidStr, qty] of Object.entries(cartBundles)) {
      const bid = Number(bidStr);
      const b = bundles.find((x) => x.id === bid);
      if (b) sum += b.price * qty;
    }
    return sum;
  }, [cart, cartBundles]);

  const tax = +(subtotalItems * TAX_RATE).toFixed(2);
  const shipping = subtotalItems > 100 ? 0 : SHIPPING_FLAT;
  const total = +(subtotalItems + tax + shipping).toFixed(2);

  const submitOrder = (form: Record<string, string>) => {
    // simulate processing
    const orderId = `ST-${Math.floor(10000 + Math.random() * 89999)}`;
    setOrderConfirmed({ id: orderId, total });
    setCart({});
    setCartBundles({});
    setShowCheckout(false);
    setShowCart(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a href="/" className="text-sm font-semibold text-slate-700 transition hover:text-slate-900">← Back to home</a>
            <h1 className="mt-3 text-4xl font-semibold">Skool Tools — E-Commerce Case Study</h1>
            <p className="mt-2 text-slate-600 max-w-xl">A friendly, high-fidelity demo showcasing full-stack e-commerce UX, state management, and conversion flows.</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setShowCart(true); setShowCheckout(false); }}
              className="rounded-full bg-yellow-400 px-4 py-2 font-semibold shadow"
            >
              View Cart
            </button>
          </div>
        </div>

        <section className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, brands..."
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex h-32 items-center justify-center rounded-md bg-gradient-to-br from-yellow-50 to-blue-50">
                    <div className="text-sm font-semibold text-slate-700">{item.title}</div>
                  </div>
                  <div className="mt-3 flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-800">{item.brand}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-slate-900">${item.price}</div>
                      <button
                        onClick={() => addItem(item.id)}
                        className="mt-2 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-lg font-semibold">Bundles</h3>
            <p className="mt-2 text-sm text-slate-500">Pre-curated packs for instant checkout.</p>
            <div className="mt-4 space-y-3">
              {bundles.map((b) => (
                <div key={b.id} className="flex items-start justify-between rounded-lg border p-3">
                  <div>
                    <div className="text-sm font-medium">{b.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{b.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">${b.price}</div>
                    <button
                      onClick={() => addBundle(b.id)}
                      className="mt-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold"
                    >
                      Add Bundle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed right-6 bottom-6 z-50 w-[360px]"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Your Cart</h4>
                  <button className="text-xs text-slate-500" onClick={() => setShowCart(false)}>Close</button>
                </div>

                <div className="mt-3 max-h-60 overflow-auto">
                  {Object.keys(cart).length === 0 && Object.keys(cartBundles).length === 0 && (
                    <div className="py-6 text-center text-sm text-slate-500">Cart is empty</div>
                  )}

                  {Object.entries(cart).map(([idStr, qty]) => {
                    const id = Number(idStr);
                    const item = inventory.find((i) => i.id === id)!;
                    if (!item || qty === 0) return null;
                    return (
                      <div key={id} className="mt-3 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.brand}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">${item.price}</div>
                          <div className="mt-1 flex items-center gap-2">
                            <button onClick={() => changeQty(id, Math.max(0, qty - 1))} className="text-xs rounded px-2 bg-slate-100">-</button>
                            <div className="text-xs">{qty}</div>
                            <button onClick={() => changeQty(id, qty + 1)} className="text-xs rounded px-2 bg-slate-100">+</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {Object.entries(cartBundles).map(([bidStr, qty]) => {
                    const bid = Number(bidStr);
                    const b = bundles.find((x) => x.id === bid)!;
                    if (!b || qty === 0) return null;
                    return (
                      <div key={bid} className="mt-3 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">{b.title}</div>
                          <div className="text-xs text-slate-500">Bundle</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">${b.price}</div>
                          <div className="mt-1 text-xs">Qty {qty}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 border-t pt-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span>${subtotalItems.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-semibold">Total</div>
                    <div className="text-lg font-semibold">${total.toFixed(2)}</div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button onClick={() => { setShowCheckout(true); }} className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Checkout</button>
                    <button onClick={() => { setCart({}); setCartBundles({}); }} className="rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold">Clear</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCheckout && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowCheckout(false)} />
              <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                <h3 className="text-lg font-semibold">Checkout (Mock)</h3>
                <p className="mt-2 text-sm text-slate-600">Enter any dummy shipping and card details to simulate an order.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget as HTMLFormElement);
                    const obj: Record<string, string> = {};
                    fd.forEach((v, k) => (obj[k] = String(v)));
                    submitOrder(obj);
                  }}
                  className="mt-4 grid gap-3"
                >
                  <input name="name" placeholder="Full name" required className="w-full rounded-md border p-2" />
                  <input name="address" placeholder="Shipping address" required className="w-full rounded-md border p-2" />
                  <input name="card" placeholder="Card number (try 4242 4242 4242 4242)" required className="w-full rounded-md border p-2" />
                  <div className="mt-4 flex justify-end gap-2">
                    <button type="button" onClick={() => setShowCheckout(false)} className="rounded-md bg-slate-100 px-3 py-2">Cancel</button>
                    <button type="submit" className="rounded-md bg-yellow-400 px-3 py-2 font-semibold">Place Order</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {orderConfirmed && (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-black/40" />
              <motion.div initial={{ y: 12 }} animate={{ y: 0 }} className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
                <div className="text-2xl font-bold text-green-600">Success!</div>
                <div className="mt-2 text-sm text-slate-600">Order {orderConfirmed.id} Confirmed</div>
                <div className="mt-4 text-lg font-semibold">Total Paid: ${orderConfirmed.total.toFixed(2)}</div>
                <div className="mt-6">
                  <button onClick={() => setOrderConfirmed(null)} className="rounded-md bg-blue-600 px-4 py-2 text-white">Close</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
