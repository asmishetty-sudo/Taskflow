"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Lock,
  Layers3,
  ArrowRight,
  CheckCircle2,
  Database,
  Sparkles,
} from "lucide-react";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-zinc-700 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[450px] h-[450px] bg-zinc-800 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute top-[40%] left-[45%] w-[300px] h-[300px] bg-white opacity-[0.03] blur-3xl rounded-full"></div>
     
      {/* HERO SECTION */}
      <section className="relative z-10 px-6 md:px-12 py-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-zinc-300 mb-6 backdrop-blur-lg">
            <Sparkles className="w-4 h-4" />
            Secure • Fast • Scalable
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6">
            Build.
            <br />
            Manage.
            <br />
            Scale.
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            A next-generation task management platform powered by secure
            authentication, scalable APIs, and a modern full-stack
            architecture.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="group bg-white text-black px-7 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:bg-zinc-300 transition shadow-2xl"
            >
              Launch Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>

            <Link
              href="/login"
              className="bg-white/5 border border-white/10 px-7 py-4 rounded-2xl font-semibold hover:bg-white/10 transition backdrop-blur-xl"
            >
              Explore Features
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-14">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
              <h3 className="text-3xl font-bold mb-1">99.9%</h3>
              <p className="text-zinc-500 text-sm">API Reliability</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
              <h3 className="text-3xl font-bold mb-1">JWT</h3>
              <p className="text-zinc-500 text-sm">Authentication</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
              <h3 className="text-3xl font-bold mb-1">REST</h3>
              <p className="text-zinc-500 text-sm">API Architecture</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full opacity-20"></div>

          <div className="relative bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl p-8 shadow-[0_0_80px_rgba(255,255,255,0.05)]">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-zinc-400 text-sm">System Status</p>
                <h2 className="text-2xl font-bold mt-1">
                  Backend Active
                </h2>
              </div>

              <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-5">
              <FeatureCard
                icon={<ShieldCheck className="w-6 h-6" />}
                title="Secure Authentication"
                desc="JWT-based access control with encrypted credentials."
              />

              <FeatureCard
                icon={<Layers3 className="w-6 h-6" />}
                title="Role Based Access"
                desc="Advanced user & admin authorization workflows."
              />

              <FeatureCard
                icon={<Database className="w-6 h-6" />}
                title="Scalable API Structure"
                desc="Modular backend architecture built for growth."
              />

              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="High Performance"
                desc="Optimized API requests with efficient state handling."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Built For Modern Systems
          </h2>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Designed with scalability, security, and developer experience in
            mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard
            icon={<Lock className="w-7 h-7" />}
            title="Secure"
            desc="JWT authentication with protected API routes and encrypted passwords."
          />

          <InfoCard
            icon={<Layers3 className="w-7 h-7" />}
            title="Modular"
            desc="Clean backend structure with reusable middleware and controllers."
          />

          <InfoCard
            icon={<Database className="w-7 h-7" />}
            title="Scalable"
            desc="Built for future expansion using scalable REST architecture."
          />

          <InfoCard
            icon={<CheckCircle2 className="w-7 h-7" />}
            title="Reliable"
            desc="Consistent API responses, validation, and robust error handling."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 md:px-12 pb-24">
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-16 backdrop-blur-2xl text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Ready To Build Faster?
            </h2>

            <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
              Experience a modern full-stack workflow powered by scalable APIs,
              secure authentication, and clean architecture.
            </p>

            <Link
              href="/register"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl text-lg font-bold hover:bg-zinc-300 transition shadow-2xl"
            >
              Start Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition duration-300 backdrop-blur-xl">
      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <p className="text-zinc-400 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

function InfoCard({ icon, title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl hover:-translate-y-2 transition duration-300 hover:border-white/20 shadow-xl">
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-3">{title}</h3>

      <p className="text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}
