import { useEffect, useState } from "react";
import api from "../services/api";

export default function ShoppingList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/planner/shopping-list")
      .then((r) => setItems(r.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">Shopping List</h1>
      <p className="mt-2 text-white/70">Generated from your weekly plan.</p>

      {items.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p>No items yet.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((i, idx) => (
            <li
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              {i.ingredient}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
