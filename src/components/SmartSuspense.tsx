import React, { Suspense, ReactNode } from 'react';
import { MinimalLoader } from '@/components/ui/MinimalLoader';

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
  // Always use minimal loading
  const smartFallback = fallback || <MinimalLoader />;

  return (
    <Suspense fallback={smartFallback}>
      {children}
    </Suspense>
  );
};