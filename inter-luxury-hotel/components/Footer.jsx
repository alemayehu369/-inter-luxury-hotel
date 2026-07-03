export default function Footer() {
  return (
    <footer className="bg-ink-2 border-t border-gold/10 px-5 md:px-8 pt-16 pb-8">
      <div className="mx-auto max-w-7xl grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <span className="font-display text-lg tracking-wide text-cream">
            INTER LUXURY HOTEL
          </span>
          <p className="mt-3 text-sm text-cream-dim leading-relaxed max-w-xs">
            Experience true luxury and comfort — where Ethiopian heritage
            meets world-class hospitality.
          </p>
        </div>

        <div>
          <h5 className="text-gold text-xs tracking-[0.25em] uppercase mb-4">
            Explore
          </h5>
          <ul className="space-y-2 text-sm text-cream-dim">
            <li><a href="#rooms" className="hover:text-gold">Rooms</a></li>
            <li><a href="#menu" className="hover:text-gold">Menu</a></li>
            <li><a href="#account" className="hover:text-gold">My Account</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-gold text-xs tracking-[0.25em] uppercase mb-4">
            Contact
          </h5>
          <ul className="space-y-2 text-sm text-cream-dim">
            <li>Bole Road, Addis Ababa</li>
            <li>+251 911 000 000</li>
            <li>info@interluxury.et</li>
          </ul>
        </div>

        <div>
          <h5 className="text-gold text-xs tracking-[0.25em] uppercase mb-4">
            Hours
          </h5>
          <ul className="space-y-2 text-sm text-cream-dim">
            <li>Front Desk: 24/7</li>
            <li>Restaurant: 7AM – 11:30PM</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-12 pt-6 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-dim">
        <span>© {new Date().getFullYear()} Inter Luxury Hotel. All rights reserved.</span>
        <span>Designed &amp; Developed by Tesfa Mikael</span>
      </div>
    </footer>
  );
}
