'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["All", "Marketing", "Development", "Design", "SEO", "Content", "Social Media"];

export default function Portfolio() {
const [active, setActive] = useState("All");
const [visibleCount, setVisibleCount] = useState(9);

const filtered =
active === "All" ? projects : projects.filter((p) => p.category === active);

const displayedProjects = filtered.slice(0, visibleCount);

const handleLoadMore = () => {
setVisibleCount(prev => prev + 8);
};

return (
<section id="portfolio" className="py-24 bg-zinc-50 dark:bg-zinc-950">
<div className="container mx-auto px-6 lg:px-10">

text

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
    <div className="flex flex-wrap gap-2 mb-11">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-5 py-2 rounded-full text-[13px] font-medium border-[1.5px] transition-all duration-200 ${
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
    <motion.div 
      layout
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <AnimatePresence mode="popLayout">
        {displayedProjects.map((project, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: index * 0.05 }}
            key={project.slug}
            className={`group relative overflow-hidden rounded-[2rem] bg-zinc-100 dark:bg-zinc-900 shadow-sm transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 ${
              index === 0 ? "lg:col-span-2 lg:row-span-1 aspect-video md:aspect-[21/9] lg:aspect-video" : "aspect-[3/2] lg:aspect-[4/3]"
            }`}
          >
            {/* Background Blur Effect */}
            <div className="absolute inset-0 z-0 overflow-hidden">
               <Image
                src={project.image}
                alt=""
                fill
                className="object-cover blur-3xl opacity-20 dark:opacity-40 scale-150 transition-transform duration-1000 group-hover:scale-125"
              />
            </div>

            {/* Main Image (Fill and Fit) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
            </div>

            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-30">
              <div className="px-3 py-1.5 rounded-xl bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 text-[9px] font-black uppercase tracking-[.2em] text-zinc-900 dark:text-white shadow-sm">
                {project.category}
              </div>
            </div>

            {/* Bottom Content Overlay - Not centered, elegant glassmorphism */}
            <div className="absolute bottom-4 left-4 right-4 z-30 pointer-events-none">
              <div className="max-w-[90%] p-4 md:p-5 rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-auto">
                <div className="space-y-2">
                  <h4 className={`font-display font-black text-zinc-900 dark:text-white leading-tight ${index === 0 ? "text-xl md:text-2xl" : "text-lg"}`}>
                    {project.title}
                  </h4>
                  <p className="text-zinc-700 dark:text-zinc-300 text-xs leading-relaxed line-clamp-1">
                    {project.description}
                  </p>
                  <Link 
                    href={`/case-study/${project.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-bold transition-all duration-300 hover:gap-4 hover:shadow-lg hover:shadow-primary/30"
                  >
                    View Case Study
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Corner Accent Link (Visible always) */}
            <Link 
              href={`/case-study/${project.slug}`}
              className="absolute bottom-4 right-4 z-30 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40 hover:scale-110 transition-all duration-500 group-hover:scale-0 group-hover:opacity-0"
            >
              <ArrowUpRight className="h-5 w-5" />
            </Link>

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
        ))}
      </AnimatePresence>
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
</section>  );
}