'use client';

import { CheckCircle2, Award, Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Years Experience", value: "5+", icon: Briefcase },
  { label: "Successful Projects", value: "120+", icon: CheckCircle2 },
  { label: "Global Clients", value: "25k+", icon: Award },
  { label: "Certifications", value: "9+", icon: GraduationCap },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Stats Grid - Left Side */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 sm:gap-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`p-6 sm:p-8 rounded-3xl border border-border/70 bg-card/60 backdrop-blur-xs hover:border-primary/40 hover:bg-card hover:shadow-md transition-[border-color,background-color,box-shadow,transform] duration-200 active:scale-[0.98] ${index % 2 === 1 ? 'mt-4 sm:mt-8' : ''}`}
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 text-foreground tabular-nums">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Text Content - Right Side */}
          <div className="w-full lg:w-1/2 space-y-7">
            <div className="space-y-4">
              <Badge variant="outline" className="px-3.5 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-semibold">
                About Me
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.15] text-foreground">
                Passion for <span className="text-primary italic">Digital Excellence</span> & Scalable Growth
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                With over 5 years in digital marketing, I've partnered with leading brands and high-growth startups to scale customer acquisition through data-driven campaigns, technical SEO, and compelling conversion funnels.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border/70 hover:border-border transition-colors">
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-foreground mb-1">Data-Driven Approach</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Every recommendation is backed by real conversion metrics, analytics, and consumer behavior.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border/70 hover:border-border transition-colors">
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-foreground mb-1">Global Campaign Reach</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Executed multi-channel digital strategies across 20+ countries and diverse industries.</p>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground/90 italic border-l-2 border-primary/60 pl-4 py-1">
              &quot;My focus is not just vanity metrics, but building high-retention, high-converting customer ecosystems.&quot;
            </p>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="mt-20 pt-16 border-t border-border/60">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 'mission', title: 'The Mission', content: 'Democratize high-level digital growth strategies that drive measurable revenue. I believe every business has a story worth telling and an audience waiting to convert.' },
              { id: 'vision', title: 'The Vision', content: 'A digital landscape where data and creativity coexist seamlessly, empowering brands to build lasting organic authority and sustainable paid pipelines.' },
              { id: 'values', title: 'The Values', content: ['Radical Transparency', 'Data Over Assumptions', 'Continuous Optimization', 'Human-Centric Storytelling'], type: 'list' }
            ].map((item) => (
              <div key={item.id} className="p-6 rounded-2xl bg-card/50 border border-border/60 space-y-3">
                <h3 className="text-xl font-bold font-display tracking-tight text-foreground">{item.title}</h3>
                {item.type === 'list' && Array.isArray(item.content) ? (
                  <ul className="space-y-2.5 pt-1">
                    {item.content.map((value, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {value}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.content as string}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
