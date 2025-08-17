import React from 'react';
import { Loader2 } from 'lucide-react';

interface MinimalLoaderProps {
  className?: string;
}

export const MinimalLoader: React.FC<MinimalLoaderProps> = ({ className = '' }) => {
  return (
    <div className={`min-h-screen bg-deeper-background flex items-center justify-center ${className}`}>
      <div className="flex items-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-connectivity-accent" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    </div>
  );
};