export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
}

export const defaultBlogs: BlogPost[] = [
  {
    id: "mastering-ga4",
    title: "Mastering GA4: From Data to Actionable Insights",
    excerpt: "Learn how to leverage Google Analytics 4 to track user journeys and optimize your conversion rates.",
    category: "Analytics",
    date: "May 12, 2024",
    author: "Hamisi",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  },
  {
    id: "future-of-seo",
    title: "The Future of SEO in an AI-Driven World",
    excerpt: "How generative AI is changing search intent and what you need to do to stay ahead of the curve.",
    category: "SEO",
    date: "Jun 05, 2024",
    author: "Hamisi",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "scaling-paid-ads",
    title: "Scaling Paid Ads: When to Spend More",
    excerpt: "A data-backed guide on identifying the point of diminishing returns in your PPC campaigns.",
    category: "PPC",
    date: "Jun 28, 2024",
    author: "Hamisi",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
];
