import React, { useEffect, useRef, useState } from "react";
import { Loader2, Maximize, Download, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import FullScreenPreview from "./FullScreenPreview";

interface PreviewPaneProps {
  html: string | null;
  isLoading: boolean;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ html, isLoading }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showCodeView, setShowCodeView] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (html && iframeRef.current && !isFullScreen) {
      setIsRendering(true);
      const iframe = iframeRef.current;
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(html);
        iframeDocument.close();
        
        // Add an event listener for when the iframe is done loading
        iframe.onload = () => {
          setIsRendering(false);
        };
      }
    }
  }, [html, isFullScreen]);

  // Show code view while loading, then switch to preview when done
  useEffect(() => {
    if (isLoading) {
      setShowCodeView(false);
      setShowPreview(true);
    } else if (html) {
      // Small delay to show the completed code before switching to preview
      const timer = setTimeout(() => {
        setShowCodeView(false);
        setShowPreview(true);
        setIsFullScreen(true); // Auto enter fullscreen mode after generation
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, html]);

  const handleFullScreenToggle = () => {
    setIsFullScreen(true);
  };

  const handleCodeViewToggle = () => {
    setShowCodeView(!showCodeView);
  };

  const handleDownload = () => {
    if (html) {
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-website.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const renderCodeView = () => {
    const codeSnippet = html || '';
    const lines = codeSnippet.slice(0, 2000).split('\n');
    
    return (
      <div className="bg-[#1e1e2e] text-white h-full overflow-auto p-4">
        <pre className="font-mono text-sm">
          <code>
            {isLoading ? (
              <div className="animate-pulse">
                {Array(15).fill(0).map((_, i) => (
                  <div key={i} className="h-4 bg-primary/10 rounded my-1.5" 
                       style={{ width: `${Math.random() * 80 + 20}%` }}></div>
                ))}
              </div>
            ) : (
              lines.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line}
                </div>
              ))
            )}
          </code>
        </pre>
      </div>
    );
  };

  return (
    <>
      <div className="preview-container group relative h-full">
        {/* Always visible buttons at the top */}
        {html && !isLoading && (
          <div className="absolute top-2 left-2 z-10 flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="rounded-lg bg-primary text-white hover:bg-primary/90 border border-primary/20 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 animate-fade-in"
              onClick={handleDownload}
              title="Download Website"
            >
              <Download className="h-4 w-4" />
              <span>Download Website</span>
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              className="rounded-lg bg-secondary/80 backdrop-blur-sm hover:bg-accent border border-primary/20 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 animate-fade-in"
              onClick={handleCodeViewToggle}
              title={showCodeView ? "Show Preview" : "Show Code"}
            >
              <Code className="h-4 w-4" />
              <span>{showCodeView ? "Show Preview" : "Show Code"}</span>
            </Button>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 bg-primary/20 rounded-full animate-pulse"></div>
                <Loader2 className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Please wait...</h3>
                <p className="text-base text-muted-foreground">Your website will be ready in 2 to 3 minutes</p>
              </div>
            </div>
          </div>
        )}
        
        {!html && !isLoading ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center px-4">
              <p className="text-lg font-medium mb-2">Website Preview</p>
              <p className="text-sm">Enter a prompt and click "Generate Website" to see the preview here</p>
            </div>
          </div>
        ) : (
          <>
            <div className="absolute top-2 right-2 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent"
                onClick={handleFullScreenToggle}
                title="Full Screen"
              >
                <Maximize className="h-4 w-4" />
                <span className="sr-only">Full screen</span>
              </Button>
            </div>
            
            {showCodeView ? (
              renderCodeView()
            ) : (
              <iframe 
                ref={iframeRef}
                title="Website Preview" 
                className="preview-iframe"
                sandbox="allow-same-origin allow-scripts"
              />
            )}
          </>
        )}
      </div>

      {isFullScreen && (
        <FullScreenPreview 
          html={html} 
          onClose={() => setIsFullScreen(false)} 
        />
      )}
    </>
  );
};

export default PreviewPane;
