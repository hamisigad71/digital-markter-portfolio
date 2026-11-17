'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, Eye, X, ZoomIn, Sparkles } from "lucide-react";
import { getProjects } from "@/lib/store";
import type { Project } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tabs = ["All", "Graphic Design", "Marketing", "Development", "SEO", "Content", "Social Media"];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  useEffect(() => {
    const load = async () => {
      const projects = await getProjects();
      setAllProjects(projects);
    };
    load();
    window.addEventListener("portfolio-updated", load);
    return () => window.removeEventListener("portfolio-updated", load);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setVisibleCount(6);
    }
  }, []);

  // Listen for escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered =
    active === "All"
      ? allProjects
      : allProjects.filter((p) => {
          if (active === "Graphic Design" || active === "Design") {
            return p.category === "Graphic Design" || p.category === "Design";
          }
          return p.category === active;
        });

  const displayedProjects = Array.isArray(filtered) ? filtered.slice(0, visibleCount) : [];

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section id="portfolio" className="py-24 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3.5 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                Portfolio Showcase
              </Badge>
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Featured Graphic Works
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
              Proven <span className="text-primary italic">Results</span> & Work
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Explore my authentic graphic design posters, mobile app UI designs, and data-driven marketing campaigns crafted for high-growth brands.
            </p>
          </div>
          <div className="shrink-0 text-left md:text-right">
            <p className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tabular-nums">
              {filtered.length}<span className="text-primary text-3xl">+</span>
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">Projects in category</p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex overflow-x-auto gap-2 mb-10 pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActive(tab);
                setVisibleCount(tab === "Graphic Design" ? 12 : 8);
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] cursor-pointer ${
                active === tab
                  ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                  : "bg-card text-muted-foreground border-border/70 hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => {
                const isGraphic = project.category === "Graphic Design" || project.category === "Design";
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1], delay: index * 0.025 }}
                    key={project.slug}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-[border-color,box-shadow,transform] duration-200"
                  >
                    <div>
                      {/* Image container: aspect-[4/5] for posters, aspect-video for websites */}
                      <div
                        onClick={() => setPreviewProject(project)}
                        className={`relative overflow-hidden ${
                          isGraphic ? "aspect-[4/5]" : "aspect-video"
                        } bg-muted/40 cursor-pointer`}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                          unoptimized={project.image.startsWith("/")}
                        />

                        {/* Top Badge */}
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="px-2.5 py-0.5 rounded-full bg-background/90 dark:bg-card/90 backdrop-blur-md text-[10px] font-bold text-foreground shadow-xs border border-border/50">
                            {project.category}
                          </span>
                        </div>

                        {/* Quick View Overlay on Hover */}
                        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-background/90 text-foreground text-xs font-semibold shadow-md border border-border/60">
                            <ZoomIn className="h-3.5 w-3.5 text-primary" />
                            <span>Preview Poster</span>
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="font-display font-bold text-base md:text-lg text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-1">
                          {project.title}
                        </h4>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <div className="h-px w-full bg-border/60 mb-3" />
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {isGraphic ? "Visual Poster" : "Case Study"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {isGraphic && (
                            <button
                              type="button"
                              onClick={() => setPreviewProject(project)}
                              className="h-8 w-8 rounded-full bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                              title="Inspect Full Poster"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <Link
                            href={`/case-study/${project.slug}`}
                            className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95 cursor-pointer"
                            title="View Case Study Details"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/60">
          <p className="text-sm text-muted-foreground">
            Displaying <span className="font-semibold text-foreground tabular-nums">{displayedProjects.length}</span> of{" "}
            <span className="font-semibold text-foreground tabular-nums">{filtered.length}</span> projects
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="https://drive.google.com/drive/folders/1RgAY5w_HQUha4jrp61Hldb1AeAN6HzlD?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/80 bg-card text-foreground hover:bg-muted text-xs font-semibold transition-[background-color,border-color,transform] duration-150 active:scale-[0.97]"
            >
              <span>Drive Design Archive</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>

            {visibleCount < filtered.length && (
              <Button
                onClick={handleLoadMore}
                size="sm"
                className="rounded-xl px-5 text-xs font-semibold"
              >
                Load More Works
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── High-Resolution Poster Lightbox Modal ── */}
      <AnimatePresence>
        {previewProject && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/90 backdrop-blur-md animate-in fade-in duration-150"
            onClick={() => setPreviewProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] bg-card border border-border rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewProject(null)}
                className="absolute top-3.5 right-3.5 z-20 h-9 w-9 rounded-full bg-background/80 hover:bg-background border border-border/80 flex items-center justify-center text-foreground transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Poster Image View */}
              <div className="relative md:w-3/5 bg-muted/40 min-h-[380px] md:min-h-[580px] flex items-center justify-center p-4">
                <Image
                  src={previewProject.image}
                  alt={previewProject.title}
                  fill
                  className="object-contain p-2"
                  unoptimized={previewProject.image.startsWith("/")}
                  priority
                />
              </div>

              {/* Poster Details Sidebar */}
              <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs uppercase">
                      {previewProject.category}
                    </Badge>
                    <span className="text-[11px] font-mono text-muted-foreground">Original Artwork</span>
                  </div>

                  <h3 className="text-2xl font-display font-extrabold text-foreground leading-tight">
                    {previewProject.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {previewProject.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Strategic Purpose</p>
                    <p className="text-xs text-foreground/90 leading-relaxed">
                      {previewProject.challenge}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/60">
                  <Button asChild className="w-full rounded-xl h-11" onClick={() => setPreviewProject(null)}>
                    <Link href={`/case-study/${previewProject.slug}`}>
                      <span>Read Complete Case Study</span>
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPreviewProject(null)}
                    className="w-full rounded-xl h-10 text-xs"
                  >
                    Close Preview
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
