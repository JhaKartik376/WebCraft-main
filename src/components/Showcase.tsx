
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const showcaseItems = [
  {
    title: "Landing Page",
    image: "/hero.png",
    tags: ["Modern", "Responsive"],
    prompt: "Create a modern, visually engaging landing page for a Banka district tour guide, showcasing top attractions, local culture, travel tips, and contact information for booking tours."
  },
  {
    title: "tech startup",
    image: "/guru.png",
    tags: ["animated", "Responsive"],
    prompt: "Create a modern, responsive landing page for a tech startup featuring a bold hero section, key product features, and a functional contact form for inquiries."
  },
  {
    title: "user-friendly dashboard",
    image: "/certify.png",
    tags: ["Creative", "Responsive"],
    prompt: "Design a minimal, user-friendly dashboard website for certificate management, including features for issuing, storing, and verifying certificates."
  }
  
];

const Showcase: React.FC = () => {
  return (
    <section id="showcase" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            What Will You Create?
          </h2>
          <p className="text-muted-foreground text-lg">
            From landing pages to portfolios, our AI can generate a wide variety of websites. Here's some inspiration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg border border-primary/10 transition-all hover:border-primary/30 hover:shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  {item.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground italic mb-4">"{item.prompt}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
