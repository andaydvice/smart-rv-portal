import React, { useEffect } from 'react';
import { initPerformanceMonitor } from '@/perf/monitor';
import { startRUM } from '@/utils/perf/rum';
import { handleBotOptimizations, isBot } from '@/utils/prerender';
import { initializePerformanceMonitoring } from '@/utils/seo-performance-monitor';

const PerformanceReporter: React.FC = () => {
  useEffect(() => {
    const isDev = import.meta.env.DEV;
    const enableOverlay = isDev ? true : localStorage.getItem('perfOverlay') === '1';

    // Handle bot optimizations first
    handleBotOptimizations();

    const prodBudgets = { totalBundleKB: 200, jsKB: 150, cssKB: 50, imageMaxKB: 200, firstPartyTotalKB: 300 };
    const devBudgets = { totalBundleKB: 320, jsKB: 240, cssKB: 80, imageMaxKB: 300, firstPartyTotalKB: 480 };

    initPerformanceMonitor({
      enableOverlay,
      budgets: isDev ? devBudgets : prodBudgets,
    });

    // Enhanced Web Vitals monitoring for SEO
    if (typeof window !== 'undefined' && 'performance' in window) {
      import('web-vitals').then((webVitals) => {
        // Core Web Vitals for SEO ranking
        if (webVitals.onCLS) {
          webVitals.onCLS((metric) => {
            console.log('CLS:', metric.value, metric.value <= 0.1 ? '✅ Good' : metric.value <= 0.25 ? '⚠️ Needs Improvement' : '❌ Poor');
            // Track for analytics
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                metric_name: 'CLS',
                metric_value: metric.value,
                metric_rating: metric.value <= 0.1 ? 'good' : metric.value <= 0.25 ? 'needs_improvement' : 'poor'
              });
            }
          });
        }
        
        if (webVitals.onFCP) {
          webVitals.onFCP((metric) => {
            console.log('FCP:', metric.value, 'ms', metric.value <= 1800 ? '✅ Good' : metric.value <= 3000 ? '⚠️ Needs Improvement' : '❌ Poor');
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                metric_name: 'FCP',
                metric_value: metric.value
              });
            }
          });
        }
        
        if (webVitals.onLCP) {
          webVitals.onLCP((metric) => {
            console.log('LCP:', metric.value, 'ms', metric.value <= 2500 ? '✅ Good' : metric.value <= 4000 ? '⚠️ Needs Improvement' : '❌ Poor');
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                metric_name: 'LCP',
                metric_value: metric.value,
                metric_rating: metric.value <= 2500 ? 'good' : metric.value <= 4000 ? 'needs_improvement' : 'poor'
              });
            }
          });
        }

        // INP (replacing FID)
        if (webVitals.onINP) {
          webVitals.onINP((metric) => {
            console.log('INP:', metric.value, 'ms', metric.value <= 200 ? '✅ Good' : metric.value <= 500 ? '⚠️ Needs Improvement' : '❌ Poor');
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                metric_name: 'INP',
                metric_value: metric.value,
                metric_rating: metric.value <= 200 ? 'good' : metric.value <= 500 ? 'needs_improvement' : 'poor'
              });
            }
          });
        }

        if (webVitals.onTTFB) {
          webVitals.onTTFB((metric) => {
            console.log('TTFB:', metric.value, 'ms', metric.value <= 800 ? '✅ Good' : '⚠️ Could be better');
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                metric_name: 'TTFB',
                metric_value: metric.value
              });
            }
          });
        }

        // Legacy FID for older browsers
        if (webVitals.onFID) {
          webVitals.onFID((metric) => {
            console.log('FID:', metric.value, 'ms', metric.value <= 100 ? '✅ Good' : metric.value <= 300 ? '⚠️ Needs Improvement' : '❌ Poor');
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                metric_name: 'FID',
                metric_value: metric.value,
                metric_rating: metric.value <= 100 ? 'good' : metric.value <= 300 ? 'needs_improvement' : 'poor'
              });
            }
          });
        }

      }).catch(() => {
        console.log('Web Vitals library not available');
      });
    }

    // Initialize comprehensive SEO & Performance monitoring (Phase 4)
    const monitor = initializePerformanceMonitoring();
    
    // Report Phase 4 completion status after a delay
    setTimeout(() => {
      const phase4Status = monitor.getPhase4CompletionStatus();
      console.log('🚀 Phase 4 Completion Status:', phase4Status);
      
      if (phase4Status.completed) {
        console.log('🎉 Phase 4: Performance & Crawlability - COMPLETE!');
        console.log('✅ All SEO phases completed successfully');
      }
    }, 5000);

    if (!isDev && !isBot()) {
      const idle = (cb: () => void) =>
        (window as any).requestIdleCallback ? (window as any).requestIdleCallback(cb, { timeout: 2000 }) : setTimeout(cb, 500);
      idle(() => startRUM({ sampleRate: 0.5 }));
    }
  }, []);
  return null;
};

export default PerformanceReporter;
