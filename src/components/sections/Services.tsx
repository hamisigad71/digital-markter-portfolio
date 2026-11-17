import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Search, Share2, PenTool, BarChart3, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Web & Landing Pages",
    description: "High-performance, conversion-optimized landing pages designed to turn ad traffic into paying customers.",
    icon: Code2,
    badge: "Development",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    title: "Search Engine Optimization",
    description: "Technical SEO audits, keyword dominance strategies, and organic ranking boosts that drive compounding traffic.",
    icon: Search,
    badge: "Organic Growth",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    title: "Paid Advertising & SEM",
    description: "Targeted Meta, Google, and LinkedIn ad campaigns built with strict ROI monitoring and A/B tested creative.",
    icon: BarChart3,
    badge: "Paid Media",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  },
  {
    title: "Social Media Growth",
    description: "Engaging cross-platform audience growth campaigns with viral content planning and active community management.",
    icon: Share2,
    badge: "Social Media",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  },
  {
    title: "Content Marketing & Copy",
    description: "Persuasive sales copywriting, blog authority pieces, and email sequences that nurture and close prospects.",
    icon: PenTool,
    badge: "Content",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    title: "Brand Strategy & Positioning",
    description: "Crafting distinct visual and strategic brand positioning that makes you the undeniable leader in your niche.",
    icon: Globe,
    badge: "Strategy",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <Badge variant="outline" className="px-3.5 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
            My Services & Solutions
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground">
            How I Can <span className="text-primary italic">Help</span> You Grow
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            End-to-end digital marketing solutions engineered to accelerate revenue, brand authority, and client retention.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group relative border border-border/70 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-[border-color,box-shadow,transform] duration-200 active:scale-[0.99] flex flex-col justify-between"
            >
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`h-9 w-9 sm:h-12 sm:w-12 rounded-xl border ${service.color} flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}>
                    <service.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <span className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80 bg-muted/60 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-border/40">
                    {service.badge}
                  </span>
                </div>
                <CardTitle className="text-sm sm:text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 flex-grow flex flex-col justify-between">
                <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/50">
                  <Link
                    href="#contact"
                    className="text-[11px] sm:text-xs font-bold inline-flex items-center text-primary group-hover:translate-x-1 transition-transform duration-150 cursor-pointer"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="ml-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
