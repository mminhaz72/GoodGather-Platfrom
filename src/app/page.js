"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CORE_PILLARS = [
  {
    icon: "🌍",
    title: "Hyper-Local Mobilization",
    desc: "Start neighborhood cleanup campaigns, tree planting, or relief distributions right from your street.",
  },
  {
    icon: "⚡",
    title: "Seamless Participation",
    desc: "Pledge your time with a single click and keep a verified record of every mission you support.",
  },
  {
    icon: "🛡️",
    title: "Creator Command Center",
    desc: "Modify event schedules, update venue details, and manage your volunteer initiatives with ease.",
  },
  {
    icon: "🧭",
    title: "Targeted Cause Finder",
    desc: "Pinpoint urgent community needs by filtering through categories or searching your local area.",
  },
];

const IMPACT_STORIES = [
  {
    title: "Warmth for Every Soul",
    location: "Mirpur 10, Dhaka",
    tag: "WINTER AID",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Midnight Blanket Outreach",
    location: "Mohammadpur, Dhaka",
    tag: "RELIEF MISSION",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Waterway Plastic Recovery",
    location: "Dhanmondi Lake, Dhaka",
    tag: "ECO RESTORATION",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Green Canopy Expansion",
    location: "Uttara Sector 7, Dhaka",
    tag: "REFORESTATION",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Nourish the Neighborhood",
    location: "Badda, Dhaka",
    tag: "FOOD SECURITY",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Rural Classroom Kit Drive",
    location: "Khulna Sadar",
    tag: "YOUTH LITERACY",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
  },
];

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
];

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col justify-between transition-colors duration-300">
      
      {/* 1. Hero Section with Social Activity Watermark Image */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white dark:from-gray-900 dark:via-emerald-950/30 dark:to-gray-900 border-b border-emerald-100 dark:border-gray-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-soft-light"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent dark:from-gray-900 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100/90 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-300/50 dark:border-emerald-700/50 shadow-2xs">
            ✨ Citizens United for Social Good
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Stand Together, Spark Hope, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Shape Stronger Communities.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Step forward to lead or support grassroots volunteer missions. From urban greening and waterway cleanups to emergency winter aid and food sharing across Bangladesh.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/upcoming-events"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-sm"
            >
              Browse Volunteer Missions →
            </Link>
            <Link
              href="/create-event"
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xs text-gray-900 dark:text-gray-100 border border-emerald-200 dark:border-gray-700 font-bold px-8 py-3.5 rounded-xl shadow-sm hover:bg-emerald-50 dark:hover:bg-gray-700 transition text-sm"
            >
              + Host a Local Drive
            </Link>
          </div>
        </div>

        {/* Impact Metrics Bar */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto mt-16">
          <div className="p-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xs rounded-2xl shadow-sm border border-emerald-100 dark:border-gray-700">
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">1,850+</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase font-bold tracking-wider">Registered Changemakers</p>
          </div>
          <div className="p-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xs rounded-2xl shadow-sm border border-emerald-100 dark:border-gray-700">
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">240+</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase font-bold tracking-wider">Successful Campaigns</p>
          </div>
          <div className="p-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xs rounded-2xl shadow-sm border border-emerald-100 dark:border-gray-700">
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">32,000+</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase font-bold tracking-wider">Families Supported</p>
          </div>
          <div className="p-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xs rounded-2xl shadow-sm border border-emerald-100 dark:border-gray-700">
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">64</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase font-bold tracking-wider">Districts Reached</p>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Why GoodGather Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Designed for Real-World Civic Action
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Simple, transparent tools built to turn everyday compassion into organized community power.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_PILLARS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-2xl shadow-2xs">
                {item.icon}
              </div>
              <h3 className="text-base font-bold">{item.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Active Drives Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              🔥 Happening Soon
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              Upcoming Field Missions
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lend your hands to verified social drives scheduled in the coming days.
            </p>
          </div>
          <Link
            href="/upcoming-events"
            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline text-sm"
          >
            Explore All Missions →
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-12">Loading upcoming missions...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No active missions scheduled right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 6).map((event, index) => {
              const coverImg =
                event.thumbnail && event.thumbnail.trim() !== ""
                  ? event.thumbnail
                  : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

              return (
                <div
                  key={event._id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <img
                        src={coverImg}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/90 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {event.category || "Social Drive"}
                      </span>
                      <span className="absolute bottom-3 left-3 bg-gray-900/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                        📅 {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <h3 className="text-lg font-bold line-clamp-1">{event.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        📍 {event.location}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2">
                    <Link
                      href={`/events/${event._id}`}
                      className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      Inspect & Join →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Visual Impact Gallery */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Field Chronicles
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Footprints of Kindness Across Cities
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real glimpses from youth volunteers distributing winter warmth, planting trees, and restoring public spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMPACT_STORIES.map((item, idx) => (
            <div
              key={idx}
              className="relative h-64 rounded-2xl overflow-hidden shadow-sm group border border-gray-200 dark:border-gray-700"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="inline-block w-fit bg-emerald-600/90 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
                  {item.tag}
                </span>
                <h4 className="text-base font-bold leading-snug">{item.title}</h4>
                <p className="text-xs text-gray-300 mt-0.5">📍 {item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Redesigned Dispatch / Alert Box */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 text-white rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left max-w-lg">
              <span className="inline-block bg-white/20 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
                🔔 Weekly Impact Dispatch
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Never Miss a Neighborhood Call
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Receive instant alerts when emergency winter relief, blood donation camps, or weekend cleanups are organized near your area.
              </p>
            </div>

            <div className="w-full md:w-auto flex-1 max-w-md">
              {subscribed ? (
                <div className="p-4 bg-white text-emerald-800 rounded-2xl text-xs font-bold text-center shadow-sm">
                  ✅ You are on the list! Watch your inbox for upcoming neighborhood drives.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Type your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-3.5 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-inner"
                  />
                  <button
                    type="submit"
                    className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition shadow-md cursor-pointer whitespace-nowrap"
                  >
                    Join Dispatch →
                  </button>
                </form>
              )}
              <p className="text-[11px] text-emerald-100/80 mt-2 text-center md:text-left">
                Zero spam guarantee. Unsubscribe anytime with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}