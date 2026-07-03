"use client";

import { etb } from "@/lib/format";
import { useUI } from "@/context/UIContext";
import { BedDouble } from "lucide-react";

export default function RoomCard({ room }) {
  const { openBooking } = useUI();

  return (
    <div className="card-panel rounded-2xl overflow-hidden group flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <span className="absolute top-4 left-4 bg-ink/70 backdrop-blur px-3 py-1 rounded-full text-[11px] tracking-wide uppercase text-gold-light border border-gold/30">
          {room.type}
        </span>
        {!room.available && (
          <span className="absolute inset-0 bg-ink/70 flex items-center justify-center text-cream text-sm tracking-widest uppercase">
            Fully Booked
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl text-cream">{room.name}</h3>
        <p className="mt-2 text-sm text-cream-dim leading-relaxed line-clamp-3 flex-1">
          {room.description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="font-display text-2xl text-gold">
              {etb(room.price)}
            </span>
            <span className="text-cream-dim text-xs"> / night</span>
          </div>
          <button
            onClick={() => openBooking(room)}
            disabled={!room.available}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-gold text-gold hover:bg-gold hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <BedDouble size={15} /> Book
          </button>
        </div>
      </div>
    </div>
  );
}
