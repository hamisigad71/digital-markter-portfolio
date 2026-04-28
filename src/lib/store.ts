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

const PROJECTS_KEY = "admin_projects";
const BLOGS_KEY = "admin_blogs";
const SETTINGS_KEY = "admin_settings";
const AUTH_KEY = "admin_authenticated";

const defaultSettings: Settings = {
  profileImage: "/profile-avatar.jpg",
};

// ── Projects ──────────────────────────────────────────────────────────────────

export function getProjects(): Project[] {
  if (typeof window === "undefined") return defaultProjects as Project[];
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return defaultProjects as Project[];
    return JSON.parse(raw) as Project[];
  } catch {
    return defaultProjects as Project[];
  }
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event("portfolio-updated"));
}

export function addProject(project: Project): void {
  const current = getProjects();
  saveProjects([...current, project]);
}

export function updateProject(slug: string, updated: Project): void {
  const current = getProjects();
  saveProjects(current.map((p) => (p.slug === slug ? updated : p)));
}

export function deleteProject(slug: string): void {
  const current = getProjects();
  saveProjects(current.filter((p) => p.slug !== slug));
}

// ── Blogs ─────────────────────────────────────────────────────────────────────

export function getBlogs(): BlogPost[] {
  if (typeof window === "undefined") return defaultBlogs;
  try {
    const raw = localStorage.getItem(BLOGS_KEY);
    if (!raw) return defaultBlogs;
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return defaultBlogs;
  }
}

export function saveBlogs(blogs: BlogPost[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
  window.dispatchEvent(new Event("blog-updated"));
}

export function addBlog(post: BlogPost): void {
  const current = getBlogs();
  saveBlogs([...current, post]);
}

export function updateBlog(id: string, updated: BlogPost): void {
  const current = getBlogs();
  saveBlogs(current.map((b) => (b.id === id ? updated : b)));
}

export function deleteBlog(id: string): void {
  const current = getBlogs();
  saveBlogs(current.filter((b) => b.id !== id));
}

// ── Settings ──────────────────────────────────────────────────────────────────

export function getSettings(): Settings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: Settings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event("settings-updated"));
}

// ── Auth ──────────────────────────────────────────────────────────────────────

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

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Converts a file to a base64 data URL.
 */
export function handleImageUpload(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Reset ─────────────────────────────────────────────────────────────────────

export function resetAll(): void {
  localStorage.removeItem(PROJECTS_KEY);
  localStorage.removeItem(BLOGS_KEY);
  localStorage.removeItem(SETTINGS_KEY);
  window.dispatchEvent(new Event("portfolio-updated"));
  window.dispatchEvent(new Event("blog-updated"));
  window.dispatchEvent(new Event("settings-updated"));
}
