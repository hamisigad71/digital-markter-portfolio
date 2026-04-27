'use client';

import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Trophy, Lightbulb, Target } from "lucide-react";
import { motion } from "framer-motion";
import { use } from "react";

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }


  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20">
      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-8"
      >
        <Link 
          href="/#portfolio" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors font-medium group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
      </motion.div>


      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-zinc-950/60 transition-opacity" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-black uppercase tracking-widest">
              {project.category}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-xl text-zinc-300 leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>


      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-20">
              
              {/* Challenge */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-primary">
                  <Target className="h-6 w-6" />
                  <h2 className="text-2xl font-display font-bold uppercase tracking-wide">The Challenge</h2>
                </div>
                <p className="text-xl text-zinc-700 dark:text-zinc-400 leading-relaxed font-light">
                  {project.challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-primary">
                  <Lightbulb className="h-6 w-6" />
                  <h2 className="text-2xl font-display font-bold uppercase tracking-wide">The Solution</h2>
                </div>
                <p className="text-xl text-zinc-700 dark:text-zinc-400 leading-relaxed font-light">
                  {project.solution}
                </p>
              </motion.div>

              {/* Results Details */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-primary">
                  <Trophy className="h-6 w-6" />
                  <h2 className="text-2xl font-display font-bold uppercase tracking-wide">The Impact</h2>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-10 shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800">
                  <p className="text-2xl text-zinc-900 dark:text-white font-medium leading-relaxed italic">
                    "{project.results}"
                  </p>
                </div>
              </motion.div>

            </div>


            {/* Right Column: Execution Stats */}
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900 rounded-3xl p-8 space-y-8 text-white sticky top-32 border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none"
              >
                <h3 className="text-xl font-bold border-b border-zinc-100 dark:border-white/10 pb-4 text-zinc-900 dark:text-white">Project Highlights</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg text-zinc-900 dark:text-white">Strategic Planning</p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm">Targeted execution based on data insights.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg text-zinc-900 dark:text-white">Execution Excellence</p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm">Iterative improvements for maximum ROI.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg text-zinc-900 dark:text-white">Scalable Results</p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm">Long-term value creation for the brand.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Link 
                    href="/#contact" 
                    className="block w-full text-center bg-primary text-white font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
                  >
                    Start a Similar Project
                  </Link>
                </div>
              </motion.div>
            </div>


          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-zinc-950 dark:bg-zinc-950 text-white overflow-hidden relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 text-center space-y-8 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-display font-black leading-tight">Think I can help?</h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Let's discuss your goals and build a strategy that gets results.
          </p>
          <Link 
            href="/#contact"
            className="inline-flex items-center gap-3 bg-white text-zinc-950 font-bold px-10 py-5 rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </motion.div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/10 rounded-full blur-[100px]" />
      </section>


      {/* Next Project Navigation */}
      {(() => {
        const currentIndex = projects.findIndex((p) => p.slug === project.slug);
        const nextProject = projects[(currentIndex + 1) % projects.length];
        
        return (
          <section className="py-24 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
            <div className="container mx-auto px-6 text-center space-y-10">
              <div className="space-y-4">
                <span className="text-primary text-xs font-black uppercase tracking-widest">Next Case Study</span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-zinc-900 dark:text-white">
                  {nextProject.title}
                </h2>
              </div>
              
              <Link 
                href={`/case-study/${nextProject.slug}`}
                className="group inline-flex flex-col items-center gap-6"
              >
                <div className="relative w-64 md:w-80 aspect-video rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={nextProject.image}
                    alt={nextProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors" />
                </div>
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold hover:text-primary transition-colors">
                  Check it out
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </div>
              </Link>
            </div>
          </section>
        );
      })()}
    </main>
  );
}
