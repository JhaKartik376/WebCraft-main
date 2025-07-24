
import React from "react";
import { CodeXml, ExternalLink, Github, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="py-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CodeXml className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold gradient-text">WebCraft</h1>
          </div>
          <div className="flex items-center gap-3">
            {!isMobile && (
              <nav>
              </nav>
            )}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild className="group">
                <a href="https://github.com/jhakartik376" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="group">
                <a href="https://www.linkedin.com/in/kartik-jha-21956b1a1/" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  <span className="hidden sm:inline">Linkedin</span>
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="group">
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  <span className="hidden sm:inline">Instagram</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
