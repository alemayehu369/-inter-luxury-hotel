"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { etb } from "@/lib/format";

export default function CheckoutModal() {
  const { checkoutOpen, closeCheckout, openSuccess, openAuth } = useUI();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({ customerName: "", tableRoom: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function close() {
    setError("");
    closeCheckout();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      openAuth("login");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          customerName: form.customerName || user.name,
          tableRoom: form.tableRoom,
          items,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not place order.");
      clearCart();
      close();
      openSuccess(
        `Order placed! Total ${etb(data.order.total)}. Our kitchen has started preparing it.`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={checkoutOpen} onClose={close} maxWidth="max-w-md">
      <div className="p-8">
        <p className="text-xs tracking-[0.25em] uppercase text-gold mb-1">
          Checkout
        </p>
        <h3 className="font-display text-2xl text-cream">Confirm Your Order</h3>

        {!user && (
          <p className="mt-4 text-sm text-gold-light bg-gold/10 border border-gold/25 rounded-lg px-3 py-2">
            Please{" "}
            <button type="button" onClick={() => openAuth("login")} className="underline">
              sign in
            </button>{" "}
            to place this order.
          </p>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="mt-5 mb-5 max-h-40 overflow-y-auto scrollbar-thin space-y-2">
          {items.map((it) => (
            <div key={it.menuId} className="flex justify-between text-sm">
              <span className="text-cream-dim">
                {it.name} × {it.qty}
              </span>
              <span className="text-cream">{etb(it.price * it.qty)}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-xs text-cream-dim mb-1.5">
              Name on Order
            </span>
            <input
              className="input"
              placeholder={user?.name || "Your name"}
              value={form.customerName}
              onChange={(e) =>
                setForm((f) => ({ ...f, customerName: e.target.value }))
              }
            />
          </label>
          <label className="block">
            <span className="block text-xs text-cream-dim mb-1.5">
              Table or Room Number
            </span>
            <input
              required
              className="input"
              placeholder="e.g. Room 214 or Table 6"
              value={form.tableRoom}
              onChange={(e) =>
                setForm((f) => ({ ...f, tableRoom: e.target.value }))
              }
            />
          </label>

          <div className="flex items-center justify-between pt-2 border-t border-gold/10">
            <span className="text-sm text-cream-dim">Total</span>
            <span className="font-display text-xl text-gold">{etb(subtotal)}</span>
          </div>

          <button disabled={busy} className="btn-primary w-full">
            {busy ? "Placing order…" : user ? "Place Order" : "Sign In to Order"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
