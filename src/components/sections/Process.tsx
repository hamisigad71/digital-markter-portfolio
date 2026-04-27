'use client';

import { Search, Lightbulb, Zap, BarChart3 } from "lucide-react";

const steps = [
  {
    title: "Discovery & Audit",
    description: "Deep dive into your current digital presence, competitors, and market opportunities.",
    icon: Search,
    color: "bg-blue-500",
  },
  {
    title: "Strategy Planning",
    description: "Developing a custom roadmap focused on your specific business KPIs and growth goals.",
    icon: Lightbulb,
    color: "bg-primary",
  },
  {
    title: "Execution & Launch",
    description: "Implementing high-impact campaigns across SEO, Social, and Paid media channels.",
    icon: Zap,
    color: "bg-emerald-500",
  },
  {
    title: "Optimization & ROI",
    description: "Continuous monitoring and refining for maximum performance and scalable growth.",
    icon: BarChart3,
    color: "bg-violet-500",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-primary font-bold uppercase tracking-wider text-sm">My Approach</h2>
          <h3 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
            A Proven <span className="text-primary italic">Process</span> for Growth
          </h3>
          <p className="text-muted-foreground text-lg">
            I follow a systematic, data-backed methodology to ensure every campaign delivers measurable results.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-zinc-100 dark:bg-zinc-800 z-0" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className={`h-14 w-14 md:h-20 md:w-20 rounded-2xl md:rounded-3xl ${step.color} text-white flex items-center justify-center mb-4 md:mb-8 shadow-xl shadow-${step.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                <step.icon className="h-7 w-7 md:h-10 md:w-10" />
                <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 h-6 w-6 md:h-8 md:w-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-[10px] md:text-xs font-bold text-zinc-400">
                  0{index + 1}
                </div>
              </div>
              <h4 className="text-sm md:text-xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-1">{step.title}</h4>
              <p className="text-[11px] md:text-base text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-none">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
