'use client';

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, AlertTriangle } from "lucide-react";
import type { Project } from "@/lib/store";
import { addProject, updateProject, deleteProject } from "@/lib/store";
import ProjectForm from "./ProjectForm";

interface Props { projects: Project[]; onUpdate: () => void; }

const categoryColors: Record<string, string> = {
  Marketing: "bg-orange-50 text-orange-600 border-orange-200",
  Development: "bg-blue-50 text-blue-600 border-blue-200",
  Design: "bg-pink-50 text-pink-600 border-pink-200",
  SEO: "bg-green-50 text-green-600 border-green-200",
  Content: "bg-purple-50 text-purple-600 border-purple-200",
  "Social Media": "bg-yellow-50 text-yellow-700 border-yellow-200",
};

export default function ProjectsManager({ projects, onUpdate }: Props) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (p: Project) => {
    if (editing) updateProject(editing.slug, p); else addProject(p);
    setFormOpen(false); setEditing(null); onUpdate();
  };
  const handleDelete = (slug: string) => { deleteProject(slug); setConfirmDelete(null); onUpdate(); };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none transition-all"
            onFocus={e => { e.currentTarget.style.borderColor = "#FFAA17"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,170,23,0.1)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "#e4e4e7"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>
        <button
          id="add-project-btn"
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-all shrink-0"
          style={{ background: "linear-gradient(135deg, #FFAA17, #e8900a)", boxShadow: "0 4px 12px rgba(255,170,23,0.3)" }}
        >
          <Plus className="h-4 w-4" />Add Project
        </button>
      </div>

      {/* Grid Layout */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-3xl p-12 text-center text-zinc-400 text-sm shadow-sm">
          No projects found.
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((project) => (
            <div 
              key={project.slug} 
              className="bg-white border border-zinc-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              {/* Image Section */}
              <div className="relative aspect-video overflow-hidden bg-zinc-100 border-b border-zinc-100">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt="" 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={e => (e.currentTarget.style.display = "none")} 
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-zinc-300">
                    <Plus className="h-8 w-8 opacity-20" />
                  </div>
                )}
                
                {/* Category Overlay */}
                <div className="absolute top-2 left-2">
                  <span className={`text-[7px] md:text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 md:px-3 md:py-1 rounded-full border shadow-sm backdrop-blur-md ${categoryColors[project.category]?.replace('bg-', 'bg-opacity-90 bg-') ?? "bg-white/90 text-zinc-600 border-zinc-200"}`}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-3 md:p-5 flex flex-col flex-1">
                <div className="mb-3 md:mb-4">
                  <h4 className="text-zinc-900 font-semibold text-xs md:text-lg leading-tight mb-0.5 md:mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">
                    {project.title}
                  </h4>
                  <p className="text-zinc-500 text-[10px] md:text-xs line-clamp-1 md:line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto pt-2 md:pt-4 border-t border-zinc-50 flex items-center justify-between">
                  <code className="text-[8px] md:text-[10px] text-zinc-400 font-medium px-1.5 py-0.5 bg-zinc-50 rounded-md truncate max-w-[50%]">
                    {project.slug}
                  </code>
                  
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <button 
                      onClick={() => { setEditing(project); setFormOpen(true); }}
                      className="h-7 w-7 md:h-9 md:w-9 rounded-lg md:rounded-xl bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-all text-zinc-500 hover:text-zinc-900" 
                      title="Edit Project"
                    >
                      <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </button>
                    <button 
                      onClick={() => setConfirmDelete(project.slug)}
                      className="h-7 w-7 md:h-9 md:w-9 rounded-lg md:rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all text-red-500" 
                      title="Delete Project"
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
            <h3 className="text-zinc-900 font-semibold text-lg mb-2">Delete Project?</h3>
            <p className="text-zinc-400 text-sm mb-6">This action cannot be undone. The project will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-zinc-500 hover:text-zinc-900 font-semibold text-sm transition-all">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      {formOpen && <ProjectForm project={editing} onSave={handleSave} onClose={() => { setFormOpen(false); setEditing(null); }} />}
    </div>
  );
}
