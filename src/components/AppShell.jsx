import { NavLink } from "react-router-dom";
import { getToken, clearToken } from "../services/auth";
import { useNavigate } from "react-router-dom";

const navItem =
  "px-3 py-2 rounded-xl text-sm transition border border-white/10 hover:bg-white/10";
const navActive = "bg-white text-zinc-950 border-white";

export default function AppShell({ children }) {
  const nav = useNavigate();
  const authed = !!getToken();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white text-zinc-950 grid place-items-center font-black">
              C
            </div>
            <div className="leading-tight">
              <p className="font-bold">CookUp</p>
              <p className="text-xs text-white/60">Recipe & Meal Planner</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2 ml-6">
            <NavLink
              to="/meals"
              className={({ isActive }) =>
                `${navItem} ${isActive ? navActive : ""}`
              }
            >
              Meals
            </NavLink>

            {authed && (
              <>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `${navItem} ${isActive ? navActive : ""}`
                  }
                >
                  Favorites
                </NavLink>
                <NavLink
                  to="/planner"
                  className={({ isActive }) =>
                    `${navItem} ${isActive ? navActive : ""}`
                  }
                >
                  Planner
                </NavLink>
                <NavLink
                  to="/shopping-list"
                  className={({ isActive }) =>
                    `${navItem} ${isActive ? navActive : ""}`
                  }
                >
                  Shopping List
                </NavLink>
                <NavLink
                  to="/ratings"
                  className={({ isActive }) =>
                    `${navItem} ${isActive ? navActive : ""}`
                  }
                >
                  Ratings
                </NavLink>
              </>
            )}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {!authed ? (
              <>
                <NavLink className={navItem} to="/login">
                  Login
                </NavLink>
                <NavLink className={navItem} to="/register">
                  Register
                </NavLink>
              </>
            ) : (
              <button
                className="px-4 py-2 rounded-xl bg-white text-zinc-950 font-semibold hover:opacity-90"
                onClick={() => {
                  clearToken();
                  nav("/login");
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>

      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-sm text-white/50">
          CookUp • SE3355 Full-Stack Project
        </div>
      </footer>
    </div>
  );
}
