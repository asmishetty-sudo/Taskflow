"use client";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import {
  User,
  LogOut,
  LayoutDashboard,
  Loader2,
} from "lucide-react";

export default function Navbar() {
  const { user, logout, loading } = useUser();

  if (loading) {
    return (
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/10 backdrop-blur-xl bg-black">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-lg shadow-lg">
            T
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">
              TaskFlow
            </h1>

            <p className="text-xs text-zinc-500">
              Scalable Task Management
            </p>
          </div>
        </div>

        <Loader2 className="w-6 h-6 animate-spin text-white" />
      </nav>
    );
  }

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/10 backdrop-blur-xl bg-black">
      {/* LEFT */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-lg shadow-lg">
          T
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-wide text-white">
            TaskFlow
          </h1>

          <p className="text-xs text-zinc-500">
            Scalable Task Management
          </p>
        </div>
      </Link>

      {/* RIGHT */}
      {user ? (
        <div className="flex items-center gap-4">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-zinc-300 hover:text-white transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          {/* User */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-lg">
            <User className="w-4 h-4 text-zinc-300" />

            <span className="text-sm text-white font-medium">
              {user.name}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-zinc-300 transition shadow-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-zinc-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-zinc-300 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}