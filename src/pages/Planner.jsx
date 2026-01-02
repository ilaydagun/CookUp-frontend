import { useMemo, useState } from "react";

const DAYS = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function DayColumn({ label, items, onRemove }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 min-h-57.5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{label}</p>
        <span className="text-xs text-white/50">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950/40 p-3">
          <p className="text-xs text-white/60">No meals planned</p>
          <p className="text-xs text-white/45 mt-1">Add from Quick add</p>
        </div>
      ) : (
        <div className="mt-4 grid gap-3">
          {items.map((m, idx) => (
            <div
              key={`${m.id}-${idx}`}
              className="rounded-2xl border border-white/10 bg-zinc-950/50 p-3 hover:bg-zinc-950/70 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{m.title}</p>
                  <p className="text-xs text-white/60 mt-1">
                    {m.cuisine} • {m.type}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(idx)}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 text-xs"
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

export default function Planner() {
  const [plan, setPlan] = useState(() =>
    Object.fromEntries(DAYS.map((d) => [d.key, []]))
  );

  const [title, setTitle] = useState("Chicken Alfredo");
  const [cuisine, setCuisine] = useState("Italian");
  const [type, setType] = useState("Dinner");
  const [dayKey, setDayKey] = useState("mon");

  const totalMeals = useMemo(
    () => Object.values(plan).reduce((s, arr) => s + arr.length, 0),
    [plan]
  );

  const addMeal = () => {
    const t = title.trim();
    if (!t) return;

    setPlan((prev) => {
      const next = { ...prev };
      next[dayKey] = [
        ...next[dayKey],
        {
          id: (crypto?.randomUUID?.() || String(Date.now())) + Math.random(),
          title: t,
          cuisine,
          type,
        },
      ];
      return next;
    });
  };

  const removeMeal = (dKey, idx) => {
    setPlan((prev) => {
      const next = { ...prev };
      next[dKey] = next[dKey].filter((_, i) => i !== idx);
      return next;
    });
  };

  const clearWeek = () => {
    setPlan(Object.fromEntries(DAYS.map((d) => [d.key, []])));
  };

  return (
    <div className="text-white">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-linear-to-br from-emerald-300/10 via-fuchsia-400/10 to-cyan-300/10 p-7 sm:p-9">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />

        <div className="flex flex-wrap items-center gap-2">
          <Badge>Planner</Badge>
          <Badge>{totalMeals} planned</Badge>
          <Badge>Local demo state</Badge>
        </div>

        <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">
          Weekly Meal Planner
        </h1>
        <p className="mt-3 text-white/75 max-w-2xl">
          Add meals to days. (We’ll connect this to Firestore later.)
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={clearWeek}
            className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15"
          >
            Clear week
          </button>
          <button
            onClick={addMeal}
            className="px-5 py-3 rounded-2xl bg-white text-zinc-950 font-semibold hover:opacity-90"
          >
            Add meal
          </button>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-[1.1fr_2fr] gap-6">
        {/* Quick add */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Quick add</h2>
          <p className="mt-1 text-sm text-white/70">Add a meal to any day.</p>

          <div className="mt-5 grid gap-3">
            <label className="text-xs text-white/60">Meal title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-zinc-950/70 border border-white/10"
              placeholder="Meal name…"
            />

            <div className="grid sm:grid-cols-3 gap-3 mt-2">
              <div>
                <label className="text-xs text-white/60">Cuisine</label>
                <input
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-zinc-950/70 border border-white/10"
                />
              </div>

              <div>
                <label className="text-xs text-white/60">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-zinc-950/70 border border-white/10"
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white/60">Day</label>
                <select
                  value={dayKey}
                  onChange={(e) => setDayKey(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-2xl bg-zinc-950/70 border border-white/10"
                >
                  {DAYS.map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-white/50">
            Next: drag & drop + backend sync.
          </p>
        </div>

        {/* Week grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {DAYS.map((d) => (
            <DayColumn
              key={d.key}
              label={d.label}
              items={plan[d.key]}
              onRemove={(idx) => removeMeal(d.key, idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
