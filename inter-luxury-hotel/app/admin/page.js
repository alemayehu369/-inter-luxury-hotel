"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import OverviewTab from "@/components/admin/OverviewTab";
import RoomsTab from "@/components/admin/RoomsTab";
import MenuTab from "@/components/admin/MenuTab";
import BookingsTab from "@/components/admin/BookingsTab";
import OrdersTab from "@/components/admin/OrdersTab";
import UsersTab from "@/components/admin/UsersTab";
import SettingsTab from "@/components/admin/SettingsTab";
import { ShieldAlert } from "lucide-react";

export default function AdminPage() {
  const { user, ready } = useAuth();
  const { rooms, menu, settings, refreshRooms, refreshMenu, refreshSettings } = useData();

  const [tab, setTab] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const refreshBookings = useCallback(async () => {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data.bookings || []);
  }, []);

  const refreshOrders = useCallback(async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data.orders || []);
  }, []);

  const refreshUsers = useCallback(async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data.users || []);
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      refreshBookings();
      refreshOrders();
      refreshUsers();
    }
  }, [user, refreshBookings, refreshOrders, refreshUsers]);

  if (!ready) {
    return <div className="min-h-screen flex items-center justify-center text-cream-dim">Loading…</div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="card-panel rounded-2xl p-10 max-w-sm">
          <ShieldAlert className="mx-auto text-gold mb-4" size={32} />
          <h1 className="font-display text-2xl text-cream mb-2">Admins Only</h1>
          <p className="text-sm text-cream-dim mb-6">
            You need an administrator account to view this page.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Back to Site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-ink">
      <AdminSidebar active={tab} onChange={setTab} />
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        {tab === "overview" && (
          <OverviewTab rooms={rooms} menu={menu} bookings={bookings} orders={orders} users={users} />
        )}
        {tab === "rooms" && <RoomsTab rooms={rooms} refresh={refreshRooms} />}
        {tab === "menu" && <MenuTab menu={menu} refresh={refreshMenu} />}
        {tab === "bookings" && <BookingsTab bookings={bookings} refresh={refreshBookings} />}
        {tab === "orders" && <OrdersTab orders={orders} refresh={refreshOrders} />}
        {tab === "users" && <UsersTab users={users} refresh={refreshUsers} />}
        {tab === "settings" && <SettingsTab settings={settings} refresh={refreshSettings} />}
      </main>
    </div>
  );
}
