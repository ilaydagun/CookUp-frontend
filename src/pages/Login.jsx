import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await login(email, password);
      nav("/meals");
    } catch (error) {
      const errorMessages = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/invalid-email": "Invalid email address.",
        "auth/too-many-requests": "Too many attempts. Try again later.",
        "auth/invalid-credential": "Invalid email or password.",
      };
      setMsg(errorMessages[error.code] || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] grid place-items-center text-white">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8"
      >
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-white/70">
          Log in to save favorites and plan meals.
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-white/10"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-white/10"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {msg && <p className="mt-4 text-red-300">{msg}</p>}

        <button
          disabled={loading}
          className="mt-6 w-full py-3 rounded-2xl bg-white text-zinc-950 font-semibold disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm text-white/60">
          Don't have an account?{" "}
          <Link to="/register" className="underline hover:text-white">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
