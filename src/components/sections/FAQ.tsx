'use client';

import { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "For a comprehensive audit and strategy blueprint, it typically takes 1-2 weeks. Campaign execution and active optimization ramp up immediately thereafter, with most clients observing noticeable compounding returns within 30-60 days.",
  },
  {
    question: "Do you work with startups or established brands?",
    answer: "Both. For early-stage startups, I implement agile, high-velocity experimentation to find product-market fit and scale traction. For established businesses, I build rigorous attribution models, conversion rate optimization (CRO), and omni-channel scaling systems.",
  },
  {
    question: "How do you measure success and return on ad spend (ROAS)?",
    answer: "Every engagement begins with crystal-clear KPIs: blended ROAS, customer acquisition cost (CAC), lifetime value (LTV), and qualified pipeline volume. You receive real-time dashboard tracking and weekly transparent progress reports.",
  },
  {
    question: "Do you offer ongoing retainers or one-time consultations?",
    answer: "I offer both. Most brands partner on a monthly growth retainer for hands-on campaign execution and weekly iterations. I also provide intensive one-off SEO audits, technical funnel overhauls, and paid advertising roadmaps.",
  },
  {
    question: "Who owns the advertising accounts and creative assets?",
    answer: "You do—100%. All Meta Ads Manager accounts, Google Ads properties, Google Analytics, and creative assets remain completely under your company's ownership with zero lock-in.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Support Callout */}
          <div className="w-full lg:w-5/12 space-y-6">
            <div className="space-y-3">
              <Badge variant="outline" className="px-3.5 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                Support & FAQs
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground">
                Frequently Asked <span className="text-primary italic">Questions</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Clear answers regarding workflow, campaign management, reporting standards, and deliverables.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-foreground">Have a specific question?</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm available to discuss your specific goals and analyze your current metrics during a free 20-minute discovery call.
              </p>
              <Button asChild className="w-full rounded-xl h-11 font-semibold group shadow-sm">
                <Link href="#contact">
                  Schedule Free Discovery Call
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="w-full lg:w-7/12">
            <div className="space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`rounded-2xl border transition-[background-color,border-color,box-shadow] duration-200 ${
                      isOpen 
                        ? 'border-primary/40 bg-card shadow-xs' 
                        : 'border-border/70 bg-card/60 hover:border-border hover:bg-card'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-bold text-foreground leading-snug">
                        {faq.question}
                      </span>
                      <div className={`shrink-0 h-7 w-7 rounded-full border border-border/70 flex items-center justify-center transition-transform duration-200 ${isOpen ? 'bg-primary text-primary-foreground border-primary rotate-180' : 'text-muted-foreground'}`}>
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 animate-in fade-in duration-200">
                        <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
