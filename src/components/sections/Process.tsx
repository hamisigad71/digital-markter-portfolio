'use client';

import { Search, Lightbulb, Zap, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    title: "Discovery & Audit",
    description: "Deep dive into your current digital presence, organic search visibility, and competitor benchmarks.",
    icon: Search,
    color: "bg-blue-600 dark:bg-blue-500",
  },
  {
    title: "Strategy & Funnel Plan",
    description: "Architecting a customized roadmap focused on high-converting channels and measurable revenue KPIs.",
    icon: Lightbulb,
    color: "bg-indigo-600 dark:bg-indigo-500",
  },
  {
    title: "Execution & Launch",
    description: "Deploying high-impact creative campaigns across SEO, targeted paid media, and social funnels.",
    icon: Zap,
    color: "bg-emerald-600 dark:bg-emerald-500",
  },
  {
    title: "Optimization & Scaling",
    description: "Continuous multivariate testing and data iteration to lower CPA and scale your monthly return on ad spend.",
    icon: BarChart3,
    color: "bg-purple-600 dark:bg-purple-500",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-muted/30 border-t border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <Badge variant="outline" className="px-3.5 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
            Execution Framework
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground">
            A Proven <span className="text-primary italic">Process</span> for High-Growth Brands
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            A systematic, data-backed 4-stage methodology ensuring every dollar spent delivers compounding returns.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-4 sm:p-7 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-[border-color,box-shadow,transform] duration-200 active:scale-[0.99] flex flex-col items-center text-center group"
            >
              <div className="relative mb-4 sm:mb-5">
                <div className={`h-12 w-12 sm:h-16 sm:w-16 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105`}>
                  <step.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>
                <div className="absolute -top-2.5 -right-2.5 h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-background border-2 border-border flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-foreground shadow-xs">
                  0{index + 1}
                </div>
              </div>
              <h4 className="text-sm sm:text-lg font-bold text-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors leading-tight">
                {step.title}
              </h4>
              <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
