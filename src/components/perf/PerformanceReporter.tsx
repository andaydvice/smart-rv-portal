import React, { useEffect } from 'react';
import { initPerformanceMonitor } from '@/perf/monitor';

const PerformanceReporter: React.FC = () => {
  useEffect(() => {
    // Dev only overlay to avoid adding UI in production
    initPerformanceMonitor({ enableOverlay: import.meta.env.DEV });
  }, []);
  return null;
};

export default PerformanceReporter;
