import React, { Suspense, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { RouteSkeleton } from '@/components/ui/skeletons';
import { isRouteVisited } from '@/hooks/useRouteCache';
import { ProgressiveLoader } from '@/components/ui/ProgressiveLoader';
import { useRouteProgress } from '@/hooks/useProgressiveLoading';

interface SmartSuspenseProps {
  children: ReactNode;
  fallback?: ReactNode;
  type?: 'page' | 'content' | 'features' | 'calculators' | 'models';
}

/**
 * Smart Suspense component that shows minimal loading for visited routes
 * and full skeleton for new routes
 */
export const SmartSuspense = ({ 
  children, 
  fallback, 
  type = 'content' 
}: SmartSuspenseProps) => {
  const location = useLocation();
  const hasVisited = isRouteVisited(location.pathname);
  const { routeProgress, loadingStage } = useRouteProgress(location.pathname);

  // For previously visited routes, show progressive loader
  // For new routes, show full skeleton with progress
  const smartFallback = fallback || (
    hasVisited ? (
      <div className="min-h-screen bg-deeper-background flex items-center justify-center">
        <ProgressiveLoader
          isLoading={true}
          variant="minimal"
          showPercentage={false}
        />
      </div>
    ) : (
      <div className="min-h-screen bg-deeper-background">
        <div className="flex items-center justify-center pt-20 pb-8">
          <ProgressiveLoader
            isLoading={true}
            variant="detailed"
            estimatedTime={2000}
          />
        </div>
        <RouteSkeleton type={type} />
      </div>
    )
  );

  return (
    <Suspense fallback={smartFallback}>
      {children}
    </Suspense>
  );
};