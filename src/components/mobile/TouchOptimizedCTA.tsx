import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Loader2 } from 'lucide-react';

interface TouchOptimizedCTAProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  loadingText?: string;
  trackingParams?: string;
}

const TouchOptimizedCTA = ({ 
  href, 
  children, 
  className = "", 
  variant = "default",
  size = "default",
  loadingText = "Loading...",
  trackingParams = ""
}: TouchOptimizedCTAProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    // Add haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setIsLoading(true);
    
    // Add mobile-specific tracking
    const finalUrl = trackingParams ? `${href}${href.includes('?') ? '&' : '?'}${trackingParams}&source=mobile` : `${href}?source=mobile`;
    
    // Small delay to show loading state
    setTimeout(() => {
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
      setIsLoading(false);
    }, 300);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={`
        min-h-[48px] 
        min-w-[48px] 
        touch-manipulation 
        active:scale-95 
        transition-all 
        duration-200 
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          {loadingText}
        </>
      ) : (
        <>
          {children}
          <ExternalLink className="h-4 w-4 ml-2" />
        </>
      )}
    </Button>
  );
};

export default TouchOptimizedCTA;