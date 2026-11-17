'use client';

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { getBlogs } from "@/lib/store";
import type { BlogPost } from "@/lib/store";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getBlogs();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-24 bg-muted/20 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div className="max-w-2xl space-y-3.5">
            <Badge variant="outline" className="px-3.5 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
              Marketing Intelligence
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground">
              Latest <span className="text-primary italic">Insights</span> & Growth Playbooks
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Actionable guides on search ranking algorithms, ad optimization, CRO frameworks, and generative marketing workflows.
            </p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-[gap] duration-150 cursor-pointer">
            <span>View All Insights</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <article 
              key={index} 
              className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/70 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-[border-color,box-shadow,transform] duration-200 active:scale-[0.99]"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted/40">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-background/90 dark:bg-card/90 text-foreground backdrop-blur-md border border-border/50 px-2.5 py-1 text-xs font-semibold">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h4>
                  
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                      {post.author[0]}
                    </div>
                    <span className="text-xs font-semibold text-foreground">{post.author}</span>
                  </div>
                  <div className="h-8 w-8 rounded-full border border-border/70 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-[background-color,border-color,color] duration-150">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button className="md:hidden w-full mt-8 py-3.5 rounded-xl border border-border/80 bg-card text-foreground font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98]">
          <span>View All Insights</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
