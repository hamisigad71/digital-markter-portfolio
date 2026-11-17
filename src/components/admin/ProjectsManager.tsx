'use client';

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, AlertTriangle } from "lucide-react";
import type { Project } from "@/lib/store";
import { addProject, updateProject, deleteProject } from "@/lib/store";
import ProjectForm from "./ProjectForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Props { projects: Project[]; onUpdate: () => void | Promise<void>; }

const categoryColors: Record<string, string> = {
  Marketing: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
  Development: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  Design: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
  SEO: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  Content: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
  "Social Media": "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
};

export default function ProjectsManager({ projects, onUpdate }: Props) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = Array.isArray(projects) ? projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const handleSave = async (p: Project) => {
    if (editing) {
      await updateProject(editing.slug, p);
      toast.success("Project updated successfully!");
    } else {
      await addProject(p);
      toast.success("New project created!");
    }
    setFormOpen(false);
    setEditing(null);
    await onUpdate();
  };

  const handleDelete = async (slug: string) => {
    await deleteProject(slug);
    setConfirmDelete(null);
    toast.success("Project deleted");
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
            placeholder="Search projects by title or category..."
            className="pl-10 h-10"
          />
        </div>
        <Button
          id="add-project-btn"
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="rounded-xl gap-2 font-semibold shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </Button>
      </div>

      {/* Grid Layout */}
      {filtered.length === 0 ? (
        <div className="bg-card border border-border/80 rounded-2xl p-12 text-center text-muted-foreground text-sm shadow-xs">
          No projects found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((project) => (
            <div 
              key={project.slug} 
              className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-[box-shadow,border-color] duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-muted/40 border-b border-border/60">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt="" 
                      className="h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105" 
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground/30">
                      <Plus className="h-8 w-8" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-xs backdrop-blur-md ${categoryColors[project.category] ?? "bg-background/90 text-foreground border-border"}`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="text-foreground font-bold text-sm sm:text-base leading-snug group-hover:text-primary transition-colors line-clamp-1">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                  <code className="text-[10px] text-muted-foreground font-mono px-2 py-0.5 bg-muted rounded truncate max-w-[55%]">
                    {project.slug}
                  </code>
                  
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => { setEditing(project); setFormOpen(true); }}
                      className="h-8 w-8 rounded-lg"
                      title="Edit project"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setConfirmDelete(project.slug)}
                      className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
                      title="Delete project"
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

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 w-full max-w-sm shadow-2xl text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-foreground font-display font-bold text-lg">Delete Project?</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">This action cannot be undone and will remove the case study immediately.</p>
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

      {formOpen && <ProjectForm project={editing} onSave={handleSave} onClose={() => { setFormOpen(false); setEditing(null); }} />}
    </div>
  );
}
