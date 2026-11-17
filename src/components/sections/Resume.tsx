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
  Globe,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const experiences = [
  {
    title: "Digital Marketing & Graphic Design Specialist",
    company: "Bomexa Ltd & Milescoop Ventures",
    location: "Nairobi, Kenya",
    period: "Aug 2025 – Jul 2026",
    active: true,
    bullets: [
      "Managed day-to-day digital marketing and social media activities for Bomexa Ltd and Milescoop Ventures.",
      "Developed and executed content strategies across Facebook, Instagram, TikTok, LinkedIn, and WhatsApp.",
      "Created professional marketing materials: posters, property graphics, carousels, digital ads, and campaign creatives.",
      "Produced and edited promotional videos and short-form content using CapCut and Adobe tools.",
      "Supported marketing of Bomexa 6 Towers in Ruiru — property campaigns, unit promotions, and site-visit campaigns.",
      "Monitored performance using Meta Business Suite, tracking reach, engagement, and follower growth.",
      "Prepared weekly and monthly digital marketing reports covering content performance and social growth.",
    ],
  },
  {
    title: "Social Media & Content Specialist",
    company: "Hills Candle Collection Kenya",
    location: "Nairobi",
    period: "Jun 2024 – Apr 2025",
    active: false,
    bullets: [
      "Developed and implemented daily content calendars across Instagram, TikTok, and Facebook — improving follower engagement by 35%.",
      "Crafted visually appealing, brand-consistent posts using Canva and CapCut, integrating storytelling for campaign themes.",
      "Monitored analytics via Meta Business Suite and Google Analytics to assess growth, engagement, and campaign reach.",
      "Maintained a 90%+ community engagement rate by responding to inquiries and comments promptly.",
    ],
  },
  {
    title: "Marketing & Digital Listings Coordinator",
    company: "Sapio Homes Real Estate",
    location: "Nairobi, Kenya",
    period: "Jan 2022 – Dec 2022",
    active: false,
    bullets: [
      "Managed online property and vehicle listings, boosting digital visibility through content optimization.",
      "Applied SEO best practices to descriptions and listings, improving click-through rates by 30%.",
      "Coordinated with design and photography teams to produce high-quality, branded visuals.",
      "Managed social media responses and nurtured leads through DMs and WhatsApp with under 20-minute response time.",
    ],
  },
  {
    title: "Digital Marketing Assistant – Freelance",
    company: "Various Startups & Small Businesses",
    location: "Nairobi – Remote",
    period: "2022",
    active: false,
    bullets: [
      "Created digital content for startups, helping brands establish consistent tone and identity.",
      "Ran small-budget digital advertising campaigns and tracked engagement metrics.",
      "Trained small business owners on Canva, Meta Ads Manager, and community management fundamentals.",
    ],
  },
];

const competencies = [
  "Digital Marketing Strategy",
  "Social Media Management",
  "Content Planning & Storytelling",
  "Graphic Design & Brand Development",
  "Real Estate Digital Marketing",
  "Video Editing & Content Creation",
  "Campaign Planning & Execution",
  "Lead Generation & Audience Engagement",
  "SEO & Digital Content Optimization",
  "Social Media Analytics & Reporting",
  "Meta Ads Manager",
  "Brand Voice & Visual Consistency",
];

const tools = [
  "Canva", "Adobe Photoshop", "Adobe Illustrator", "Adobe Creative Suite",
  "CapCut", "Meta Business Suite", "Meta Ads Manager", "Google Analytics",
  "Google Sheets", "Facebook", "Instagram", "TikTok", "LinkedIn",
];

const achievements = [
  "Managed digital marketing for Bomexa Ltd & Milescoop Ventures, supporting brand awareness and property marketing campaigns.",
  "Developed promotional campaigns for Bomexa 6 Towers — pricing, investment opportunities, payment plans, and site-visit promotions.",
  "Grew Autohub's TikTok audience by 60% in 6 months through trend-based content.",
  "Created a festive campaign for DriveNow Motors generating 5,000+ engagements in 3 weeks.",
  "Launched a 'Behind the Wheel' weekly series that increased story reach by 45%.",
  "Developed and maintained consistent digital branding across multiple businesses and marketing campaigns.",
];

export default function Resume() {
  const handleDownload = () => {
    toast.success("Preparing Resume PDF", {
      description: "Opening print dialog. Select 'Save as PDF' to save your copy.",
    });
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <section id="resume" className="py-24 bg-muted/20 border-t border-border/40 print:py-0 print:bg-white print:text-black">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl print:max-w-none print:px-0">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 print:hidden">
          <div className="space-y-3">
            <Badge variant="outline" className="px-3.5 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
              Curriculum Vitae
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground">
              Professional <span className="text-primary italic">Resume</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md">
              A comprehensive summary of experience, skills, and achievements in digital marketing & graphic design.
            </p>
          </div>
          <Button
            onClick={handleDownload}
            className="rounded-full px-6 h-11 shadow-sm gap-2 text-sm font-bold"
          >
            <Download className="h-4 w-4" />
            Download CV / PDF
          </Button>
        </div>

        {/* CV Paper Container */}
        <div className="bg-card rounded-3xl shadow-xl shadow-primary/5 border border-border/80 p-6 sm:p-10 md:p-12 print:shadow-none print:border-none print:p-0 print:rounded-none">
          
          {/* CV Header */}
          <div className="border-b border-border/80 pb-8 mb-8 print:pb-4 print:mb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-foreground tracking-tight uppercase print:text-black">
                  DAYSMAN GAD
                </h1>
                <p className="text-base sm:text-lg text-primary font-semibold mt-1">
                  Digital Marketer · Social Media Manager · Graphic Designer
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-lg leading-relaxed">
                  Creative and performance-driven specialist with 4+ years of hands-on experience in digital strategy, 
                  content creation, social media management, and graphic design. Proven ability to build brand-consistent 
                  campaigns that drive engagement and generate business interest.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground md:items-end print:text-black font-medium shrink-0">
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary shrink-0" /> Kasarani, Nairobi, Kenya</div>
                <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary shrink-0" /> +254 742 630 973</div>
                <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-primary shrink-0" /> hamisigad77@gmail.com</div>
                <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5 text-primary shrink-0" /> Available Immediately</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 print:gap-6">
            
            {/* Main Content — 2/3 */}
            <div className="md:col-span-2 space-y-10 print:space-y-6">
              
              {/* Work Experience */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-border/60 pb-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h4 className="text-lg font-bold font-display uppercase tracking-wider text-foreground">Work Experience</h4>
                </div>

                <div className="space-y-7">
                  {experiences.map((exp, i) => (
                    <div key={i} className={`relative pl-6 border-l-2 space-y-2 ${exp.active ? 'border-primary/40' : 'border-border/60'}`}>
                      <div className={`absolute -left-[5px] top-1.5 h-2 w-2 rounded-full ${exp.active ? 'bg-primary' : 'bg-muted-foreground/50'}`} />
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                        <div>
                          <h5 className="font-bold text-sm sm:text-base text-foreground leading-tight">{exp.title}</h5>
                          <p className="text-xs font-semibold text-primary mt-0.5">{exp.company} · {exp.location}</p>
                        </div>
                        <span className="text-xs font-mono font-medium text-muted-foreground flex items-center gap-1 shrink-0">
                          <Calendar className="h-3 w-3" /> {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-1 mt-2">
                        {exp.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                            <span className="text-primary/70 mt-0.5 shrink-0">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-border/60 pb-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h4 className="text-lg font-bold font-display uppercase tracking-wider text-foreground">Education</h4>
                </div>
                <div className="relative pl-6 border-l-2 border-primary/30 space-y-2">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h5 className="font-bold text-base text-foreground">Bachelor of Commerce – Marketing Major</h5>
                    <span className="text-xs font-mono font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Graduated 2021
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-primary">Zytech University of Nairobi</p>
                </div>
              </div>

              {/* Key Achievements */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-border/60 pb-3">
                  <Award className="h-5 w-5 text-primary" />
                  <h4 className="text-lg font-bold font-display uppercase tracking-wider text-foreground">Key Achievements</h4>
                </div>
                <ul className="space-y-2">
                  {achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                      <span className="text-primary font-bold shrink-0">✓</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Sidebar — 1/3 */}
            <div className="space-y-8">
              
              {/* Core Skills */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                  <Award className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-bold font-display uppercase tracking-wider text-foreground">Core Skills</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {competencies.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-muted/60 text-foreground border border-border/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-bold font-display uppercase tracking-wider text-foreground">Tools & Platforms</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/5 text-primary border border-primary/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                  <Globe className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-bold font-display uppercase tracking-wider text-foreground">Languages</h4>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex justify-between"><span className="font-medium text-foreground">English</span><span>Fluent</span></li>
                  <li className="flex justify-between"><span className="font-medium text-foreground">Kiswahili</span><span>Native</span></li>
                </ul>
              </div>

              {/* Core Values */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                  <Heart className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-bold font-display uppercase tracking-wider text-foreground">Core Values</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Creativity", "Integrity", "Purpose", "Growth"].map((val) => (
                    <span key={val} className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {val}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
