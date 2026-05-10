"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  CheckCircle2,
  Loader2,
  Filter,
  ClipboardList,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import toast from "react-hot-toast";

export default function UserTasks() {
  const { user, token, loading: userLoading } = useUser();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  // FETCH USER TASKS
  const fetchUserTasks = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to fetch tasks");
      }

      setTasks(data.tasks || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserTasks();
    }
  }, [token]);

  // ADD TASK
  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to create task");
        throw new Error(data.message || "Failed to create task");
      }

      setTasks((prev) => [data.task, ...prev]);

      setFormData({
        title: "",
        description: "",
        priority: "medium",
      });
    } catch (error) {
      console.error(error.message);
    } finally {
      setCreating(false);
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || "Failed to delete task");
        throw new Error(data.message || "Delete failed");
      }

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  // TOGGLE COMPLETE
  const toggleTaskStatus = async (task) => {
    try {
      const updatedStatus =
        task.status === "completed" ? "pending" : "completed";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...task,
            status: updatedStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update task");
        throw new Error(data.message || "Update failed");
      }

      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, status: updatedStatus } : t
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  // EDIT TASK
  const handleEditTask = async (task) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(task),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Update failed");
        throw new Error(data.message || "Update failed");
      }

      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? data.task : t))
      );

      setEditingTaskId(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (hideCompleted && task.status === "completed") {
        return false;
      }

      if (
        priorityFilter !== "all" &&
        task.priority !== priorityFilter
      ) {
        return false;
      }

      return true;
    });
  }, [tasks, hideCompleted, priorityFilter]);

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center max-w-md w-full shadow-2xl">
          <ClipboardList className="mx-auto mb-4 w-14 h-14 text-zinc-300" />

          <h2 className="text-3xl font-bold text-white mb-3">
            Access Restricted
          </h2>

          <p className="text-zinc-400 mb-6">
            Please login to manage your tasks.
          </p>

          <a
            href="/login"
            className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-zinc-300 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white p-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-zinc-700 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-zinc-800 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 tracking-tight">
              Task Dashboard
            </h1>
            <p className="text-zinc-400">
              Welcome back, {user?.name}
            </p>
          </div>

          <div className="flex gap-4 items-center flex-wrap">
            {/* Hide Completed */}
            <label className="flex items-center gap-2 text-sm bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
              <input
                type="checkbox"
                checked={hideCompleted}
                onChange={() => setHideCompleted(!hideCompleted)}
                className="accent-white"
              />
              Hide Completed
            </label>

            {/* Priority Filter */}
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
              <Filter className="w-4 h-4 text-zinc-400" />

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-transparent outline-none text-sm"
              >
                <option value="all" className="bg-black">
                  All Priorities
                </option>
                <option value="low" className="bg-black">
                  Low
                </option>
                <option value="medium" className="bg-black">
                  Medium
                </option>
                <option value="high" className="bg-black">
                  High
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* ADD TASK */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 mb-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Create Task
          </h2>

          <form
            onSubmit={handleAddTask}
            className="grid md:grid-cols-4 gap-4"
          >
            <input
              type="text"
              placeholder="Task title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white"
            />

            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white"
            />

            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              className="bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button
              type="submit"
              disabled={creating}
              className="bg-white text-black rounded-xl font-semibold hover:bg-zinc-300 transition flex items-center justify-center gap-2"
            >
              {creating ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              {creating ? "Creating" : "Add Task"}
            </button>
          </form>
        </div>

        {/* TASKS */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin w-10 h-10 text-white" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/60 border border-zinc-800 rounded-3xl">
            <ClipboardList className="mx-auto mb-4 w-12 h-12 text-zinc-500" />
            <p className="text-zinc-400 text-lg">No tasks found.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-lg shadow-xl hover:border-white/20 transition"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    {editingTaskId === task._id ? (
                      <input
                        value={task.title}
                        onChange={(e) =>
                          setTasks((prev) =>
                            prev.map((t) =>
                              t._id === task._id
                                ? { ...t, title: e.target.value }
                                : t
                            )
                          )
                        }
                        className="bg-black/40 border border-zinc-700 rounded-lg px-3 py-2 w-full outline-none"
                      />
                    ) : (
                      <h3 className="text-2xl font-semibold mb-2">
                        {task.title}
                      </h3>
                    )}

                    {editingTaskId === task._id ? (
                      <textarea
                        value={task.description}
                        onChange={(e) =>
                          setTasks((prev) =>
                            prev.map((t) =>
                              t._id === task._id
                                ? {
                                    ...t,
                                    description: e.target.value,
                                  }
                                : t
                            )
                          )
                        }
                        className="bg-black/40 border border-zinc-700 rounded-lg px-3 py-2 w-full outline-none mt-2"
                      />
                    ) : (
                      <p className="text-zinc-400 mb-4">
                        {task.description || "No description"}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 p-3 rounded-xl transition"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex gap-3 items-center">
                    <span className="px-3 py-1 rounded-full text-sm bg-zinc-800 border border-zinc-700 capitalize">
                      {task.priority}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm capitalize border ${
                        task.status === "completed"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleTaskStatus(task)}
                      className="bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 p-3 rounded-xl transition"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </button>

                    {editingTaskId === task._id ? (
                      <button
                        onClick={() => handleEditTask(task)}
                        className="bg-white text-black px-4 rounded-xl font-medium hover:bg-zinc-300 transition"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingTaskId(task._id)}
                        className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-xl transition"
                      >
                        <Pencil className="w-5 h-5 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
