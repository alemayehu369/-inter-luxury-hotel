"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  BedDouble,
  UtensilsCrossed,
  CalendarCheck,
  Package,
  Users,
  Settings,
  ArrowLeft,
} from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "rooms", label: "Rooms", icon: BedDouble },
  { id: "menu", label: "Menu", icon: UtensilsCrossed },
  { id: "bookings", label: "Bookings", icon: CalendarCheck },
  { id: "orders", label: "Orders", icon: Package },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ active, onChange }) {
  return (
    <aside className="w-full lg:w-64 shrink-0 lg:h-screen lg:sticky lg:top-0 bg-ink-2 border-r border-gold/10 flex lg:flex-col">
      <div className="hidden lg:flex items-center gap-3 px-6 py-6 border-b border-gold/10">
        <span className="w-9 h-9 rounded-full border border-gold flex items-center justify-center font-display italic text-gold">
          I
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm text-cream">INTER LUXURY</p>
          <p className="text-[10px] tracking-[0.2em] text-gold-light uppercase">
            Admin Console
          </p>
        </div>
      </div>

      <nav className="flex lg:flex-col gap-1 px-2 lg:px-3 py-3 lg:py-4 overflow-x-auto lg:overflow-visible flex-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
              active === id
                ? "bg-gold text-ink font-medium"
                : "text-cream-dim hover:bg-gold/10 hover:text-gold"
            }`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </nav>

      <div className="hidden lg:block px-3 py-4 border-t border-gold/10">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-cream-dim hover:bg-gold/10 hover:text-gold"
        >
          <ArrowLeft size={16} /> Back to Site
        </Link>
      </div>
    </aside>
  );
}
