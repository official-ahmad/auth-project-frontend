import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Sparkles,
  Layers,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
} from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const pages = [
    { name: "Page 1 - Glassmorphism", path: "/page-1", icon: LayoutGrid },
    { name: "Page 2 - React Bits UI", path: "/page-2", icon: Sparkles },
    { name: "Page 3 - Minimal Split", path: "/page-3", icon: Layers },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-slate-900/90 backdrop-blur-xl border-r border-slate-800 z-50 transition-all duration-300 flex flex-col ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-800">
        {isOpen && (
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm tracking-wide">
            <ShieldCheck className="w-5 h-5" />
            <span>Auth Switcher</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors mx-auto"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="flex-1 py-4 space-y-1.5 px-2">
        {pages.map((page) => {
          const Icon = page.icon;
          const isActive = location.pathname === page.path;

          return (
            <Link
              key={page.path}
              to={page.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {isOpen && <span className="truncate">{page.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
