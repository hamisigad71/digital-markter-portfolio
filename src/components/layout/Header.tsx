"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { PhoneCall } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/logo.png"
              alt="Daysman Marketer Logo"
              fill
              className="object-contain p-1.5"
            />
          </div>
          <span className="text-xl font-display font-bold text-zinc-900 dark:text-white">
            Daysman <span className="text-primary italic">Marketer.</span>
          </span>
        </Link>


        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="default" className="hidden sm:flex rounded-full group">
            <PhoneCall className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Let's Talk
          </Button>
          
          {/* Mobile Menu Toggle (simplified) */}
          <button className="md:hidden p-2 text-foreground">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
