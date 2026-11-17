'use client';

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  BarChart, 
  Search, 
  Target, 
  Megaphone,
  ChevronDown,
  Palette,
  Video
} from "lucide-react";

const skillCategories = [
  {
    title: "Marketing Strategy",
    icon: Target,
    skills: ["Brand Positioning", "Market Research", "Growth Hacking", "Conversion Optimization"],
  },
  {
    title: "Search & Advertising",
    icon: Search,
    skills: ["Technical SEO", "Google Ads (PPC)", "Local SEO", "Semantic Search"],
  },
  {
    title: "Content & Social",
    icon: Megaphone,
    skills: ["Social Strategy", "Content Marketing", "Influencer Outreach", "Email Marketing"],
  },
  {
    title: "Analytics & Data",
    icon: BarChart,
    skills: ["Google Analytics 4", "Heatmaps (Hotjar)", "A/B Testing", "KPI Tracking"],
  },
  {
    title: "Graphic Design",
    icon: Palette,
    skills: ["Brand Identity", "Social Assets", "Ad Creatives", "UI/UX Prototyping"],
  },
  {
    title: "Video & Content",
    icon: Video,
    skills: ["Video Editing", "Motion Graphics", "Content Creation", "Color Grading"],
  }
];

const tools = [
  { name: "Canva", category: "Design" },
  { name: "Adobe Photoshop", category: "Design" },
  { name: "Adobe Illustrator", category: "Design" },
  { name: "Adobe Creative Suite", category: "Design" },
  { name: "CapCut", category: "Video" },
  { name: "Meta Business Suite", category: "Social" },
  { name: "Meta Ads Manager", category: "Paid Ads" },
  { name: "Google Analytics", category: "Analytics" },
  { name: "Google Sheets", category: "Reporting" },
  { name: "TikTok", category: "Social" },
  { name: "Instagram", category: "Social" },
  { name: "Facebook", category: "Social" },
];

const certifications = [
  { name: "Google Analytics 4", abbreviation: "GA4", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30" },
  { name: "Google Ads", abbreviation: "G-Ads", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  { name: "HubSpot", abbreviation: "HubS", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30" },
];

export default function Skills() {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  return (
    <section id="skills" className="py-24 bg-background border-t border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Categories */}
          <div className="w-full lg:w-2/3 space-y-10">
            <div className="space-y-3">
              <Badge variant="outline" className="px-3.5 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                Capabilities & Discipline
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground">
                Technical <span className="text-primary italic">Expertise</span> & Skillset
              </h2>
              <p className="text-muted-foreground text-base max-w-xl">
                A multidisciplinary skill stack bridging quantitative growth analytics with high-converting creative execution.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {skillCategories.map((category) => (
                <div
                  key={category.title}
                  className="p-4 sm:p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-md transition-[border-color,box-shadow,transform] duration-200 active:scale-[0.99] group"
                >
                  <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 sm:mb-4 transition-transform duration-150 group-hover:scale-105">
                    <category.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-tight">
                    {category.title}
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {category.skills.map((skill, sIndex) => (
                      <li key={sIndex} className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-muted-foreground font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Tools & Certifications */}
          <div className="w-full lg:w-1/3 p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-sm relative overflow-hidden flex flex-col">
            <div className="space-y-6 flex-1 relative z-10">
              <div 
                className="flex items-center justify-between cursor-pointer lg:cursor-default"
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">Tech Stack</span>
                  </div>
                  <h3 className="text-2xl font-display font-extrabold tracking-tight text-foreground">
                    Tools <span className="text-primary italic">I Master</span>
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mt-1">
                    Industry-standard platforms I utilize daily to execute high-ROI campaigns.
                  </p>
                </div>
                <div className="lg:hidden p-2 bg-muted rounded-xl border border-border/60">
                  <ChevronDown className={`h-4 w-4 text-foreground transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              <div className={`flex-1 flex flex-col lg:block ${isMobileDropdownOpen ? 'block' : 'hidden lg:block'}`}>
                {/* Tools Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  {tools.map((tool, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col justify-center p-3 rounded-xl bg-muted/40 border border-border/60 hover:border-primary/40 hover:bg-muted/70 transition-[border-color,background-color] duration-150 cursor-default"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{tool.category}</span>
                      <span className="text-xs font-bold text-foreground mt-0.5">{tool.name}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-border/60">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    Official Certifications
                    <div className="h-px flex-1 bg-border/60"></div>
                  </h5>
                  <div className="flex gap-3">
                    {certifications.map((cert, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-center h-12 w-14 rounded-xl border ${cert.color} font-extrabold text-xs shadow-xs transition-transform duration-150 hover:scale-105`}
                        title={cert.name}
                      >
                        {cert.abbreviation}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
