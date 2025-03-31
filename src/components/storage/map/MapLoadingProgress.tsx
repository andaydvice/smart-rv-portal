
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Loader2 } from 'lucide-react';

interface MapLoadingProgressProps {
  percentLoaded: number;
  showProgress: boolean;
  infiniteLoading?: boolean;
  forceComplete?: boolean;
}

const MapLoadingProgress: React.FC<MapLoadingProgressProps> = ({ 
  percentLoaded, 
  showProgress, 
  infiniteLoading = false,
  forceComplete = false
}) => {
  const [displayPercent, setDisplayPercent] = useState(percentLoaded);
  
  // Handle animation of progress bar
  useEffect(() => {
    if (forceComplete && percentLoaded >= 95) {
      // Quickly animate to 100% when forceComplete is true and we're nearly done
      const timer = setTimeout(() => setDisplayPercent(100), 300);
      return () => clearTimeout(timer);
    } else {
      // Normal progress updates
      setDisplayPercent(percentLoaded);
    }
  }, [percentLoaded, forceComplete]);

  if (!showProgress) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
      <div className="w-64 space-y-4 text-center">
        {infiniteLoading ? (
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-[#5B9BD5]" />
            <p className="text-sm text-white">Loading map resources...</p>
          </div>
        ) : (
          <>
            <Progress 
              value={displayPercent} 
              className="h-2 bg-gray-700"
              // Make progress bar branded
              style={{
                '--progress-background': '#131a2a',
                '--progress-foreground': '#5B9BD5'
              } as React.CSSProperties}
            />
            <p className="text-sm text-white">{displayPercent}% loaded</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MapLoadingProgress;
