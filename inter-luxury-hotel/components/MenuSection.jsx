"use client";

import { useMemo, useState } from "react";
import { useData } from "@/context/DataContext";
import MenuCard from "./MenuCard";

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Drinks", "Dessert"];

export default function MenuSection() {
  const { menu, loading } = useData();
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? menu : menu.filter((m) => m.category === active)),
    [menu, active]
  );

  return (
    <section id="menu" className="py-24 md:py-32 px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="cross-divider text-gold text-xs tracking-[0.35em] uppercase mb-4">
            Our Menu
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream">
            Crafted for Every Occasion
          </h2>
          <p className="mt-4 text-cream-dim">
            Breakfast to dessert — sourced, seasoned, served with
            gold-standard care.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-xs tracking-wide uppercase transition-colors border ${
                active === cat
                  ? "bg-gold text-ink border-gold"
                  : "border-gold/30 text-cream-dim hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-cream-dim">Loading menu…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-cream-dim">
            No items in this category yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
