
import React from "react";
import { Code, Layout, Sparkles, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI-Powered Generation",
    description: "Harness the power of LLM Model to create beautiful, responsive websites from natural language descriptions.",
    icon: Sparkles
  },
  {
    title: "Real-time Preview",
    description: "See your website come to life in real-time as the AI generates custom HTML, CSS and JavaScript based on your prompt.",
    icon: Layout
  },
  {
    title: "Full-Screen Mode",
    description: "Preview your creation in full-screen to experience your website exactly as users would see it.",
    icon: Zap
  },
  {
    title: "Clean Code Export",
    description: "Download the generated HTML, CSS, and JavaScript to use anywhere or further customize.",
    icon: Code
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Generate Websites in Seconds
          </h2>
          <p className="text-muted-foreground text-lg">
            Our AI-powered platform makes web development accessible to everyone, regardless of technical skill.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background/50 backdrop-blur border-primary/10 transition-all hover:border-primary/30 hover:shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
