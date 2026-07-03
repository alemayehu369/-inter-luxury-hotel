"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { etb } from "@/lib/format";
import { Plus, Pencil, Trash2 } from "lucide-react";

const ROOM_TYPES = [
  "Shared Bed (Budget)",
  "Standard Room",
  "Deluxe Room",
  "Luxury Suite",
  "VIP Royal Room",
];

const EMPTY = {
  name: "",
  type: ROOM_TYPES[1],
  price: "",
  image: "",
  description: "",
  available: true,
};

export default function RoomsTab({ rooms, refresh }) {
  const [form, setForm] = useState(null); // null = closed, object = editing/creating
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function openCreate() {
    setForm({ ...EMPTY });
    setError("");
  }
  function openEdit(room) {
    setForm({ ...room });
    setError("");
  }
  function close() {
    setForm(null);
    setError("");
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const isEdit = !!form.id;
      const res = await fetch(isEdit ? `/api/rooms/${form.id}` : "/api/rooms", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save room.");
      close();
      refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this room? This cannot be undone.")) return;
    await fetch(`/api/rooms/${id}`, { method: "DELETE" });
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-cream mb-1">Rooms</h1>
          <p className="text-cream-dim text-sm">Manage room categories, pricing and availability.</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Room
        </button>
      </div>

      <div className="card-panel rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-cream-dim border-b border-gold/10 uppercase text-xs tracking-wide">
              <th className="px-5 py-3">Room</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Price / night</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.id} className="border-b border-gold/5 last:border-0">
                <td className="px-5 py-3 flex items-center gap-3">
                  <img src={r.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <span className="text-cream">{r.name}</span>
                </td>
                <td className="px-5 py-3 text-cream-dim">{r.type}</td>
                <td className="px-5 py-3 text-gold">{etb(r.price)}</td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs border ${
                      r.available
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : "bg-red-500/15 text-red-300 border-red-500/30"
                    }`}
                  >
                    {r.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(r)} className="p-2 text-cream-dim hover:text-gold">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => remove(r.id)} className="p-2 text-cream-dim hover:text-red-400">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rooms.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-cream-dim">
                  No rooms yet. Add your first room to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={!!form} onClose={close} maxWidth="max-w-lg">
        {form && (
          <form onSubmit={save} className="p-8 space-y-4">
            <h3 className="font-display text-2xl text-cream mb-2">
              {form.id ? "Edit Room" : "Add Room"}
            </h3>
            {error && (
              <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs text-cream-dim mb-1.5">Room Name</span>
                <input required className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </label>
              <label className="block">
                <span className="block text-xs text-cream-dim mb-1.5">Type</span>
                <select className="input" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                  {ROOM_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs text-cream-dim mb-1.5">Price / night (ETB)</span>
                <input required type="number" min={0} className="input" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
              </label>
              <label className="block">
                <span className="block text-xs text-cream-dim mb-1.5">Availability</span>
                <select
                  className="input"
                  value={form.available ? "yes" : "no"}
                  onChange={(e) => setForm((f) => ({ ...f, available: e.target.value === "yes" }))}
                >
                  <option value="yes">Available</option>
                  <option value="no">Unavailable</option>
                </select>
              </label>
            </div>
            <label className="block">
              <span className="block text-xs text-cream-dim mb-1.5">Image URL</span>
              <input className="input" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="https://…" />
            </label>
            <label className="block">
              <span className="block text-xs text-cream-dim mb-1.5">Description</span>
              <textarea rows={3} className="input" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </label>
            <button disabled={busy} className="btn-primary w-full">
              {busy ? "Saving…" : "Save Room"}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
