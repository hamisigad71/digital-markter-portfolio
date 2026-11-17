'use client';

import { 
  Download,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Award,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 print:hidden">
          <div className="space-y-3">
            <Badge variant="outline" className="px-3.5 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
              Curriculum Vitae
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground">
              Professional <span className="text-primary italic">Resume</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md">
              A comprehensive summary of experience, campaign track records, and technical certifications.
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
          <div className="border-b border-border/80 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:pb-4 print:mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-foreground tracking-tight uppercase print:text-black">DAYSMAN GAD</h1>
              <p className="text-base sm:text-lg text-primary font-semibold mt-1">Senior Digital Marketer & Growth Strategist</p>
            </div>
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground md:items-end print:text-black font-medium">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary shrink-0" /> Kasarani Road, Nairobi, Kenya</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary shrink-0" /> +254 742 630 973</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary shrink-0" /> hamisigad77@gmail.com</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 print:gap-6">
            
            {/* Main Content Column */}
            <div className="md:col-span-2 space-y-10 print:space-y-6">
              
              {/* Experience */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-border/60 pb-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h4 className="text-lg font-bold font-display uppercase tracking-wider text-foreground">Work Experience</h4>
                </div>

                <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-primary/30 space-y-2">
                    <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h5 className="font-bold text-base text-foreground">Lead Growth & Digital Strategist</h5>
                      <span className="text-xs font-mono font-medium text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 2022 - Present
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-primary">Freelance & Growth Advisory</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Scaled client pipelines across eCommerce, B2B SaaS, and local businesses. Managed over $250k in cumulative ad spend across Meta and Google with an average 3.8x blended ROAS.
                    </p>
                  </div>

                  <div className="relative pl-6 border-l-2 border-border/60 space-y-2">
                    <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-muted-foreground/60" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h5 className="font-bold text-base text-foreground">Digital Marketing Executive</h5>
                      <span className="text-xs font-mono font-medium text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 2020 - 2022
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-primary">Media & Performance Agency</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Conducted technical SEO audits, designed conversion-focused sales funnels, and spearheaded content marketing programs generating 2M+ organic impressions.
                    </p>
                  </div>
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
                    <h5 className="font-bold text-base text-foreground">BSc in Business Information Technology</h5>
                    <span className="text-xs font-mono font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> 2017 - 2021
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-primary">Nairobi University</p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Focused on digital business systems, web analytics, computational marketing, and consumer decision algorithms.
                  </p>
                </div>
              </div>

            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              
              {/* Core Competencies */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                  <Award className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-bold font-display uppercase tracking-wider text-foreground">Key Competencies</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Google Ads & PPC",
                    "Meta Ads Manager",
                    "Technical SEO",
                    "GA4 Analytics",
                    "A/B Split Testing",
                    "Email Automation",
                    "Conversion Rate Opt",
                    "Copywriting",
                    "HubSpot Inbound",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-muted/60 text-foreground border border-border/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                  <Award className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-bold font-display uppercase tracking-wider text-foreground">Certifications</h4>
                </div>
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Google Analytics 4 Certified (GA4)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Google Search & Display Ads Certified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>HubSpot Inbound Marketing Certified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Meta Certified Digital Marketing Associate</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
