// Utility to register Web Vitals and report against budgets
// Keeps runtime light and logs to console; shows toast if budgets are exceeded
import { onCLS, onLCP, onINP } from 'web-vitals';
import { toast } from 'sonner';

export type WebVitalsBudget = {
  LCP: number; // ms
  INP: number; // ms
  CLS: number; // unitless
};

const DEFAULT_BUDGETS: WebVitalsBudget = {
  LCP: 2500,
  INP: 200,
  CLS: 0.1,
};

export function registerWebVitals(budgets: Partial<WebVitalsBudget> = {}) {
  const b = { ...DEFAULT_BUDGETS, ...budgets };

  try {
    onLCP((metric) => {
      console.info(`[Web Vitals] LCP: ${metric.value.toFixed(0)}ms`);
      if (metric.value > b.LCP) {
        toast.warning(`LCP high: ${metric.value.toFixed(0)}ms (budget ${b.LCP}ms)`);
      }
    });

    onINP((metric) => {
      console.info(`[Web Vitals] INP: ${metric.value.toFixed(0)}ms`);
      if (metric.value > b.INP) {
        toast.warning(`INP high: ${metric.value.toFixed(0)}ms (budget ${b.INP}ms)`);
      }
    });

    onCLS((metric) => {
      const val = Number(metric.value.toFixed(3));
      console.info(`[Web Vitals] CLS: ${val}`);
      if (val > b.CLS) {
        toast.warning(`CLS high: ${val} (budget ${b.CLS})`);
      }
    });
  } catch (e) {
    console.warn('Web Vitals registration failed:', e);
  }
}
