import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Badge({ children, variant = "default" }) {
  const variants = {
    default: "border-white/10 bg-white/5 text-white/80",
    gradient: "border-transparent bg-gradient-to-r from-amber-400/20 via-fuchsia-400/20 to-cyan-400/20 text-white",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${variants[variant]}`}>
      {children}
    </span>
  );
}

function FeatureCard({ title, desc, to, emoji, index }) {
  return (
    <Link
      to={to}
      className="group relative rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-fuchsia-500/5 p-6 sm:p-8 overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">{emoji}</div>
        <span className="text-white/30 group-hover:text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-xl">
          ↗
        </span>
      </div>
      <h3 className="mt-5 text-lg sm:text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm sm:text-base text-white/60 leading-relaxed">{desc}</p>
      <div className="mt-5 inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white transition-colors">
        Explore <span className="opacity-60 group-hover:translate-x-1 transition-transform duration-300">→</span>
      </div>
    </Link>
  );
}

function Step({ n, title, desc, index }) {
  return (
    <div
      className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 animate-fade-in-up overflow-hidden group hover:bg-white/[0.04] transition-colors duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {n < 3 && (
        <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
      )}

      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 via-fuchsia-500 to-cyan-400 text-white font-black grid place-items-center text-lg shadow-lg shadow-fuchsia-500/20 group-hover:scale-110 transition-transform duration-300">
          {n}
        </div>
        <h4 className="font-semibold text-lg text-white">{title}</h4>
      </div>
      <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed">{desc}</p>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="mt-1 text-sm text-white/50">{label}</div>
    </div>
  );
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  const authed = isAuthenticated;

  return (
    <div className="text-white min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-950/95" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[128px] animate-pulse-slow animation-delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse-slow animation-delay-2000" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 animate-fade-in">
            <Badge variant="gradient">CookUp</Badge>
            <Badge>Recipe Search</Badge>
            <Badge>Weekly Planner</Badge>
            <Badge>Auto Shopping List</Badge>
          </div>

          <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] animate-fade-in-up">
            <span className="block">Plan your week,</span>
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-amber-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              cook smarter.
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
            Search meals, save favorites, build a weekly plan, and generate a shopping list — all in one beautiful, seamless experience.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fade-in-up animation-delay-400">
            <Link
              to="/meals"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 text-white font-semibold text-base sm:text-lg hover:opacity-90 transition-all duration-300 shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:scale-[1.02]"
            >
              <span>Explore Meals</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {authed ? (
              <>
                <Link
                  to="/planner"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium text-base sm:text-lg transition-all duration-300"
                >
                  Go to Planner
                </Link>
                <Link
                  to="/shopping-list"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium text-base sm:text-lg transition-all duration-300"
                >
                  Shopping List
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium text-base sm:text-lg transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white text-zinc-950 font-semibold text-base sm:text-lg hover:bg-white/90 transition-all duration-300"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-start gap-8 sm:gap-16 animate-fade-in-up animation-delay-600">
            <StatCard value="1000+" label="Recipes" />
            <StatCard value="7 Days" label="Weekly Planning" />
            <StatCard value="Auto" label="Shopping Lists" />
          </div>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 hover:bg-white/[0.04] transition-colors animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-400/20 text-amber-400 grid place-items-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">Fast Search</p>
                <p className="text-sm text-white/50">Find recipes instantly</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 hover:bg-white/[0.04] transition-colors animate-fade-in-up animation-delay-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-fuchsia-400/20 text-fuchsia-400 grid place-items-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">Plan Ahead</p>
                <p className="text-sm text-white/50">Weekly meal planner</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 hover:bg-white/[0.04] transition-colors animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-400/20 text-cyan-400 grid place-items-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">Auto List</p>
                <p className="text-sm text-white/50">Shopping list generation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Core Features</h2>
            <p className="mt-2 sm:mt-3 text-white/50 text-base sm:text-lg max-w-xl">
              Everything you need for recipe discovery and weekly planning.
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <Badge>Full-stack</Badge>
            <Badge>React + Tailwind</Badge>
            <Badge>Node + Firestore</Badge>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <FeatureCard
            emoji="🍲"
            title="Meals"
            desc="Search and discover delicious meals from our extensive recipe database."
            to="/meals"
            index={0}
          />
          <FeatureCard
            emoji="💛"
            title="Favorites"
            desc="Save your favorite meals for quick access anytime you need them."
            to={authed ? "/favorites" : "/login"}
            index={1}
          />
          <FeatureCard
            emoji="🗓️"
            title="Planner"
            desc="Plan your weekly meals with our intuitive drag-and-drop planner."
            to={authed ? "/planner" : "/login"}
            index={2}
          />
          <FeatureCard
            emoji="🛒"
            title="Shopping List"
            desc="Auto-generate shopping lists from your planned meals instantly."
            to={authed ? "/shopping-list" : "/login"}
            index={3}
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-28">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">How it works</h2>
          <p className="mt-3 sm:mt-4 text-white/50 text-base sm:text-lg">
            A simple three-step flow to make meal planning effortless.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <Step
            n={1}
            title="Search & Discover"
            desc="Use our powerful search to find recipes by name, ingredient, or cuisine. Filter and explore until you find the perfect meal."
            index={0}
          />
          <Step
            n={2}
            title="Save & Plan"
            desc="Save your favorites and drag them into your weekly planner. Organize your meals for each day of the week."
            index={1}
          />
          <Step
            n={3}
            title="Shop & Cook"
            desc="Generate a complete shopping list from your planned meals. Check off items as you shop, then get cooking!"
            index={2}
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-28 mb-12 sm:mb-20">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 sm:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 via-fuchsia-400/10 to-cyan-400/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Ready to start cooking?</h3>
              <p className="mt-2 sm:mt-3 text-white/50 text-base sm:text-lg max-w-xl">
                Join thousands of users who plan their meals with CookUp. Start exploring recipes and build your perfect week.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link
                to="/meals"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40"
              >
                Explore Meals
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              {!authed && (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white text-zinc-950 font-semibold hover:bg-white/90 transition-all duration-300"
                >
                  Create Free Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-400 via-fuchsia-500 to-cyan-400 grid place-items-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <span className="text-white/50 text-sm">CookUp • SE3355 Full-Stack Project</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <span>React + Tailwind</span>
              <span>Node.js + Firestore</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
