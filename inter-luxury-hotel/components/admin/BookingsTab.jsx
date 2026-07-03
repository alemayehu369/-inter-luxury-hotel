"use client";

import { etb, formatDate } from "@/lib/format";
import { Trash2 } from "lucide-react";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export default function BookingsTab({ bookings, refresh }) {
  async function setStatus(id, status) {
    await fetch(`/api/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refresh();
  }

  async function remove(id) {
    if (!confirm("Delete this booking record?")) return;
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    refresh();
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Bookings</h1>
      <p className="text-cream-dim text-sm mb-8">Review and manage room reservations.</p>

      <div className="card-panel rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-left text-cream-dim border-b border-gold/10 uppercase text-xs tracking-wide">
              <th className="px-5 py-3">Guest</th>
              <th className="px-5 py-3">Room</th>
              <th className="px-5 py-3">Dates</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-gold/5 last:border-0">
                <td className="px-5 py-3">
                  <p className="text-cream">{b.guestName}</p>
                  <p className="text-xs text-cream-dim">{b.phone}</p>
                </td>
                <td className="px-5 py-3 text-cream-dim">{b.roomName}</td>
                <td className="px-5 py-3 text-cream-dim text-xs">
                  {formatDate(b.checkIn)} → {formatDate(b.checkOut)}
                </td>
                <td className="px-5 py-3 text-gold">{etb(b.total)}</td>
                <td className="px-5 py-3">
                  <select
                    value={b.status}
                    onChange={(e) => setStatus(b.id, e.target.value)}
                    className="input py-1.5 text-xs w-auto"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => remove(b.id)} className="p-2 text-cream-dim hover:text-red-400">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-cream-dim">
                  No bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
