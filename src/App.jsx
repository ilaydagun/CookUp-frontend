import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { setTokenGetter, setLogoutHandler } from "./services/api";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Meals from "./pages/Meals";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import Planner from "./pages/Planner";
import ShoppingList from "./pages/ShoppingList";
import Ratings from "./pages/Ratings";
import Home from "./pages/Home";

export default function App() {
  const { getToken, logout, loading } = useAuth();

  useEffect(() => {
    setTokenGetter(getToken);
    setLogoutHandler(logout);
  }, [getToken, logout]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12 rounded-2xl grid place-items-center">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 via-fuchsia-500 to-cyan-400 animate-pulse" />
            <div className="absolute inset-0 rounded-2xl blur-lg bg-gradient-to-br from-amber-400/50 via-fuchsia-500/50 to-cyan-400/50" />
            <span className="relative text-white text-xl font-bold">C</span>
          </div>
          <div className="text-white/50 text-sm animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/meals"
              element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Meals />
                </div>
              }
            />

            <Route
              path="/login"
              element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Login />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Register />
                </div>
              }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Favorites />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/planner"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Planner />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/shopping-list"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <ShoppingList />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/ratings"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Ratings />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
