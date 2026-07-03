"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, User, ShieldCheck, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#rooms", label: "Rooms" },
  { href: "#menu", label: "Menu" },
  { href: "#account", label: "My Account" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { openAuth, openCart } = useUI();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-ink/95 backdrop-blur border-b border-gold/15" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 md:px-8 h-18 flex items-center justify-between py-3">
        <Link href="#home" className="flex items-center gap-3 shrink-0">
          <span className="w-9 h-9 rounded-full border border-gold flex items-center justify-center font-display italic text-gold text-lg">
            I
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-lg tracking-wide text-cream">
              INTER LUXURY
            </span>
            <span className="text-[10px] tracking-[0.3em] text-gold-light uppercase -mt-1">
              Hotel &amp; Restaurant
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-cream-dim hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            aria-label="Open food cart"
            className="relative p-2 text-cream hover:text-gold transition-colors"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-ink text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {!user ? (
            <button
              onClick={() => openAuth("login")}
              className="hidden sm:inline-flex text-sm px-4 py-2 border border-gold text-gold rounded-full hover:bg-gold hover:text-ink transition-colors"
            >
              Login / Register
            </button>
          ) : (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 text-sm text-cream hover:text-gold transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-semibold text-xs">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
                {user.name?.split(" ")[0]}
              </button>
              {menuOpen && (
                <div
                  onMouseLeave={() => setMenuOpen(false)}
                  className="absolute right-0 mt-3 w-56 card-panel rounded-xl overflow-hidden shadow-2xl animate-fade-up"
                >
                  <a
                    href="#account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-cream hover:bg-gold/10"
                  >
                    <User size={16} className="text-gold" /> My Account
                  </a>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-cream hover:bg-gold/10"
                    >
                      <ShieldCheck size={16} className="text-gold" /> Admin Console
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left text-cream hover:bg-gold/10 border-t border-gold/10"
                  >
                    <LogOut size={16} className="text-gold" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="md:hidden p-2 text-cream"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-ink-2 border-t border-gold/15 px-5 py-4 flex flex-col gap-3 animate-fade-up">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-cream-dim hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          {user?.role === "admin" && (
            <Link href="/admin" className="text-sm text-gold">
              Admin Console
            </Link>
          )}
          {!user ? (
            <button
              onClick={() => {
                openAuth("login");
                setMobileOpen(false);
              }}
              className="text-sm px-4 py-2 border border-gold text-gold rounded-full w-fit"
            >
              Login / Register
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="text-sm text-left text-cream-dim hover:text-gold"
            >
              Logout ({user.name?.split(" ")[0]})
            </button>
          )}
        </div>
      )}
    </header>
  );
}
