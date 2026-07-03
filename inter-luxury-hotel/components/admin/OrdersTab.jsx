"use client";

import { etb, formatDate } from "@/lib/format";
import { Trash2 } from "lucide-react";

const STATUSES = ["pending", "preparing", "completed", "cancelled"];

export default function OrdersTab({ orders, refresh }) {
  async function setStatus(id, status) {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refresh();
  }

  async function remove(id) {
    if (!confirm("Delete this order record?")) return;
    await fetch(`/api/orders/${id}`, { method: "DELETE" });
    refresh();
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Orders</h1>
      <p className="text-cream-dim text-sm mb-8">Track and update restaurant orders.</p>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="card-panel rounded-2xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-cream">{o.customerName}</p>
                <p className="text-xs text-cream-dim">
                  Rm/Table {o.tableRoom} · {formatDate(o.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gold font-display">{etb(o.total)}</span>
                <select
                  value={o.status}
                  onChange={(e) => setStatus(o.id, e.target.value)}
                  className="input py-1.5 text-xs w-auto"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button onClick={() => remove(o.id)} className="p-2 text-cream-dim hover:text-red-400">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <p className="text-sm text-cream-dim mt-3 pt-3 border-t border-gold/10">
              {o.items.map((it) => `${it.name} ×${it.qty}`).join(", ")}
            </p>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-cream-dim text-sm text-center py-8">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
