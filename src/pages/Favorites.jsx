import { useEffect, useState } from "react";
import api from "../services/api";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const r = await api.get("/favorites");
      setItems(r.data || []);
    } catch {
      setMsg("Could not load favorites (backend may be down).");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);
      load();
    } catch {
      setMsg("Remove failed.");
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
          <Badge>Favorites</Badge>
          <Badge>{items.length} saved</Badge>
        </div>

        <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">
          Your saved meals
        </h1>
        <p className="mt-3 text-white/75 max-w-2xl">
          Keep track of meals you want to cook again.
        </p>

        <div className="mt-6 flex gap-3">
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

      {loading ? (
        <div className="mt-6 text-white/70">Loading…</div>
      ) : items.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-lg font-semibold">No favorites yet</h3>
          <p className="mt-2 text-white/70">
            Add favorites from the Meals page.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((f) => (
            <div
              key={f.id || f.mealId}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <h3 className="font-semibold text-lg">{f.name || "Meal"}</h3>
              <p className="mt-2 text-sm text-white/70">Meal ID: {f.mealId}</p>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => remove(f.id || f.mealId)}
                  className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
