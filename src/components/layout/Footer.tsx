import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/40 border-t border-border/60 pt-16 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-14">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 bg-card rounded-xl shadow-xs border border-border overflow-hidden transition-transform duration-200 group-hover:scale-105 active:scale-95">
                <Image
                  src="/logo.png"
                  alt="Daysman Gad : Digital Marketer Logo"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <span className="text-lg font-display font-bold text-foreground">
                Daysman <span className="text-primary italic">Marketer.</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Helping forward-thinking brands scale through high-converting marketing funnels, data-driven SEO, and tailored paid campaigns.
            </p>

            <div className="flex space-x-2.5 pt-1">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-xl border border-border/60 transition-[background-color,color,transform] duration-150 active:scale-90"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-foreground">Navigation</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {["Home", "About", "Services", "Portfolio", "Testimonials", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-foreground">Core Services</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {["Search Engine Optimization (SEO)", "PPC & Google Ads", "Social Media Strategy", "Content & Copywriting", "Conversion Rate Optimization"].map((item) => (
                <li key={item}>
                  <Link
                    href="#services"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-foreground">Get In Touch</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Nairobi, Kenya (Global Remote)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+254 742 630 973</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">hamisigad77@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Daysman Gad : Digital Marketer. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
