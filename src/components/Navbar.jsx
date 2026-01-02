import { NavLink, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../services/auth";
import { useMemo, useState } from "react";

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 rounded-2xl grid place-items-center font-black">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-amber-300/90 via-fuchsia-400/90 to-cyan-300/90" />
        <div className="absolute inset-0 rounded-2xl blur-md bg-linear-to-br from-amber-300/35 via-fuchsia-400/35 to-cyan-300/35" />
        <span className="relative text-zinc-950">C</span>
      </div>
      <div className="leading-tight">
        <p className="font-bold tracking-tight text-white">CookUp</p>
        <p className="text-xs text-white/60">Recipe • Planner • List</p>
      </div>
    </div>
  );
}

function MobileButton({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/90"
      aria-label="Menu"
    >
      {open ? "✕" : "☰"}
    </button>
  );
}

export default function Navbar() {
  const nav = useNavigate();
  const authed = !!getToken();
  const [open, setOpen] = useState(false);

  const linkBase =
    "px-3 py-2 rounded-2xl text-sm font-medium text-white/90 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition";
  const linkActive =
    "bg-gradient-to-r from-amber-300/90 via-fuchsia-200/90 to-cyan-200/90 text-zinc-950 border-white";

  const items = useMemo(
    () => [
      { to: "/", label: "Home", public: true },
      { to: "/meals", label: "Meals", public: true },
      { to: "/favorites", label: "Favorites", public: false },
      { to: "/planner", label: "Planner", public: false },
      { to: "/shopping-list", label: "Shopping List", public: false },
      { to: "/ratings", label: "Ratings", public: false },
    ],
    []
  );

  const go = (to, isPublic) => {
    setOpen(false);
    if (!isPublic && !authed) nav("/login");
    else nav(to);
  };

  const logout = () => {
    clearToken();
    setOpen(false);
    nav("/login");
  };

  const NavItem = ({ to, label, isPublic }) => (
    <NavLink
      to={to}
      onClick={(e) => {
        // protected link -> redirect to login if not authed
        if (!isPublic && !authed) {
          e.preventDefault();
          go(to, false);
        } else {
          setOpen(false);
        }
      }}
      className={({ isActive }) => cn(linkBase, isActive && linkActive)}
    >
      {label}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="relative border-b border-white/10">
        {/* Background */}
        <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur" />
        <div className="absolute inset-0 bg-linear-to-br from-amber-300/10 via-fuchsia-400/10 to-cyan-300/10" />
        <div className="absolute -top-16 -right-24 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute -top-24 left-20 h-64 w-64 rounded-full bg-fuchsia-400/10 blur-3xl" />
        <div className="absolute -top-10 left-[55%] h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />

        {/* Content */}
        <div className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
            <NavLink to="/" onClick={() => setOpen(false)} className="shrink-0">
              <Logo />
            </NavLink>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-2 ml-6">
              {items.map((it) => (
                <NavItem
                  key={it.to}
                  to={it.to}
                  label={it.label}
                  isPublic={it.public}
                />
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-2">
              {!authed ? (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      cn(linkBase, isActive && linkActive)
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      cn(linkBase, isActive && linkActive)
                    }
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-2xl bg-white text-zinc-950 font-semibold hover:opacity-90"
                >
                  Logout
                </button>
              )}

              <MobileButton open={open} onClick={() => setOpen((v) => !v)} />
            </div>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden border-t border-white/10">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-2">
                {items.map((it) => (
                  <button
                    key={it.to}
                    onClick={() => go(it.to, it.public)}
                    className={cn(linkBase, "text-left")}
                  >
                    {it.label}
                  </button>
                ))}

                {!authed ? (
                  <>
                    <button
                      onClick={() => go("/login", true)}
                      className={linkBase}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => go("/register", true)}
                      className={linkBase}
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <button onClick={logout} className={linkBase}>
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
