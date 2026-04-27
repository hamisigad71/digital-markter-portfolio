import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-black">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">Expert Digital Marketer</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] tracking-tight">
            Scale up your <br />
            <span className="text-primary italic">Business</span> with <br />
            my expertise
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
            I help brands grow through innovative digital marketing strategies, data-driven SEO, and impactful social media campaigns.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="rounded-full px-8 h-14 text-base font-bold group">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <button className="flex items-center space-x-3 group px-6 py-3 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
              <div className="h-12 w-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                <Play className="h-5 w-5 fill-current text-primary group-hover:text-white" />
              </div>
              <span className="font-bold text-sm">Watch Video</span>
            </button>
          </div>

          <div className="pt-8 flex items-center space-x-8">
            <div className="space-y-1">
              <p className="text-3xl font-bold">25k+</p>
              <p className="text-sm text-muted-foreground">Clients Served</p>
            </div>
            <div className="w-px h-10 bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-1">
              <p className="text-3xl font-bold">120k</p>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </div>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-900 aspect-video lg:aspect-auto lg:h-[700px]">
            {/* Using a placeholder high-quality image from Unsplash or Pinimg as referenced */}
            <Image
              src="/profile-avatar.jpg"
              alt="Digital Marketing Team"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Floating Decorative Elements */}
          <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-800 animate-bounce-slow">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <ArrowRight className="h-6 w-6 -rotate-45" />
              </div>
              <div>
                <p className="text-sm font-bold">Growth Stats</p>
                <p className="text-xs text-muted-foreground">+45% Monthly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}