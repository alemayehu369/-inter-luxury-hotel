"use client";

import { useState } from "react";

export default function SettingsTab({ settings, refresh }) {
  const [image, setImage] = useState(settings.heroImage || "");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heroImage: image }),
    });
    await refresh();
    setBusy(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Settings</h1>
      <p className="text-cream-dim text-sm mb-8">Control the public site's hero appearance.</p>

      <form onSubmit={save} className="card-panel rounded-2xl p-6 max-w-xl space-y-4">
        <label className="block">
          <span className="block text-xs text-cream-dim mb-1.5">Homepage Hero Image URL</span>
          <input
            className="input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://…"
          />
        </label>

        {image && (
          <img src={image} alt="Hero preview" className="w-full h-48 object-cover rounded-xl border border-gold/15" />
        )}

        <button disabled={busy} className="btn-primary">
          {busy ? "Saving…" : "Save Changes"}
        </button>
        {saved && <p className="text-sm text-emerald-300">Saved — the homepage hero has been updated.</p>}
      </form>
    </div>
  );
}
