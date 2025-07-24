import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WebsitePrompt } from "@/types";
import { Download, Sparkles, X, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PromptFormProps {
  onSubmit: (prompt: WebsitePrompt) => void;
  isLoading: boolean;
  onClose?: () => void;
  generatedCode?: string;
}

const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading, onClose, generatedCode }) => {
  const [promptText, setPromptText] = useState("");
  const [complexity, setComplexity] = useState<"simple" | "medium" | "complex">("complex");
  const [style, setStyle] = useState<"minimal" | "modern" | "playful">("playful");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    
    onSubmit({
      prompt: promptText,
      settings: {
        complexity,
        style,
      },
    });
  };

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            key="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="max-w-md mx-4 p-8 bg-background rounded-xl border border-border shadow-lg text-center"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "linear" 
                    },
                    scale: {
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                  className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center"
                >
                  <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                </motion.div>
              </div>
              
              <motion.h2 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
              >
                Generating your website...
                Please wait, it will take 2 to 3 minutes...

              </motion.h2>
              
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg mb-6 text-muted-foreground"
              >
                <span className="font-semibold text-primary">WebCraft</span> is crafting your website
              </motion.p>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 bg-primary/20 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/70"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-sm text-muted-foreground"
              >
                The AI is generating code for your website based on your description.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 overflow-auto"
      >
        <Card className="w-full h-screen bg-background/95 backdrop-blur-sm border-0 rounded-none">
          <CardHeader className="relative border-b border-border/10 pb-6">
            <div className="flex items-center gap-3">
              <Wand2 className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Website Generator
              </CardTitle>
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 rounded-full hover:bg-background/20"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            )}
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Prompt Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Describe your vision
                  </label>
                  <div className="relative group/input">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 rounded-lg blur opacity-0 group-focus-within/input:opacity-100 transition-all duration-300"></div>
                    <Textarea
                      placeholder="write your prompt here..."
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      className="min-h-[180px] text-base bg-background/70 backdrop-blur-sm focus-visible:ring-0 focus-visible:ring-offset-0 border-primary/20 hover:border-primary/30 transition-colors"
                    />
                  </div>
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Complexity Select */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                      <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      Complexity Level
                    </label>
                    <div className="relative group/select">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 rounded-lg blur opacity-0 group-focus-within/select:opacity-100 transition-all duration-300"></div>
                      <Select value={complexity} onValueChange={(value: "simple" | "medium" | "complex") => setComplexity(value)}>
                        <SelectTrigger className="relative bg-background/70 backdrop-blur-sm border-primary/20 hover:border-primary/30 focus:ring-0">
                          <SelectValue placeholder="Select complexity" />
                        </SelectTrigger>
                        <SelectContent className="bg-background/95 backdrop-blur-sm border-primary/20">
                          <SelectItem value="simple" className="hover:bg-primary/5 focus:bg-primary/5">Simple (basic layout)</SelectItem>
                          <SelectItem value="medium" className="hover:bg-primary/5 focus:bg-primary/5">Medium (standard components)</SelectItem>
                          <SelectItem value="complex" className="hover:bg-primary/5 focus:bg-primary/5">Complex (advanced interactions)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Style Select */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                      <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      Design Style
                    </label>
                    <div className="relative group/select">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 rounded-lg blur opacity-0 group-focus-within/select:opacity-100 transition-all duration-300"></div>
                      <Select value={style} onValueChange={(value: "minimal" | "modern" | "playful") => setStyle(value)}>
                        <SelectTrigger className="relative bg-background/70 backdrop-blur-sm border-primary/20 hover:border-primary/30 focus:ring-0">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent className="bg-background/95 backdrop-blur-sm border-primary/20">
                          <SelectItem value="minimal" className="hover:bg-primary/5 focus:bg-primary/5">Minimal (clean & spacious)</SelectItem>
                          <SelectItem value="modern" className="hover:bg-primary/5 focus:bg-primary/5">Modern (sleek & professional)</SelectItem>
                          <SelectItem value="playful" className="hover:bg-primary/5 focus:bg-primary/5">Playful (colorful & animated)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full min-h-[60px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-lg relative overflow-hidden group transition-all duration-300 shadow-lg hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-lg font-medium">Generate Website</span>
                </div>
              </Button>

              <AnimatePresence>
                {generatedCode && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full"
                  >
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full py-4 flex items-center justify-center gap-3 bg-background/70 backdrop-blur-sm hover:bg-background transition-all duration-200 border-primary/20 hover:border-primary/30"
                      onClick={() => {
                        const blob = new Blob([generatedCode], { type: 'text/html' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'generated-website.html';
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(a);
                      }}
                    >
                      <Download className="w-5 h-5 text-primary" />
                      <span>Download Generated Code</span>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </>
  );
};

export default PromptForm;