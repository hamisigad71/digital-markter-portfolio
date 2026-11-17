'use client';

import { useState, useEffect } from "react";
import { X, Tag, FileText, Link2 } from "lucide-react";
import type { Project } from "@/lib/store";
import ImageUpload from "./ImageUpload";
import AIChatAssistant from "./AIChatAssistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = ["Marketing", "Development", "Design", "SEO", "Content", "Social Media"];

interface Props {
  project?: Project | null;
  onSave: (p: Project) => void;
  onClose: () => void;
}

const empty: Project = { slug: "", title: "", category: "Marketing", description: "", image: "", challenge: "", solution: "", results: "" };

export default function ProjectForm({ project, onSave, onClose }: Props) {
  const [form, setForm] = useState<Project>(project ?? empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Project, string>>>({});

  useEffect(() => { setForm(project ?? empty); }, [project]);

  const set = (key: keyof Project, value: string) => setForm(f => ({ ...f, [key]: value }));
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const handleTitleChange = (v: string) => { set("title", v); if (!project) set("slug", slugify(v)); };

  const handleAIGenerated = (data: Partial<Project>) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value) set(key as keyof Project, value as string);
    });
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof Project, string>> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.image.trim()) e.image = "Image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave({ ...form, slug: slugify(form.slug) });
  };

  const FieldLabel = ({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) => (
    <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
      {icon}{children}
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-card border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border/80 px-6 sm:px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="text-foreground font-display font-bold text-xl">{project ? "Edit Project" : "New Project"}</h2>
            <p className="text-muted-foreground text-xs mt-0.5">Fields marked * are required</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-9 w-9 rounded-full"
            aria-label="Close form"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="px-6 sm:px-8 pt-6">
          <AIChatAssistant type="project" onGenerate={handleAIGenerated} />
        </div>

        <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel icon={<FileText className="h-3 w-3" />}>Title *</FieldLabel>
              <Input
                type="text"
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="Project title"
              />
              {errors.title && <p className="text-destructive text-xs mt-1">{errors.title}</p>}
            </div>
            <div>
              <FieldLabel icon={<Link2 className="h-3 w-3" />}>Slug *</FieldLabel>
              <Input
                type="text"
                value={form.slug}
                onChange={e => set("slug", e.target.value)}
                placeholder="project-slug"
              />
              {errors.slug && <p className="text-destructive text-xs mt-1">{errors.slug}</p>}
            </div>
          </div>

          <div>
            <FieldLabel icon={<Tag className="h-3 w-3" />}>Category</FieldLabel>
            <select
              value={form.category}
              onChange={e => set("category", e.target.value)}
              className="w-full bg-background border border-input rounded-xl px-3.5 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
            >
              {CATEGORIES.map(c => <option key={c} value={c} className="bg-card text-foreground">{c}</option>)}
            </select>
          </div>

          <div>
            <FieldLabel>Summary Description *</FieldLabel>
            <Textarea
              rows={3}
              value={form.description}
              onChange={e => set("description", e.target.value)}
              placeholder="Short project description..."
              className="resize-none"
            />
            {errors.description && <p className="text-destructive text-xs mt-1">{errors.description}</p>}
          </div>

          <ImageUpload 
            label="Project Image *"
            value={form.image}
            onChange={(val) => set("image", val)}
          />
          {errors.image && <p className="text-destructive text-xs mt-1">{errors.image}</p>}

          <div className="border-t border-border/80 pt-5 space-y-4">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Case Study Details</p>
            {(["challenge", "solution", "results"] as const).map(field => (
              <div key={field}>
                <FieldLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FieldLabel>
                <Textarea
                  rows={3}
                  value={form[field]}
                  onChange={e => set(field, e.target.value)}
                  placeholder={field === "challenge" ? "What problem needed solving?" : field === "solution" ? "How did you solve it?" : "What were the measurable outcomes?"}
                  className="resize-none"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-xl h-11"
            >
              {project ? "Save Changes" : "Publish Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
