import { useMemo, useState } from "react";
import axios from "axios";
import api from "../services/api";

const THEMEALDB = "https://www.themealdb.com/api/json/v1/1";

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconX(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Badge({ children, tone = "neutral" }) {
  const base =
    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border";
  const tones = {
    neutral: "bg-white/6 border-white/10 text-white/75 backdrop-blur",
    good: "bg-emerald-400/15 border-emerald-400/25 text-emerald-100",
    warn: "bg-amber-400/15 border-amber-400/25 text-amber-100",
  };
  return (
    <span className={`${base} ${tones[tone] || tones.neutral}`}>
      {children}
    </span>
  );
}

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-2 rounded-full text-sm border transition backdrop-blur",
        active
          ? "bg-white text-zinc-950 border-white"
          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">
      <div className="aspect-16/10 bg-white/10 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-28 bg-white/10 rounded animate-pulse" />
        <div className="h-5 w-56 bg-white/10 rounded animate-pulse" />
        <div className="h-10 w-full bg-white/10 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}

function MealCard({ meal, onOpen }) {
  return (
    <button
      onClick={() => onOpen(meal)}
      className="group text-left rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/30"
    >
      <div className="aspect-16/10 bg-black/20 overflow-hidden">
        {meal.strMealThumb ? (
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-300"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-white/60">
            {meal.strArea || "—"} • {meal.strCategory || "—"}
          </p>
          <span className="text-xs text-white/50">↗</span>
        </div>

        <h3 className="mt-1 font-semibold text-lg leading-snug">
          {meal.strMeal}
        </h3>

        <div className="mt-4 flex gap-2">
          <span className="px-3 py-2 rounded-2xl bg-white text-zinc-950 text-sm font-semibold">
            View
          </span>
          <span className="px-3 py-2 rounded-2xl bg-white/10 border border-white/10 text-sm text-white/80">
            + Planner
          </span>
        </div>
      </div>
    </button>
  );
}

function Modal({ open, onClose, meal, details, loading, error }) {
  if (!open) return null;
  const d = details || meal;

  const ingredients = useMemo(() => {
    if (!d) return [];
    const arr = [];
    for (let i = 1; i <= 20; i++) {
      const ing = d[`strIngredient${i}`];
      const meas = d[`strMeasure${i}`];
      if (ing && ing.trim())
        arr.push(`${meas ? meas.trim() : ""} ${ing.trim()}`.trim());
    }
    return arr;
  }, [d]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm">
      <div className="min-h-full grid place-items-center p-5">
        <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div>
              <p className="text-xs text-white/60">
                {meal?.strArea || "—"} • {meal?.strCategory || "—"}
              </p>
              <h2 className="text-xl font-semibold">{meal?.strMeal}</h2>
            </div>

            <button
              className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15"
              onClick={onClose}
            >
              Close
            </button>
          </div>

          <div className="p-6">
            {loading ? (
              <p className="text-white/70">Loading details…</p>
            ) : error ? (
              <p className="text-red-200">Error: {error}</p>
            ) : (
              <div className="grid lg:grid-cols-[340px_1fr] gap-6">
                <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                  {meal?.strMealThumb ? (
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <button className="px-5 py-3 rounded-2xl bg-white text-zinc-950 font-semibold hover:opacity-90">
                      Add to Planner
                    </button>
                    <button className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15">
                      Favorite
                    </button>
                    <button className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15">
                      Rate
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-xs text-white/60">Ingredients</p>
                      <ul className="mt-3 text-sm text-white/85 list-disc pl-5 space-y-1">
                        {ingredients.length ? (
                          ingredients.map((x, i) => <li key={i}>{x}</li>)
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-xs text-white/60">Notes</p>
                      <p className="mt-3 text-sm text-white/75">
                        UI is wired and resilient. Next we’ll connect favorites,
                        planner and ratings to your backend once Firebase env is
                        fixed.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs text-white/60">Instructions</p>
                    <p className="mt-3 text-sm text-white/80 whitespace-pre-line leading-relaxed">
                      {d?.strInstructions || "No instructions."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Meals() {
  const [q, setQ] = useState("chicken");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");
  const [msg, setMsg] = useState("");

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsErr, setDetailsErr] = useState("");

  const cuisines = [
    "All",
    "Italian",
    "Mexican",
    "Thai",
    "British",
    "French",
    "American",
  ];
  const diets = ["All", "Vegan", "Vegetarian", "Quick", "High Protein"];

  const [cuisine, setCuisine] = useState("All");
  const [diet, setDiet] = useState("All");

  const filtered = useMemo(() => {
    const tag = (diet || "").toLowerCase();
    return (items || []).filter((m) => {
      const byCuisine = cuisine === "All" || m.strArea === cuisine;
      const byDiet =
        diet === "All" ||
        (diet === "Quick" && (m.minutes ? m.minutes <= 35 : true)) ||
        (m.strTags || "").toLowerCase().includes(tag);
      return byCuisine && byDiet;
    });
  }, [items, cuisine, diet]);

  async function searchMeals(nextQ) {
    const query = (nextQ ?? q).trim();
    if (!query) return;

    setLoading(true);
    setMsg("");
    setItems([]);

    try {
      const res = await api.get(`/meals/search?q=${encodeURIComponent(query)}`);
      const data = Array.isArray(res.data) ? res.data : res.data?.meals ?? [];
      setItems(data || []);
      setSource("backend");
      if (!data || data.length === 0) setMsg("No results found.");
    } catch {
      try {
        const res2 = await axios.get(
          `${THEMEALDB}/search.php?s=${encodeURIComponent(query)}`
        );
        const list = res2.data?.meals ?? [];
        setItems(list);
        setSource("themealdb");
        if (!list || list.length === 0) setMsg("No results found.");
      } catch {
        setMsg("Network error. Backend may be down.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function openDetails(meal) {
    setSelected(meal);
    setOpen(true);
    setDetails(null);
    setDetailsErr("");
    setDetailsLoading(true);

    const id = meal?.idMeal;

    try {
      const res = await api.get(`/meals/meal/${encodeURIComponent(id)}`);
      const d = Array.isArray(res.data)
        ? res.data?.[0]
        : res.data?.meal ?? res.data;
      setDetails(d || null);
    } catch {
      try {
        const res2 = await axios.get(
          `${THEMEALDB}/lookup.php?i=${encodeURIComponent(id)}`
        );
        setDetails(res2.data?.meals?.[0] ?? null);
      } catch {
        setDetailsErr("Could not load details.");
      }
    } finally {
      setDetailsLoading(false);
    }
  }

  return (
    <div className="text-white">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-linear-to-br from-amber-300/10 via-fuchsia-400/10 to-cyan-300/10 p-7 sm:p-9">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />

        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={source === "backend" ? "good" : "neutral"}>
            Source: {source || "—"}
          </Badge>
          <Badge tone="neutral">Fallback enabled</Badge>
          <Badge tone="neutral">Enter to search</Badge>
        </div>

        <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">
          Find meals you’ll actually cook.
        </h1>
        <p className="mt-3 text-white/75 max-w-2xl">
          Search recipes, explore cuisines, and build your weekly plan. This
          page works even when your backend is down.
        </p>

        {/* Search */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
              <IconSearch />
            </span>

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search meals (chicken, pasta, beef…)"
              className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-zinc-950/70 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              onKeyDown={(e) => {
                if (e.key === "Enter") searchMeals();
              }}
            />

            {q?.length ? (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-white/10 text-white/70"
                aria-label="Clear"
              >
                <IconX />
              </button>
            ) : null}
          </div>

          <button
            onClick={() => searchMeals()}
            disabled={loading}
            className="px-6 py-3.5 rounded-2xl bg-white text-zinc-950 font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 grid gap-5">
          <div>
            <p className="text-xs text-white/60 mb-2">Cuisine</p>
            <div className="flex flex-wrap gap-2">
              {cuisines.map((x) => (
                <Chip
                  key={x}
                  active={cuisine === x}
                  onClick={() => setCuisine(x)}
                >
                  {x}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-white/60 mb-2">Diet</p>
            <div className="flex flex-wrap gap-2">
              {diets.map((x) => (
                <Chip key={x} active={diet === x} onClick={() => setDiet(x)}>
                  {x}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {msg ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/6 p-4 text-white/85">
            {msg}
          </div>
        ) : null}
      </div>

      {/* Results header */}
      <div className="mt-10 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold">Results</h2>
          <p className="text-sm text-white/60">{filtered.length} meals</p>
        </div>

        <div className="hidden sm:flex gap-2">
          <Badge tone="neutral">Click a card for details</Badge>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-lg font-semibold">Nothing here yet</h3>
          <p className="mt-2 text-white/70">
            Try:{" "}
            {["chicken", "pasta", "beef", "salad"].map((x) => (
              <button
                key={x}
                onClick={() => {
                  setQ(x);
                  searchMeals(x);
                }}
                className="mx-1 underline underline-offset-4 text-white/85 hover:text-white"
              >
                {x}
              </button>
            ))}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((m) => (
            <MealCard key={m.idMeal} meal={m} onOpen={openDetails} />
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        meal={selected}
        details={details}
        loading={detailsLoading}
        error={detailsErr}
      />
    </div>
  );
}
