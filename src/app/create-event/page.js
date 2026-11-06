"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const PRESET_IMAGES = [
  {
    label: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Blanket Relief",
    url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Cleanup",
    url: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  },
];

const CATEGORIES = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email || "";

  const [formData, setFormData] = useState({
    title: "",
    category: "Donation",
    date: "",
    location: "",
    thumbnail: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // আজকের তারিখ বের করা (যাতে অতীতের তারিখ সিলেক্ট না করা যায়)
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (new Date(formData.date) < new Date(today)) {
      setError("Event date must be today or a future date.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          organizerEmail: userEmail,
        }),
      });

      if (res.ok) {
        router.push("/upcoming-events");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || data.message || "Failed to launch event.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-10 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-xl mx-auto">
        
        {/* Back Link */}
        <Link
          href="/upcoming-events"
          className="inline-flex items-center text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 mb-4 transition"
        >
          ← Back to Upcoming Events
        </Link>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* Header */}
          <div className="space-y-2 mb-6">
            <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              🌱 Social Action Drive
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Launch a Community Drive
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Coordinate a local relief campaign, neighborhood cleanup, or community welfare initiative.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs font-semibold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Event Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Initiative Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Winter Warmth Drive — Mirpur 10, Dhaka"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Event Type & Event Date (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Drive Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Scheduled Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Must be scheduled for today or a future date
                </p>
              </div>
            </div>

            {/* Location / Venue */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Location / Meeting Point <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g. Dhanmondi Rabindra Sarobar, Dhaka"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Thumbnail Image URL & Quick Presets */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Cover Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="thumbnail"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.thumbnail}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                <span>Quick photo presets:</span>
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, thumbnail: preset.url })}
                    className="text-green-600 dark:text-green-400 hover:underline font-medium cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Event Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Initiative Details & Goals <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={4}
                required
                placeholder="Outline the objective of this drive, how volunteers can help, and what supplies or tasks are involved..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Organizer Email (Read-only) */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl text-xs">
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                Organizer Email (attached)
              </span>
              <span className="font-bold text-gray-800 dark:text-gray-200">
                {userEmail || "Not signed in"}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-md transition cursor-pointer text-sm"
            >
              {loading ? "Publishing Drive..." : "🚀 Publish Initiative"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}