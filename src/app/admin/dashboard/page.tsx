'use client';

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout, getProjects, getBlogs, resetAll } from "@/lib/store";
import type { Project, BlogPost } from "@/lib/store";
import ProjectsManager from "@/components/admin/ProjectsManager";
import BlogsManager from "@/components/admin/BlogsManager";
import SettingsManager from "@/components/admin/SettingsManager";
import { LayoutGrid, FileText, LogOut, Home, RefreshCw, ChevronRight, Settings as SettingsIcon, ClipboardList, Tag, BookOpen, Tags, User } from "lucide-react";
import Image from "next/image";

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

  const handleLogout = () => { logout(); router.replace("/admin"); };
  const handleReset = async () => { await resetAll(); await loadData(); setResetConfirm(false); };

  const NavBtn = ({ id, Icon, label }: { id: Tab; Icon: React.ElementType; label: string }) => (
    <button
      onClick={() => setTab(id)}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
      style={tab === id
        ? { background: "rgba(255,170,23,0.1)", color: "#b37200", border: "1px solid rgba(255,170,23,0.25)" }
        : { color: "#71717a", border: "1px solid transparent" }}
      onMouseEnter={(e) => { if (tab !== id) { e.currentTarget.style.background = "#f4f4f5"; e.currentTarget.style.color = "#18181b"; } }}
      onMouseLeave={(e) => { if (tab !== id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#71717a"; } }}
    >
      <Icon className="h-4 w-4" />{label}
      {tab === id && <ChevronRight className="h-3.5 w-3.5 ml-auto" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">

      {/* ── Sidebar (desktop) ─────────────────────── */}
      <aside className="fixed left-0 top-0 h-full w-60 bg-white border-r border-zinc-200 flex-col z-40 hidden md:flex shadow-sm">
        <div className="px-6 py-6 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center overflow-hidden border border-white/50 bg-white" 
                 style={{ background: "linear-gradient(135deg, #ffcc00, #e8900a)", boxShadow: "0 4px 12px rgba(255,170,23,0.3)" }}>
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-zinc-900 tracking-tight">Admin</p>
              <p className="text-zinc-400 text-[10px]">Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          <NavBtn id="projects" Icon={LayoutGrid} label="Projects" />
          <NavBtn id="blogs" Icon={FileText} label="Blog Posts" />
          <NavBtn id="settings" Icon={SettingsIcon} label="Settings" />
        </nav>

        <div className="px-3 py-5 border-t border-zinc-100 space-y-1">
          <a href="/" target="_blank" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all">
            <Home className="h-4 w-4" />View Portfolio
          </a>
          <button onClick={() => setResetConfirm(true)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-orange-600 hover:bg-orange-50 transition-all">
            <RefreshCw className="h-4 w-4" />Reset to Defaults
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all">
            <LogOut className="h-4 w-4" />Logout
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ─────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-zinc-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center overflow-hidden border border-white/40 shadow-sm"
               style={{ background: "linear-gradient(135deg, #ffcc00, #e8900a)" }}>
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-sm text-zinc-900">Admin</span>
        </div>
        <div className="flex gap-2">
          <a href="/" className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors"><Home className="h-4 w-4" /></a>
          <button onClick={handleLogout} className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-red-600 transition-colors"><LogOut className="h-4 w-4" /></button>
        </div>
      </div>

      {/* ── Mobile bottom tabs ──────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200 px-2 py-1.5 flex justify-between items-center shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        {([
          ["projects", LayoutGrid, "Projects"], 
          ["blogs", FileText, "Blogs"], 
          ["settings", SettingsIcon, "Settings"],
          ["portfolio", Home, "View"],
          ["reset", RefreshCw, "Reset"],
          ["logout", LogOut, "Exit"]
        ] as const).map(([id, Icon, label]) => {
          const isActive = tab === id;
          return (
            <button key={id} onClick={() => {
              if (id === "portfolio") window.open("/", "_blank");
              else if (id === "reset") setResetConfirm(true);
              else if (id === "logout") handleLogout();
              else setTab(id as Tab);
            }} className="flex-1 flex flex-col items-center gap-0.5 py-1 transition-all"
              style={isActive ? { color: "#ffaa17" } : { color: "#a1a1aa" }}>
              <Icon className="h-5 w-5" />
              <span className="text-[9px] font-bold">{label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main content ────────────────────────────── */}
      <main className="md:pl-60 pt-16 md:pt-0 pb-24 md:pb-0">
        <div className="p-6 md:p-10">

          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-zinc-400 text-xs mb-3">
              <span>Admin</span><ChevronRight className="h-3 w-3" />
              <span className="text-zinc-900 font-semibold capitalize">{tab}</span>
            </div>
            <h1 className="text-3xl font-semibold text-zinc-900">
              {tab === "projects" ? "Projects" : tab === "blogs" ? "Blog Posts" : "Site Settings"}
            </h1>
            {tab !== "settings" && (
              <p className="text-zinc-400 text-sm mt-1">
                {tab === "projects" ? `${projects.length} total projects` : `${blogs.length} total posts`}
              </p>
            )}
          </div>

          {/* Stats (only on projects/blogs) */}
          {tab !== "settings" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Projects",
                  value: projects.length,
                  icon: ClipboardList,
                  sub: `${new Set(projects.map(p => p.category)).size} categories`,
                  subDot: "bg-amber-400",
                  iconColor: "text-amber-500",
                  chart: true,
                },
                {
                  label: "Total Orders",
                  value: blogs.length,
                  icon: BookOpen,
                  sub: `${new Set(blogs.map(b => b.category)).size} topics`,
                  subDot: "bg-emerald-400",
                  iconColor: "text-amber-500",
                  chart: false,
                },
                {
                  label: "Active Categories",
                  value: `${new Set(projects.map(p => p.category)).size} / 7`,
                  icon: Tag,
                  sub: `${Math.round((new Set(projects.map(p => p.category)).size / 7) * 100)}% covered`,
                  subDot: "bg-amber-400",
                  iconColor: "text-amber-500",
                  chart: false,
                },
                {
                  label: "Blog Posts",
                  value: blogs.length,
                  icon: Tags,
                  sub: "Published today",
                  subDot: "bg-emerald-400",
                  iconColor: "text-amber-500",
                  chart: false,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="relative bg-white border border-zinc-100 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-2 md:mb-3">
                    <p className="text-zinc-500 text-[10px] md:text-sm font-medium md:font-semibold leading-tight max-w-[70%]">{stat.label}</p>
                    <div className="h-7 w-7 md:h-10 md:w-10 rounded-xl md:rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
                      <stat.icon className={`${stat.iconColor} md:w-5 md:h-5`} style={{ height: 14, width: 14 }} strokeWidth={1.8} />
                    </div>
                  </div>
                  <p className="text-2xl md:text-4xl font-semibold text-zinc-900 mb-1 leading-none tracking-tight">{stat.value}</p>
                  {stat.chart && (
                    <svg viewBox="0 0 80 24" className="w-full h-5 md:h-8 my-1 md:my-2 opacity-60" fill="none">
                      <polyline
                        points="0,20 12,14 24,16 36,8 48,12 60,6 72,10 80,4"
                        stroke="#ffcc00"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  )}
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`h-2 w-2 rounded-full ${stat.subDot} shrink-0`} />
                    <p className="text-[10px] md:text-xs text-zinc-500 font-medium">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Manager area */}
          <div className={tab === "settings" ? "" : "bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm"}>
            {tab === "projects" && <ProjectsManager projects={projects} onUpdate={loadData} />}
            {tab === "blogs" && <BlogsManager blogs={blogs} onUpdate={loadData} />}
            {tab === "settings" && <SettingsManager />}
          </div>

        </div>
      </main>

      {/* ── Reset confirm ─────────────────────────── */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white border border-zinc-200 rounded-2xl p-7 w-full max-w-sm shadow-2xl text-center">
            <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-zinc-900 font-semibold text-lg mb-2">Reset All Data?</h3>
            <p className="text-zinc-500 text-sm mb-6">This will restore all projects and blog posts to their original defaults. Your custom edits will be lost.</p>
            <div className="flex gap-3">
              <button onClick={() => setResetConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-zinc-500 hover:text-zinc-900 font-semibold text-sm transition-all">Cancel</button>
              <button onClick={handleReset} className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm transition-all">Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
