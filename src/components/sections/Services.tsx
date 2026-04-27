import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code2, Search, Share2, PenTool, BarChart3, Globe } from "lucide-react";

const services = [
  {
    title: "Web Development",
    description: "Building responsive, high-performance websites using the latest technologies and best practices.",
    icon: Code2,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "SEO Optimization",
    description: "Improving your website's visibility on search engines to drive organic traffic and growth.",
    icon: Search,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Social Marketing",
    description: "Engaging your audience across social platforms with creative content and targeted campaigns.",
    icon: Share2,
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    title: "Content Writing",
    description: "Creating compelling stories and informative content that resonate with your target market.",
    icon: PenTool,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Digital Strategy",
    description: "Developing comprehensive digital roadmaps to help your business achieve its long-term goals.",
    icon: BarChart3,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Brand Identity",
    description: "Designing unique brand elements that reflect your values and stand out in the marketplace.",
    icon: Globe,
    color: "bg-green-500/10 text-green-500",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-primary font-bold uppercase tracking-wider text-sm">My Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
            How I Can <span className="text-primary italic">Help</span> You
          </h3>
          <p className="text-muted-foreground text-lg">
            Comprehensive digital solutions tailored to your unique business needs and goals.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {services.map((service, index) => (
            <Card key={service.title} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-4 md:p-6 pb-2 md:pb-4">
                <div className={`h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl ${service.color} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-5 w-5 md:h-7 md:w-7" />
                </div>
                <CardTitle className="text-base md:text-2xl font-display font-bold group-hover:text-primary transition-colors line-clamp-1">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                <CardDescription className="text-xs md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
                  {service.description}
                </CardDescription>
                <div className="mt-3 md:mt-6 pt-3 md:pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <button className="text-[10px] md:text-sm font-bold flex items-center text-primary hover:translate-x-1 transition-transform">
                    Learn More
                    <svg className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
