'use client';

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  BarChart, 
  Search, 
  Target, 
  Megaphone,
  ChevronDown
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
    skills: ["Social Strategy", "Content Marketing", "Influencer Outreach", "Copywriting"],
  },
  {
    title: "Analytics & Data",
    icon: BarChart,
    skills: ["Google Analytics 4", "Heatmaps (Hotjar)", "A/B Testing", "KPI Tracking"],
  },
];

const tools = [
  "HubSpot", "Google Ads", "Meta Business", "SEMrush", "Ahrefs", 
  "Mailchimp", "Zapier", "Google Search Console", "Hotjar", "Shopify"
];

export default function Skills() {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  return (
    <section id="skills" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden">
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

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
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

          {/* Right Side: Tools Cloud */}
          <div className="w-full lg:w-1/3 p-6 md:p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 h-full">
            <div className="space-y-6 md:space-y-8">
              <div 
                className="flex items-center justify-between cursor-pointer lg:cursor-default"
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              >
                <div className="space-y-1 md:space-y-2">
                  <h4 className="text-xl md:text-2xl font-bold">Tools I Master</h4>
                  <p className="text-muted-foreground text-sm">Industry-standard tools I use daily Paco.</p>
                </div>
                <div className="lg:hidden p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                  <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              <div className={`space-y-8 overflow-hidden transition-all duration-500 lg:!block ${isMobileDropdownOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-full lg:opacity-100'}`}>
                <div className="flex flex-wrap gap-3">
                  {tools.map((tool, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="px-5 py-2.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 border-none hover:bg-primary hover:text-white transition-all cursor-default"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>

                <div className="pt-6 mt-6 md:pt-8 md:mt-8 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm text-zinc-500 font-medium mb-4">Certifications Paco</p>
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                      <span className="font-bold text-xs">G Ads</span>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                      <span className="font-bold text-xs">HubS</span>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                      <span className="font-bold text-xs">GA4</span>
                    </div>
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
