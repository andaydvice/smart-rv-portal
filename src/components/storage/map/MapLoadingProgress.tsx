
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapLoadingProgressProps {
  percentLoaded: number;
  showProgress: boolean;
  className?: string;
}

const MapLoadingProgress: React.FC<MapLoadingProgressProps> = ({
  percentLoaded,
  showProgress,
  className
}) => {
  // Ensure percent is between 0-100
  const normalizedPercent = Math.min(100, Math.max(0, percentLoaded));
  
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
