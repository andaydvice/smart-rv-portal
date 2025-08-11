import { onCLS, onLCP, onINP, onTTFB, onFCP, type Metric } from 'web-vitals/attribution';

export type WebVitalsReport = {
  CLS?: number;
  INP?: number;
  LCP?: number;
  TTFB?: number;
  FCP?: number;
};

export function setupWebVitals(onReport: (metric: Metric) => void) {
  try {
    onCLS(onReport, { reportAllChanges: true });
    onINP(onReport, { reportAllChanges: true });
    onLCP(onReport, { reportAllChanges: true });
    onTTFB(onReport);
    onFCP(onReport, { reportAllChanges: true });
  } catch (e) {
    // silent fail in production
    if (import.meta.env.DEV) console.warn('web-vitals setup failed', e);
  }
}
