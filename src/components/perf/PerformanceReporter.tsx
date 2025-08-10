import React, { useEffect } from 'react';
import { initPerformanceMonitor } from '@/perf/monitor';
import { registerWebVitals } from '@/utils/perf/webVitals';
const PerformanceReporter: React.FC = () => {
  useEffect(() => {
    // Dev only overlay to avoid adding UI in production
    initPerformanceMonitor({ enableOverlay: import.meta.env.DEV });
    // Register Web Vitals against budgets and surface warnings via toast
    registerWebVitals({ LCP: 2500, INP: 200, CLS: 0.1 });
  }, []);
  return null;
};

export default PerformanceReporter;
