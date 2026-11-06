"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
];

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (res.ok) {
          setEvents(data);
        }
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    "All",
    "Donation",
    "Cleanup",
    "Plantation",
    "Winter Relief",
    "Food Drive",
    "Health Camp",
    "Education",
  ];

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Active Community Drives
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Upcoming Social Initiatives
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Browse and join upcoming volunteer opportunities in your area. Filter by cause or search by location to get involved.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">Loading upcoming initiatives...</p>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-2">
            <p className="text-gray-600 dark:text-gray-300 font-bold text-lg">No Matching Drives Found</p>
            <p className="text-sm text-gray-400">Try selecting a different category or clearing your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => {
              const coverImg =
                event.thumbnail && event.thumbnail.trim() !== ""
                  ? event.thumbnail
                  : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

              return (
                <div
                  key={event._id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <img
                        src={coverImg}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/90 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {event.category || "General"}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{event.description}</p>
                      <div className="pt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        <p>📍 Location: {event.location}</p>
                        <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={`/events/${event._id}`}
                      className="block text-center bg-gray-900 dark:bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-600 dark:hover:bg-emerald-700 transition shadow-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}