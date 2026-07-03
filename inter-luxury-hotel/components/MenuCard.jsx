"use client";

import { etb } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";

export default function MenuCard({ item }) {
  const { addItem } = useCart();

  return (
    <div className="card-panel rounded-2xl overflow-hidden flex gap-4 p-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 rounded-xl object-cover shrink-0"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-base text-cream truncate">
            {item.name}
          </h4>
          <span className="text-gold font-semibold text-sm shrink-0">
            {etb(item.price)}
          </span>
        </div>
        <p className="text-xs text-cream-dim mt-1 line-clamp-2 flex-1">
          {item.description}
        </p>
        <button
          onClick={() => addItem(item)}
          className="mt-2 self-start inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-ink transition-colors"
        >
          <Plus size={13} /> Add to Order
        </button>
      </div>
    </div>
  );
}
