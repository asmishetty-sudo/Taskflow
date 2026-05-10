"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Lock, Heart } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import useGuestRedirect from "@/hooks/useGuestRedirect";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useUser();
useGuestRedirect();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (result.success) {
        login(result.user, result.token); // store in cookies
        toast.success(result.message);
        router.push("/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Server error, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-700 to-black relative overflow-hidden">

  {/* Background glow */}
  <div className="absolute w-72 h-72 bg-zinc-700 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
  <div className="absolute w-72 h-72 bg-zinc-800 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

  <form
    onSubmit={handleSubmit}
    className="relative bg-white/5 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96 flex flex-col gap-4 border border-white/10"
  >
    <h2 className="text-2xl flex gap-3 font-bold justify-center items-center text-white">
      <Heart className="text-white w-6 h-6 fill-white" />
      Login
    </h2>

    {/* Email */}
    <div className="flex items-center border border-zinc-700 rounded px-2 focus-within:ring-2 focus-within:ring-white/40 bg-black/30">
      <Mail className="text-zinc-400 w-4 h-4" />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="p-2 w-full outline-none bg-transparent text-white placeholder-zinc-500"
      />
    </div>

    {/* Password */}
    <div className="flex items-center border border-zinc-700 rounded px-2 focus-within:ring-2 focus-within:ring-white/40 bg-black/30">
      <Lock className="text-zinc-400 w-4 h-4" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="p-2 w-full outline-none bg-transparent text-white placeholder-zinc-500"
      />
    </div>

    <button
      disabled={loading}
      className="bg-white text-black hover:bg-zinc-300 p-2 rounded-lg transition font-semibold shadow-md"
    >
      {loading ? "Logging in..." : "Login"}
    </button>

    <p className="text-sm text-center text-zinc-400">
      New here?{" "}
      <a
        href="/register"
        className="text-white font-semibold hover:underline"
      >
        Register Here!
      </a>
    </p>
  </form>
</div>
  );
}