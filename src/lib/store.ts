import { supabase } from "./supabase";
import { projects as defaultProjects } from "@/data/projects";
import { defaultBlogs, BlogPost } from "@/data/blogs";

export type { BlogPost };

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  challenge: string;
  solution: string;
  results: string;
}

export interface Settings {
  profileImage: string;
}

const defaultSettings: Settings = {
  profileImage: "/profile-avatar.jpg",
};

// ── Auth ──────────────────────────────────────────────────────────────────────

const AUTH_KEY = "admin_authenticated";
export const ADMIN_PASSWORD = "admin2025";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data as Project[];
}

export async function addProject(project: Project): Promise<void> {
  await supabase.from("projects").insert(project);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("portfolio-updated"));
}

export async function updateProject(slug: string, updated: Project): Promise<void> {
  await supabase.from("projects").update(updated).eq("slug", slug);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("portfolio-updated"));
}

export async function deleteProject(slug: string): Promise<void> {
  await supabase.from("projects").delete().eq("slug", slug);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("portfolio-updated"));
}

// ── Blogs ─────────────────────────────────────────────────────────────────────

export async function getBlogs(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("id", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((b) => ({
    id: b.id,
    title: b.title,
    excerpt: b.excerpt,
    category: b.category,
    date: b.date,
    author: b.author,
    readTime: b.read_time,
    image: b.image,
  })) as BlogPost[];
}

export async function addBlog(post: BlogPost): Promise<void> {
  await supabase.from("blogs").insert({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    author: post.author,
    read_time: post.readTime,
    image: post.image,
  });
  if (typeof window !== "undefined") window.dispatchEvent(new Event("blog-updated"));
}

export async function updateBlog(id: string, updated: BlogPost): Promise<void> {
  await supabase.from("blogs").update({
    title: updated.title,
    excerpt: updated.excerpt,
    category: updated.category,
    date: updated.date,
    author: updated.author,
    read_time: updated.readTime,
    image: updated.image,
  }).eq("id", id);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("blog-updated"));
}

export async function deleteBlog(id: string): Promise<void> {
  await supabase.from("blogs").delete().eq("id", id);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("blog-updated"));
}

// ── Settings ──────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase
    .from("settings")
    .select("profile_image")
    .eq("key", "profile")
    .single();

  if (error || !data) return defaultSettings;
  return { profileImage: data.profile_image ?? defaultSettings.profileImage };
}

export async function saveSettings(settings: Settings): Promise<void> {
  await supabase.from("settings").upsert({
    key: "profile",
    profile_image: settings.profileImage,
  });
  if (typeof window !== "undefined") window.dispatchEvent(new Event("settings-updated"));
}

// ── Image Upload (Supabase Storage) ───────────────────────────────────────────

export async function handleImageUpload(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const path = `uploads/${filename}`;

  const { error } = await supabase.storage
    .from("portfolio-images")
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from("portfolio-images").getPublicUrl(path);
  return data.publicUrl;
}

// ── Reset ─────────────────────────────────────────────────────────────────────

export async function resetAll(): Promise<void> {
  // 1. Delete existing
  await supabase.from("projects").delete().neq("slug", "");
  await supabase.from("blogs").delete().neq("id", "");
  
  // 2. Insert defaults
  await supabase.from("projects").insert(defaultProjects);
  await supabase.from("blogs").insert(defaultBlogs.map(b => ({
    id: b.id,
    title: b.title,
    excerpt: b.excerpt,
    category: b.category,
    date: b.date,
    author: b.author,
    read_time: b.readTime,
    image: b.image
  })));
  
  await supabase.from("settings").upsert({ key: "profile", profile_image: defaultSettings.profileImage });

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio-updated"));
    window.dispatchEvent(new Event("blog-updated"));
    window.dispatchEvent(new Event("settings-updated"));
  }
}
