import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function Field({ label, children, hint }) {
  return (
    <div className="grid gap-2">
      <label className="text-xs text-white/60">{label}</label>
      {children}
      {hint ? <p className="text-xs text-white/45">{hint}</p> : null}
    </div>
  );
}

export default function Register() {
  const nav = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(false);

  const canSubmit = useMemo(() => {
    const e = email.trim();
    if (!e) return false;
    if (!password || password.length < 6) return false;
    if (password !== confirm) return false;
    return true;
  }, [email, password, confirm]);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setOk(false);

    if (!canSubmit) {
      setMsg("Please fill the form correctly.");
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      setOk(true);
      setMsg("Account created! Redirecting...");
      setTimeout(() => nav("/meals"), 400);
    } catch (error) {
      setOk(false);
      const errorMessages = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "Invalid email address.",
        "auth/weak-password": "Password should be at least 6 characters.",
        "auth/operation-not-allowed": "Registration is currently disabled.",
      };
      setMsg(errorMessages[error.code] || error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-amber-300/10 via-fuchsia-400/10 to-cyan-300/10 p-7 sm:p-9">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />

        <div className="flex flex-wrap items-center gap-2">
          <Badge>Create account</Badge>
          <Badge>Favorites</Badge>
          <Badge>Planner</Badge>
          <Badge>Shopping List</Badge>
        </div>

        <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">
          Join CookUp
        </h1>
        <p className="mt-3 text-white/75 max-w-2xl">
          Create an account to save favorites, plan meals, and generate shopping
          lists.
        </p>
      </div>

      {/* Form */}
      <div className="mt-8 grid place-items-center">
        <form
          onSubmit={submit}
          className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-7 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Register</h2>
              <p className="mt-1 text-sm text-white/70">
                Use a valid email and a strong password.
              </p>
            </div>

            <Link
              to="/login"
              className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 text-sm"
            >
              Login
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            <Field label="Email">
              <input
                type="email"
                className="w-full px-4 py-3 rounded-2xl bg-zinc-950/70 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Field>

            <Field label="Password" hint="Minimum 6 characters">
              <input
                type="password"
                className="w-full px-4 py-3 rounded-2xl bg-zinc-950/70 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Field>

            <Field label="Confirm password">
              <input
                type="password"
                className="w-full px-4 py-3 rounded-2xl bg-zinc-950/70 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </Field>
          </div>

          {/* helper line */}
          <div className="mt-4 flex items-center justify-between text-xs text-white/60">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline underline-offset-4 hover:text-white"
              >
                Login
              </Link>
            </p>
            <p>
              {password && confirm && password !== confirm ? (
                <span className="text-red-300">Passwords do not match</span>
              ) : (
                <span className="text-white/50">—</span>
              )}
            </p>
          </div>

          {/* message */}
          {msg ? (
            <div
              className={[
                "mt-5 rounded-2xl border p-4 text-sm",
                ok
                  ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                  : "border-white/10 bg-white/6 text-white/85",
              ].join(" ")}
            >
              {msg}
            </div>
          ) : null}

          <button
            disabled={!canSubmit || loading}
            className="mt-6 w-full py-3.5 rounded-2xl bg-white text-zinc-950 font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create account"}
          </button>

          <p className="mt-4 text-xs text-white/45">
            By creating an account, you agree to use this app for course
            purposes.
          </p>
        </form>
      </div>
    </div>
  );
}
