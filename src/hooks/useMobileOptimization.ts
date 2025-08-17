import { useEffect, useState } from 'react';

interface MobileInfo {
  isMobile: boolean;
  isTablet: boolean;
  isTouch: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
  connection: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  } | null;
}

export const useMobileOptimization = (): MobileInfo => {
  const [mobileInfo, setMobileInfo] = useState<MobileInfo>({
    isMobile: false,
    isTablet: false,
    isTouch: false,
    screenSize: 'desktop',
    orientation: 'landscape',
    connection: null,
  });

  useEffect(() => {
    const updateMobileInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      let screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (isMobile) screenSize = 'mobile';
      else if (isTablet) screenSize = 'tablet';

      const orientation = height > width ? 'portrait' : 'landscape';

      // Get connection info if available
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection || null;
      const connectionInfo = connection ? {
        effectiveType: connection.effectiveType || '4g',
        downlink: connection.downlink || 10,
        rtt: connection.rtt || 100,
      } : null;

      setMobileInfo({
        isMobile,
        isTablet,
        isTouch,
        screenSize,
        orientation,
        connection: connectionInfo,
      });
    };

    updateMobileInfo();
    window.addEventListener('resize', updateMobileInfo);
    window.addEventListener('orientationchange', updateMobileInfo);

    return () => {
      window.removeEventListener('resize', updateMobileInfo);
      window.removeEventListener('orientationchange', updateMobileInfo);
    };
  }, []);

  return mobileInfo;
};

// Enhanced touch target utilities
export const getTouchTargetClasses = (size: 'small' | 'medium' | 'large' = 'medium') => {
  const sizes = {
    small: 'min-h-[44px] min-w-[44px]', // Minimum accessibility standard
    medium: 'min-h-[48px] min-w-[48px]', // Comfortable touch target
    large: 'min-h-[56px] min-w-[56px]', // Large touch target for primary actions
  };
  
  return `${sizes[size]} touch-manipulation select-none active:scale-95 transition-transform duration-150`;
};

// Mobile-specific performance utilities
export const getMobilePerformanceClasses = () => {
  return 'will-change-transform transform-gpu backface-hidden';
};

// Enhanced focus management for mobile
export const getMobileFocusClasses = () => {
  return 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';
};