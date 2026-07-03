"use client";

import { formatDate } from "@/lib/format";
import { Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function UsersTab({ users, refresh }) {
  const { user: me } = useAuth();

  async function setRole(id, role) {
    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    refresh();
  }

  async function toggleStatus(id, status) {
    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status === "active" ? "suspended" : "active" }),
    });
    refresh();
  }

  async function remove(id) {
    if (!confirm("Delete this user account?")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    refresh();
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Users</h1>
      <p className="text-cream-dim text-sm mb-8">Manage guest accounts and admin access.</p>

      <div className="card-panel rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-left text-cream-dim border-b border-gold/10 uppercase text-xs tracking-wide">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gold/5 last:border-0">
                <td className="px-5 py-3 text-cream">{u.name}</td>
                <td className="px-5 py-3 text-cream-dim">{u.email}</td>
                <td className="px-5 py-3 text-cream-dim text-xs">{formatDate(u.createdAt)}</td>
                <td className="px-5 py-3">
                  <select
                    value={u.role}
                    onChange={(e) => setRole(u.id, e.target.value)}
                    disabled={u.id === me?.id}
                    className="input py-1.5 text-xs w-auto disabled:opacity-40"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleStatus(u.id, u.status)}
                    disabled={u.id === me?.id}
                    className={`px-2.5 py-1 rounded-full text-xs border disabled:opacity-40 ${
                      u.status === "active"
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : "bg-red-500/15 text-red-300 border-red-500/30"
                    }`}
                  >
                    {u.status}
                  </button>
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => remove(u.id)}
                    disabled={u.id === me?.id}
                    className="p-2 text-cream-dim hover:text-red-400 disabled:opacity-30"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
