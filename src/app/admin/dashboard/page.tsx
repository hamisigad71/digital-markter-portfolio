'use client';

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout, getProjects, getBlogs, resetAll } from "@/lib/store";
import type { Project, BlogPost } from "@/lib/store";
import ProjectsManager from "@/components/admin/ProjectsManager";
import BlogsManager from "@/components/admin/BlogsManager";
import SettingsManager from "@/components/admin/SettingsManager";
import { LayoutGrid, FileText, LogOut, Home, RefreshCw, ChevronRight, Settings as SettingsIcon, ClipboardList, Tag, BookOpen, Tags, User } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Tab = "projects" | "blogs" | "settings";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [resetConfirm, setResetConfirm] = useState(false);

  const loadData = useCallback(async () => {
    const [p, b] = await Promise.all([getProjects(), getBlogs()]);
    setProjects(p);
    setBlogs(b);
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) { router.replace("/admin"); return; }
    loadData();
    window.addEventListener("portfolio-updated", loadData);
    window.addEventListener("blog-updated", loadData);
    return () => {
      window.removeEventListener("portfolio-updated", loadData);
      window.removeEventListener("blog-updated", loadData);
    };
  }, [router, loadData]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.replace("/admin");
  };

  const handleReset = async () => {
    await resetAll();
    await loadData();
    setResetConfirm(false);
    toast.success("Default data restored", {
      description: "Projects and blogs have been reset to their initial starter state.",
    });
  };

  const NavBtn = ({ id, Icon, label }: { id: Tab; Icon: React.ElementType; label: string }) => {
    const isActive = tab === id;
    return (
      <button
        onClick={() => setTab(id)}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] cursor-pointer ${
          isActive
            ? "bg-primary/10 text-primary border border-primary/25"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-transparent"
        }`}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span>{label}</span>
        {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto text-primary" />}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Sidebar (desktop) ─────────────────────── */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border/80 flex-col z-40 hidden md:flex shadow-xs">
        <div className="px-6 py-5 border-b border-border/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-primary text-primary-foreground shadow-xs">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-sm text-foreground tracking-tight">Admin Console</p>
              <p className="text-muted-foreground text-[11px] font-mono">Daysman Marketer</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1.5">
          <NavBtn id="projects" Icon={LayoutGrid} label="Projects" />
          <NavBtn id="blogs" Icon={FileText} label="Blog Posts" />
          <NavBtn id="settings" Icon={SettingsIcon} label="Site Settings" />
        </nav>

        <div className="px-3 py-5 border-t border-border/80 space-y-1.5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Home className="h-4 w-4" />View Live Site
          </a>
          <button
            onClick={() => setResetConfirm(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />Reset to Defaults
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ─────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <span className="font-bold text-sm text-foreground">Admin Console</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/"
            className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <Home className="h-4 w-4" />
          </a>
          <button
            onClick={handleLogout}
            className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Mobile bottom tabs ──────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border px-2 py-1.5 flex justify-between items-center shadow-lg">
        {([
          ["projects", LayoutGrid, "Projects"], 
          ["blogs", FileText, "Blogs"], 
          ["settings", SettingsIcon, "Settings"],
          ["reset", RefreshCw, "Reset"],
          ["logout", LogOut, "Exit"]
        ] as const).map(([id, Icon, label]) => {
          const isActive = tab === id;
          return (
            <button
              key={id}
              onClick={() => {
                if (id === "reset") setResetConfirm(true);
                else if (id === "logout") handleLogout();
                else setTab(id as Tab);
              }}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 transition-colors cursor-pointer ${
                isActive ? "text-primary font-bold" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px]">{label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main content ────────────────────────────── */}
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-10">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">

          {/* Breadcrumb & Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
              <span>Admin</span><ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-semibold capitalize">{tab}</span>
            </div>
            <h1 className="text-3xl font-display font-extrabold text-foreground tracking-tight">
              {tab === "projects" ? "Projects Manager" : tab === "blogs" ? "Blog Intelligence" : "Site Settings"}
            </h1>
            {tab !== "settings" && (
              <p className="text-muted-foreground text-sm mt-1">
                {tab === "projects" ? `${projects.length} total projects indexed` : `${blogs.length} published intelligence articles`}
              </p>
            )}
          </div>

          {/* Stats Summary Cards */}
          {tab !== "settings" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Projects",
                  value: projects.length,
                  icon: ClipboardList,
                  sub: `${new Set(projects.map(p => p.category)).size} categories`,
                  subDot: "bg-emerald-500",
                },
                {
                  label: "Intelligence Articles",
                  value: blogs.length,
                  icon: BookOpen,
                  sub: `${new Set(blogs.map(b => b.category)).size} topics`,
                  subDot: "bg-blue-500",
                },
                {
                  label: "Active Categories",
                  value: `${new Set(projects.map(p => p.category)).size} / 7`,
                  icon: Tag,
                  sub: `${Math.round((new Set(projects.map(p => p.category)).size / 7) * 100)}% coverage`,
                  subDot: "bg-amber-500",
                },
                {
                  label: "System Status",
                  value: "Live",
                  icon: Tags,
                  sub: "Supabase & Local Sync",
                  subDot: "bg-emerald-500",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-muted-foreground text-xs font-semibold">{stat.label}</p>
                    <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <stat.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold font-display text-foreground mb-1 tabular-nums">{stat.value}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`h-2 w-2 rounded-full ${stat.subDot} shrink-0`} />
                    <p className="text-[11px] text-muted-foreground font-medium">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Manager area */}
          <div className={tab === "settings" ? "" : "bg-card border border-border/80 rounded-3xl p-6 md:p-8 shadow-xs"}>
            {tab === "projects" && <ProjectsManager projects={projects} onUpdate={loadData} />}
            {tab === "blogs" && <BlogsManager blogs={blogs} onUpdate={loadData} />}
            {tab === "settings" && <SettingsManager />}
          </div>

        </div>
      </main>

      {/* ── Reset Confirmation Modal ─────────────────────────── */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-2xl text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mx-auto">
              <RefreshCw className="h-6 w-6" />
            </div>
            <h3 className="text-foreground font-display font-bold text-lg">Reset All Data?</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              This will restore all projects and blog posts to their original defaults. Any custom edits will be reverted.
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setResetConfirm(false)}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReset}
                className="flex-1 rounded-xl"
              >
                Reset Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
