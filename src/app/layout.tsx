import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://digital-markter-portfolio.vercel.app"),
  title: "Daysman Gad – Digital Marketer & Graphic Designer",
  description: "Creative Digital Marketer, Social Media Manager & Graphic Designer with 4+ years of experience in content strategy, brand design & campaigns.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Daysman Gad – Digital Marketer & Graphic Designer",
    description: "Creative Digital Marketer, Social Media Manager & Graphic Designer with 4+ years of experience. Based in Nairobi, Kenya.",
    url: "https://digital-markter-portfolio.vercel.app",
    siteName: "Daysman Gad Portfolio",
    images: [
      {
        url: "https://digital-markter-portfolio.vercel.app/metadata.png",
        width: 1200,
        height: 630,
        alt: "Daysman Gad – Digital Marketer & Graphic Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daysman Gad – Digital Marketer & Graphic Designer",
    description: "Creative Digital Marketer, Social Media Manager & Graphic Designer with 4+ years of experience. Based in Nairobi, Kenya.",
    images: ["https://digital-markter-portfolio.vercel.app/metadata.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Loader />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
