import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 pt-20 pb-10 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden group">
                <Image
                  src="/logo.png"
                  alt="Daysman Marketer Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <span className="text-xl font-display font-bold text-zinc-900 dark:text-white">
                Daysman <span className="text-primary italic">Marketer.</span>
              </span>
            </Link>

            <p className="text-muted-foreground leading-relaxed">
              I provide high-quality digital marketing services to help your business grow in the digital landscape.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 bg-white dark:bg-zinc-900 rounded-full shadow-sm hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-white dark:bg-zinc-900 rounded-full shadow-sm hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-white dark:bg-zinc-900 rounded-full shadow-sm hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-white dark:bg-zinc-900 rounded-full shadow-sm hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-display">Quick Links</h3>
            <ul className="space-y-4">
              {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-display">Services</h3>
            <ul className="space-y-4">
              {["Web Development", "SEO Optimization", "Social Marketing", "Content Writing"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-display">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>123 Market St, Nairobi , KE 94105</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+254 742630973</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>hamisigad77@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-muted-foreground">
          <p>© {currentYear} Daysman Marketer. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
