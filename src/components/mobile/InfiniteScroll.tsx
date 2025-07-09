import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfiniteScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  loadMore: () => Promise<T[]>;
  hasMore: boolean;
  loading?: boolean;
  threshold?: number;
  className?: string;
  emptyState?: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

function InfiniteScroll<T>({
  items,
  renderItem,
  loadMore,
  hasMore,
  loading = false,
  threshold = 200,
  className = "",
  emptyState,
  loadingComponent
}: InfiniteScrollProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const handleLoadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore || loading) return;
    
    loadingRef.current = true;
    setIsLoading(true);
    
    try {
      await loadMore();
    } catch (error) {
      // Failed to load more items
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [loadMore, hasMore, loading]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading && !loading) {
          handleLoadMore();
        }
      },
      {
        rootMargin: `${threshold}px`,
        threshold: 0.1
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleLoadMore, hasMore, isLoading, loading, threshold]);

  if (items.length === 0 && !loading) {
    return (
      <div className={cn("flex items-center justify-center py-12", className)}>
        {emptyState || (
          <div className="text-center text-gray-400">
            <p className="text-lg mb-2">No items found</p>
            <p className="text-sm">Pull down to refresh or check back later</p>
          </div>
        )}
      </div>
    );
  }

  const defaultLoadingComponent = (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="h-6 w-6 animate-spin text-[#5B9BD5] mr-2" />
      <span className="text-gray-400">Loading more...</span>
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Render items */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="w-full">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Loading state */}
      {(isLoading || loading) && (
        <div className="mt-6">
          {loadingComponent || defaultLoadingComponent}
        </div>
      )}

      {/* Observer target for infinite scroll */}
      {hasMore && !isLoading && !loading && (
        <div 
          ref={observerRef} 
          className="h-4 w-full"
          aria-hidden="true"
        />
      )}

      {/* End of list indicator */}
      {!hasMore && items.length > 0 && (
        <div className="text-center py-8 text-gray-400">
          <div className="inline-flex items-center gap-2">
            <div className="h-px bg-gray-600 w-12"></div>
            <span className="text-sm">You've reached the end</span>
            <div className="h-px bg-gray-600 w-12"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfiniteScroll;