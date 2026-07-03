"use client";

import { useMemo, useState } from "react";
import Modal from "./Modal";
import { useUI } from "@/context/UIContext";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { etb, todayISO } from "@/lib/format";

const ID_TYPES = ["National ID", "Passport", "Driving License"];

export default function BookRoomModal() {
  const { bookingRoom, closeBooking, openSuccess, openAuth } = useUI();
  const { user } = useAuth();
  const { refreshRooms } = useData();

  const [form, setForm] = useState(() => initialForm(user));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const n = Math.round(
      (new Date(form.checkOut) - new Date(form.checkIn)) / 86400000
    );
    return n > 0 ? n : 0;
  }, [form.checkIn, form.checkOut]);

  const total = bookingRoom ? nights * bookingRoom.price : 0;

  function close() {
    setError("");
    setForm(initialForm(user));
    closeBooking();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      openAuth("login");
      return;
    }
    if (nights <= 0) {
      setError("Please select a valid check-out date.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          userId: user.id,
          roomId: bookingRoom.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not complete booking.");
      close();
      openSuccess(
        `Booking request received for ${bookingRoom.name}. Total: ${etb(
          data.booking.total
        )}. Our front desk will confirm shortly.`
      );
      refreshRooms();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={!!bookingRoom} onClose={close} maxWidth="max-w-lg">
      {bookingRoom && (
        <div className="p-8">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-1">
            Book a Room
          </p>
          <h3 className="font-display text-2xl text-cream">
            {bookingRoom.name}
          </h3>
          <p className="text-sm text-cream-dim mt-1">
            {etb(bookingRoom.price)} / night
          </p>

          {!user && (
            <p className="mt-4 text-sm text-gold-light bg-gold/10 border border-gold/25 rounded-lg px-3 py-2">
              Please{" "}
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="underline"
              >
                sign in
              </button>{" "}
              to complete your booking.
            </p>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Full Name">
                <input
                  required
                  value={form.guestName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, guestName: e.target.value }))
                  }
                  className="input"
                />
              </Field>
              <Field label="Phone">
                <input
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="input"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Check-in">
                <input
                  type="date"
                  required
                  min={todayISO()}
                  value={form.checkIn}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, checkIn: e.target.value }))
                  }
                  className="input"
                />
              </Field>
              <Field label="Check-out">
                <input
                  type="date"
                  required
                  min={form.checkIn || todayISO()}
                  value={form.checkOut}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, checkOut: e.target.value }))
                  }
                  className="input"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Guests">
                <input
                  type="number"
                  min={1}
                  max={8}
                  required
                  value={form.guests}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, guests: e.target.value }))
                  }
                  className="input"
                />
              </Field>
              <Field label="ID Type">
                <select
                  value={form.idType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, idType: e.target.value }))
                  }
                  className="input"
                >
                  {ID_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="ID / Passport Number" hint="Required for check-in verification.">
              <input
                required
                value={form.idNumber}
                onChange={(e) =>
                  setForm((f) => ({ ...f, idNumber: e.target.value }))
                }
                className="input"
              />
            </Field>

            <div className="flex items-center justify-between pt-2 border-t border-gold/10">
              <span className="text-sm text-cream-dim">
                {nights > 0 ? `${nights} night${nights > 1 ? "s" : ""}` : "Select dates"}
              </span>
              <span className="font-display text-xl text-gold">
                {etb(total)}
              </span>
            </div>

            <button disabled={busy} className="btn-primary w-full">
              {busy ? "Booking…" : user ? "Confirm Booking" : "Sign In to Book"}
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
}

function initialForm(user) {
  return {
    guestName: user?.name || "",
    phone: user?.phone || "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    idType: user?.idType || "National ID",
    idNumber: user?.idNumber || "",
  };
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block text-xs text-cream-dim mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-cream-dim/70 mt-1">{hint}</span>}
    </label>
  );
}
