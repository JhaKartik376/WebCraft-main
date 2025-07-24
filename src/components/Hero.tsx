
import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const Hero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>Crafted with care by Kartik Jha</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text animate-slide-in">
            Create Beautiful Websites with Just a Prompt
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your ideas into fully-functional websites in Minute. 
            Simply describe what you want, and our AI will build it for you.
          </p>

          
          <Card className="mt-12 w-full max-w-4xl glass p-2 border-primary/20">
  <div className="w-full">
    <video 
      src="/video.mp4" 
      autoPlay 
      loop 
      muted 
      playsInline 
      className="rounded-md w-full h-auto sm:h-[400px] md:h-[500px] object-cover shadow-lg"
    >
      Your browser does not support the video tag.
    </video>
  </div>
</Card>

        </div>
      </div>
    </section>
  );
};

export default Hero;
