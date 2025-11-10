import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getSavedAdventures,
  removeAdventure,
} from "../../services/portfolioService";

const API_URL = import.meta.env.VITE_API_URL || "https://adventuretimecpt.onrender.com";

export default function ProfileSaved() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const saved = await getSavedAdventures();
      setItems(saved);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load saved items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onRemove = async (it) => {
    try {
      await removeAdventure(it.type, it.refId);
      setItems(
        items.filter((s) => !(s.type === it.type && s.refId === it.refId))
      );
      toast.success("Removed from saved");
    } catch (e) {
      console.error(e);
      toast.error("Failed to remove");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  const restaurants = items.filter((i) => i.type === "restaurant");
  const activities = items.filter((i) => i.type === "activity");
  const stores = items.filter((i) => i.type === "store");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Saved Items</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          Restaurants ({restaurants.length})
        </h2>
        {restaurants.length === 0 ? (
          <p className="text-gray-600">No saved restaurants yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurants.map((r) => (
              <div
                key={`${r.type}-${r.refId}`}
                className="flex gap-3 p-4 bg-white rounded-xl shadow"
              >
                <img
                  src={
                    r.details?.images?.[0]
                      ? r.details.images[0]
                      : "/placeholder.png"
                  }
                  className="w-24 h-24 object-cover rounded-lg"
                  alt={r.details?.name}
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{r.details?.name}</h3>
                  <p className="text-sm text-gray-600">{r.details?.address}</p>
                  <div className="mt-2 flex gap-2">
                    <Link
                      to={`/restaurants/${r.refId}`}
                      className="px-3 py-1 rounded-lg bg-black text-white text-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => onRemove(r)}
                      className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">
          Activities ({activities.length})
        </h2>
        {activities.length === 0 ? (
          <p className="text-gray-600">No saved activities yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((a) => (
              <div
                key={`${a.type}-${a.refId}`}
                className="flex gap-3 p-4 bg-white rounded-xl shadow"
              >
                <img
                  src={
                    a.details?.images?.[0]
                      ? a.details.images[0]
                      : "/placeholder.png"
                  }
                  className="w-24 h-24 object-cover rounded-lg"
                  alt={a.details?.name}
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{a.details?.name}</h3>
                  <p className="text-sm text-gray-600">{a.details?.address}</p>
                  <div className="mt-2 flex gap-2">
                    <Link
                      to={`/activities/${a.refId}`}
                      className="px-3 py-1 rounded-lg bg-black text-white text-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => onRemove(a)}
                      className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
