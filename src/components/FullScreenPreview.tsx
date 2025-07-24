
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FullScreenPreviewProps {
  html: string | null;
  onClose: () => void;
}

const FullScreenPreview: React.FC<FullScreenPreviewProps> = ({ html, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (html && iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(html);
        iframeDocument.close();
      }
    }

    // Add escape key listener
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [html, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={onClose}
          className="rounded-full shadow-md hover:bg-accent"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close full screen</span>
        </Button>
      </div>
      
      <iframe 
        ref={iframeRef}
        title="Website Preview Full Screen" 
        className="w-full h-full border-0"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default FullScreenPreview;
