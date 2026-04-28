'use client';

import { useState, useEffect } from "react";
import { X, Tag, FileText, User, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/store";
import ImageUpload from "./ImageUpload";

const CATEGORIES = ["Analytics", "SEO", "PPC", "Content", "Social Media", "Strategy", "Design", "Email", "Other"];

interface Props {
  post?: BlogPost | null;
  onSave: (p: BlogPost) => void;
  onClose: () => void;
}

const today = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
const empty: BlogPost = { id: "", title: "", excerpt: "", category: "Analytics", date: today, author: "Hamisi", readTime: "5 min read", image: "" };

const inputCls = "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none transition-all";
const focusAmber = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "#FFAA17";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,170,23,0.12)";
};
const blurField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "#e4e4e7";
  e.currentTarget.style.boxShadow = "none";
};

export default function BlogForm({ post, onSave, onClose }: Props) {
  const [form, setForm] = useState<BlogPost>(post ?? empty);
  const [errors, setErrors] = useState<Partial<Record<keyof BlogPost, string>>>({});

  useEffect(() => { setForm(post ?? empty); }, [post]);

  const set = (key: keyof BlogPost, value: string) => setForm(f => ({ ...f, [key]: value }));
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const handleTitleChange = (v: string) => { set("title", v); if (!post) set("id", slugify(v)); };

  const validate = (): boolean => {
    const e: Partial<Record<keyof BlogPost, string>> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.excerpt.trim()) e.excerpt = "Excerpt is required";
    if (!form.image.trim()) e.image = "Image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) onSave({ ...form, id: form.id || slugify(form.title) }); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="bg-white border border-zinc-200 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-zinc-100 px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="text-zinc-900 font-black text-xl">{post ? "Edit Post" : "New Blog Post"}</h2>
            <p className="text-zinc-400 text-xs mt-0.5">Fill in the details for your article</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors">
            <X className="h-4 w-4 text-zinc-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Title */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider"><FileText className="h-3 w-3" />Title *</label>
            <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Article title" className={inputCls} onFocus={focusAmber} onBlur={blurField} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Excerpt */}
          <div>
            <label className="text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider block">Excerpt *</label>
            <textarea rows={3} value={form.excerpt} onChange={e => set("excerpt", e.target.value)} placeholder="Short summary of the article..." className={`${inputCls} resize-none`} onFocus={focusAmber} onBlur={blurField} />
            {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider"><Tag className="h-3 w-3" />Category</label>
            <select value={form.category} onChange={e => set("category", e.target.value)} className={inputCls} onFocus={focusAmber} onBlur={blurField}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Image */}
          <ImageUpload 
            label="Blog Post Image *"
            value={form.image}
            onChange={(val) => set("image", val)}
          />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}

          {/* Meta */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "author" as const, label: "Author", placeholder: "Hamisi" },
              { key: "date" as const, label: "Date", placeholder: "Jan 01, 2025" },
              { key: "readTime" as const, label: "Read Time", placeholder: "5 min read" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="flex items-center gap-1 text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">{label}</label>
                <input type="text" value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-3 text-zinc-900 text-sm focus:outline-none transition-all" onFocus={focusAmber} onBlur={blurField} />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 font-semibold text-sm transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-3 rounded-xl font-black text-sm text-white transition-all"
              style={{ background: "linear-gradient(135deg, #FFAA17, #e8900a)", boxShadow: "0 4px 14px rgba(255,170,23,0.3)" }}>
              {post ? "Save Changes" : "Add Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
