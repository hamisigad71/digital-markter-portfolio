'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { getProjects } from "@/lib/store";
import type { Project } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["All", "Marketing", "Development", "Design", "SEO", "Content", "Social Media"];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

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

  const filtered =
    active === "All" ? allProjects : allProjects.filter((p) => p.category === active);

  const displayedProjects = Array.isArray(filtered) ? filtered.slice(0, visibleCount) : [];

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  return (
    <section id="portfolio" className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-10">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="h-px w-7 bg-primary rounded-full" />
              <span className="text-primary text-[11px] font-semibold uppercase tracking-[.18em]">My Work</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-zinc-900 dark:text-white">
              Recent <span className="text-primary italic">Projects</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-relaxed">
              Explore my latest work and see how I help businesses achieve their digital goals.
            </p>
          </div>
          <div className="shrink-0 text-right hidden md:block">
            <p className="font-display text-6xl font-black text-zinc-900 dark:text-white">
              {filtered.length}<span className="text-primary text-4xl">+</span>
            </p>
            <p className="text-sm text-zinc-400 mt-1">Projects shown</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto md:flex-wrap gap-2 mb-11 pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`shrink-0 px-5 py-2 rounded-full text-[13px] font-medium border-[1.5px] transition-all duration-200 ${
                active === tab
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                  : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: index * 0.05 }}
                  key={project.slug}
                  className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-primary/5"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 z-20">
                      <div className="px-2 py-0.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md text-[8px] font-bold text-zinc-900 dark:text-white shadow-sm border border-white/20">
                        {project.category}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 md:p-8 space-y-3 md:space-y-5">
                    <div className="flex items-center gap-2 md:gap-5 text-zinc-400 dark:text-zinc-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[8px] md:text-[10px] font-semibold uppercase tracking-wider">May 12, 2024</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[8px] md:text-[10px] font-semibold uppercase tracking-wider">8 min read</span>
                      </div>
                    </div>

                    <div className="space-y-1 md:space-y-3">
                      <h4 className="font-display font-black text-zinc-900 dark:text-white leading-[1.2] transition-colors group-hover:text-primary text-[11px] md:text-xl">
                        {project.title}
                      </h4>
                      <p className="text-zinc-500 dark:text-zinc-400 text-[10px] md:text-[14px] leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />

                    <div className="flex items-center justify-between pt-0.5">
                      <div className="flex items-center gap-1.5 md:gap-3">
                        <div className="h-6 w-6 md:h-9 md:w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                          <span className="text-primary text-[8px] md:text-xs font-black">H</span>
                        </div>
                        <span className="text-zinc-900 dark:text-white text-[10px] md:text-sm font-bold">Hamisi</span>
                      </div>
                      
                      <Link 
                        href={`/case-study/${project.slug}`}
                        className="h-7 w-7 md:h-10 md:w-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20"
                      >
                        <ArrowUpRight className="h-3 w-3 md:h-5 md:w-5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 pt-9 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Showing <span className="font-semibold text-zinc-800 dark:text-zinc-200">{displayedProjects.length}</span> of{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{filtered.length}</span> projects
          </p>
          
          {visibleCount < filtered.length && (
            <button 
              onClick={handleLoadMore}
              className="group flex items-center gap-2 px-7 py-3 rounded-full border-[1.5px] border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
            >
              Load More Projects
              <motion.div
                animate={{ y: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUpRight className="h-4 w-4 rotate-90" />
              </motion.div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}