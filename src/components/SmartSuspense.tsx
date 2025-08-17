import React, { Suspense, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { RouteSkeleton } from '@/components/ui/skeletons';
import { isRouteVisited } from '@/hooks/useRouteCache';

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

  // For previously visited routes, show minimal loading
  // For new routes, show full skeleton
  const smartFallback = fallback || (
    hasVisited ? (
      <div className="min-h-screen bg-deeper-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ) : (
      <RouteSkeleton type={type} />
    )
  );

  return (
    <Suspense fallback={smartFallback}>
      {children}
    </Suspense>
  );
};