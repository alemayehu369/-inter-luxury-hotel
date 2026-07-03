"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "ilh_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(menuItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuId === menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.menuId === menuItem.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          menuId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          image: menuItem.image,
          qty: 1,
        },
      ];
    });
  }

  function updateQty(menuId, qty) {
    if (qty <= 0) {
      removeItem(menuId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.menuId === menuId ? { ...i, qty } : i)));
  }

  function removeItem(menuId) {
    setItems((prev) => prev.filter((i) => i.menuId !== menuId));
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clearCart, subtotal, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
