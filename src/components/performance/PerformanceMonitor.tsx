import { useEffect } from 'react';

interface PerformanceMetrics {
  pageName: string;
  enableCoreWebVitals?: boolean;
  enableResourceTiming?: boolean;
  enableNavigationTiming?: boolean;
}

const PerformanceMonitor = ({ 
  pageName, 
  enableCoreWebVitals = true,
  enableResourceTiming = true,
  enableNavigationTiming = true 
}: PerformanceMetrics) => {
  
  useEffect(() => {
    // Core Web Vitals monitoring
    if (enableCoreWebVitals && 'PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`LCP for ${pageName}:`, lastEntry.startTime, 'ms');
        
        // Log performance data
        if (lastEntry.startTime > 2500) {
          console.warn(`⚠️ LCP is slow on ${pageName}: ${lastEntry.startTime}ms (target: <2.5s)`);
        }
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.log('LCP not supported');
      }

      // First Input Delay (FID) / Interaction to Next Paint (INP)
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          console.log(`FID for ${pageName}:`, entry.processingStart - entry.startTime, 'ms');
          
          if (entry.processingStart - entry.startTime > 100) {
            console.warn(`⚠️ FID is slow on ${pageName}: ${entry.processingStart - entry.startTime}ms (target: <100ms)`);
          }
        });
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.log('FID not supported');
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        console.log(`CLS for ${pageName}:`, clsValue);
        
        if (clsValue > 0.1) {
          console.warn(`⚠️ CLS is high on ${pageName}: ${clsValue} (target: <0.1)`);
        }
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.log('CLS not supported');
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, [pageName, enableCoreWebVitals]);

  useEffect(() => {
    // Navigation timing
    if (enableNavigationTiming && 'performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          const metrics = {
            page: pageName,
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            ttfb: navigation.responseStart - navigation.requestStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
            loadComplete: navigation.loadEventEnd - navigation.fetchStart,
          };
          
          console.log(`Navigation timing for ${pageName}:`, metrics);
          
          // Performance budget checks
          if (metrics.loadComplete > 3000) {
            console.warn(`⚠️ Page load time exceeds 3s on ${pageName}: ${metrics.loadComplete}ms`);
          }
          
          if (metrics.ttfb > 600) {
            console.warn(`⚠️ TTFB is slow on ${pageName}: ${metrics.ttfb}ms (target: <600ms)`);
          }
        }, 0);
      });
    }
  }, [pageName, enableNavigationTiming]);

  useEffect(() => {
    // Resource timing for affiliate images and scripts
    if (enableResourceTiming && 'PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          // Monitor affiliate-related resources
          if (entry.name.includes('amazon.com') || 
              entry.name.includes('renogy.com') || 
              entry.name.includes('lovable-uploads')) {
            
            const loadTime = entry.responseEnd - entry.startTime;
            console.log(`Resource timing for ${entry.name}:`, loadTime, 'ms');
            
            if (loadTime > 2000) {
              console.warn(`⚠️ Slow resource load: ${entry.name} took ${loadTime}ms`);
            }
          }
        });
      });

      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        console.log('Resource timing not supported');
      }

      return () => resourceObserver.disconnect();
    }
  }, [pageName, enableResourceTiming]);

  // Bundle size monitoring
  useEffect(() => {
    if ('navigator' in window && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      console.log(`Network info for ${pageName}:`, {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      });
    }
  }, [pageName]);

  return null; // This is a monitoring component, no visual output
};

export default PerformanceMonitor;