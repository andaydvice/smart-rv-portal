/**
 * Performance monitoring utilities for loading states and user experience
 */

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  timeToInteractive: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

interface LoadingMetrics {
  stage: string;
  startTime: number;
  endTime?: number;
  duration?: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private loadingStages: LoadingMetrics[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    try {
      // Observe paint metrics
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime;
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(paintObserver);

      // Observe LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // Observe CLS
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.metrics.cumulativeLayoutShift = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);

      // Observe FID
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);

    } catch (error) {
      console.warn('Performance monitoring not supported:', error);
    }
  }

  // Track loading stage performance
  startLoadingStage(stage: string) {
    const loadingMetric: LoadingMetrics = {
      stage,
      startTime: performance.now()
    };
    this.loadingStages.push(loadingMetric);
    
    // Mark for timeline
    if (performance.mark) {
      performance.mark(`loading-stage-${stage}-start`);
    }
  }

  endLoadingStage(stage: string) {
    const endTime = performance.now();
    const stageMetric = this.loadingStages.find(s => s.stage === stage && !s.endTime);
    
    if (stageMetric) {
      stageMetric.endTime = endTime;
      stageMetric.duration = endTime - stageMetric.startTime;
      
      // Mark for timeline
      if (performance.mark && performance.measure) {
        performance.mark(`loading-stage-${stage}-end`);
        performance.measure(
          `loading-stage-${stage}`,
          `loading-stage-${stage}-start`,
          `loading-stage-${stage}-end`
        );
      }
    }
  }

  // Get comprehensive performance report
  getPerformanceReport(): {
    webVitals: Partial<PerformanceMetrics>;
    loadingStages: LoadingMetrics[];
    loadTime: number;
    recommendations: string[];
  } {
    const loadTime = performance.now();
    const recommendations = this.generateRecommendations();

    return {
      webVitals: this.metrics,
      loadingStages: this.loadingStages,
      loadTime,
      recommendations
    };
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.metrics.firstContentfulPaint && this.metrics.firstContentfulPaint > 1500) {
      recommendations.push('Consider optimizing critical CSS and JavaScript for faster initial render');
    }
    
    if (this.metrics.largestContentfulPaint && this.metrics.largestContentfulPaint > 2500) {
      recommendations.push('Optimize largest content element (images, text blocks) for better LCP');
    }
    
    if (this.metrics.cumulativeLayoutShift && this.metrics.cumulativeLayoutShift > 0.1) {
      recommendations.push('Reduce layout shifts by specifying image dimensions and avoiding dynamic content insertion');
    }
    
    if (this.metrics.firstInputDelay && this.metrics.firstInputDelay > 100) {
      recommendations.push('Optimize JavaScript execution to improve response to user interactions');
    }

    const totalLoadingTime = this.loadingStages.reduce((total, stage) => total + (stage.duration || 0), 0);
    if (totalLoadingTime > 3000) {
      recommendations.push('Consider reducing the number of loading stages or optimizing stage transitions');
    }

    return recommendations;
  }

  // Monitor route changes and loading performance
  trackRouteChange(route: string) {
    this.startLoadingStage(`route-${route}`);
    
    // Track with analytics (async import)
    import('@/types/analytics').then(({ safeGtag }) => {
      safeGtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
      });
    }).catch(() => {
      // Silently fail analytics
    });
  }

  // Clean up observers
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Helper functions
export const measureLoadingTime = (stageName: string) => {
  return {
    start: () => performanceMonitor.startLoadingStage(stageName),
    end: () => performanceMonitor.endLoadingStage(stageName)
  };
};

export const getWebVitals = () => {
  return new Promise<Partial<PerformanceMetrics>>((resolve) => {
    // Wait a bit for metrics to be collected
    setTimeout(() => {
      resolve(performanceMonitor.getPerformanceReport().webVitals);
    }, 100);
  });
};

export const logPerformanceReport = () => {
  if (process.env.NODE_ENV === 'development') {
    const report = performanceMonitor.getPerformanceReport();
    console.group('🚀 Performance Report');
    console.log('Web Vitals:', report.webVitals);
    console.log('Loading Stages:', report.loadingStages);
    console.log('Total Load Time:', Math.round(report.loadTime), 'ms');
    if (report.recommendations.length > 0) {
      console.warn('Recommendations:', report.recommendations);
    }
    console.groupEnd();
  }
};