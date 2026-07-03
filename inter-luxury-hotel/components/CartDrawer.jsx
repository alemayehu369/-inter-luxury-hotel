"use client";

import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { etb } from "@/lib/format";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { cartOpen, closeCart, openCheckout } = useUI();
  const { items, updateQty, removeItem, subtotal } = useCart();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={closeCart} />
      <div className="relative w-full max-w-md h-full bg-ink-2 border-l border-gold/15 flex flex-col animate-fade-up">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
          <h3 className="font-display text-xl text-cream flex items-center gap-2">
            <ShoppingBag size={18} className="text-gold" /> Your Order
          </h3>
          <button onClick={closeCart} className="text-cream-dim hover:text-gold">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5 space-y-4">
          {items.length === 0 ? (
            <p className="text-cream-dim text-sm text-center mt-10">
              Your cart is empty. Add something delicious from our menu.
            </p>
          ) : (
            items.map((item) => (
              <div key={item.menuId} className="flex gap-3 items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-cream truncate">{item.name}</p>
                  <p className="text-xs text-gold">{etb(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.menuId, item.qty - 1)}
                    className="w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center text-cream-dim hover:text-gold"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-5 text-center text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.menuId, item.qty + 1)}
                    className="w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center text-cream-dim hover:text-gold"
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.menuId)}
                  className="text-cream-dim hover:text-red-400 ml-1"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-5 border-t border-gold/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-cream-dim text-sm">Subtotal</span>
            <span className="font-display text-xl text-gold">{etb(subtotal)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={openCheckout}
            className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
