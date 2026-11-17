"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { PhoneCall, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,padding] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isScrolled
          ? "bg-background/85 dark:bg-background/80 backdrop-blur-md border-b border-border/60 shadow-xs py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 md:w-10 md:h-10 bg-white dark:bg-card rounded-xl shadow-xs border border-border overflow-hidden transition-transform duration-200 group-hover:scale-105 active:scale-95">
            <Image
              src="/logo.png"
              alt="Daysman Gad : Digital Marketer Logo"
              fill
              className="object-contain p-1.5"
              priority
            />
          </div>
          <span className="text-lg md:text-xl font-display font-bold tracking-tight text-foreground">
            Daysman <span className="text-primary italic">Marketer.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-muted/50 dark:bg-card/40 backdrop-blur-xs px-3 py-1.5 rounded-full border border-border/50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-background/80 transition-[color,background-color] duration-150 active:scale-95"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2.5">
          <ThemeToggle />

          <Button
            asChild
            variant="default"
            size="sm"
            className="hidden sm:inline-flex rounded-full shadow-sm hover:shadow"
          >
            <Link href="#contact">
              <PhoneCall className="mr-1.5 h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              Let's Talk
            </Link>
          </Button>

          {/* Mobile Menu Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden h-9 w-9 rounded-xl border border-border/40"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground transition-transform duration-150 rotate-90" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-in fade-in slide-in-from-top-2 duration-150 bg-background/95 backdrop-blur-xl border-b border-border/80 px-4 pt-3 pb-6 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted active:bg-muted/80 active:scale-[0.98] transition-[background-color,transform] duration-100 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground/60" />
              </Link>
            ))}
            <div className="pt-3">
              <Button
                asChild
                className="w-full rounded-xl h-11 justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="#contact">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Let's Talk
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
