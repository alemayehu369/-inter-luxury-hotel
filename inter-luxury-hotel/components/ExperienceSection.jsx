import { BedDouble, ChefHat, Flame, Car } from "lucide-react";

const FEATURES = [
  {
    icon: BedDouble,
    title: "Premium Comfort",
    desc: "Five-star bedding and interiors across every room category.",
  },
  {
    icon: ChefHat,
    title: "Master Chefs",
    desc: "Internationally trained chefs crafting Ethiopian-inspired luxury cuisine.",
  },
  {
    icon: Flame,
    title: "Ambient Elegance",
    desc: "Gold-lit interiors and live ambience for an unforgettable stay.",
  },
  {
    icon: Car,
    title: "Valet & Delivery",
    desc: "Seamless room service, valet parking, and in-room dining.",
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-24 md:py-28 px-5 md:px-8 bg-ink-2/60 border-y border-gold/10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="cross-divider text-gold text-xs tracking-[0.35em] uppercase mb-4">
            An Experience, Not Just a Stay
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream">
            What Sets Us Apart
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center px-2">
              <div className="mx-auto w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mb-5">
                <Icon className="text-gold" size={26} />
              </div>
              <h3 className="font-display text-lg text-cream mb-2">{title}</h3>
              <p className="text-sm text-cream-dim leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
