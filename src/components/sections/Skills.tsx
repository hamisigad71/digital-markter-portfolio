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
  { name: "Adobe Premiere", category: "Video" },
  { name: "Photoshop", category: "Design" },
  { name: "Figma", category: "Design/UI" },
  { name: "Canva Pro", category: "Design" },
  { name: "Google Analytics", category: "Analytics" },
  { name: "Google Ads", category: "PPC" },
  { name: "Meta Business", category: "Social" },
  { name: "SEMrush", category: "SEO" },
  { name: "Ahrefs", category: "SEO" },
  { name: "HubSpot", category: "CRM" },
  { name: "CapCut", category: "Video" },
  { name: "Mailchimp", category: "Email" },
];

const certifications = [
  { name: "Google Analytics 4", abbreviation: "GA4", color: "bg-orange-500 text-orange-600 dark:text-orange-400" },
  { name: "Google Ads", abbreviation: "G-Ads", color: "bg-blue-500 text-blue-600 dark:text-blue-400" },
  { name: "HubSpot", abbreviation: "HubS", color: "bg-rose-500 text-rose-600 dark:text-rose-400" },
];

export default function Skills() {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  return (
    <section id="skills" className="py-24 bg-background dark:bg-zinc-900/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Categories */}
          <div className="w-full lg:w-2/3 space-y-12">
            <div className="space-y-4">
              <h2 className="text-primary font-bold uppercase tracking-wider text-sm">Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
                Technical <span className="text-primary italic">Expertise</span> & Skills
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {skillCategories.map((category, index) => (
                <div key={category.title} className="p-4 md:p-8 rounded-2xl md:rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-primary/30 transition-all group">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                    <category.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h4 className="text-sm md:text-xl font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors">{category.title}</h4>
                  <ul className="space-y-1.5 md:space-y-2">
                    {category.skills.map((skill, sIndex) => (
                      <li key={sIndex} className="flex items-center gap-2 text-[10px] md:text-sm text-muted-foreground font-medium">
                        <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-primary/40" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Tools & Certifications */}
          <div className="w-full lg:w-1/3 p-6 md:p-8 md:pt-10 rounded-[2.5rem] bg-gradient-to-b from-slate-50 to-white dark:from-zinc-900/80 dark:to-zinc-900/40 border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden h-full flex flex-col group/card">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover/card:bg-primary/10 transition-colors duration-500" />

            <div className="space-y-6 md:space-y-8 flex-1 relative z-10">
              <div 
                className="flex items-center justify-between cursor-pointer lg:cursor-default"
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">Tech Stack</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
                    Tools <span className="text-primary italic font-serif">I Master</span>
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-2 max-w-[280px]">
                    Industry-standard platforms I utilize daily to execute data-driven campaigns.
                  </p>
                </div>
                <div className="lg:hidden p-2 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-full shadow-sm">
                  <ChevronDown className={`h-5 w-5 text-slate-600 dark:text-slate-300 transition-transform duration-300 ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              <div className={`flex-1 flex flex-col transition-all duration-500 lg:!block ${isMobileDropdownOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-full lg:opacity-100'}`}>
                
                {/* Tools Grid */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {tools.map((tool, index) => (
                    <div 
                      key={index} 
                      className="group flex flex-col justify-center p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-100 dark:border-zinc-700/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 group-hover:text-primary/70 transition-colors">{tool.category}</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-zinc-100 group-hover:text-primary transition-colors">{tool.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-zinc-200 dark:border-zinc-800/80">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                    Official Certifications
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
                  </h5>
                  <div className="flex gap-4">
                    {certifications.map((cert, i) => (
                      <div key={i} className="group relative flex items-center justify-center h-16 w-16 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 hover:border-primary/40 transition-all cursor-help shadow-sm hover:shadow-md">
                         <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity ${cert.color.split(' ')[0]}`} />
                         <span className={`font-extrabold text-xs transition-transform duration-300 group-hover:scale-110 ${cert.color.split(' ').slice(1).join(' ')}`}>
                           {cert.abbreviation}
                         </span>
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
