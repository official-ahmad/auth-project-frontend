import React from "react";
import {
  LogOut,
  User,
  Mail,
  Calendar,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

function Dashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Glassmorphism Dashboard Card */}
      <div className="w-full max-w-lg bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">User Dashboard</h2>
              <p className="text-xs text-slate-400">
                Welcome to your protected portal
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* User Info Grid */}
        <div className="space-y-3.5">
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
            <User className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Full Name</p>
              <p className="text-sm font-semibold text-white">
                {user?.name || "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="text-xs text-slate-500 font-medium">
                Email Address
              </p>
              <p className="text-sm font-semibold text-white">
                {user?.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Age</p>
                <p className="text-sm font-semibold text-white">
                  {user?.age || "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Gender</p>
                <p className="text-sm font-semibold text-white capitalize">
                  {user?.gender || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
