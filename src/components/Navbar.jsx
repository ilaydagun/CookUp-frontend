import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMemo, useState, useEffect } from "react";

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Logo() {
  return (
    <div className="flex items-center gap-3 group">
      <div className="relative h-11 w-11 rounded-2xl grid place-items-center font-black transition-transform duration-300 group-hover:scale-105">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 via-fuchsia-500 to-cyan-400 animate-gradient-slow" />
        <div className="absolute inset-0 rounded-2xl blur-lg bg-gradient-to-br from-amber-400/50 via-fuchsia-500/50 to-cyan-400/50 opacity-60 group-hover:opacity-100 transition-opacity" />
        <span className="relative text-white text-lg drop-shadow-lg">C</span>
      </div>
      <div className="leading-tight">
        <p className="font-bold tracking-tight text-white text-lg">CookUp</p>
        <p className="text-[11px] text-white/50 tracking-wide">Recipe • Planner • List</p>
      </div>
    </div>
  );
}

function HamburgerIcon({ open }) {
  return (
    <div className="w-5 h-4 flex flex-col justify-between">
      <span
        className={cn(
          "block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center",
          open && "rotate-45 translate-y-[7px]"
        )}
      />
      <span
        className={cn(
          "block h-0.5 w-full bg-white rounded-full transition-all duration-300",
          open && "opacity-0 scale-0"
        )}
      />
      <span
        className={cn(
          "block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center",
          open && "-rotate-45 -translate-y-[7px]"
        )}
      />
    </div>
  );
}

function MobileButton({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "lg:hidden p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300",
        open && "bg-white/10"
      )}
      aria-label="Menu"
    >
      <HamburgerIcon open={open} />
    </button>
  );
}

function NavIcon({ type }) {
  const icons = {
    home: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    meals: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    favorites: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    planner: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    shopping: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    ratings: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  };
  return icons[type] || null;
}

export default function Navbar() {
  const nav = useNavigate();
  const { isAuthenticated, logout: authLogout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkBase =
    "px-4 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-2";
  const linkActive =
    "bg-gradient-to-r from-amber-400/20 via-fuchsia-400/20 to-cyan-400/20 text-white border border-white/20";

  const items = useMemo(
    () => [
      { to: "/", label: "Home", public: true, icon: "home" },
      { to: "/meals", label: "Meals", public: true, icon: "meals" },
      { to: "/favorites", label: "Favorites", public: false, icon: "favorites" },
      { to: "/planner", label: "Planner", public: false, icon: "planner" },
      { to: "/shopping-list", label: "Shopping List", public: false, icon: "shopping" },
      { to: "/ratings", label: "Ratings", public: false, icon: "ratings" },
    ],
    []
  );

  const go = (to, isPublic) => {
    setOpen(false);
    if (!isPublic && !isAuthenticated) nav("/login");
    else nav(to);
  };

  const logout = async () => {
    await authLogout();
    setOpen(false);
    nav("/login");
  };

  const NavItem = ({ to, label, isPublic, icon, mobile = false }) => (
    <NavLink
      to={to}
      onClick={(e) => {
        if (!isPublic && !isAuthenticated) {
          e.preventDefault();
          go(to, false);
        } else {
          setOpen(false);
        }
      }}
      className={({ isActive }) =>
        cn(
          linkBase,
          isActive && linkActive,
          mobile && "w-full justify-start py-3 px-4 text-base"
        )
      }
    >
      <NavIcon type={icon} />
      {label}
    </NavLink>
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled && "shadow-lg shadow-black/20"
        )}
      >
        <div className="relative border-b border-white/10">
          <div
            className={cn(
              "absolute inset-0 transition-all duration-300",
              scrolled ? "bg-zinc-950/90 backdrop-blur-xl" : "bg-zinc-950/70 backdrop-blur-md"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-fuchsia-400/5 to-cyan-400/5" />

          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -top-20 left-1/4 h-40 w-40 rounded-full bg-fuchsia-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -top-20 left-2/3 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-6">
              <NavLink to="/" onClick={() => setOpen(false)} className="shrink-0">
                <Logo />
              </NavLink>

              <nav className="hidden lg:flex items-center gap-1 ml-8">
                {items.map((it) => (
                  <NavItem
                    key={it.to}
                    to={it.to}
                    label={it.label}
                    isPublic={it.public}
                    icon={it.icon}
                  />
                ))}
              </nav>

              <div className="ml-auto flex items-center gap-3">
                {!isAuthenticated ? (
                  <div className="hidden sm:flex items-center gap-2">
                    <NavLink
                      to="/login"
                      className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-fuchsia-500/20"
                    >
                      Register
                    </NavLink>
                  </div>
                ) : (
                  <button
                    onClick={logout}
                    className="hidden sm:flex px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg shadow-white/10"
                  >
                    Logout
                  </button>
                )}

                <MobileButton open={open} onClick={() => setOpen((v) => !v)} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-zinc-950 border-l border-white/10 transform transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="text-white font-semibold">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-1 overflow-y-auto h-[calc(100%-140px)]">
          {items.map((it, index) => (
            <div
              key={it.to}
              className="animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => go(it.to, it.public)}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <NavIcon type={it.icon} />
                <span className="font-medium">{it.label}</span>
              </button>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-zinc-950">
          {!isAuthenticated ? (
            <div className="flex gap-2">
              <button
                onClick={() => go("/login", true)}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                Login
              </button>
              <button
                onClick={() => go("/register", true)}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 text-white hover:opacity-90 transition-all duration-200"
              >
                Register
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="w-full px-4 py-3 rounded-xl bg-white text-zinc-950 font-semibold hover:bg-white/90 transition-all duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}
