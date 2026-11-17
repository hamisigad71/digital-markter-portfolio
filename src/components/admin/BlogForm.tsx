'use client';

import { useState, useEffect } from "react";
import { X, Tag, FileText, User, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/store";
import ImageUpload from "./ImageUpload";
import AIChatAssistant from "./AIChatAssistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = ["Analytics", "SEO", "PPC", "Content", "Social Media", "Strategy", "Design", "Email", "Other"];

interface Props {
  post?: BlogPost | null;
  onSave: (p: BlogPost) => void;
  onClose: () => void;
}

const today = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
const empty: BlogPost = { id: "", title: "", excerpt: "", category: "Analytics", date: today, author: "Daysman Gad", readTime: "5 min read", image: "" };

export default function BlogForm({ post, onSave, onClose }: Props) {
  const [form, setForm] = useState<BlogPost>(post ?? empty);
  const [errors, setErrors] = useState<Partial<Record<keyof BlogPost, string>>>({});

  useEffect(() => { setForm(post ?? empty); }, [post]);

  const set = (key: keyof BlogPost, value: string) => setForm(f => ({ ...f, [key]: value }));
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const handleTitleChange = (v: string) => { set("title", v); if (!post) set("id", slugify(v)); };

  const handleAIGenerated = (data: Partial<BlogPost>) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value) set(key as keyof BlogPost, value as string);
    });
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof BlogPost, string>> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.excerpt.trim()) e.excerpt = "Excerpt is required";
    if (!form.image.trim()) e.image = "Image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave({ ...form, id: form.id || slugify(form.title) });
  };

  const FieldLabel = ({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) => (
    <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
      {icon}{children}
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-card border border-border rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border/80 px-6 sm:px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="text-foreground font-display font-bold text-xl">{post ? "Edit Article" : "New Intelligence Article"}</h2>
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
          <AIChatAssistant type="blog" onGenerate={handleAIGenerated} />
        </div>

        <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-8 space-y-5">
          <div>
            <FieldLabel icon={<FileText className="h-3 w-3" />}>Title *</FieldLabel>
            <Input
              type="text"
              value={form.title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Article title"
            />
            {errors.title && <p className="text-destructive text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
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
              <FieldLabel icon={<User className="h-3 w-3" />}>Author</FieldLabel>
              <Input
                type="text"
                value={form.author}
                onChange={e => set("author", e.target.value)}
                placeholder="Author name"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel icon={<Calendar className="h-3 w-3" />}>Date</FieldLabel>
              <Input
                type="text"
                value={form.date}
                onChange={e => set("date", e.target.value)}
                placeholder="e.g. May 12, 2026"
              />
            </div>
            <div>
              <FieldLabel icon={<Clock className="h-3 w-3" />}>Read Time</FieldLabel>
              <Input
                type="text"
                value={form.readTime}
                onChange={e => set("readTime", e.target.value)}
                placeholder="e.g. 5 min read"
              />
            </div>
          </div>

          <div>
            <FieldLabel>Excerpt / Summary *</FieldLabel>
            <Textarea
              rows={3}
              value={form.excerpt}
              onChange={e => set("excerpt", e.target.value)}
              placeholder="Brief overview of the article..."
              className="resize-none"
            />
            {errors.excerpt && <p className="text-destructive text-xs mt-1">{errors.excerpt}</p>}
          </div>

          <ImageUpload
            label="Cover Image *"
            value={form.image}
            onChange={(val) => set("image", val)}
          />
          {errors.image && <p className="text-destructive text-xs mt-1">{errors.image}</p>}

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
              {post ? "Save Changes" : "Publish Article"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
