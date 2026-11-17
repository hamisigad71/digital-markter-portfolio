'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields", {
        description: "First name, email, and message are required.",
      });
      return;
    }

    setLoading(true);

    // Simulate sending message with snappy feedback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I'll reply to your email within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-background border-t border-border/40 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="px-3.5 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                Get In Touch
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground">
                Let's <span className="text-primary italic">Work</span> Together
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed">
                Have an ambitious growth target or looking to overhaul your digital marketing funnel? Send a message and let's craft your custom roadmap.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <a
                href="https://maps.google.com/?q=Nairobi+Kenya"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-4 p-4 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:shadow-xs transition-[border-color,box-shadow,transform] duration-150 active:scale-[0.99] group"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-[background-color,color] duration-150 shadow-xs shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">Location</p>
                  <p className="text-muted-foreground text-sm">Nairobi, Kenya (Global Remote)</p>
                </div>
              </a>

              <a
                href="tel:+254742630973"
                className="flex items-center space-x-4 p-4 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:shadow-xs transition-[border-color,box-shadow,transform] duration-150 active:scale-[0.99] group"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-[background-color,color] duration-150 shadow-xs shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">Direct Line & WhatsApp</p>
                  <p className="text-muted-foreground text-sm font-mono">+254 742 630 973</p>
                </div>
              </a>

              <a
                href="mailto:hamisigad77@gmail.com"
                className="flex items-center space-x-4 p-4 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:shadow-xs transition-[border-color,box-shadow,transform] duration-150 active:scale-[0.99] group"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-[background-color,color] duration-150 shadow-xs shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-sm text-foreground">Direct Email</p>
                  <p className="text-muted-foreground text-sm font-mono truncate">hamisigad77@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-6 sm:p-10 rounded-3xl shadow-xl shadow-primary/5 border border-border/80 relative">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-foreground">Thank You!</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Your message has been safely received. I typically respond within 24 hours on business days.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="rounded-xl mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Project Details / Goals <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your business, current marketing challenges, and target timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full rounded-xl h-12 font-bold text-sm sm:text-base group shadow-md shadow-primary/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
