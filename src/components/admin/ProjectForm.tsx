'use client';

import { useState, useEffect } from "react";
import { X, Tag, FileText, Link2 } from "lucide-react";
import type { Project } from "@/lib/store";
import ImageUpload from "./ImageUpload";

const CATEGORIES = ["Marketing", "Development", "Design", "SEO", "Content", "Social Media"];

interface Props {
  project?: Project | null;
  onSave: (p: Project) => void;
  onClose: () => void;
}

const empty: Project = { slug: "", title: "", category: "Marketing", description: "", image: "", challenge: "", solution: "", results: "" };

const inputCls = "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none transition-all";
const focusAmber = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "#FFAA17";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,170,23,0.12)";
};
const blurField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "#e4e4e7";
  e.currentTarget.style.boxShadow = "none";
};

export default function ProjectForm({ project, onSave, onClose }: Props) {
  const [form, setForm] = useState<Project>(project ?? empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Project, string>>>({});

  useEffect(() => { setForm(project ?? empty); }, [project]);

  const set = (key: keyof Project, value: string) => setForm(f => ({ ...f, [key]: value }));
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const handleTitleChange = (v: string) => { set("title", v); if (!project) set("slug", slugify(v)); };

  const validate = (): boolean => {
    const e: Partial<Record<keyof Project, string>> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.image.trim()) e.image = "Image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) onSave({ ...form, slug: slugify(form.slug) }); };

  const Label = ({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) => (
    <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider">
      {icon}{children}
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="bg-white border border-zinc-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-zinc-100 px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="text-zinc-900 font-semibold text-xl">{project ? "Edit Project" : "New Project"}</h2>
            <p className="text-zinc-400 text-xs mt-0.5">Fields marked * are required</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors">
            <X className="h-4 w-4 text-zinc-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label icon={<FileText className="h-3 w-3" />}>Title *</Label>
              <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Project title" className={inputCls} onFocus={focusAmber} onBlur={blurField} />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div>
              <Label icon={<Link2 className="h-3 w-3" />}>Slug *</Label>
              <input type="text" value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="project-slug" className={inputCls} onFocus={focusAmber} onBlur={blurField} />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
            </div>
          </div>

          <div>
            <Label icon={<Tag className="h-3 w-3" />}>Category</Label>
            <select value={form.category} onChange={e => set("category", e.target.value)} className={inputCls} onFocus={focusAmber} onBlur={blurField}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <Label>Description *</Label>
            <textarea rows={3} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Short project description..." className={`${inputCls} resize-none`} onFocus={focusAmber} onBlur={blurField} />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <ImageUpload 
            label="Project Image *"
            value={form.image}
            onChange={(val) => set("image", val)}
          />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}

          <div className="border-t border-zinc-100 pt-5 space-y-5">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Case Study Details</p>
            {(["challenge", "solution", "results"] as const).map(field => (
              <div key={field}>
                <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <textarea rows={3} value={form[field]} onChange={e => set(field, e.target.value)}
                  placeholder={field === "challenge" ? "What problem needed solving?" : field === "solution" ? "How did you solve it?" : "What were the measurable outcomes?"}
                  className={`${inputCls} resize-none`} onFocus={focusAmber} onBlur={blurField} />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 font-semibold text-sm transition-all">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition-all"
              style={{ background: "linear-gradient(135deg, #FFAA17, #e8900a)", boxShadow: "0 4px 14px rgba(255,170,23,0.3)" }}>
              {project ? "Save Changes" : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
