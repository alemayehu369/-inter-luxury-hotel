"use client";

import { useData } from "@/context/DataContext";
import RoomCard from "./RoomCard";

export default function RoomsSection() {
  const { rooms, loading } = useData();

  return (
    <section id="rooms" className="py-24 md:py-32 px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="cross-divider text-gold text-xs tracking-[0.35em] uppercase mb-4">
            Stay With Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream">
            Rooms &amp; Suites
          </h2>
          <p className="mt-4 text-cream-dim">
            From budget shared beds to the VIP Royal Suite — find your
            comfort.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-cream-dim">Loading rooms…</div>
        ) : rooms.length === 0 ? (
          <div className="text-center text-cream-dim">
            No rooms are available right now. Please check back soon.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
