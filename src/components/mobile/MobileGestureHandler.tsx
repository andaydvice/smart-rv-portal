
import React, { useEffect, useRef, ReactNode } from 'react';
import { createResizeHandler } from '@/utils/domPerformance';

interface MobileGestureHandlerProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPullToRefresh?: () => void;
  swipeThreshold?: number;
  refreshThreshold?: number;
  className?: string;
}

export const MobileGestureHandler: React.FC<MobileGestureHandlerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPullToRefresh,
  swipeThreshold = 50,
  refreshThreshold = 80,
  className = '',
}) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isRefreshing = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || e.changedTouches.length !== 1) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };

      const deltaX = touchEnd.x - touchStartRef.current.x;
      const deltaY = touchEnd.y - touchStartRef.current.y;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Determine swipe direction
      if (absDeltaX > swipeThreshold && absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else if (absDeltaY > swipeThreshold && absDeltaY > absDeltaX) {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }

        // Pull to refresh - defer scroll position check to avoid forced reflow
        if (
          deltaY > refreshThreshold &&
          onPullToRefresh &&
          !isRefreshing
        ) {
          // Use requestAnimationFrame to check scroll position
          requestAnimationFrame(() => {
            if (container.scrollTop === 0) {
              isRefreshing = true;
              onPullToRefresh();
              setTimeout(() => {
                isRefreshing = false;
              }, 2000);
            }
          });
        }
      }

      touchStartRef.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Add momentum scrolling for iOS without querying dimensions
      const target = e.currentTarget as HTMLElement;
      if (target && target.style && !target.style.webkitOverflowScrolling) {
        // Use requestAnimationFrame to defer style changes
        requestAnimationFrame(() => {
          target.style.setProperty('-webkit-overflow-scrolling', 'touch');
        });
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPullToRefresh,
    swipeThreshold,
    refreshThreshold,
  ]);

  return (
    <div
      ref={containerRef}
      className={`${className} touch-manipulation overscroll-contain`}
      style={{
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      {children}
    </div>
  );
};
