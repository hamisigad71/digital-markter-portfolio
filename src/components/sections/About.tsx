'use client';

import { CheckCircle2, Award, Briefcase, GraduationCap, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Years Experience", value: "4+", icon: Briefcase },
  { label: "Brands Worked With", value: "10+", icon: CheckCircle2 },
  { label: "Campaigns Executed", value: "50+", icon: Award },
  { label: "Design Projects", value: "100+", icon: GraduationCap },
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
                Passion for <span className="text-primary italic">Digital Marketing</span> & Creative Design
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                With 4+ years of hands-on experience, I help brands grow through data-driven digital marketing, 
                compelling social media content, and high-impact graphic design. From real estate campaigns to 
                e-commerce brands — I bring strategy, creativity, and consistency to every project.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border/70 hover:border-border transition-colors">
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-foreground mb-1">Social Media & Content Strategy</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Managing platforms across Facebook, Instagram, TikTok, LinkedIn & WhatsApp with a focus on engagement, growth, and brand consistency.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border/70 hover:border-border transition-colors">
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Palette className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-foreground mb-1">Graphic Design & Visual Branding</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Creating brand-consistent marketing materials — posters, ad creatives, carousels, and corporate visuals — using Canva, Adobe Photoshop & Illustrator.</p>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground/90 italic border-l-2 border-primary/60 pl-4 py-1">
              &quot;Creativity meets strategy — I build brands that look great and grow consistently.&quot;
            </p>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="mt-20 pt-16 border-t border-border/60">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 'mission', title: 'The Mission', content: 'Help brands grow online through creative digital marketing, compelling content, and professional graphic design — delivering work that is both beautiful and effective.' },
              { id: 'vision', title: 'The Vision', content: 'A digital world where every business, big or small, can tell its story with confidence, consistency, and creative impact across every platform.' },
              { id: 'values', title: 'The Values', content: ['Creativity & Innovation', 'Integrity in Every Campaign', 'Purpose-Driven Work', 'Continuous Growth'], type: 'list' }
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
