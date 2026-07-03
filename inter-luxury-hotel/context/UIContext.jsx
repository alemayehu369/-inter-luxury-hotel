"use client";

import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [authTab, setAuthTab] = useState(null); // 'login' | 'register' | null
  const [bookingRoom, setBookingRoom] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  return (
    <UIContext.Provider
      value={{
        authTab,
        openAuth: (tab = "login") => setAuthTab(tab),
        closeAuth: () => setAuthTab(null),

        bookingRoom,
        openBooking: (room) => setBookingRoom(room),
        closeBooking: () => setBookingRoom(null),

        cartOpen,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),

        checkoutOpen,
        openCheckout: () => {
          setCartOpen(false);
          setCheckoutOpen(true);
        },
        closeCheckout: () => setCheckoutOpen(false),

        successMsg,
        openSuccess: (msg) => setSuccessMsg(msg),
        closeSuccess: () => setSuccessMsg(null),
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
