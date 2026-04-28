'use client';

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, AlertTriangle, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/store";
import { addBlog, updateBlog, deleteBlog } from "@/lib/store";
import BlogForm from "./BlogForm";

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
    if (editing) await updateBlog(editing.id, p); else await addBlog(p);
    setFormOpen(false); setEditing(null); onUpdate();
  };
  const handleDelete = async (id: string) => { await deleteBlog(id); setConfirmDelete(null); onUpdate(); };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none transition-all"
            onFocus={e => { e.currentTarget.style.borderColor = "#FFAA17"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,170,23,0.1)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "#e4e4e7"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>
        <button
          id="add-blog-btn"
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-all shrink-0"
          style={{ background: "linear-gradient(135deg, #FFAA17, #e8900a)", boxShadow: "0 4px 12px rgba(255,170,23,0.3)" }}
        >
          <Plus className="h-4 w-4" />Add Post
        </button>
      </div>

      {/* Grid Layout */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-3xl p-12 text-center text-zinc-400 text-sm shadow-sm">
          No blog posts found. Add your first post!
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-zinc-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-zinc-100 border-b border-zinc-100">
                {post.image ? (
                  <img
                    src={post.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={e => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <Plus className="h-8 w-8 text-zinc-300 opacity-30" />
                  </div>
                )}

                {/* Category badge */}
                <div className="absolute top-2 left-2">
                  <span className="text-[7px] md:text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 md:px-3 md:py-1 rounded-full border shadow-sm backdrop-blur-md bg-white/90 text-amber-700 border-amber-200">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 md:p-5 flex flex-col flex-1">
                <div className="mb-3">
                  <h4 className="text-zinc-900 font-semibold text-xs md:text-base leading-tight mb-0.5 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 text-[10px] md:text-xs line-clamp-1 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 md:gap-3 mb-3">
                  <span className="flex items-center gap-1 text-[8px] md:text-[10px] text-zinc-400">
                    <Calendar className="h-2.5 w-2.5 md:h-3 md:w-3" />{post.date}
                  </span>
                  <span className="flex items-center gap-1 text-[8px] md:text-[10px] text-zinc-400">
                    <Clock className="h-2.5 w-2.5 md:h-3 md:w-3" />{post.readTime}
                  </span>
                </div>

                <div className="mt-auto pt-2 md:pt-4 border-t border-zinc-50 flex items-center justify-between">
                  <p className="text-[8px] md:text-[10px] text-zinc-400 font-medium truncate max-w-[50%]">{post.author}</p>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <button
                      onClick={() => { setEditing(post); setFormOpen(true); }}
                      className="h-7 w-7 md:h-9 md:w-9 rounded-lg md:rounded-xl bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-all text-zinc-500 hover:text-zinc-900"
                      title="Edit Post"
                    >
                      <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(post.id)}
                      className="h-7 w-7 md:h-9 md:w-9 rounded-lg md:rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all text-red-500"
                      title="Delete Post"
                    >
                      <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white border border-zinc-200 rounded-2xl p-7 w-full max-w-sm shadow-2xl text-center">
            <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-zinc-900 font-semibold text-lg mb-2">Delete Post?</h3>
            <p className="text-zinc-400 text-sm mb-6">This post will be permanently removed from your blog section.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-zinc-500 hover:text-zinc-900 font-semibold text-sm transition-all">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      {formOpen && <BlogForm post={editing} onSave={handleSave} onClose={() => { setFormOpen(false); setEditing(null); }} />}
    </div>
  );
}
