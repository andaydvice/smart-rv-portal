
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapLoadingProgressProps {
  percentLoaded: number;
  showProgress: boolean;
  className?: string;
  infiniteLoading?: boolean;
}

const MapLoadingProgress: React.FC<MapLoadingProgressProps> = ({
  percentLoaded,
  showProgress,
  className,
  infiniteLoading = false
}) => {
  const [displayPercent, setDisplayPercent] = useState(0);
  
  // Animate the progress when in infinite loading mode
  useEffect(() => {
    if (!infiniteLoading) {
      // Normal mode - directly display the provided percent
      setDisplayPercent(percentLoaded);
      return;
    }
    
    // In infinite loading mode, animate slowly to 95% then jump to 100%
    let timeout: NodeJS.Timeout;
    if (displayPercent < 95) {
      timeout = setTimeout(() => {
        // Gradually slow down as we approach 95%
        const increment = displayPercent < 50 ? 2 : 
                         displayPercent < 75 ? 1 : 
                         displayPercent < 90 ? 0.5 : 0.1;
        setDisplayPercent(prev => Math.min(95, prev + increment));
      }, 100);
    } else if (percentLoaded >= 100) {
      // When signaled to complete, jump to 100%
      timeout = setTimeout(() => {
        setDisplayPercent(100);
      }, 200); // Reduced from 500ms to 200ms for faster completion
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [infiniteLoading, percentLoaded, displayPercent]);
  
  // Ensure percent is between 0-100
  const normalizedPercent = Math.min(100, Math.max(0, displayPercent));
  
  if (!showProgress) return null;
  
  return (
    <div className={cn(
      "absolute inset-0 flex flex-col items-center justify-center bg-[#080F1F]/80 z-50 animate-fade-in",
      className
    )}>
      <div className="flex flex-col items-center gap-6 max-w-xs w-full px-4">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-connectivity-accent" />
          <h3 className="text-xl font-medium text-white">Loading Map</h3>
        </div>
        
        <div className="w-full space-y-2">
          <Progress 
            value={normalizedPercent} 
            className="h-2 w-full bg-gray-700"
          />
          <div className="flex justify-between items-center text-sm text-gray-300">
            <span>Loading resources...</span>
            <span className="font-medium">{Math.round(normalizedPercent)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLoadingProgress;
