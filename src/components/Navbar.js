"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar({ darkMode, setDarkMode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    setDropdownOpen(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-emerald-50/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-emerald-200/70 dark:border-gray-800 transition-colors duration-300">
      {/* Subtle Watermark Pattern in Header (Isolated overflow-hidden here so dropdown isn't clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full opacity-[0.05] dark:opacity-[0.06] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
      </div>

      {/* Centered Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center relative z-20">
        
        {/* Left: GoodGather Logo & Subtitle */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-700 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition">
              GG
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white block leading-none">
                GoodGather
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-widest block mt-1">
                Social Impact Network
              </span>
            </div>
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        <div className="hidden md:flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 px-4 py-1.5 rounded-full border border-emerald-200/60 dark:border-gray-700 shadow-2xs">
          <Link
            href="/"
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              pathname === "/"
                ? "bg-emerald-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:text-emerald-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/upcoming-events"
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              pathname === "/upcoming-events"
                ? "bg-emerald-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:text-emerald-600"
            }`}
          >
            Upcoming Drives
          </Link>
        </div>

        {/* Right: Dark/Light Toggle & User Profile Dropdown */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3.5 py-2 text-xs font-bold rounded-xl border border-emerald-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-emerald-100/50 dark:hover:bg-gray-700 transition shadow-2xs cursor-pointer"
          >
            {darkMode ? "☀️ Day" : "🌙 Night"}
          </button>

          {isPending ? (
            <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none cursor-pointer py-1 px-2.5 rounded-full bg-white dark:bg-gray-800 border border-emerald-200 dark:border-gray-700 hover:shadow-sm transition"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-inner">
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 hidden sm:inline">
                  {user.name || "Volunteer"}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 pr-1">
                  {dropdownOpen ? "▴" : "▾"}
                </span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-[100]">
                  <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-xs font-extrabold text-gray-900 dark:text-white truncate">
                      {user.name || "Community Member"}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/create-event"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700 transition"
                  >
                    ➕ Launch New Drive
                  </Link>
                  <Link
                    href="/manage-events"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700 transition"
                  >
                    ⚙️ Manage My Drives
                  </Link>
                  <Link
                    href="/joined-events"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700 transition"
                  >
                    🤝 Joined Missions
                  </Link>

                  <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition cursor-pointer"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}