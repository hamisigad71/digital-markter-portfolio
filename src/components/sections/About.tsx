'use client';

import { CheckCircle2, Award, Briefcase, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Years Experience", value: "8+", icon: Briefcase },
  { label: "Successful Projects", value: "120+", icon: CheckCircle2 },
  { label: "Global Clients", value: "25k+", icon: Award },
  { label: "Certifications", value: "15+", icon: GraduationCap },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Stats Grid - Left Side */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:border-primary/30 transition-colors ${index % 2 === 1 ? 'mt-8' : ''}`}
              >
                <stat.icon className="h-8 w-8 text-primary mb-4" />
                <p className="text-4xl font-extrabold tracking-tight mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Text Content - Right Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="px-4 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full">
                About Me
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.1]">
                Passion for <span className="text-primary italic">Digital Excellence</span> & Growth
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 5 years in the digital marketing landscape, I've helped thousands of businesses scale their online presence through data-driven strategies and creative execution.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Data-Driven Approach</h4>
                  <p className="text-muted-foreground">Every decision is backed by analytics and deep market research to ensure ROI.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Global Experience</h4>
                  <p className="text-muted-foreground">Worked with diverse clients across 20+ countries and various industries.</p>
                </div>
              </div>
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 italic">
              &quot;My goal is not just to increase your traffic, but to turn that traffic into a loyal community around your brand.&quot;
            </p>
          </div>
        </div>

        {/* Mission & Story - Added Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 pt-24 border-t border-zinc-100 dark:border-zinc-800">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-display tracking-tight">The Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              My mission is to democratize high-level digital growth strategies that were once only available to massive corporations. I believe every brand has a story worth telling and a community waiting to be built.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-display tracking-tight">The Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              I envision a digital landscape where data and creativity coexist in perfect harmony. My goal is to be the bridge that connects ambitious brands with their ideal audience through ethical and sustainable marketing.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-display tracking-tight">The Values</h3>
            <ul className="space-y-3">
              {["Radical Transparency", "Data Over Opinion", "Continuous Evolution", "Human-Centric Growth"].map((value, i) => (
                <li key={i} className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
