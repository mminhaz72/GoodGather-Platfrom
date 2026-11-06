"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// ক্যাটাগরি অনুযায়ী নির্দিষ্ট ও পার্মানেন্ট ছবি ম্যাপিং
const CATEGORY_IMAGES = {
  "Donation": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  "Cleanup": "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
  "Plantation": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  "Winter Relief": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  "Food Drive": "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  "Health Camp": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  "Education": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
};

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          const found = data.find((item) => item._id === id);
          setEvent(found || null);
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  const handleJoinEvent = async () => {
    setJoining(true);
    setMessage("");
    try {
      const res = await fetch(`/api/events/${id}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Successfully joined this community initiative!");
      } else {
        setMessage(`⚠️ ${data.error || data.message || "Could not join event."}`);
      }
    } catch (err) {
      setMessage("⚠️ Please sign in to join this event.");
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300">
        Loading initiative details...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 space-y-4">
        <h2 className="text-2xl font-bold">Initiative Not Found</h2>
        <Link href="/upcoming-events" className="text-emerald-600 hover:underline text-sm font-semibold">
          ← Back to Upcoming Events
        </Link>
      </div>
    );
  }

  // যদি নিজের ছবি থাকে সেটি দেখাবে, না থাকলে ক্যাটাগরি অনুযায়ী ফিক্সড ছবি দেখাবে
  const coverImg =
    event.thumbnail && event.thumbnail.trim() !== ""
      ? event.thumbnail
      : CATEGORY_IMAGES[event.category] || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <Link
          href="/upcoming-events"
          className="inline-block text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          ← Back to All Drives
        </Link>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
          {coverImg && (
            <img
              src={coverImg}
              alt={event.title}
              className="w-full h-72 sm:h-80 object-cover"
            />
          )}

          <div className="p-6 sm:p-10 space-y-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                {event.category || "Community Drive"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                📅 Scheduled: {new Date(event.date).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {event.title}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed whitespace-pre-line">
              {event.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm">
              <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-bold">Location / Venue</p>
                <p className="font-semibold mt-1">📍 {event.location}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-bold">Date & Time</p>
                <p className="font-semibold mt-1">📅 {new Date(event.date).toLocaleString()}</p>
              </div>
            </div>

            {event.organizerEmail && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Organized by: <span className="font-semibold text-gray-800 dark:text-gray-200">{event.organizerEmail}</span>
              </div>
            )}

            {message && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 text-sm font-medium">
                {message}
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={handleJoinEvent}
                disabled={joining}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition cursor-pointer"
              >
                {joining ? "Joining Drive..." : "🤝 Join as a Volunteer"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}