import { useEffect, useRef } from 'react';

interface WebVitalsData {
  lcp?: number;
  fid?: number;
  cls?: number;
  inp?: number;
  fcp?: number;
  ttfb?: number;
  timestamp: string;
  url: string;
  userAgent: string;
  connectionType?: string;
}

interface CoreWebVitalsMonitorProps {
  pageName: string;
  enableDebugMode?: boolean;
}

const CoreWebVitalsMonitor = ({ pageName, enableDebugMode = false }: CoreWebVitalsMonitorProps) => {
  const vitalsData = useRef<Partial<WebVitalsData>>({});
  const observer = useRef<PerformanceObserver | null>(null);

  useEffect(() => {
    // Initialize vitals data
    vitalsData.current = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      connectionType: (navigator as Record<string, any>)?.connection?.effectiveType || 'unknown'
    };

    // Track Largest Contentful Paint (LCP)
    const trackLCP = () => {
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as Record<string, any>;
          
          if (lastEntry) {
            vitalsData.current.lcp = Math.round(lastEntry.startTime);
            
            if (enableDebugMode) {
              console.log('LCP:', vitalsData.current.lcp, 'ms');
            }
            
            // Store and report if LCP is final
            if (lastEntry.startTime) {
              reportVitals('lcp', vitalsData.current.lcp);
            }
          }
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP monitoring not supported');
        }
      }
    };

    // Track First Input Delay (FID)
    const trackFID = () => {
      if ('PerformanceObserver' in window) {
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: Record<string, any>) => {
            if (entry.processingStart && entry.startTime) {
              vitalsData.current.fid = Math.round(entry.processingStart - entry.startTime);
              
              if (enableDebugMode) {
                console.log('FID:', vitalsData.current.fid, 'ms');
              }
              
              reportVitals('fid', vitalsData.current.fid);
            }
          });
        });
        
        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID monitoring not supported');
        }
      }
    };

    // Track Cumulative Layout Shift (CLS)
    const trackCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        
        const clsObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: Record<string, any>) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          vitalsData.current.cls = Math.round(clsValue * 1000) / 1000;
          
          if (enableDebugMode) {
            console.log('CLS:', vitalsData.current.cls);
          }
        });
        
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
          observer.current = clsObserver;
        } catch (e) {
          console.warn('CLS monitoring not supported');
        }
      }
    };

    // Track First Contentful Paint (FCP)
    const trackFCP = () => {
      if ('PerformanceObserver' in window) {
        const fcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: Record<string, any>) => {
            if (entry.name === 'first-contentful-paint') {
              vitalsData.current.fcp = Math.round(entry.startTime);
              
              if (enableDebugMode) {
                console.log('FCP:', vitalsData.current.fcp, 'ms');
              }
              
              reportVitals('fcp', vitalsData.current.fcp);
            }
          });
        });
        
        try {
          fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          console.warn('FCP monitoring not supported');
        }
      }
    };

    // Track Time to First Byte (TTFB)
    const trackTTFB = () => {
      if ('performance' in window && 'timing' in performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as Record<string, any>;
        if (navigation) {
          vitalsData.current.ttfb = Math.round(navigation.responseStart - navigation.requestStart);
          
          if (enableDebugMode) {
            console.log('TTFB:', vitalsData.current.ttfb, 'ms');
          }
          
          reportVitals('ttfb', vitalsData.current.ttfb);
        }
      }
    };

    // Track Interaction to Next Paint (INP)
    const trackINP = () => {
      if ('PerformanceObserver' in window) {
        let maxDelay = 0;
        
        const inpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: Record<string, any>) => {
            if (entry.processingStart && entry.startTime) {
              const delay = entry.processingStart - entry.startTime;
              if (delay > maxDelay) {
                maxDelay = delay;
                vitalsData.current.inp = Math.round(delay);
                
                if (enableDebugMode) {
                  console.log('INP:', vitalsData.current.inp, 'ms');
                }
                
                reportVitals('inp', vitalsData.current.inp);
              }
            }
          });
        });
        
        try {
          inpObserver.observe({ entryTypes: ['event'] });
        } catch (e) {
          // Fallback to measuring input events manually
          trackInputEventLatency();
        }
      } else {
        trackInputEventLatency();
      }
    };

    // Fallback input event latency tracking
    const trackInputEventLatency = () => {
      let startTime: number;
      
      const measureLatency = () => {
        if (startTime) {
          const latency = performance.now() - startTime;
          if (!vitalsData.current.inp || latency > vitalsData.current.inp) {
            vitalsData.current.inp = Math.round(latency);
            reportVitals('inp', vitalsData.current.inp);
          }
        }
      };
      
      ['click', 'keydown', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, () => {
          startTime = performance.now();
          requestAnimationFrame(measureLatency);
        });
      });
    };

    // Report vitals data
    const reportVitals = (metric: string, value: number) => {
      const report = {
        page: pageName,
        metric,
        value,
        rating: getMetricRating(metric, value),
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        connectionType: vitalsData.current.connectionType,
        allMetrics: vitalsData.current
      };

      console.log('Core Web Vital:', report);
      
      // Store in localStorage for analysis
      const vitals = JSON.parse(localStorage.getItem('core_web_vitals') || '[]');
      vitals.push(report);
      localStorage.setItem('core_web_vitals', JSON.stringify(vitals.slice(-100)));
    };

    // Get metric rating based on thresholds
    const getMetricRating = (metric: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
      const thresholds: Record<string, { good: number; poor: number }> = {
        lcp: { good: 2500, poor: 4000 },
        fid: { good: 100, poor: 300 },
        cls: { good: 0.1, poor: 0.25 },
        inp: { good: 200, poor: 500 },
        fcp: { good: 1800, poor: 3000 },
        ttfb: { good: 800, poor: 1800 }
      };

      const threshold = thresholds[metric];
      if (!threshold) return 'good';

      if (value <= threshold.good) return 'good';
      if (value <= threshold.poor) return 'needs-improvement';
      return 'poor';
    };

    // Initialize all tracking
    trackLCP();
    trackFID();
    trackCLS();
    trackFCP();
    trackTTFB();
    trackINP();

    // Report page load metrics after initial load
    setTimeout(() => {
      const finalReport = {
        page: pageName,
        metrics: vitalsData.current,
        timestamp: new Date().toISOString(),
        loadTime: performance.now()
      };
      
      console.log('Final Core Web Vitals Report:', finalReport);
      
      const reports = JSON.parse(localStorage.getItem('vitals_reports') || '[]');
      reports.push(finalReport);
      localStorage.setItem('vitals_reports', JSON.stringify(reports.slice(-50)));
    }, 3000);

    // Cleanup
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      
      // Final CLS report
      if (vitalsData.current.cls !== undefined) {
        reportVitals('cls', vitalsData.current.cls);
      }
    };
  }, [pageName, enableDebugMode]);

  return null; // This is a monitoring component with no visual output
};

export default CoreWebVitalsMonitor;