import { useMemo, useState } from "react";

const DAYS = [
  { key: "mon", label: "Monday", short: "Mon" },
  { key: "tue", label: "Tuesday", short: "Tue" },
  { key: "wed", label: "Wednesday", short: "Wed" },
  { key: "thu", label: "Thursday", short: "Thu" },
  { key: "fri", label: "Friday", short: "Fri" },
  { key: "sat", label: "Saturday", short: "Sat" },
  { key: "sun", label: "Sunday", short: "Sun" },
];

function Badge({ children, variant = "default" }) {
  const variants = {
    default: "border-white/10 bg-white/5 text-white/80",
    success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    primary: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-400",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${variants[variant]}`}>
      {children}
    </span>
  );
}

function DayColumn({ dayKey, label, shortLabel, items, onRemove, isSelected, onSelect }) {
  const hasItems = items.length > 0;

  return (
    <div
      onClick={onSelect}
      className={`
        relative rounded-2xl border p-4 min-h-[180px] transition-all duration-300 cursor-pointer
        ${isSelected
          ? "border-fuchsia-400/50 bg-fuchsia-400/5 shadow-lg shadow-fuchsia-500/10"
          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
        }
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-white hidden sm:block">{label}</p>
          <p className="font-semibold text-white sm:hidden">{shortLabel}</p>
        </div>
        <div className={`
          h-6 w-6 rounded-full grid place-items-center text-xs font-medium
          ${hasItems ? "bg-gradient-to-br from-amber-400 via-fuchsia-500 to-cyan-400 text-white" : "bg-white/10 text-white/50"}
        `}>
          {items.length}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-zinc-950/30 p-3 text-center">
          <svg className="w-6 h-6 mx-auto text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <p className="text-xs text-white/40 mt-1">No meals</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((m, idx) => (
            <div
              key={`${m.id}-${idx}`}
              className="group rounded-xl border border-white/10 bg-zinc-950/50 p-3 hover:bg-zinc-950/70 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{m.title}</p>
                  <p className="text-xs text-white/50 mt-0.5 truncate">
                    {m.cuisine} • {m.type}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(idx);
                  }}
                  className="shrink-0 p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isSelected && (
        <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 rounded-full" />
      )}
    </div>
  );
}

function MobileAddForm({ title, setTitle, cuisine, setCuisine, type, setType, dayKey, setDayKey, onAdd }) {
  return (
    <div className="lg:hidden mb-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Quick Add</h3>
          <button
            onClick={onAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Add Meal
          </button>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-400/50 focus:outline-none transition-colors"
          placeholder="Meal name..."
        />

        <div className="grid grid-cols-3 gap-2">
          <input
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-zinc-950/70 border border-white/10 text-white text-sm placeholder:text-white/40 focus:border-fuchsia-400/50 focus:outline-none transition-colors"
            placeholder="Cuisine"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-zinc-950/70 border border-white/10 text-white text-sm focus:border-fuchsia-400/50 focus:outline-none transition-colors"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
          <select
            value={dayKey}
            onChange={(e) => setDayKey(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-zinc-950/70 border border-white/10 text-white text-sm focus:border-fuchsia-400/50 focus:outline-none transition-colors"
          >
            {DAYS.map((d) => (
              <option key={d.key} value={d.key}>
                {d.short}
              </option>
            ))}
          </select>
        </div>
      </div>
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
  const [selectedDay, setSelectedDay] = useState("mon");

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
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/10 via-fuchsia-400/10 to-cyan-400/10 p-6 sm:p-8 lg:p-10 mb-8">
        <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="primary">Planner</Badge>
            <Badge variant="success">{totalMeals} meals planned</Badge>
            <Badge>Local demo</Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Weekly Meal <span className="bg-gradient-to-r from-emerald-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Planner</span>
          </h1>

          <p className="mt-3 text-white/60 max-w-xl text-sm sm:text-base">
            Plan your meals for the week ahead. Add meals to any day and build your perfect weekly menu.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={clearWeek}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Week
            </button>
            <button
              onClick={addMeal}
              className="hidden lg:flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 text-white font-semibold hover:opacity-90 transition-opacity items-center gap-2 shadow-lg shadow-fuchsia-500/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Meal
            </button>
          </div>
        </div>
      </section>

      <MobileAddForm
        title={title}
        setTitle={setTitle}
        cuisine={cuisine}
        setCuisine={setCuisine}
        type={type}
        setType={setType}
        dayKey={dayKey}
        setDayKey={setDayKey}
        onAdd={addMeal}
      />

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <div className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 via-fuchsia-500 to-cyan-400 grid place-items-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-white">Quick Add</h2>
            </div>

            <p className="text-sm text-white/50 mb-5">Add a meal to any day of the week.</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/60 uppercase tracking-wide">Meal Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-400/50 focus:outline-none transition-colors"
                  placeholder="Enter meal name..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wide">Cuisine</label>
                  <input
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-white/10 text-white placeholder:text-white/40 focus:border-fuchsia-400/50 focus:outline-none transition-colors"
                    placeholder="Italian..."
                  />
                </div>
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wide">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-white/10 text-white focus:border-fuchsia-400/50 focus:outline-none transition-colors"
                  >
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snack</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-white/60 uppercase tracking-wide">Day</label>
                <select
                  value={dayKey}
                  onChange={(e) => setDayKey(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-white/10 text-white focus:border-fuchsia-400/50 focus:outline-none transition-colors"
                >
                  {DAYS.map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={addMeal}
                className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-fuchsia-500/20"
              >
                Add to {DAYS.find((d) => d.key === dayKey)?.label}
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-xs text-white/40">
                Tip: Click on a day card to select it, then add meals quickly.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="hidden xl:grid xl:grid-cols-7 gap-3">
            {DAYS.map((d) => (
              <DayColumn
                key={d.key}
                dayKey={d.key}
                label={d.label}
                shortLabel={d.short}
                items={plan[d.key]}
                onRemove={(idx) => removeMeal(d.key, idx)}
                isSelected={selectedDay === d.key}
                onSelect={() => {
                  setSelectedDay(d.key);
                  setDayKey(d.key);
                }}
              />
            ))}
          </div>

          <div className="hidden md:grid xl:hidden md:grid-cols-4 gap-3">
            {DAYS.map((d) => (
              <DayColumn
                key={d.key}
                dayKey={d.key}
                label={d.label}
                shortLabel={d.short}
                items={plan[d.key]}
                onRemove={(idx) => removeMeal(d.key, idx)}
                isSelected={selectedDay === d.key}
                onSelect={() => {
                  setSelectedDay(d.key);
                  setDayKey(d.key);
                }}
              />
            ))}
          </div>

          <div className="md:hidden">
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 scrollbar-hide">
              {DAYS.map((d) => (
                <button
                  key={d.key}
                  onClick={() => {
                    setSelectedDay(d.key);
                    setDayKey(d.key);
                  }}
                  className={`
                    shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${selectedDay === d.key
                      ? "bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-fuchsia-500/20"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                    }
                  `}
                >
                  {d.short}
                  {plan[d.key].length > 0 && (
                    <span className={`ml-2 ${selectedDay === d.key ? "text-white/80" : "text-white/50"}`}>
                      ({plan[d.key].length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {DAYS.find((d) => d.key === selectedDay)?.label}
                </h3>
                <Badge variant={plan[selectedDay].length > 0 ? "success" : "default"}>
                  {plan[selectedDay].length} meals
                </Badge>
              </div>

              {plan[selectedDay].length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 bg-zinc-950/30 p-8 text-center">
                  <svg className="w-10 h-10 mx-auto text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <p className="text-white/50 mt-3">No meals planned for this day</p>
                  <p className="text-white/30 text-sm mt-1">Use the form above to add meals</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {plan[selectedDay].map((m, idx) => (
                    <div
                      key={`${m.id}-${idx}`}
                      className="rounded-xl border border-white/10 bg-zinc-950/50 p-4 hover:bg-zinc-950/70 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-white">{m.title}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs text-white/50 px-2 py-0.5 rounded-md bg-white/5">{m.cuisine}</span>
                            <span className="text-xs text-white/50 px-2 py-0.5 rounded-md bg-white/5">{m.type}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeMeal(selectedDay, idx)}
                          className="shrink-0 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white">Week Summary</h3>
            <p className="text-sm text-white/50 mt-1">
              {totalMeals === 0
                ? "Start adding meals to your weekly plan"
                : `You have ${totalMeals} meal${totalMeals !== 1 ? "s" : ""} planned this week`
              }
            </p>
          </div>
          <div className="flex items-center gap-6">
            {DAYS.map((d) => (
              <div key={d.key} className="text-center hidden sm:block">
                <div className={`
                  text-lg font-bold
                  ${plan[d.key].length > 0 ? "text-white" : "text-white/30"}
                `}>
                  {plan[d.key].length}
                </div>
                <div className="text-xs text-white/40">{d.short}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
