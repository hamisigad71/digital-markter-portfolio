'use client';

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import Image from "next/image";

const posts = [
  {
    title: "Mastering GA4: From Data to Actionable Insights",
    excerpt: "Learn how to leverage Google Analytics 4 to track user journeys and optimize your conversion rates.",
    category: "Analytics",
    date: "May 12, 2024",
    author: "Hamisi",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  },
  {
    title: "The Future of SEO in an AI-Driven World",
    excerpt: "How generative AI is changing search intent and what you need to do to stay ahead of the curve.",
    category: "SEO",
    date: "Jun 05, 2024",
    author: "Hamisi",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Scaling Paid Ads: When to Spend More",
    excerpt: "A data-backed guide on identifying the point of diminishing returns in your PPC campaigns.",
    category: "PPC",
    date: "Jun 28, 2024",
    author: "Hamisi",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-zinc-50 dark:bg-zinc-900/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-primary font-bold uppercase tracking-wider text-sm">Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
              Latest <span className="text-primary italic">Insights</span> & Articles
            </h3>
            <p className="text-muted-foreground text-lg">
              Sharing my expertise on digital growth, data analytics, and marketing trends.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            View All Posts <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article 
              key={index} 
              className="group flex flex-col bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white backdrop-blur-md border-none px-4 py-1">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {post.readTime}
                  </span>
                </div>

                <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h4>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
                      {post.author[0]}
                    </div>
                    <span className="text-sm font-semibold">{post.author}</span>
                  </div>
                  <button className="h-10 w-10 rounded-full border border-zinc-100 dark:border-zinc-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button className="md:hidden w-full mt-12 py-4 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold flex items-center justify-center gap-2">
          View All Posts <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
