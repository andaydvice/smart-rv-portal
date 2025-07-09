import React, { useState, useCallback, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
  resistance?: number;
  className?: string;
}

const PullToRefresh = ({
  onRefresh,
  children,
  threshold = 60,
  resistance = 2.5,
  className = ""
}: PullToRefreshProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canPull, setCanPull] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Only allow pull-to-refresh at the top of the page
    if (window.scrollY === 0 && !isRefreshing) {
      startY.current = e.touches[0].clientY;
      setCanPull(true);
    }
  }, [isRefreshing]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!canPull || isRefreshing) return;

    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;

    if (deltaY > 0 && window.scrollY === 0) {
      e.preventDefault();
      isDragging.current = true;
      
      // Apply resistance
      const distance = Math.min(deltaY / resistance, threshold * 1.5);
      setPullDistance(distance);
      
      // Add haptic feedback when threshold is reached
      if (distance >= threshold && navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  }, [canPull, isRefreshing, threshold, resistance]);

  const handleTouchEnd = useCallback(async () => {
    if (!isDragging.current || isRefreshing) return;

    isDragging.current = false;
    setCanPull(false);

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      
      try {
        await onRefresh();
      } catch (error) {
        // Refresh failed
      } finally {
        setIsRefreshing(false);
      }
    }

    setPullDistance(0);
  }, [pullDistance, threshold, onRefresh, isRefreshing]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add touch event listeners with passive: false to prevent default scrolling
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const refreshIndicatorHeight = Math.min(pullDistance, threshold);
  const isTriggered = pullDistance >= threshold;
  const rotation = isRefreshing ? 'animate-spin' : isTriggered ? 'rotate-180' : '';

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Pull-to-refresh indicator */}
      <div 
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#5B9BD5]/90 to-transparent transition-all duration-200"
        style={{ 
          height: `${refreshIndicatorHeight}px`,
          transform: `translateY(-${threshold - refreshIndicatorHeight}px)`
        }}
      >
        <div className={cn(
          "flex items-center gap-2 text-white transition-all duration-200",
          refreshIndicatorHeight > 20 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        )}>
          <RefreshCw className={cn("h-5 w-5 transition-transform duration-200", rotation)} />
          <span className="text-sm font-medium">
            {isRefreshing ? 'Refreshing...' : isTriggered ? 'Release to refresh' : 'Pull to refresh'}
          </span>
        </div>
      </div>

      {/* Content with transform */}
      <div 
        className="transition-transform duration-200"
        style={{ 
          transform: `translateY(${pullDistance}px)`
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;