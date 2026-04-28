'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, isAuthenticated } from "@/lib/store";
import { Eye, EyeOff, Lock, Zap } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) router.replace("/admin/dashboard");
    else setChecking(false);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (login(password)) {
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect password. Please try again.");
        setLoading(false);
      }
    }, 500);
  };

  if (checking) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 relative overflow-hidden">
      {/* Subtle amber glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(255,170,23,0.06)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(255,170,23,0.04)", filter: "blur(100px)" }} />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-xl mb-4" style={{ background: "linear-gradient(135deg, #FFAA17, #e8900a)", boxShadow: "0 8px 24px rgba(255,170,23,0.35)" }}>
            <Zap className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-zinc-900 text-2xl font-semibold tracking-tight"></h1>
          <p className="text-zinc-400 text-sm mt-1">Admin access only</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl shadow-zinc-100">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-4 w-4" style={{ color: "#FFAA17" }} />
            <span className="text-zinc-700 font-semibold text-sm">Enter your password to continue</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                id="admin-password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 pr-12 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none transition-all"
                onFocus={(e) => { e.currentTarget.style.borderColor = "#FFAA17"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,170,23,0.12)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e4e4e7"; e.currentTarget.style.boxShadow = "none"; }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors">
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-xs bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">{error}</p>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading || !password}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #FFAA17, #e8900a)", boxShadow: "0 4px 16px rgba(255,170,23,0.35)" }}
            >
              {loading ? (
                <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Verifying...</>
              ) : "Access Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center text-zinc-400 text-xs mt-6">
          Not the admin?{" "}
          <a href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors">Return to portfolio →</a>
        </p>
      </div>
    </div>
  );
}
