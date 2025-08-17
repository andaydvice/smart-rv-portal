import React from 'react';

interface RouteSkeletonProps {
  type?: 'page' | 'content' | 'features' | 'calculators' | 'models';
}

export const RouteSkeleton = ({ type = 'page' }: RouteSkeletonProps) => {
  const renderContentSkeleton = () => {
    switch (type) {
      case 'features':
        return (
          <div className="space-y-8">
            {/* Header skeleton */}
            <div className="space-y-4">
              <div className="h-12 bg-muted/50 rounded-lg animate-pulse" />
              <div className="h-6 bg-muted/30 rounded animate-pulse w-2/3" />
            </div>
            
            {/* Feature grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4 p-6 bg-muted/20 rounded-lg animate-pulse">
                  <div className="h-8 w-8 bg-muted/50 rounded" />
                  <div className="h-6 bg-muted/50 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/30 rounded" />
                    <div className="h-4 bg-muted/30 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'calculators':
        return (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="h-12 bg-muted/50 rounded-lg animate-pulse mx-auto w-1/2" />
              <div className="h-6 bg-muted/30 rounded animate-pulse mx-auto w-2/3" />
            </div>
            
            {/* Calculator grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="p-6 bg-connectivity-darkBg/50 rounded-lg space-y-4 animate-pulse">
                  <div className="h-6 bg-muted/50 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/30 rounded" />
                    <div className="h-4 bg-muted/30 rounded w-4/5" />
                  </div>
                  <div className="h-10 bg-primary/20 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'models':
        return (
          <div className="space-y-12">
            {/* Hero section */}
            <div className="text-center space-y-6">
              <div className="h-16 bg-muted/50 rounded-lg animate-pulse mx-auto w-1/2" />
              <div className="h-6 bg-muted/30 rounded animate-pulse mx-auto w-3/4" />
            </div>
            
            {/* Model cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-6 p-8 bg-connectivity-darkBg/50 rounded-xl animate-pulse">
                  <div className="h-48 bg-muted/30 rounded-lg" />
                  <div className="space-y-4">
                    <div className="h-8 bg-muted/50 rounded w-2/3" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted/30 rounded" />
                      <div className="h-4 bg-muted/30 rounded w-5/6" />
                    </div>
                    <div className="h-12 bg-primary/20 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'content':
        return (
          <div className="space-y-8">
            {/* Article header */}
            <div className="space-y-4">
              <div className="h-12 bg-muted/50 rounded-lg animate-pulse" />
              <div className="h-4 bg-muted/30 rounded w-1/3 animate-pulse" />
            </div>
            
            {/* Content blocks */}
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-6 bg-muted/40 rounded w-1/4 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/30 rounded animate-pulse" />
                    <div className="h-4 bg-muted/30 rounded w-11/12 animate-pulse" />
                    <div className="h-4 bg-muted/30 rounded w-4/5 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-8">
            {/* Default page skeleton */}
            <div className="space-y-4">
              <div className="h-12 bg-muted/50 rounded-lg animate-pulse" />
              <div className="h-6 bg-muted/30 rounded animate-pulse w-2/3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4 p-6 bg-muted/20 rounded-lg animate-pulse">
                  <div className="h-6 bg-muted/50 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/30 rounded" />
                    <div className="h-4 bg-muted/30 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-deeper-background">
      <div className="container mx-auto px-4 py-8">
        {renderContentSkeleton()}
      </div>
    </div>
  );
};

export default RouteSkeleton;