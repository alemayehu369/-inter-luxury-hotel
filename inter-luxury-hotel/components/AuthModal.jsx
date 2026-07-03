"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";

const ID_TYPES = ["National ID", "Passport", "Driving License"];

export default function AuthModal() {
  const { authTab, closeAuth, openSuccess } = useUI();
  const { login, register } = useAuth();
  const [tab, setTab] = useState("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    idType: "National ID",
    idNumber: "",
  });

  const activeTab = authTab === "register" ? "register" : tab;

  function close() {
    setError("");
    closeAuth();
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(loginForm.email, loginForm.password);
      close();
      openSuccess("Welcome back! You're signed in.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(regForm);
      close();
      openSuccess("Account created — welcome to Inter Luxury.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={!!authTab} onClose={close} maxWidth="max-w-md">
      <div className="p-8">
        <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center font-display italic text-gold mb-5">
          I
        </div>
        <h3 className="font-display text-2xl text-cream">
          Welcome to Inter Luxury
        </h3>
        <p className="text-sm text-cream-dim mt-1 mb-6">
          Sign in or create an account to continue.
        </p>

        <div className="flex gap-2 mb-6 p-1 rounded-full bg-ink border border-gold/15">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded-full text-sm transition-colors ${
              activeTab === "login" ? "bg-gold text-ink" : "text-cream-dim"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-2 rounded-full text-sm transition-colors ${
              activeTab === "register" ? "bg-gold text-ink" : "text-cream-dim"
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {activeTab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <Field label="Email">
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((f) => ({ ...f, email: e.target.value }))
                }
                className="input"
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((f) => ({ ...f, password: e.target.value }))
                }
                className="input"
                placeholder="••••••••"
              />
            </Field>
            <button disabled={busy} className="btn-primary w-full">
              {busy ? "Signing in…" : "Sign In"}
            </button>
            <p className="text-xs text-cream-dim text-center pt-2">
              Demo admin login:{" "}
              <span className="text-gold-light">
                admin@inter.com / admin123
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <Field label="Full Name">
              <input
                required
                value={regForm.name}
                onChange={(e) =>
                  setRegForm((f) => ({ ...f, name: e.target.value }))
                }
                className="input"
              />
            </Field>
            <Field label="Phone Number">
              <input
                required
                value={regForm.phone}
                onChange={(e) =>
                  setRegForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="input"
                placeholder="+251 9xx xxx xxx"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                required
                value={regForm.email}
                onChange={(e) =>
                  setRegForm((f) => ({ ...f, email: e.target.value }))
                }
                className="input"
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                required
                minLength={4}
                value={regForm.password}
                onChange={(e) =>
                  setRegForm((f) => ({ ...f, password: e.target.value }))
                }
                className="input"
              />
            </Field>
            <Field label="ID Type">
              <select
                value={regForm.idType}
                onChange={(e) =>
                  setRegForm((f) => ({ ...f, idType: e.target.value }))
                }
                className="input"
              >
                {ID_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field
              label="ID / Passport Number"
              hint="Required for hotel check-in and room booking verification."
            >
              <input
                required
                value={regForm.idNumber}
                onChange={(e) =>
                  setRegForm((f) => ({ ...f, idNumber: e.target.value }))
                }
                className="input"
              />
            </Field>
            <button disabled={busy} className="btn-primary w-full">
              {busy ? "Creating account…" : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
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
