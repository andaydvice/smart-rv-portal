import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStage {
  id: string;
  label: string;
  duration: number; // Expected duration in ms
  weight: number; // Progress weight (0-1)
}

interface ProgressiveLoaderProps {
  isLoading: boolean;
  stages?: LoadingStage[];
  className?: string;
  variant?: 'default' | 'minimal' | 'detailed';
  showPercentage?: boolean;
  estimatedTime?: number;
}

const DEFAULT_STAGES: LoadingStage[] = [
  { id: 'initializing', label: 'Initializing...', duration: 300, weight: 0.2 },
  { id: 'loading', label: 'Loading components...', duration: 800, weight: 0.5 },
  { id: 'preparing', label: 'Preparing interface...', duration: 400, weight: 0.2 },
  { id: 'finalizing', label: 'Almost ready...', duration: 200, weight: 0.1 }
];

export const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({
  isLoading,
  stages = DEFAULT_STAGES,
  className,
  variant = 'default',
  showPercentage = true,
  estimatedTime
}) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(estimatedTime || 2000);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setCurrentStage(0);
      return;
    }
    
    // Simple stage progression without fake progress
    let currentStageIndex = 0;
    setCurrentStage(0);
    
    const stageInterval = setInterval(() => {
      if (currentStageIndex < stages.length - 1) {
        currentStageIndex++;
        setCurrentStage(currentStageIndex);
      }
    }, 800); // Switch stages every 800ms

    return () => clearInterval(stageInterval);
  }, [isLoading, stages]);

  if (!isLoading) return null;

  const currentStageData = stages[currentStage];

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center space-y-4 p-6",
      variant === 'detailed' ? "min-h-[200px]" : "min-h-[120px]",
      className
    )}>
      {/* Main loader icon */}
      <div className="flex items-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <h3 className="text-lg font-medium text-foreground">
          {currentStageData?.label || 'Loading...'}
        </h3>
      </div>
      
      {/* Simple loading indicator */}
      <div className="text-sm text-muted-foreground">
        Please wait...
      </div>

      {/* Additional details for detailed variant */}
      {variant === 'detailed' && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Step {currentStage + 1} of {stages.length}
          </p>
        </div>
      )}
    </div>
  );
};