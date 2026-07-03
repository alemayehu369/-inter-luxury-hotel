"use client";

import { etb } from "@/lib/format";
import { BedDouble, UtensilsCrossed, CalendarCheck, Package, Users, Coins } from "lucide-react";

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="card-panel rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
          <Icon size={18} className="text-gold" />
        </span>
      </div>
      <p className="font-display text-3xl text-cream">{value}</p>
      <p className="text-sm text-cream-dim mt-1">{label}</p>
      {hint && <p className="text-xs text-cream-dim/60 mt-1">{hint}</p>}
    </div>
  );
}

export default function OverviewTab({ rooms, menu, bookings, orders, users }) {
  const revenue =
    bookings.reduce((s, b) => s + (b.status !== "cancelled" ? b.total : 0), 0) +
    orders.reduce((s, o) => s + (o.status !== "cancelled" ? o.total : 0), 0);

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Overview</h1>
      <p className="text-cream-dim text-sm mb-8">
        A snapshot of Inter Luxury Hotel's live operations.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        <StatCard icon={Coins} label="Total Revenue" value={etb(revenue)} hint="Bookings + Orders" />
        <StatCard icon={BedDouble} label="Rooms Listed" value={rooms.length} hint={`${rooms.filter((r) => r.available).length} available`} />
        <StatCard icon={UtensilsCrossed} label="Menu Items" value={menu.length} />
        <StatCard icon={CalendarCheck} label="Bookings" value={bookings.length} hint={`${pendingBookings} pending`} />
        <StatCard icon={Package} label="Food Orders" value={orders.length} hint={`${pendingOrders} pending`} />
        <StatCard icon={Users} label="Registered Guests" value={users.length} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-panel rounded-2xl p-6">
          <h3 className="font-display text-lg text-cream mb-4">Recent Bookings</h3>
          {bookings.slice(0, 5).length === 0 ? (
            <p className="text-sm text-cream-dim">No bookings yet.</p>
          ) : (
            <ul className="space-y-3">
              {bookings.slice(0, 5).map((b) => (
                <li key={b.id} className="flex justify-between text-sm">
                  <span className="text-cream-dim">{b.guestName} · {b.roomName}</span>
                  <span className="text-gold">{etb(b.total)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card-panel rounded-2xl p-6">
          <h3 className="font-display text-lg text-cream mb-4">Recent Orders</h3>
          {orders.slice(0, 5).length === 0 ? (
            <p className="text-sm text-cream-dim">No orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex justify-between text-sm">
                  <span className="text-cream-dim">{o.customerName} · Rm/Tbl {o.tableRoom}</span>
                  <span className="text-gold">{etb(o.total)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
