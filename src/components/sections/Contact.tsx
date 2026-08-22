import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-primary font-bold uppercase tracking-wider text-sm">Get In Touch</h2>
              <h3 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
                Let's <span className="text-primary italic">Work</span> Together
              </h3>
              <p className="text-muted-foreground text-lg max-w-lg">
                Have a project in mind? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="h-12 w-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold">My Location</p>
                  <p className="text-muted-foreground text-sm">Nairobi kenya5</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="h-12 w-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold">Phone Number</p>
                  <p className="text-muted-foreground text-sm">+254 742630973</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="h-12 w-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold">Email Address</p>
                  <p className="text-muted-foreground text-sm">hamisigad77@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 shadow-primary/5">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="rounded-xl h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="rounded-xl h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="rounded-xl h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell me about your project..." className="rounded-xl min-h-[150px] bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800" />
              </div>
              <Button className="w-full rounded-xl h-14 font-bold text-base group">
                Send Message
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
