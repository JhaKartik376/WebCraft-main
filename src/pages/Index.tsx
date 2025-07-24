import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import PromptForm from "@/components/PromptForm";
import PreviewPane from "@/components/PreviewPane";
import { WebsitePrompt } from "@/types";
import { generateWebsite } from "@/services/aiService";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Index: React.FC = () => {
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handlePromptSubmit = async (websitePrompt: WebsitePrompt) => {
    setIsLoading(true);
    try {
      const html = await generateWebsite(websitePrompt);
      setGeneratedHtml(html);
      toast({
        title: "Website generated!",
        description: "Your website has been successfully generated.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <Hero />
        
        {/* App section - moved right after Hero */}
        <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background/80">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                Generate Your Website
              </h2>
              <p className="text-muted-foreground text-lg">
                Describe the website you want to build in plain English, and our AI will generate it for you instantly.
              </p>
            </div>

            <Card className="border-primary/20 bg-secondary/30 backdrop-blur-sm max-w-6xl mx-auto shadow-lg shadow-primary/5">
              <CardContent className="p-6 flex flex-col gap-6">
                {/* Prompt Form Section */}
                <div className="w-full">
                  <PromptForm 
                    onSubmit={handlePromptSubmit} 
                    isLoading={isLoading}
                    generatedCode={generatedHtml || ''}
                  />
                </div>

                {/* Preview Section */}
                <div className="w-full h-[500px] lg:h-[550px]">
                  <PreviewPane html={generatedHtml} isLoading={isLoading} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Other landing page sections */}
        <Showcase />
        <Features />
       
      </main>

      <footer className="py-10 border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-bold gradient-text"></h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                WebCraft generate websites from text prompts.
                Turn your ideas into reality in seconds.
              </p>
            </div>

          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} WebCraft. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Crafted with care by Kartik Jha</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;