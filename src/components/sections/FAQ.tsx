'use client';

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "For a comprehensive strategy, it usually takes 2-4 weeks. Implementation phase depends on the scope, but most clients see initial results within 45-60 days of launch.",
  },
  {
    question: "Do you work with startups or established brands?",
    answer: "Both! I tailor my methodology based on the business stage. Startups benefit from my growth hacking approach, while established brands appreciate my data-driven attribution models.",
  },
  {
    question: "How do you measure success (KPIs)?",
    answer: "Success metrics are defined upfront. Common KPIs include ROAS (Return on Ad Spend), CPA (Cost Per Acquisition), organic traffic growth, and conversion rate improvement.",
  },
  {
    question: "Do you offer ongoing management or one-time consults?",
    answer: "I offer both. Most clients prefer a monthly retainer for continuous optimization, but I also provide intensive 1-on-1 audits and strategy mapping sessions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-5/12 space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="px-4 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full">
                Support
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
                Frequently Asked <span className="text-primary italic">Questions</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Answers to common questions about my workflow, pricing, and expectations. Can&apos;t find what you&apos;re looking for?
              </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
              <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white mb-6">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold mb-2">Still have questions?</h4>
              <p className="text-muted-foreground mb-6">I'm here to help you navigate your digital marketing journey.</p>
              <button className="w-full py-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold hover:opacity-90 transition-opacity">
                Contact Me Now
              </button>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="w-full lg:w-7/12">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`rounded-3xl border transition-all duration-300 ${
                    openIndex === index 
                      ? 'border-primary/30 bg-primary/5 dark:bg-primary/10' 
                      : 'border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-700'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4"
                  >
                    <span className="text-lg md:text-xl font-bold leading-tight">
                      {faq.question}
                    </span>
                    <div className={`shrink-0 h-8 w-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180 border-primary/50 text-primary' : ''}`}>
                      {openIndex === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 md:px-8 pb-6 md:pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
