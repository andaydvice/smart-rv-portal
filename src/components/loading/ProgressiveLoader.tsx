import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Loader2, Wifi, Database, Layout, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStage {
  id: string;
  message: string;
  icon: React.ElementType;
  duration: number;
  progress: number;
}

interface ProgressiveLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
  className?: string;
}

const loadingStages: LoadingStage[] = [
  { id: 'init', message: 'Initializing application...', icon: Loader2, duration: 800, progress: 20 },
  { id: 'network', message: 'Establishing connections...', icon: Wifi, duration: 600, progress: 45 },
  { id: 'data', message: 'Loading components...', icon: Database, duration: 700, progress: 70 },
  { id: 'ui', message: 'Preparing interface...', icon: Layout, duration: 500, progress: 90 },
  { id: 'complete', message: 'Ready!', icon: CheckCircle, duration: 300, progress: 100 }
];

const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({
  isVisible,
  onComplete,
  className
}) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(isVisible);

  useEffect(() => {
    if (!isVisible) return;

    let stageTimeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const advanceStage = () => {
      if (currentStage < loadingStages.length - 1) {
        setCurrentStage(prev => prev + 1);
      } else {
        // Completed all stages
        setTimeout(() => {
          setShowLoader(false);
          onComplete?.();
        }, 500);
      }
    };

    const updateProgress = () => {
      const stage = loadingStages[currentStage];
      const targetProgress = stage.progress;
      
      progressInterval = setInterval(() => {
        setProgress(prev => {
          const increment = (targetProgress - prev) / 10;
          const newProgress = prev + Math.max(increment, 1);
          
          if (newProgress >= targetProgress) {
            clearInterval(progressInterval);
            stageTimeout = setTimeout(advanceStage, 200);
            return targetProgress;
          }
          
          return newProgress;
        });
      }, 50);
    };

    updateProgress();

    return () => {
      clearTimeout(stageTimeout);
      clearInterval(progressInterval);
    };
  }, [currentStage, isVisible, onComplete]);

  if (!showLoader) return null;

  const currentStageData = loadingStages[currentStage];
  const IconComponent = currentStageData.icon;

  return (
    <div className={cn(
      "fixed inset-0 bg-[#080F1F]/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4",
      "animate-fade-in",
      currentStage === loadingStages.length - 1 ? "animate-fade-out" : "",
      className
    )}>
      {/* Mobile-optimized loading interface */}
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        {/* App Logo/Brand */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#5B9BD5] to-[#4B8FE3] flex items-center justify-center">
            <span className="text-white font-bold text-xl">RV</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Smart RV Hub</h2>
            <p className="text-sm text-[#E2E8FF]">Technology Portal</p>
          </div>
        </div>

        {/* Loading Icon and Stage */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-[#151A22] border-2 border-[#5B9BD5] flex items-center justify-center">
              <IconComponent 
                className={cn(
                  "w-8 h-8 text-[#5B9BD5]",
                  currentStageData.icon === Loader2 && "animate-spin",
                  currentStageData.icon === CheckCircle && "text-green-400"
                )} 
              />
            </div>
            {/* Progress ring */}
            <svg className="absolute inset-0 w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#1a202c"
                strokeWidth="4"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#5B9BD5"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                className="transition-all duration-300 ease-out"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="text-center space-y-2">
            <p className="text-white font-medium text-lg">
              {currentStageData.message}
            </p>
            <p className="text-[#E2E8FF] text-sm">
              {Math.round(progress)}% complete
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <Progress 
            value={progress} 
            className="h-2 w-full bg-[#1a202c]"
          />
          
          {/* Stage indicators */}
          <div className="flex justify-between items-center w-full">
            {loadingStages.slice(0, -1).map((stage, index) => (
              <div
                key={stage.id}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-300",
                  index <= currentStage ? "bg-[#5B9BD5]" : "bg-[#1a202c]"
                )}
              />
            ))}
          </div>
        </div>

        {/* Performance tip */}
        <div className="text-center mt-4">
          <p className="text-xs text-[#E2E8FF]/70">
            Optimizing for your device...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressiveLoader;