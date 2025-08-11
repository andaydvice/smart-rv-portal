import React, { useEffect } from 'react';
import { initPerformanceMonitor } from '@/perf/monitor';
import { startRUM } from '@/utils/perf/rum';

const PerformanceReporter: React.FC = () => {
  useEffect(() => {
    const isDev = import.meta.env.DEV;
    const enableOverlay = isDev ? true : localStorage.getItem('perfOverlay') === '1';

    const prodBudgets = { totalBundleKB: 200, jsKB: 150, cssKB: 50, imageMaxKB: 200, firstPartyTotalKB: 300 };
    const devBudgets = prodBudgets;

    initPerformanceMonitor({
      enableOverlay,
      budgets: isDev ? devBudgets : prodBudgets,
    });

    if (!isDev) {
      const idle = (cb: () => void) =>
        (window as any).requestIdleCallback ? (window as any).requestIdleCallback(cb, { timeout: 2000 }) : setTimeout(cb, 500);
      idle(() => startRUM({ sampleRate: 0.5 }));
    }
  }, []);
  return null;
};

export default PerformanceReporter;
