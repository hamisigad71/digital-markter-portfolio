'use client';

import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Search, 
  Target, 
  Megaphone 
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories.map((category, index) => (
                <div key={index} className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">{category.title}</h4>
                  <ul className="space-y-3">
                    {category.skills.map((skill, sIndex) => (
                      <li key={sIndex} className="flex items-center text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 mr-3" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Tools Cloud */}
          <div className="w-full lg:w-1/3 p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 h-full">
            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">Tools I Master</h4>
                <p className="text-muted-foreground text-sm">Industry-standard tools I use daily Paco.</p>
              </div>

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

              <div className="pt-8 mt-8 border-t border-zinc-100 dark:border-zinc-800">
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
    </section>
  );
}
