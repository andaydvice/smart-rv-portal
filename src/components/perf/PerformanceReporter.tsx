import React, { useEffect } from 'react';
import { initPerformanceMonitor } from '@/perf/monitor';
import { registerWebVitals } from '@/utils/perf/webVitals';
import { startRUM } from '@/utils/perf/rum';
const PerformanceReporter: React.FC = () => {
  useEffect(() => {
    // Dev only overlay to avoid adding UI in production
    initPerformanceMonitor({ 
      enableOverlay: import.meta.env.DEV,
      budgets: { totalBundleKB: 200, jsKB: 150, cssKB: 50, imageMaxKB: 200, firstPartyTotalKB: 300 }
    });
    // Register Web Vitals against budgets and surface warnings via toast
    registerWebVitals({ LCP: 2500, INP: 200, CLS: 0.1 });
    // Start real-user monitoring to Supabase (sampled)
    startRUM({ sampleRate: import.meta.env.DEV ? 1 : 0.5 });
  }, []);
  return null;
};

export default PerformanceReporter;
