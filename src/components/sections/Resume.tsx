'use client';

import { 
  Download,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Resume() {
  const handleDownload = () => {
    // Triggers the print dialog which allows "Save as PDF" natively on all modern browsers
    // For a real production app we would link directly to a .pdf in the public/ folder
    window.print();
  };

  return (
    <section id="resume" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 print:py-0 print:bg-white print:text-black">
      <div className="container mx-auto px-4 max-w-5xl print:max-w-none print:px-0">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 print:hidden">
          <div className="space-y-4">
            <h2 className="text-primary font-bold uppercase tracking-wider text-sm">Curriculum Vitae</h2>
            <h3 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
              Professional <span className="text-primary italic font-serif">Resume</span>
            </h3>
          </div>
          <Button onClick={handleDownload} className="gap-2 rounded-full px-6 bg-primary hover:bg-primary/90 text-white shadow-md transition-all hover:scale-105 active:scale-95">
            <Download className="h-4 w-4" />
            Download CV
          </Button>
        </div>

        {/* CV Paper Container */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] shadow-xl border border-zinc-100 dark:border-zinc-800 p-8 md:p-14 print:shadow-none print:border-none print:p-0 print:rounded-none">
          
          {/* CV Header */}
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-8 mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 print:pb-4 print:mb-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight uppercase print:text-black">DAYSMAN GAD</h1>
              <p className="text-lg md:text-xl text-primary font-medium mt-2">Digital Marketer & Creative Specialist</p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium md:items-end print:text-black">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Kasarani Road, Nairobi, Kenya</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +254 742 630 973</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hamisigad77@gmail.com</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 print:gap-6">
            
            {/* Main Content Column */}
            <div className="md:col-span-2 space-y-12 print:space-y-6">
              
              {/* Summary */}
              <section>
                <div className="flex items-center gap-3 mb-6 print:mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary print:hidden"><Briefcase className="h-5 w-5" /></div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white print:text-black">Professional Summary</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base print:text-black">
                  Creative and performance-driven Digital Marketer, Social Media Manager, and Graphic Designer with over 4 years of hands-on experience developing digital strategies, creating engaging content, managing social media platforms, and supporting brand growth. Experienced in real estate and purpose-driven brands, with strong expertise in content strategy, graphic design, video editing, community management, campaign execution, audience engagement, and digital analytics.
                </p>
              </section>

              {/* Experience */}
              <section>
                <div className="flex items-center gap-3 mb-8 print:mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary print:hidden"><Briefcase className="h-5 w-5" /></div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white print:text-black">Professional Experience</h4>
                </div>
                
                <div className="space-y-10 print:space-y-6 border-l border-zinc-100 dark:border-zinc-800 print:border-black/20 ml-3 pl-6">
                  
                  {/* Job 1 */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-white dark:bg-zinc-900 border-4 border-primary print:border-black"></span>
                    <h5 className="text-xl font-bold text-slate-900 dark:text-white print:text-black">Digital Marketing & Graphic Design Specialist</h5>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-primary font-medium mt-1 mb-4 print:mb-2 print:text-slate-700">
                      <span>Bomexa Ltd & Milescoop Ventures</span>
                      <span className="hidden sm:inline text-slate-300 dark:text-slate-600 print:text-black">•</span>
                      <span className="flex items-center gap-1 text-slate-500 print:text-slate-600"><Calendar className="h-3.5 w-3.5" /> Aug 2025 – Jul 2026</span>
                    </div>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm list-disc list-inside marker:text-primary/50 text-justify print:text-black">
                      <li>Managed day-to-day digital marketing and social media activities, ensuring consistent online visibility and brand communication.</li>
                      <li>Developed and executed social media content strategies across platforms including Facebook, Instagram, TikTok, LinkedIn, and WhatsApp.</li>
                      <li>Created professional marketing materials including social media posters, promotional graphics, carousels, and advertisements.</li>
                      <li>Produced and edited promotional videos and short-form content using CapCut and Adobe tools to support campaigns.</li>
                      <li>Supported the marketing of Bomexa 6 Towers in Ruiru, organizing property campaigns, investment education, and site visits.</li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-zinc-200 dark:bg-zinc-700 print:bg-black"></span>
                    <h5 className="text-xl font-bold text-slate-900 dark:text-white print:text-black">Social Media & Content Specialist</h5>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-primary font-medium mt-1 mb-4 print:mb-2 print:text-slate-700">
                      <span>Hills Candle Collection Kenya</span>
                      <span className="hidden sm:inline text-slate-300 dark:text-slate-600 print:text-black">•</span>
                      <span className="flex items-center gap-1 text-slate-500 print:text-slate-600"><Calendar className="h-3.5 w-3.5" /> Jun 2024 – Apr 2025</span>
                    </div>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm list-disc list-inside marker:text-primary/50 text-justify print:text-black">
                      <li>Developed and implemented daily content calendars across Instagram, TikTok, and Facebook, improving follower engagement by 35%.</li>
                      <li>Crafted visually appealing and brand-consistent posts using Canva and CapCut, integrating storytelling.</li>
                      <li>Monitored performance analytics via Meta Business Suite and Google Analytics to assess growth and reach.</li>
                      <li>Responded to inquiries and comments promptly, maintaining a 90%+ community engagement rate.</li>
                    </ul>
                  </div>

                  {/* Job 3 */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-zinc-200 dark:bg-zinc-700 print:bg-black"></span>
                    <h5 className="text-xl font-bold text-slate-900 dark:text-white print:text-black">Marketing & Digital Listings Coordinator</h5>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-primary font-medium mt-1 mb-4 print:mb-2 print:text-slate-700">
                      <span>Sapio Homes Real Estate</span>
                      <span className="hidden sm:inline text-slate-300 dark:text-slate-600 print:text-black">•</span>
                      <span className="flex items-center gap-1 text-slate-500 print:text-slate-600"><Calendar className="h-3.5 w-3.5" /> Jan 2022 – Dec 2022</span>
                    </div>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm list-disc list-inside marker:text-primary/50 text-justify print:text-black">
                      <li>Managed online property listings and boosted digital visibility through content optimization and targeting.</li>
                      <li>Applied SEO best practices to descriptions and listings, improving click-through rates by 30%.</li>
                      <li>Coordinated with design and photography teams to produce high-quality, branded visuals.</li>
                    </ul>
                  </div>

                </div>
              </section>

              {/* Achievements */}
              <section>
                <div className="flex items-center gap-3 mb-6 print:mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary print:hidden"><Award className="h-5 w-5" /></div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white print:text-black">Key Achievements</h4>
                </div>
                <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 print:bg-transparent print:border-none print:p-0">
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-sm list-disc list-inside marker:text-primary/70 print:text-black">
                    <li>Grew Autohub's TikTok audience by 60% in 6 months through trend-based content.</li>
                    <li>Created a festive campaign for DriveNow Motors that generated 5,000+ engagements in 3 weeks.</li>
                    <li>Launched a "Behind the Wheel" weekly series that increased story reach by 45%.</li>
                    <li>Developed and maintained consistent digital branding across multiple businesses and campaigns.</li>
                  </ul>
                </div>
              </section>

            </div>

            {/* Sidebar Column */}
            <div className="space-y-10 print:space-y-6">
              
              {/* Education */}
              <section>
                <div className="flex items-center gap-3 mb-6 print:mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary print:hidden"><GraduationCap className="h-5 w-5" /></div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white print:text-black">Education</h4>
                </div>
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 print:p-0 print:border-none print:bg-transparent">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1 print:text-black">Bachelor of Commerce</h5>
                  <p className="text-sm font-medium text-primary mb-2">Marketing Major</p>
                  <p className="text-xs text-slate-500 mb-1 print:text-slate-700">Zytech University of Nairobi</p>
                  <p className="text-xs text-slate-400 font-medium print:text-slate-600">Graduated: 2021</p>
                </div>
              </section>

              {/* Skills */}
              <section>
                <div className="flex items-center gap-3 mb-6 print:mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary print:hidden"><Award className="h-5 w-5" /></div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white print:text-black">Core Competencies</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Digital Strategy', 'Social Media Management', 'Content Planning & Storytelling', 'Graphic Design', 'Real Estate Marketing', 'Video Editing', 'Lead Generation', 'SEO', 'Data Analytics'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm print:bg-transparent print:border-zinc-300 print:text-black print:shadow-none">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Languages & Personal */}
              <section>
                <div className="flex items-center gap-3 mb-6 print:mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary print:hidden"><Globe className="h-5 w-5" /></div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white print:text-black">Details</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <h6 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 print:text-slate-700">Languages</h6>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-300 space-y-1 print:text-black">
                      <div className="flex justify-between items-center bg-white dark:bg-zinc-800 p-2 rounded-lg border border-zinc-100 dark:border-zinc-700 print:bg-transparent print:border-none print:p-0"><span>English</span> <span className="text-primary text-xs">Fluent</span></div>
                      <div className="flex justify-between items-center bg-white dark:bg-zinc-800 p-2 rounded-lg border border-zinc-100 dark:border-zinc-700 print:bg-transparent print:border-none print:p-0"><span>Kiswahili</span> <span className="text-primary text-xs">Native</span></div>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 mt-6 print:text-slate-700 print:mt-4">Personal</h6>
                    <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 print:text-black">
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> Availability: Immediate</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">•</span> Values: Creativity, Integrity, Purpose, Growth</li>
                    </ul>
                  </div>
                </div>
              </section>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
