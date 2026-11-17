'use client';

import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, Hills Candle",
    content: "Daysman transformed our digital acquisition pipeline. Our organic revenue jumped by 150% in just six months while cutting our paid ad cost-per-lead by half.",
    avatar: "https://i.pinimg.com/736x/0c/8d/93/0c8d932c2e465aad6b0bc87b733a1ee7.jpg",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Head of Growth, Bomexa",
    content: "The level of strategic marketing acumen is unmatched. Daysman doesn't just deliver clicks; he builds sustainable funnels that convert visitors into recurring buyers.",
    avatar: "https://i.pinimg.com/1200x/d1/64/2b/d1642b15c97573bc2eb45bbd204770a4.jpg",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Founder, iPhone Ke",
    content: "Transparent, responsive, and relentless with ROI optimization. Our social engagement and direct eCommerce conversions broke every prior quarterly record.",
    avatar: "https://i.pinimg.com/736x/80/eb/e3/80ebe32dc5f1015457504ab24979ceee.jpg",
    rating: 5,
  },
];

const brands = [
  "TechFlow", "GlobalStore", "BloomCreative", "GrowthX", "PixelPerfect", "Innovate", "ApexVenture", "OmniReach"
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background border-t border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Brand Marquee */}
        <div className="mb-20 overflow-hidden">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground/70 mb-8">
            Trusted by Brands & High-Growth Startups
          </p>
          
          <div 
            className="flex relative opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-opacity duration-300 w-full"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
            }}
          >
            <div className="flex shrink-0 whitespace-nowrap items-center gap-12 md:gap-20 animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <span key={index} className="text-xl sm:text-2xl font-display font-black tracking-tight text-foreground/80 shrink-0">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div className="max-w-2xl space-y-3.5">
            <Badge variant="outline" className="px-3.5 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
              Client Feedback
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground">
              What My <span className="text-primary italic">Clients</span> Say
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Real results, genuine partnerships, and measurable revenue growth across global markets.
            </p>
          </div>
          <div className="hidden sm:inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card border border-border/80 shadow-xs">
            <span className="flex text-amber-500">★★★★★</span>
            <p className="text-xs font-bold text-foreground">4.9/5 Average Client Satisfaction</p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name} 
              className="p-6 sm:p-8 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-[border-color,box-shadow,transform] duration-200 active:scale-[0.99] relative flex flex-col justify-between group"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-border/50">
                <div className="relative h-11 w-11 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <Quote className="absolute top-6 right-6 h-8 w-8 text-muted/30 group-hover:text-primary/15 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
