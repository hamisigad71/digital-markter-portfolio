'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, isAuthenticated } from "@/lib/store";
import { Eye, EyeOff, Lock, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
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
    setTimeout(() => {
      if (login(password)) {
        toast.success("Welcome back!", {
          description: "Authenticated successfully to Admin Console.",
        });
        router.push("/admin/dashboard");
      } else {
        toast.error("Incorrect password", {
          description: "Please check your master credentials and try again.",
        });
        setLoading(false);
      }
    }, 400);
  };

  if (checking) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden px-4">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Heading */}
        <div className="flex flex-col items-center mb-8 text-center space-y-2">
          <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-2 overflow-hidden bg-card border border-border shadow-lg shadow-primary/10">
            <Image
              src="/logo.png"
              alt="Admin Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-foreground">
            Admin Portal
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Sign in to manage portfolio case studies and intelligence articles
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-primary/5">
          <div className="flex items-center gap-2 mb-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <Lock className="h-4 w-4 text-primary" />
            <span>Master Password Authentication</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                id="admin-password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoComplete="current-password"
                className="pr-12 h-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button
              id="admin-login-btn"
              type="submit"
              disabled={loading || !password}
              className="w-full h-12 font-bold text-sm sm:text-base rounded-xl shadow-md group"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  Access Console
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-6">
          Not the admin?{" "}
          <Link href="/" className="text-primary font-semibold hover:underline transition-colors">
            Return to portfolio website →
          </Link>
        </p>
      </div>
    </div>
  );
}
