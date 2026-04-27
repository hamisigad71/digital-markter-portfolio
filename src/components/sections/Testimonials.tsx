'use client';

import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechFlow",
    content: "Working with this team was a game-changer for our brand. Our organic traffic increased by 150% in just six months.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, GlobalStore",
    content: "The level of expertise and dedication is unmatched. They don't just deliver results; they provide strategic insights that help us grow.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Founder, BloomCreative",
    content: "Transparent, professional, and results-oriented. The social media campaign they handled exceeded all our expectations.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
  },
];

const brands = [
  "TechFlow", "GlobalStore", "BloomCreative", "GrowthX", "PixelPerfect", "Innovate"
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Brand Logos */}
        <div className="mb-24 overflow-hidden">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600 mb-10">
            Trusted by Industry Leaders
          </p>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 60s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}} />

          <div 
            className="flex relative opacity-50 dark:opacity-40 grayscale hover:grayscale-0 transition-opacity duration-500 w-full"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
            }}
          >
            <div className="animate-marquee flex shrink-0 whitespace-nowrap items-center gap-10 md:gap-20">
              {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
                <span key={index} className="text-2xl md:text-3xl font-display font-black tracking-tighter shrink-0 pr-10 md:pr-20">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-primary font-bold uppercase tracking-wider text-sm">Success Stories</h2>
            <h3 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
              What My <span className="text-primary italic">Clients</span> Say
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200" />
              ))}
            </div>
            <p className="text-sm font-medium ml-2">Trusted by 500+ companies</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name} 
              className="p-4 md:p-8 rounded-2xl md:rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 relative group"
            >
              <div className="flex gap-0.5 mb-2 md:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-2.5 w-2.5 md:h-4 md:w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-[10px] md:text-lg text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed mb-3 md:mb-6 line-clamp-4 md:line-clamp-none italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="relative h-8 w-8 md:h-12 md:w-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-[10px] md:text-base font-bold text-zinc-900 dark:text-zinc-100">{testimonial.name}</p>
                  <p className="text-[8px] md:text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <Quote className="absolute top-4 right-4 h-6 w-6 md:h-12 md:w-12 text-primary/5 group-hover:text-primary/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
