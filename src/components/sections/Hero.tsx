'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, TrendingUp, Sparkles, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/store";

export default function Hero() {
  const [profileImg, setProfileImg] = useState("https://i.pinimg.com/736x/66/66/b4/6666b4545ca06fc06a45b8f710596789.jpg");

  useEffect(() => {
    const load = async () => {
      try {
        const settings = await getSettings();
        if (settings?.profileImage) {
          setProfileImg(settings.profileImage);
        }
      } catch (err) {
        console.error("Failed to load hero settings", err);
      }
    };

    load();

    const handler = () => {
      load();
    };
    
    window.addEventListener("settings-updated", handler);
    return () => window.removeEventListener("settings-updated", handler);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 md:pt-32 lg:pt-24 pb-16 overflow-hidden bg-background">
      {/* Subtle Background Lighting Gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 -translate-x-1/4 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column Content */}
        <div className="space-y-6 md:space-y-8">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="uppercase tracking-wider">Expert Digital Marketer & Strategist</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.08] tracking-tight text-foreground">
            Scale up your <br className="hidden sm:inline" />
            <span className="text-primary italic">Business</span> with <br className="hidden sm:inline" />
            precision marketing
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            I help modern companies, brands, and startups dominate search rankings, maximize ROI from paid campaigns, and turn followers into lifelong customers.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="rounded-full px-7 h-12 md:h-13 text-sm md:text-base font-bold shadow-md shadow-primary/20 group shrink-0"
            >
              <Link href="#contact">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6 h-12 md:h-13 text-sm md:text-base font-medium group shrink-0 border-border/80 hover:bg-muted/60"
            >
              <Link href="#portfolio">
                <Play className="mr-2 h-4 w-4 fill-primary text-primary group-hover:scale-110 transition-transform" />
                View Case Studies
              </Link>
            </Button>
          </div>

          {/* Social Proof & Metrics */}
          <div className="pt-6 border-t border-border/60 flex items-center space-x-8 sm:space-x-12">
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground tabular-nums tracking-tight">25k+</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">Clients Served</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground tabular-nums tracking-tight">120k</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">Campaigns Executed</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary tabular-nums tracking-tight">4.9/5</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">Client Rating</p>
            </div>
          </div>
        </div>

        {/* Right Column Profile Showcase */}
        <div className="relative">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-card h-[380px] sm:h-[540px] lg:h-[600px] w-full bg-muted/30">
            <Image
              src={profileImg}
              alt="Daysman Gad - Digital Marketer"
              fill
              className="object-cover object-top"
              priority
              unoptimized={profileImg ? profileImg.startsWith('data:') : false}
            />
          </div>
          
          {/* Growth Callout Card */}
          <div className="absolute -bottom-4 left-4 sm:-bottom-6 sm:-left-6 z-20 bg-card/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-border/80 flex items-center space-x-3.5 transition-transform duration-200 hover:scale-105">
            <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Average Client Growth</p>
              <p className="text-base sm:text-lg font-bold text-foreground">+185% Revenue ROI</p>
            </div>
          </div>

          {/* Top-Right Badge */}
          <div className="absolute -top-3 right-4 sm:-top-5 sm:-right-4 z-20 bg-card/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-border/80 flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
            <Award className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-bold text-foreground">Top Rated Marketer 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
