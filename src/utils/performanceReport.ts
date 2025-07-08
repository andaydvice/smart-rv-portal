/**
 * Performance reporting and metrics collection
 */

export interface PerformanceReport {
  loadTime: number;
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
  bundleSize: number;
  timestamp: number;
}

/**
 * Generate comprehensive performance report
 */
export const generatePerformanceReport = (): Promise<PerformanceReport> => {
  return new Promise((resolve) => {
    const report: Partial<PerformanceReport> = {
      timestamp: Date.now()
    };

    // Navigation timing
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      report.loadTime = timing.loadEventEnd - timing.navigationStart;
    }

    // Performance Observer for Web Vitals
    if ('PerformanceObserver' in window) {
      let vitalsCollected = 0;
      const totalVitals = 3; // FCP, LCP, CLS

      const finishReport = () => {
        vitalsCollected++;
        if (vitalsCollected >= totalVitals) {
          resolve(report as PerformanceReport);
        }
      };

      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcp) {
          report.fcp = fcp.startTime;
        }
        fcpObserver.disconnect();
        finishReport();
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        report.lcp = lastEntry.startTime;
        lcpObserver.disconnect();
        finishReport();
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        report.cls = clsValue;
        clsObserver.disconnect();
        finishReport();
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Fallback timeout
      setTimeout(() => {
        resolve(report as PerformanceReport);
      }, 5000);
    } else {
      // Fallback for browsers without PerformanceObserver
      setTimeout(() => {
        resolve(report as PerformanceReport);
      }, 1000);
    }
  });
};

/**
 * Log performance metrics to console with recommendations
 */
export const logPerformanceReport = (report: PerformanceReport) => {
  console.group('🚀 Performance Report');
  
  // Load Time
  console.log(`📊 Load Time: ${report.loadTime}ms ${report.loadTime > 3000 ? '⚠️ Slow' : '✅ Good'}`);
  
  // First Contentful Paint
  if (report.fcp) {
    console.log(`🎨 First Contentful Paint: ${report.fcp.toFixed(1)}ms ${report.fcp > 1500 ? '⚠️ Slow' : '✅ Good'}`);
  }
  
  // Largest Contentful Paint
  if (report.lcp) {
    console.log(`🖼️ Largest Contentful Paint: ${report.lcp.toFixed(1)}ms ${report.lcp > 2500 ? '⚠️ Slow' : '✅ Good'}`);
  }
  
  // Cumulative Layout Shift
  if (report.cls !== undefined) {
    console.log(`📐 Cumulative Layout Shift: ${report.cls.toFixed(3)} ${report.cls > 0.1 ? '⚠️ High' : '✅ Good'}`);
  }

  // Recommendations
  const recommendations = [];
  if (report.loadTime > 3000) recommendations.push('Consider code splitting and lazy loading');
  if (report.fcp && report.fcp > 1500) recommendations.push('Optimize critical CSS and reduce render-blocking resources');
  if (report.lcp && report.lcp > 2500) recommendations.push('Optimize images and consider preloading critical resources');
  if (report.cls && report.cls > 0.1) recommendations.push('Add size attributes to images and reserve space for dynamic content');

  if (recommendations.length > 0) {
    console.log('💡 Recommendations:');
    recommendations.forEach(rec => console.log(`   • ${rec}`));
  }

  console.groupEnd();
};

/**
 * Setup automatic performance monitoring
 */
export const setupPerformanceMonitoring = () => {
  // Monitor on page load
  window.addEventListener('load', async () => {
    await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3s for metrics to stabilize
    
    try {
      const report = await generatePerformanceReport();
      logPerformanceReport(report);
      
      // Send to analytics if available
      if ((window as any).gtag) {
        (window as any).gtag('event', 'performance_metrics', {
          custom_map: {
            metric1: 'load_time',
            metric2: 'fcp',
            metric3: 'lcp',
            metric4: 'cls'
          },
          metric1: report.loadTime,
          metric2: report.fcp || 0,
          metric3: report.lcp || 0,
          metric4: report.cls || 0
        });
      }
    } catch (error) {
      console.error('Performance monitoring failed:', error);
    }
  });
};