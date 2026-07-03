"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { etb, formatDate } from "@/lib/format";
import { BedDouble, Package, LogIn } from "lucide-react";

const STATUS_STYLES = {
  pending: "bg-gold/15 text-gold-light border-gold/30",
  confirmed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  cancelled: "bg-red-500/15 text-red-300 border-red-500/30",
  completed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  preparing: "bg-gold/15 text-gold-light border-gold/30",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wide border ${
        STATUS_STYLES[status] || "bg-cream/10 text-cream-dim border-cream/20"
      }`}
    >
      {status}
    </span>
  );
}

export default function AccountSection() {
  const { user } = useAuth();
  const { openAuth } = useUI();
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      fetch(`/api/bookings?userId=${user.id}`).then((r) => r.json()),
      fetch(`/api/orders?userId=${user.id}`).then((r) => r.json()),
    ])
      .then(([b, o]) => {
        setBookings(b.bookings || []);
        setOrders(o.orders || []);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <section id="account" className="py-24 md:py-32 px-5 md:px-8 bg-ink-2/60 border-y border-gold/10">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="cross-divider text-gold text-xs tracking-[0.35em] uppercase mb-4">
            My Account
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream">
            Welcome{user ? `, ${user.name.split(" ")[0]}` : ""}
          </h2>
          <p className="mt-4 text-cream-dim">
            View your bookings and food order history.
          </p>
        </div>

        {!user ? (
          <div className="card-panel rounded-2xl p-10 text-center max-w-md mx-auto">
            <p className="text-cream-dim mb-6">
              Sign in to view your bookings and orders.
            </p>
            <button
              onClick={() => openAuth("login")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-ink rounded-full font-semibold hover:bg-gold-light transition-colors"
            >
              <LogIn size={16} /> Login / Register
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-3 mb-10">
              <button
                onClick={() => setTab("bookings")}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border transition-colors ${
                  tab === "bookings"
                    ? "bg-gold text-ink border-gold"
                    : "border-gold/30 text-cream-dim hover:text-gold"
                }`}
              >
                <BedDouble size={15} /> My Bookings
              </button>
              <button
                onClick={() => setTab("orders")}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border transition-colors ${
                  tab === "orders"
                    ? "bg-gold text-ink border-gold"
                    : "border-gold/30 text-cream-dim hover:text-gold"
                }`}
              >
                <Package size={15} /> My Orders
              </button>
            </div>

            {loading ? (
              <p className="text-center text-cream-dim">Loading…</p>
            ) : tab === "bookings" ? (
              bookings.length === 0 ? (
                <p className="text-center text-cream-dim">
                  You have no bookings yet. Book a room above to get started.
                </p>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="card-panel rounded-xl p-5 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <p className="font-display text-lg text-cream">
                          {b.roomName}
                        </p>
                        <p className="text-xs text-cream-dim mt-1">
                          {formatDate(b.checkIn)} → {formatDate(b.checkOut)} ·{" "}
                          {b.guests} guest{b.guests > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-gold">
                          {etb(b.total)}
                        </span>
                        <StatusBadge status={b.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : orders.length === 0 ? (
              <p className="text-center text-cream-dim">
                You have no orders yet. Browse the menu above to order.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="card-panel rounded-xl p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <p className="text-xs text-cream-dim">
                        Table/Room {o.tableRoom} · {formatDate(o.createdAt)}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-gold">
                          {etb(o.total)}
                        </span>
                        <StatusBadge status={o.status} />
                      </div>
                    </div>
                    <p className="text-sm text-cream-dim">
                      {o.items.map((it) => `${it.name} ×${it.qty}`).join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
