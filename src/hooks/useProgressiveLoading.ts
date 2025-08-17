import { useState, useEffect, useCallback } from 'react';

interface LoadingEvent {
  stage: string;
  progress: number; // 0-100
  message?: string;
}

interface UseProgressiveLoadingReturn {
  progress: number;
  currentStage: string;
  isLoading: boolean;
  reportProgress: (event: LoadingEvent) => void;
  startLoading: () => void;
  completeLoading: () => void;
  setStage: (stage: string, message?: string) => void;
}

export const useProgressiveLoading = (
  initialStage = 'initializing'
): UseProgressiveLoadingReturn => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(initialStage);
  const [isLoading, setIsLoading] = useState(false);

  const reportProgress = useCallback((event: LoadingEvent) => {
    setProgress(Math.min(Math.max(event.progress, 0), 100));
    setCurrentStage(event.stage);
  }, []);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setProgress(0);
    setCurrentStage(initialStage);
  }, [initialStage]);

  const completeLoading = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
    }, 200); // Small delay to show 100%
  }, []);

  const setStage = useCallback((stage: string, message?: string) => {
    setCurrentStage(stage);
  }, []);

  return {
    progress,
    currentStage,
    isLoading,
    reportProgress,
    startLoading,
    completeLoading,
    setStage
  };
};

// Hook for route-specific loading progress
export const useRouteProgress = (routePath: string) => {
  const [routeProgress, setRouteProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('');

  useEffect(() => {
    // Reset progress when route changes
    setRouteProgress(0);
    setLoadingStage('loading');
    
    // Simulate route-specific loading stages
    const stages = getRouteLoadingStages(routePath);
    let currentStageIndex = 0;
    
    const progressTimer = setInterval(() => {
      if (currentStageIndex < stages.length) {
        const stage = stages[currentStageIndex];
        setLoadingStage(stage.label);
        setRouteProgress(stage.progress);
        currentStageIndex++;
      } else {
        clearInterval(progressTimer);
        setRouteProgress(100);
      }
    }, 300);

    return () => clearInterval(progressTimer);
  }, [routePath]);

  return { routeProgress, loadingStage };
};

// Get route-specific loading stages
const getRouteLoadingStages = (routePath: string) => {
  const commonStages = [
    { label: 'Loading route...', progress: 20 },
    { label: 'Loading components...', progress: 60 },
    { label: 'Preparing interface...', progress: 90 }
  ];

  // Add route-specific stages
  if (routePath.includes('/features/')) {
    return [
      { label: 'Loading feature data...', progress: 15 },
      ...commonStages,
      { label: 'Initializing tools...', progress: 95 }
    ];
  }

  if (routePath.includes('/calculators/')) {
    return [
      { label: 'Loading calculator...', progress: 25 },
      { label: 'Setting up formulas...', progress: 55 },
      { label: 'Preparing interface...', progress: 85 }
    ];
  }

  if (routePath.includes('/models/')) {
    return [
      { label: 'Loading 3D models...', progress: 30 },
      { label: 'Initializing viewer...', progress: 70 },
      { label: 'Optimizing display...', progress: 95 }
    ];
  }

  return commonStages;
};