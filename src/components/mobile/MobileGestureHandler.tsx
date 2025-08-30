
import { useEffect, useRef } from 'react';
import { batchDOMReads, batchDOMWrites } from '@/utils/domPerformance';

interface MobileGestureHandlerProps {
  children: React.ReactNode;
}

export const MobileGestureHandler = ({ children }: MobileGestureHandlerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const handleTouchStart = (e: TouchEvent) => {
      // Enable momentum scrolling on iOS without TypeScript error
      if (container.style) {
        (container.style as any).webkitOverflowScrolling = 'touch';
      }
    };

    const handleScroll = () => {
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Batch scroll position reads to prevent forced reflow
      scrollTimeoutRef.current = setTimeout(() => {
        batchDOMReads(() => {
          const scrollY = window.scrollY;
          // Process scroll position without causing reflow
          if (scrollY > 100) {
            // Handle scroll behavior
          }
        });
      }, 16); // Throttle to ~60fps
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
};
