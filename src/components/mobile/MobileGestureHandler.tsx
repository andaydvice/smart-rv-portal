
import React, { ReactNode, useEffect } from 'react';
import { deferOperation } from '@/utils/performance';
import { batchDOMReads, batchDOMWrites } from '@/utils/domPerformance';

export interface MobileGestureHandlerProps {
  children: ReactNode;
}

export const MobileGestureHandler: React.FC<MobileGestureHandlerProps> = ({ children }) => {
  useEffect(() => {
    // Defer scroll position checks to prevent forced reflows
    const handleTouchMove = () => {
      deferOperation(() => {
        const body = document.body;
        if (body) {
          batchDOMReads([{
            element: body,
            property: 'scrollTop',
            callback: (scrollTop) => {
              if (scrollTop > 0) {
                batchDOMWrites([{
                  element: body,
                  styles: { 
                    '-webkit-overflow-scrolling': 'touch' 
                  } as any
                }]);
              }
            }
          }]);
        }
      }, 100);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, []);

  return <>{children}</>;
};
