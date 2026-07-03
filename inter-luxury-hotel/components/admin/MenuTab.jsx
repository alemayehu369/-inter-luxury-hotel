"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { etb } from "@/lib/format";
import { Plus, Pencil, Trash2 } from "lucide-react";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Drinks", "Dessert"];

const EMPTY = {
  name: "",
  category: CATEGORIES[0],
  price: "",
  image: "",
  description: "",
};

export default function MenuTab({ menu, refresh }) {
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function openCreate() {
    setForm({ ...EMPTY });
    setError("");
  }
  function openEdit(item) {
    setForm({ ...item });
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
      const res = await fetch(isEdit ? `/api/menu/${form.id}` : "/api/menu", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save item.");
      close();
      refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this menu item?")) return;
    await fetch(`/api/menu/${id}`, { method: "DELETE" });
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-cream mb-1">Menu</h1>
          <p className="text-cream-dim text-sm">Manage restaurant dishes and drinks.</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {menu.map((item) => (
          <div key={item.id} className="card-panel rounded-2xl overflow-hidden">
            <img src={item.image} alt="" className="w-full h-32 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="text-cream text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gold-light">{item.category}</p>
                </div>
                <span className="text-gold text-sm">{etb(item.price)}</span>
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button onClick={() => openEdit(item)} className="p-1.5 text-cream-dim hover:text-gold">
                  <Pencil size={14} />
                </button>
                <button onClick={() => remove(item.id)} className="p-1.5 text-cream-dim hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {menu.length === 0 && (
          <p className="text-cream-dim text-sm col-span-full text-center py-8">
            No menu items yet. Add your first dish.
          </p>
        )}
      </div>

      <Modal open={!!form} onClose={close} maxWidth="max-w-lg">
        {form && (
          <form onSubmit={save} className="p-8 space-y-4">
            <h3 className="font-display text-2xl text-cream mb-2">
              {form.id ? "Edit Item" : "Add Menu Item"}
            </h3>
            {error && (
              <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs text-cream-dim mb-1.5">Item Name</span>
                <input required className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </label>
              <label className="block">
                <span className="block text-xs text-cream-dim mb-1.5">Category</span>
                <select className="input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block">
              <span className="block text-xs text-cream-dim mb-1.5">Price (ETB)</span>
              <input required type="number" min={0} className="input" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            </label>
            <label className="block">
              <span className="block text-xs text-cream-dim mb-1.5">Image URL</span>
              <input className="input" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="https://…" />
            </label>
            <label className="block">
              <span className="block text-xs text-cream-dim mb-1.5">Description</span>
              <textarea rows={3} className="input" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </label>
            <button disabled={busy} className="btn-primary w-full">
              {busy ? "Saving…" : "Save Item"}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
