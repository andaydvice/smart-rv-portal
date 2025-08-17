
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapLoadingProgressProps {
  showProgress: boolean;
  className?: string;
}

const MapLoadingProgress: React.FC<MapLoadingProgressProps> = ({
  showProgress,
  className
}) => {
  if (!showProgress) return null;
  
  return (
    <div className={cn(
      "absolute inset-0 flex flex-col items-center justify-center bg-[#080F1F]/80 z-50",
      className
    )}>
      <div className="flex items-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-connectivity-accent" />
        <h3 className="text-xl font-medium text-white">Loading Map...</h3>
      </div>
    </div>
  );
};

export default MapLoadingProgress;
