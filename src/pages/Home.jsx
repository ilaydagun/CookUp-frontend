import { Link } from "react-router-dom";
import { getToken } from "../services/auth";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function FeatureCard({ title, desc, to, emoji }) {
  return (
    <Link
      to={to}
      className="group rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/30 p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-2xl">{emoji}</div>
        <span className="text-white/50 group-hover:text-white/80 transition">
          ↗
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/80">
        Open <span className="opacity-60">→</span>
      </div>
    </Link>
  );
}

function Step({ n, title, desc }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-2xl bg-white text-zinc-950 font-black grid place-items-center">
          {n}
        </div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="mt-3 text-sm text-white/70">{desc}</p>
    </div>
  );
}

export default function Home() {
  const authed = !!getToken();

  return (
    <div className="text-white">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-linear-to-br from-amber-300/10 via-fuchsia-400/10 to-cyan-300/10 p-7 sm:p-10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />
        <div className="pointer-events-none absolute top-10 left-[55%] h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="flex flex-wrap items-center gap-2">
          <Badge>CookUp</Badge>
          <Badge>Recipe Search</Badge>
          <Badge>Weekly Planner</Badge>
          <Badge>Auto Shopping List</Badge>
        </div>

        <h1 className="mt-5 text-3xl sm:text-6xl font-bold tracking-tight">
          Plan your week, cook smarter.
        </h1>

        <p className="mt-4 text-white/75 max-w-2xl text-base sm:text-lg">
          Search meals, save favorites, build a weekly plan, and generate a
          shopping list — all in one place.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/meals"
            className="px-6 py-3.5 rounded-2xl bg-white text-zinc-950 font-semibold hover:opacity-90"
          >
            Explore Meals
          </Link>

          {authed ? (
            <>
              <Link
                to="/planner"
                className="px-6 py-3.5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15"
              >
                Go to Planner
              </Link>
              <Link
                to="/shopping-list"
                className="px-6 py-3.5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15"
              >
                View Shopping List
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-3.5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3.5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="mt-7 grid sm:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-white/60">Fast search</p>
            <p className="mt-2 font-semibold">Find recipes instantly</p>
            <p className="mt-1 text-sm text-white/70">
              Use name, ingredient, cuisine filters.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-white/60">Plan ahead</p>
            <p className="mt-2 font-semibold">Weekly meal planner</p>
            <p className="mt-1 text-sm text-white/70">
              Create a balanced plan in minutes.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-white/60">Auto list</p>
            <p className="mt-2 font-semibold">Shopping list generation</p>
            <p className="mt-1 text-sm text-white/70">
              Ingredients aggregated from planned meals.
            </p>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="mt-10 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Core Features</h2>
          <p className="mt-2 text-white/70">
            Everything you need for recipe discovery + weekly planning.
          </p>
        </div>
        <div className="hidden sm:flex gap-2">
          <Badge>Full-stack</Badge>
          <Badge>React + Tailwind</Badge>
          <Badge>Node + Firestore</Badge>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <FeatureCard
          emoji="🍲"
          title="Meals"
          desc="Search meals and view details."
          to="/meals"
        />
        <FeatureCard
          emoji="💛"
          title="Favorites"
          desc="Save meals you love."
          to={authed ? "/favorites" : "/login"}
        />
        <FeatureCard
          emoji="🗓️"
          title="Planner"
          desc="Plan meals for each day."
          to={authed ? "/planner" : "/login"}
        />
        <FeatureCard
          emoji="🛒"
          title="Shopping List"
          desc="Generate a list from your plan."
          to={authed ? "/shopping-list" : "/login"}
        />
      </div>

      {/* HOW IT WORKS */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <p className="mt-2 text-white/70">
          A simple flow that matches your project requirements.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-5">
          <Step
            n="1"
            title="Search & Discover"
            desc="Use the Meals page to search recipes and inspect details."
          />
          <Step
            n="2"
            title="Save & Plan"
            desc="Save favorites and place meals into your weekly planner."
          />
          <Step
            n="3"
            title="Shop & Cook"
            desc="Automatically generate your shopping list from planned meals."
          />
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Ready to start?</h3>
          <p className="mt-1 text-sm text-white/70">
            Try searching meals and build your week.
          </p>
        </div>
        <Link
          to="/meals"
          className="px-6 py-3 rounded-2xl bg-white text-zinc-950 font-semibold hover:opacity-90"
        >
          Go to Meals
        </Link>
      </div>
    </div>
  );
}
