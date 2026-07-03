"use client";

import { useData } from "@/context/DataContext";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const { settings } = useData();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end pb-24 md:pb-32"
    >
      <div className="absolute inset-0">
        {settings.heroImage && (
          <img
            src={settings.heroImage}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink" />
        <div className="absolute inset-0 bg-ink/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-5 md:px-8">
        <p className="cross-divider justify-start text-gold-light text-xs tracking-[0.35em] uppercase mb-6">
          <span className="whitespace-nowrap">Addis Ababa · 5-Star Luxury</span>
        </p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-cream max-w-4xl">
          Inter Luxury{" "}
          <span className="italic text-gold-light font-light">Hotel</span>
        </h1>
        <p className="mt-6 text-cream-dim text-base md:text-lg max-w-lg">
          Experience true luxury and comfort — where Ethiopian heritage meets
          world-class hospitality.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#rooms"
            className="px-7 py-3.5 bg-gold text-ink font-semibold rounded-full hover:bg-gold-light transition-colors"
          >
            Book a Room
          </a>
          <a
            href="#menu"
            className="px-7 py-3.5 border border-cream/30 text-cream rounded-full hover:border-gold hover:text-gold transition-colors"
          >
            View Menu
          </a>
        </div>
      </div>

      <a
        href="#rooms"
        className="hidden md:flex absolute bottom-8 right-8 z-10 items-center gap-2 text-cream-dim text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors"
      >
        Scroll
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
