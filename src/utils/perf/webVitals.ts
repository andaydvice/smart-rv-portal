// Utility to register Web Vitals and report against budgets
// Keeps runtime light and logs to console; shows toast if budgets are exceeded
import { onCLS, onLCP, onINP } from 'web-vitals/attribution';
import { toast } from '@/hooks/use-toast';

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
  if (typeof window !== 'undefined') {
    const w = window as any;
    if (w.__wvRegistered) return;
    w.__wvRegistered = true;
  }
  const b = { ...DEFAULT_BUDGETS, ...budgets };
  const showToast = import.meta.env.DEV; // show toasts only in dev

  try {
    onLCP((metric) => {
      const v = metric.value;
      console.info(`[Web Vitals] LCP: ${v.toFixed(0)}ms`, metric.attribution ?? {});
      if (v > b.LCP && showToast) {
        toast({ description: `LCP high: ${v.toFixed(0)}ms (budget ${b.LCP}ms)`, variant: 'destructive' });
      }
    });

    onINP((metric) => {
      const v = metric.value;
      const a: any = (metric as any).attribution || {};
      console.info(`[Web Vitals] INP: ${v.toFixed(0)}ms`, {
        eventType: a.eventType,
        inputDelay: a.inputDelay,
        processingDuration: a.processingDuration,
        presentationDelay: a.presentationDelay,
        target: a.eventTarget,
      });
      if (v > b.INP && showToast) {
        toast({ description: `INP high: ${v.toFixed(0)}ms (budget ${b.INP}ms)`, variant: 'destructive' });
      }
    });

    onCLS((metric) => {
      const val = Number(metric.value.toFixed(3));
      const a: any = (metric as any).attribution || {};
      console.info(`[Web Vitals] CLS: ${val}`, { largestShiftTarget: a.largestShiftTarget, largestShiftValue: a.largestShiftValue });
      if (val > b.CLS && showToast) {
        toast({ description: `CLS high: ${val} (budget ${b.CLS})`, variant: 'destructive' });
      }
    });
  } catch (e) {
    console.warn('Web Vitals registration failed:', e);
  }
}
