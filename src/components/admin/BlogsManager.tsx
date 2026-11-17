'use client';

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, AlertTriangle, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/store";
import { addBlog, updateBlog, deleteBlog } from "@/lib/store";
import BlogForm from "./BlogForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Props { blogs: BlogPost[]; onUpdate: () => void | Promise<void>; }

export default function BlogsManager({ blogs, onUpdate }: Props) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (p: BlogPost) => {
    if (editing) {
      await updateBlog(editing.id, p);
      toast.success("Blog article updated!");
    } else {
      await addBlog(p);
      toast.success("New blog article published!");
    }
    setFormOpen(false);
    setEditing(null);
    await onUpdate();
  };

  const handleDelete = async (id: string) => {
    await deleteBlog(id);
    setConfirmDelete(null);
    toast.success("Article deleted");
    await onUpdate();
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="pl-10 h-10"
          />
        </div>
        <Button
          id="add-blog-btn"
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="rounded-xl gap-2 font-semibold shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Article</span>
        </Button>
      </div>

      {/* Grid Layout */}
      {filtered.length === 0 ? (
        <div className="bg-card border border-border/80 rounded-2xl p-12 text-center text-muted-foreground text-sm shadow-xs">
          No blog posts found. Publish your first article!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-[box-shadow,border-color] duration-200 group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-muted/40 border-b border-border/60">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                      onError={e => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground/30">
                      <Plus className="h-8 w-8" />
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-xs backdrop-blur-md bg-background/90 text-primary border-primary/20">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h4 className="text-foreground font-bold text-sm sm:text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-muted-foreground font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />{post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />{post.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 pt-0">
                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                  <p className="text-[11px] text-muted-foreground font-medium truncate max-w-[50%]">{post.author}</p>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => { setEditing(post); setFormOpen(true); }}
                      className="h-8 w-8 rounded-lg"
                      title="Edit article"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setConfirmDelete(post.id)}
                      className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
                      title="Delete article"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 w-full max-w-sm shadow-2xl text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-foreground font-display font-bold text-lg">Delete Article?</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">This post will be permanently removed from your published insights.</p>
            <div className="flex gap-2.5 pt-2">
              <Button
                variant="outline"
                onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 rounded-xl"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {formOpen && <BlogForm post={editing} onSave={handleSave} onClose={() => { setFormOpen(false); setEditing(null); }} />}
    </div>
  );
}
