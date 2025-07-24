
import React from 'react';
import { TooltipProvider as RadixTooltipProvider } from "@radix-ui/react-tooltip";

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
}

export const TooltipProviderWrapper: React.FC<TooltipProviderProps> = ({ 
  children,
  delayDuration = 200,
  skipDelayDuration,
  disableHoverableContent
}) => {
  return (
    <RadixTooltipProvider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      {children}
    </RadixTooltipProvider>
  );
};
