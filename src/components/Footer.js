"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Top Row: Brand Card + Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-slate-800">
          
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center text-slate-950 font-black text-lg shadow-md">
                GG
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block leading-none">
                  GoodGather
                </span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  People-Powered Action
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Bridging compassionate citizens with grassroots organizers to build cleaner, greener, and more supportive neighborhoods across Bangladesh.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-semibold text-emerald-400">
                🌱 100% Non-Profit Spirit
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-semibold text-teal-300">
                🤝 Verified Organizers
              </span>
            </div>
          </div>

          {/* Navigation Columns (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            
            {/* Action Portal */}
            <div className="space-y-3">
              <h4 className="text-white font-extrabold uppercase tracking-wider text-xs">
                Action Portal
              </h4>
              <ul className="space-y-2.5 text-slate-400">
                <li>
                  <Link href="/upcoming-events" className="hover:text-emerald-400 transition">
                    → Browse Active Drives
                  </Link>
                </li>
                <li>
                  <Link href="/create-event" className="hover:text-emerald-400 transition">
                    → Host a New Mission
                  </Link>
                </li>
                <li>
                  <Link href="/manage-events" className="hover:text-emerald-400 transition">
                    → Organizer Hub
                  </Link>
                </li>
                <li>
                  <Link href="/joined-events" className="hover:text-emerald-400 transition">
                    → My Volunteer Log
                  </Link>
                </li>
              </ul>
            </div>

            {/* Focus Sectors */}
            <div className="space-y-3">
              <h4 className="text-white font-extrabold uppercase tracking-wider text-xs">
                Focus Sectors
              </h4>
              <ul className="space-y-2.5 text-slate-400">
                <li className="hover:text-emerald-400 transition cursor-default">• Winter Cloth & Blanket Aid</li>
                <li className="hover:text-emerald-400 transition cursor-default">• River & Plastic Cleanups</li>
                <li className="hover:text-emerald-400 transition cursor-default">• Urban Afforestation</li>
                <li className="hover:text-emerald-400 transition cursor-default">• Free Medical & Food Camps</li>
              </ul>
            </div>

            {/* Regional Hub */}
            <div className="col-span-2 sm:col-span-1 space-y-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/70">
              <h4 className="text-white font-extrabold uppercase tracking-wider text-xs">
                Volunteer Desk
              </h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Need help coordinating a large relief drive in your district?
              </p>
              <p className="text-emerald-400 font-bold text-xs">
                📩 support@goodgather.org
              </p>
              <p className="text-[11px] text-slate-500">
                Dhaka • Chattogram • Khulna • Sylhet
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} GoodGather Civic Network. Crafted for grassroots changemakers.
          </p>
          <div className="flex items-center space-x-6 text-[11px]">
            <Link href="/upcoming-events" className="hover:text-emerald-400 transition">Directory</Link>
            <Link href="/login" className="hover:text-emerald-400 transition">Volunteer Sign-In</Link>
            <Link href="/register" className="hover:text-emerald-400 transition">Join Network</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}