import { useEffect, useState } from "react";
import api from "../services/api";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

export default function Ratings() {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setMsg("");
    try {
      const r = await api.get("/ratings");
      setList(r.data || []);
    } catch {
      setMsg("Could not load ratings (backend may be down).");
      setList([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="text-white">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-linear-to-br from-amber-300/10 via-fuchsia-400/10 to-cyan-300/10 p-7 sm:p-9">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />

        <div className="flex flex-wrap items-center gap-2">
          <Badge>Ratings</Badge>
          <Badge>{list.length} entries</Badge>
        </div>

        <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">
          Your ratings
        </h1>
        <p className="mt-3 text-white/75 max-w-2xl">
          Track what you liked the most.
        </p>

        <div className="mt-6">
          <button
            onClick={load}
            className="px-6 py-3 rounded-2xl bg-white text-zinc-950 font-semibold hover:opacity-90"
          >
            Refresh
          </button>
        </div>

        {msg && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/6 p-4 text-white/85">
            {msg}
          </div>
        )}
      </div>

      {list.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-lg font-semibold">No ratings yet</h3>
          <p className="mt-2 text-white/70">
            Rate meals from the meal details modal later.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-3">
          {list.map((r) => (
            <div
              key={r.id || r.mealId}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
            >
              <p className="text-sm text-white/60">Meal ID: {r.mealId}</p>
              <p className="mt-1 text-lg font-semibold">⭐ {r.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
