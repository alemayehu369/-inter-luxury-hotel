"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [menu, setMenu] = useState([]);
  const [settings, setSettings] = useState({ heroImage: "" });
  const [loading, setLoading] = useState(true);

  const refreshRooms = useCallback(async () => {
    const res = await fetch("/api/rooms");
    const data = await res.json();
    setRooms(data.rooms || []);
  }, []);

  const refreshMenu = useCallback(async () => {
    const res = await fetch("/api/menu");
    const data = await res.json();
    setMenu(data.menu || []);
  }, []);

  const refreshSettings = useCallback(async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();
    setSettings(data.settings || {});
  }, []);

  useEffect(() => {
    Promise.all([refreshRooms(), refreshMenu(), refreshSettings()]).finally(() =>
      setLoading(false)
    );
  }, [refreshRooms, refreshMenu, refreshSettings]);

  return (
    <DataContext.Provider
      value={{
        rooms,
        menu,
        settings,
        loading,
        refreshRooms,
        refreshMenu,
        refreshSettings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
