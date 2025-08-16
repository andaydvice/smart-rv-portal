import React, { useState, useEffect, useCallback } from 'react';
import ProgressiveLoader from './ProgressiveLoader';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateManagerProps {
  children: React.ReactNode;
  initialLoading?: boolean;
  fallbackComponent?: React.ReactNode;
  showSkeleton?: boolean;
  onLoadingComplete?: () => void;
}

export const LoadingStateManager: React.FC<LoadingStateManagerProps> = ({
  children,
  initialLoading = true,
  fallbackComponent,
  showSkeleton = false,
  onLoadingComplete
}) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [showContent, setShowContent] = useState(!initialLoading);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Slight delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
      onLoadingComplete?.();
    }, 100);
  }, [onLoadingComplete]);

  useEffect(() => {
    if (!initialLoading) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, [initialLoading]);

  if (isLoading) {
    return (
      <ProgressiveLoader
        isVisible={true}
        onComplete={handleLoadingComplete}
      />
    );
  }

  if (!showContent && showSkeleton) {
    return (
      fallbackComponent || (
        <div className="min-h-screen bg-[#080F1F] p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-16 w-full bg-[#151A22]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-32 w-full bg-[#151A22]" />
              <Skeleton className="h-32 w-full bg-[#151A22]" />
              <Skeleton className="h-32 w-full bg-[#151A22]" />
            </div>
            <Skeleton className="h-64 w-full bg-[#151A22]" />
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default LoadingStateManager;