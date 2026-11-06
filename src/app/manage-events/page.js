"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const CATEGORIES = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

const CATEGORY_IMAGES = {
  "Donation": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  "Cleanup": "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
  "Plantation": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  "Winter Relief": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  "Food Drive": "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  "Health Camp": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  "Education": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
};

const FALLBACK_LIST = [
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
];

export default function ManageEventsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchMyEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        if (user) {
          const myEvents = data.filter(
            (ev) =>
              ev.organizerEmail === user.email ||
              ev.creatorId === user.id ||
              (!ev.organizerEmail && !ev.creatorId)
          );
          setEvents(myEvents);
        } else {
          setEvents(data);
        }
      }
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending) {
      fetchMyEvents();
    }
  }, [isPending, user]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to cancel and delete this initiative?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents(events.filter((ev) => ev._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/events/${editingEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEvent),
      });
      if (res.ok) {
        const updated = await res.json();
        setEvents(events.map((ev) => (ev._id === updated._id ? updated : ev)));
        setEditingEvent(null);
      }
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <span className="inline-block bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Organizer Dashboard
            </span>
            <h1 className="text-3xl font-black tracking-tight">Manage Your Initiatives</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Update details, reschedule dates, or remove drives you have organized.
            </p>
          </div>
          <Link
            href="/create-event"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm transition"
          >
            + Launch New Drive
          </Link>
        </div>

        {/* Events List / Grid */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">Loading your organized drives...</p>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
            <p className="text-lg font-bold text-gray-700 dark:text-gray-200">
              You haven&apos;t launched any community drives yet.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Start making a difference in your neighborhood by organizing your first volunteer event.
            </p>
            <Link
              href="/create-event"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-sm transition"
            >
              Create Your First Event →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => {
              const coverImg =
                event.thumbnail && event.thumbnail.trim() !== ""
                  ? event.thumbnail
                  : CATEGORY_IMAGES[event.category] || FALLBACK_LIST[index % FALLBACK_LIST.length];

              return (
                <div
                  key={event._id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
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
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="pt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        <p>📍 {event.location}</p>
                        <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons: View, Edit, Delete */}
                  <div className="px-6 pb-6 pt-3 flex items-center gap-2 border-t border-gray-100 dark:border-gray-700/60">
                    <Link
                      href={`/events/${event._id}`}
                      className="flex-1 text-center bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 py-2 rounded-xl text-xs font-bold transition"
                    >
                      👁️ View
                    </Link>
                    <button
                      onClick={() =>
                        setEditingEvent({
                          ...event,
                          date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
                        })
                      }
                      className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-gray-800 dark:text-gray-200 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 bg-red-50 dark:bg-red-900/30 hover:bg-red-600 hover:text-white text-red-600 dark:text-red-400 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Edit Modal */}
        {editingEvent && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                <h3 className="text-lg font-black">Update Initiative</h3>
                <button
                  onClick={() => setEditingEvent(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Category</label>
                    <select
                      value={editingEvent.category}
                      onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={editingEvent.date}
                      onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={editingEvent.thumbnail || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={editingEvent.description}
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}