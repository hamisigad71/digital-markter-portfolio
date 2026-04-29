'use client';

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Target, Lightbulb, TrendingUp } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { getProjects, type Project } from "@/lib/store";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const all = await getProjects();
      setAllProjects(all);
      const found = all.find((p) => p.slug === slug);
      setProject(found || null);
      setLoading(false);
    };
    load();
    window.addEventListener("portfolio-updated", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("portfolio-updated", load);
      window.removeEventListener("storage", load);
    };
  }, [slug]);

  if (loading) return null;
  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects.length > 1
    ? allProjects[(currentIndex + 1) % allProjects.length]
    : null;

  return (
    <main className="min-h-screen bg-white">

      {/* ── Top Nav Bar ── */}
      <div className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Portfolio
          </Link>
          <span className="text-xs font-black uppercase tracking-widest text-zinc-300">
            Case Study
          </span>
          <Link
            href="/#contact"
            className="text-sm font-bold text-primary hover:opacity-70 transition-opacity"
          >
            Work With Me
          </Link>
        </div>
      </div>


      {/* ── Hero ── */}
      <section className="relative h-[75vh] flex items-end overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover scale-105"
          style={{ transformOrigin: "center top" }}
          priority
        />
        {/* layered gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/40 to-transparent" />

        {/* Category pill */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute top-1/2 right-8 -translate-y-1/2 hidden md:block"
        >
          <div className="writing-vertical-rl rotate-180 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            {project.category}
          </div>
        </motion.div>

        <div className="container mx-auto px-6 pb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">
                {project.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-[0.95] tracking-tight mb-6">
              {project.title}
            </h1>
            <p className="text-lg text-zinc-300 leading-relaxed max-w-xl font-light">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>


      {/* ── Divider Rule ── */}
      <div className="h-px bg-zinc-100" />


      {/* ── Main Content ── */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

            {/* ─ Left: Narrative ─ */}
            <div className="lg:col-span-7 space-y-24">

              {/* Challenge */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-7"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">01</p>
                    <h2 className="text-xl font-display font-black uppercase tracking-wide text-zinc-900">
                      The Challenge
                    </h2>
                  </div>
                </div>
                <div className="pl-14">
                  <p className="text-[1.15rem] text-zinc-600 leading-relaxed font-light">
                    {project.challenge}
                  </p>
                </div>
              </motion.div>

              {/* Thin rule */}
              <div className="h-px bg-zinc-100" />

              {/* Solution */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-7"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">02</p>
                    <h2 className="text-xl font-display font-black uppercase tracking-wide text-zinc-900">
                      The Solution
                    </h2>
                  </div>
                </div>
                <div className="pl-14">
                  <p className="text-[1.15rem] text-zinc-600 leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              </motion.div>

              {/* Thin rule */}
              <div className="h-px bg-zinc-100" />

              {/* Impact */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-7"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">03</p>
                    <h2 className="text-xl font-display font-black uppercase tracking-wide text-zinc-900">
                      The Impact
                    </h2>
                  </div>
                </div>
                <div className="pl-14">
                  {/* Pull-quote card */}
                  <blockquote className="relative border-l-4 border-primary pl-8 py-2">
                    <p className="text-2xl text-zinc-900 font-display font-bold leading-snug">
                      "{project.results}"
                    </p>
                  </blockquote>
                </div>
              </motion.div>

            </div>


            {/* ─ Right: Sidebar ─ */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="sticky top-28 space-y-8"
              >

                {/* Project details card */}
                <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-8 space-y-7">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 pb-4 border-b border-zinc-200">
                    What We Delivered
                  </h3>

                  {[
                    {
                      num: "01",
                      title: "Strategic Planning",
                      body: "Targeted execution grounded in rigorous data analysis.",
                    },
                    {
                      num: "02",
                      title: "Execution Excellence",
                      body: "Iterative improvements compounding toward maximum ROI.",
                    },
                    {
                      num: "03",
                      title: "Scalable Results",
                      body: "Durable, long-term value creation for the brand.",
                    },
                  ].map(({ num, title, body }) => (
                    <div key={num} className="flex gap-5 group">
                      <span className="text-[11px] font-black text-primary/60 pt-0.5 shrink-0">{num}</span>
                      <div>
                        <p className="font-bold text-sm text-zinc-900 mb-1">{title}</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA card */}
                <div className="rounded-3xl bg-zinc-950 p-8 space-y-5 relative overflow-hidden">
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Ready to grow?</p>
                  <h4 className="text-2xl font-display font-black text-white leading-tight">
                    Let's build something like this together.
                  </h4>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm px-6 py-3.5 rounded-2xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/30"
                  >
                    Start a Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* ── Next Case Study ── */}
      {nextProject && (
        <section className="border-t border-zinc-100 bg-zinc-50">
          <div className="container mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">

              <div className="space-y-4 max-w-md">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                  Next Case Study
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-black text-zinc-900 leading-tight">
                  {nextProject.title}
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {nextProject.description}
                </p>
                <Link
                  href={`/case-study/${nextProject.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                >
                  View Case Study
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <Link
                href={`/case-study/${nextProject.slug}`}
                className="group relative w-full md:w-96 aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-zinc-300/60 shrink-0"
              >
                <Image
                  src={nextProject.image}
                  alt={nextProject.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/10 transition-colors" />
              </Link>

            </div>
          </div>
        </section>
      )}


      {/* ── Footer CTA Banner ── */}
      <section className="bg-zinc-950 py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-6 text-center space-y-8 relative z-10"
        >
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
            <div className="h-px w-6 bg-primary" />
            Let's Talk
            <div className="h-px w-6 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-tight max-w-2xl mx-auto">
            Think I can help your brand grow?
          </h2>
          <p className="text-zinc-500 text-base max-w-md mx-auto">
            Let's discuss your goals and build a strategy that delivers real results.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-white text-zinc-950 font-bold px-10 py-5 rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}