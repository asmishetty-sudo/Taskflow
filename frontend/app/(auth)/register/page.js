"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import useGuestRedirect from "@/hooks/useGuestRedirect";


export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const router = useRouter();
  useGuestRedirect();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        login(result.user, result.token); // auto login after registration
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

  {/* Background glow blobs */}
  <div className="absolute w-72 h-72 bg-zinc-700 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
  <div className="absolute w-72 h-72 bg-zinc-800 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

  <form
    onSubmit={handleSubmit}
    className="relative bg-white/5 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96 flex flex-col gap-4 border border-white/10"
  >
    <h2 className="text-2xl flex gap-3 items-center font-bold text-center text-white">
      <Heart className="text-white w-6 h-6 fill-white" />
      Register Now
    </h2>

    {/* Name */}
    <div className="flex items-center border border-zinc-700 rounded px-2 focus-within:ring-2 focus-within:ring-white/40 bg-black/30">
      <input
        name="name"
        placeholder="Full Name"
        required
        className="p-2 w-full outline-none bg-transparent text-white placeholder-zinc-500 text-sm md:text-base"
      />
    </div>

    {/* Email */}
    <div className="flex items-center border border-zinc-700 rounded px-2 focus-within:ring-2 focus-within:ring-white/40 bg-black/30">
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="p-2 w-full outline-none bg-transparent text-white placeholder-zinc-500 text-sm md:text-base"
      />
    </div>

    {/* Password */}
    <div className="flex items-center border border-zinc-700 rounded px-2 focus-within:ring-2 focus-within:ring-white/40 bg-black/30">
      <input
        name="password"
        type="password"
        placeholder="Password"
        minLength={6}
        required
        className="p-2 w-full outline-none bg-transparent text-white placeholder-zinc-500 text-sm md:text-base"
      />
    </div>

    {/* Confirm Password */}
    <div className="flex items-center border border-zinc-700 rounded px-2 focus-within:ring-2 focus-within:ring-white/40 bg-black/30">
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
        className="p-2 w-full outline-none bg-transparent text-white placeholder-zinc-500 text-sm md:text-base"
      />
    </div>

    <button
      disabled={loading}
      className="bg-white text-black hover:bg-zinc-300 p-2 rounded-lg transition font-semibold shadow-md"
    >
      {loading ? "Creating..." : "Register"}
    </button>

    <p className="text-sm text-center text-zinc-400">
      Already registered?{" "}
      <a
        href="/login"
        className="text-white font-semibold hover:underline"
      >
        Login
      </a>
    </p>
  </form>
</div>
  );
}
