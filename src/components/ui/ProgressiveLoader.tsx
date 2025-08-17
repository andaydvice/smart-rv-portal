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
      setProgress(100);
      return;
    }

    setProgress(0);
    setCurrentStage(0);
    
    let totalElapsed = 0;
    let currentStageIndex = 0;
    
    const progressInterval = setInterval(() => {
      const currentStageData = stages[currentStageIndex];
      if (!currentStageData) {
        clearInterval(progressInterval);
        return;
      }

      const stageProgress = Math.min(totalElapsed / currentStageData.duration, 1);
      
      // Calculate total progress based on completed stages + current stage progress
      let totalProgress = 0;
      for (let i = 0; i < currentStageIndex; i++) {
        totalProgress += stages[i].weight * 100;
      }
      totalProgress += stageProgress * currentStageData.weight * 100;
      
      setProgress(Math.min(totalProgress, 95)); // Cap at 95% until complete
      
      // Update time remaining
      if (estimatedTime) {
        const remainingTime = Math.max(0, estimatedTime - (totalElapsed + (currentStageIndex * 100)));
        setTimeRemaining(remainingTime);
      }
      
      // Move to next stage if current is complete
      if (stageProgress >= 1 && currentStageIndex < stages.length - 1) {
        currentStageIndex++;
        setCurrentStage(currentStageIndex);
        totalElapsed = 0;
      } else {
        totalElapsed += 50; // 50ms intervals
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isLoading, stages, estimatedTime]);

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
      
      {/* Progress bar */}
      <div className="w-full max-w-xs space-y-2">
        <Progress 
          value={progress} 
          className="h-2 bg-muted"
        />
        
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Loading...</span>
          {showPercentage && (
            <span className="font-medium">{Math.round(progress)}%</span>
          )}
        </div>
      </div>

      {/* Additional details for detailed variant */}
      {variant === 'detailed' && (
        <div className="text-center space-y-1">
          {timeRemaining > 0 && (
            <p className="text-xs text-muted-foreground">
              Estimated time: {Math.ceil(timeRemaining / 1000)}s
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Stage {currentStage + 1} of {stages.length}
          </p>
        </div>
      )}
    </div>
  );
};