import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  tti?: number;
}

const PerformanceMonitor = () => {
  useEffect(() => {
    const metrics: PerformanceMetrics = {};
    
    // Largest Contentful Paint
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metrics.lcp = lastEntry.startTime;
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }
    };

    // First Input Delay / Interaction to Next Paint
    const observeFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.name === 'first-input-delay') {
              metrics.fid = entry.duration;
            }
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
      }
    };

    // Cumulative Layout Shift
    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          metrics.cls = clsValue;
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      }
    };

    // First Contentful Paint
    const observeFCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
            }
          });
        });
        observer.observe({ entryTypes: ['paint'] });
      }
    };

    // Navigation timing
    const observeNavigation = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            metrics.ttfb = entry.responseStart - entry.requestStart;
          });
        });
        observer.observe({ entryTypes: ['navigation'] });
      }
    };

    // Initialize all observers
    observeLCP();
    observeFID();
    observeCLS();
    observeFCP();
    observeNavigation();

    // Report metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        
        
        // Send to analytics if available
        if ((window as any).gtag) {
          (window as any).gtag('event', 'performance_metrics', {
            custom_parameter: metrics
          });
        }
      }, 3000);
    });

    // Cleanup on unmount
    return () => {
      
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;