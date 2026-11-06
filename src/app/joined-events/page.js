"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

// ক্যাটাগরি অনুযায়ী নির্দিষ্ট ছবি, যাতে সব পেজে একই ছবি থাকে
const CATEGORY_IMAGES = {
  "Donation": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  "Cleanup": "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
  "Plantation": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  "Winter Relief": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  "Food Drive": "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  "Health Camp": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  "Education": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
};

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const res = await fetch("/api/events/joined");
        if (res.ok) {
          const data = await res.json();
          setJoinedEvents(data);
        } else {
          const allRes = await fetch("/api/events");
          const allData = await allRes.json();
          if (allRes.ok && user) {
            const filtered = allData.filter(
              (ev) =>
                ev.participants?.includes(user.id) ||
                ev.participants?.includes(user.email)
            );
            setJoinedEvents(filtered);
          }
        }
      } catch (err) {
        console.error("Failed to fetch joined events:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!isPending) {
      fetchJoinedEvents();
    }
  }, [isPending, user]);

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <span className="inline-block bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Volunteer Dashboard
            </span>
            <h1 className="text-3xl font-black tracking-tight">
              Drives You Have Joined
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Track all upcoming community service initiatives where you are registered as a volunteer.
            </p>
          </div>
          <Link
            href="/upcoming-events"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm transition"
          >
            Explore More Drives →
          </Link>
        </div>

        {/* Joined Events Grid */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            Loading your joined initiatives...
          </p>
        ) : joinedEvents.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
            <p className="text-lg font-bold text-gray-700 dark:text-gray-200">
              You haven&apos;t joined any community drives yet.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Browse upcoming social initiatives in your neighborhood and sign up as a volunteer.
            </p>
            <Link
              href="/upcoming-events"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-sm transition"
            >
              Browse Upcoming Events →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedEvents.map((event) => {
              const coverImg =
                event.thumbnail && event.thumbnail.trim() !== ""
                  ? event.thumbnail
                  : CATEGORY_IMAGES[event.category] || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";

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
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          ✓ Joined
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="pt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        <p>📍 Location: {event.location}</p>
                        <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={`/events/${event._id}`}
                      className="block text-center bg-gray-900 dark:bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-600 dark:hover:bg-emerald-700 transition shadow-sm"
                    >
                      View Initiative Details →
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