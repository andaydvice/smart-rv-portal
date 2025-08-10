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
    onCLS(onReport);
    onINP(onReport);
    onLCP(onReport);
    onTTFB(onReport);
    onFCP(onReport);
  } catch (e) {
    // silent fail in production
    if (import.meta.env.DEV) console.warn('web-vitals setup failed', e);
  }
}
