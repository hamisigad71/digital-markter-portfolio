'use client';

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Target, Lightbulb, TrendingUp } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { getProjects, type Project } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } },
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
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">

      {/* ── Top Nav Bar ── */}
      <div className="sticky top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/70">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-150" />
            Back to Portfolio
          </Link>
          <Badge variant="outline" className="text-xs uppercase tracking-widest">
            Case Study
          </Badge>
          <Button asChild size="sm" className="rounded-full">
            <Link href="/#contact">
              Work With Me
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative h-[65vh] min-h-[460px] flex items-end overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />

        <div className="container mx-auto px-4 md:px-6 pb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {project.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-foreground leading-[1.05] tracking-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-20 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* ─ Left: Narrative ─ */}
            <div className="lg:col-span-7 space-y-16">

              {/* Challenge */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phase 01</p>
                    <h2 className="text-xl font-display font-bold uppercase tracking-wide text-foreground">
                      The Challenge
                    </h2>
                  </div>
                </div>
                <div className="pl-13">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              </motion.div>

              <div className="h-px bg-border/60" />

              {/* Solution */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phase 02</p>
                    <h2 className="text-xl font-display font-bold uppercase tracking-wide text-foreground">
                      The Strategic Solution
                    </h2>
                  </div>
                </div>
                <div className="pl-13">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </motion.div>

              <div className="h-px bg-border/60" />

              {/* Impact */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phase 03</p>
                    <h2 className="text-xl font-display font-bold uppercase tracking-wide text-foreground">
                      The Measurable Impact
                    </h2>
                  </div>
                </div>
                <div className="pl-13">
                  <blockquote className="rounded-2xl border-l-4 border-primary bg-card p-6 shadow-sm">
                    <p className="text-xl sm:text-2xl text-foreground font-display font-bold leading-snug">
                      &quot;{project.results}&quot;
                    </p>
                  </blockquote>
                </div>
              </motion.div>

            </div>

            {/* ─ Right: Sidebar ─ */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-6">

                {/* Project deliverables card */}
                <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pb-4 border-b border-border/60">
                    Key Deliverables
                  </h3>

                  {[
                    {
                      num: "01",
                      title: "Growth Audit & Architecture",
                      body: "Full funnel analysis and conversion tracking diagnostics.",
                    },
                    {
                      num: "02",
                      title: "Campaign Implementation",
                      body: "A/B creative testing, bidding strategies, and landing page build.",
                    },
                    {
                      num: "03",
                      title: "Attribution & Iteration",
                      body: "Weekly multivariate optimization driving compounding pipeline revenue.",
                    },
                  ].map(({ num, title, body }) => (
                    <div key={num} className="flex gap-4">
                      <span className="text-xs font-bold font-mono text-primary pt-0.5 shrink-0">{num}</span>
                      <div>
                        <p className="font-bold text-sm text-foreground mb-1">{title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Card */}
                <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 space-y-4 shadow-lg shadow-primary/5">
                  <Badge variant="outline" className="text-[11px] font-semibold uppercase">Ready to scale?</Badge>
                  <h4 className="text-xl sm:text-2xl font-display font-bold text-foreground leading-tight">
                    Let's achieve similar breakthroughs for your brand.
                  </h4>
                  <Button asChild size="lg" className="w-full rounded-xl">
                    <Link href="/#contact">
                      Start Your Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Next Case Study ── */}
      {nextProject && (
        <section className="border-t border-border/60 bg-muted/20 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-lg">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Next Case Study
                </p>
                <h3 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                  {nextProject.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {nextProject.description}
                </p>
                <Button asChild variant="outline" className="rounded-full mt-2">
                  <Link href={`/case-study/${nextProject.slug}`}>
                    Explore Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <Link
                href={`/case-study/${nextProject.slug}`}
                className="group relative w-full md:w-96 aspect-video rounded-2xl overflow-hidden border border-border/70 shadow-lg shrink-0"
              >
                <Image
                  src={nextProject.image}
                  alt={nextProject.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
              </Link>
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
