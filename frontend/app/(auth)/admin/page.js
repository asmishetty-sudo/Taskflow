"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

import {
  Users,
  Shield,
  Loader2,
  ClipboardList,
  Calendar,
  Mail,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();

  const { user, token, loading } = useUser();

  const [usersData, setUsersData] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading) {
      // NOT LOGGED IN
      if (!user || !token) {
        router.push("/");
      }

      // NOT ADMIN
      else if (user.userType !== "admin") {
        router.push("/dashboard");
      }
    }
  }, [user, token, loading, router]);

  // FETCH USERS
  const fetchAllUsers = async () => {
    try {
      setFetching(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/auth/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUsersData(data.users);
    } catch (error) {
      console.error(error.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (
      user &&
      token &&
      user.userType === "admin"
    ) {
      fetchAllUsers();
    }
  }, [user, token]);

  // =========================================
  // LOADING
  // =========================================
  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white p-6 relative overflow-hidden">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-zinc-700 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-zinc-800 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-8 h-8 text-white" />

              <h1 className="text-5xl font-black tracking-tight">
                Admin Panel
              </h1>
            </div>

            <p className="text-zinc-400 text-lg">
              Manage users and monitor tasks.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-xl">
            <p className="text-zinc-400 text-sm mb-1">
              Total Users
            </p>

            <h2 className="text-3xl font-bold">
              {usersData.length}
            </h2>
          </div>
        </div>

        {/* USERS */}
        <div className="space-y-8">
          {usersData.map((u) => (
            <div
              key={u._id}
              className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl shadow-2xl"
            >
              {/* USER HEADER */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center text-2xl font-bold shadow-xl">
                    {u.name?.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold mb-1">
                      {u.name}
                    </h2>

                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Mail className="w-4 h-4" />
                      {u.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm capitalize">
                    {u.userType}
                  </span>

                  <span className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-sm">
                    {u.tasks?.length || 0} Tasks
                  </span>
                </div>
              </div>

              {/* TASKS */}
              {u.tasks?.length === 0 ? (
                <div className="bg-black/30 border border-zinc-800 rounded-2xl p-10 text-center">
                  <ClipboardList className="mx-auto mb-4 w-12 h-12 text-zinc-500" />

                  <p className="text-zinc-400">
                    No tasks available.
                  </p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-5">
                  {u.tasks.map((task) => (
                    <div
                      key={task._id}
                      className="bg-black/40 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {task.title}
                          </h3>

                          <p className="text-zinc-400 text-sm leading-relaxed">
                            {task.description ||
                              "No description"}
                          </p>
                        </div>

                        <div
                          className={`px-3 py-1 rounded-full text-xs border capitalize ${
                            task.status === "completed"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                          }`}
                        >
                          {task.status}
                        </div>
                      </div>

                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex gap-3 flex-wrap">
                          <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs capitalize">
                            {task.priority}
                          </span>

                          <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" />

                            {new Date(
                              task.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {task.status === "completed" ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : (
                            <Clock3 className="w-5 h-5 text-yellow-300" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}