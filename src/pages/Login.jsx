import { useState } from "react";
import api from "../services/api";
import { setToken } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      nav("/meals");
    } catch (e) {
      setMsg("Login failed. Check credentials.");
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
            className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-white/10"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-white/10"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {msg && <p className="mt-4 text-red-300">{msg}</p>}

        <button className="mt-6 w-full py-3 rounded-2xl bg-white text-zinc-950 font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}
