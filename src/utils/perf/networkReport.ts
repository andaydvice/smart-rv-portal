// Lightweight network performance analysis with budgets
// Uses Performance API after load to estimate transfer sizes
import { toast } from 'sonner';

export type PerfBudgets = {
  totalBundleKB: number; // JS+CSS
  jsKB: number;
  cssKB: number;
  imageMaxKB: number; // per image
  firstPartyTotalKB: number; // our domain only
};

const DEFAULT_BUDGETS: PerfBudgets = {
  totalBundleKB: 200,
  jsKB: 150,
  cssKB: 50,
  imageMaxKB: 200,
  firstPartyTotalKB: 300,
};

function kb(bytes: number) {
  return bytes / 1024;
}

export function analyzeNetworkAfterLoad(budgets: Partial<PerfBudgets> = {}) {
  const b = { ...DEFAULT_BUDGETS, ...budgets };

  const run = () => {
    try {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const origin = location.origin;

      let js = 0, css = 0, total = 0, firstParty = 0;
      const imageOverages: { name: string; sizeKB: number }[] = [];

      entries.forEach((e) => {
        const size = e.transferSize || e.encodedBodySize || e.decodedBodySize || 0;
        total += size;
        if ((e.name || '').startsWith(origin)) firstParty += size;

        if (e.initiatorType === 'script') js += size;
        if (e.initiatorType === 'link') css += size; // stylesheets
        if (e.initiatorType === 'img' || /\.(png|jpe?g|webp|avif|svg)(\?|$)/i.test(e.name)) {
          const sKB = kb(size);
          if (sKB > b.imageMaxKB) imageOverages.push({ name: e.name, sizeKB: Number(sKB.toFixed(1)) });
        }
      });

      const jsKB = Number(kb(js).toFixed(1));
      const cssKB = Number(kb(css).toFixed(1));
      const totalKB = Number(kb(js + css).toFixed(1));
      const firstPartyKB = Number(kb(firstParty).toFixed(1));

      console.info('[Perf] Bundle (JS+CSS):', totalKB, 'KB');
      console.info('[Perf] JS:', jsKB, 'KB, CSS:', cssKB, 'KB');
      console.info('[Perf] First-party total:', firstPartyKB, 'KB');

      let warnings = 0;
      if (totalKB > b.totalBundleKB) { warnings++; toast.info(`Bundle ${totalKB}KB > budget ${b.totalBundleKB}KB`); }
      if (jsKB > b.jsKB) { warnings++; toast.info(`JS ${jsKB}KB > budget ${b.jsKB}KB`); }
      if (cssKB > b.cssKB) { warnings++; toast.info(`CSS ${cssKB}KB > budget ${b.cssKB}KB`); }
      if (firstPartyKB > b.firstPartyTotalKB) { warnings++; toast.info(`First-party ${firstPartyKB}KB > budget ${b.firstPartyTotalKB}KB`); }
      imageOverages.slice(0, 3).forEach(img => toast.info(`Large image: ${img.sizeKB}KB`));

      // Log load time
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd && timing.navigationStart ? timing.loadEventEnd - timing.navigationStart : 0;
      if (loadTime) console.info('[Perf] Page load time:', loadTime, 'ms');

      return { jsKB, cssKB, totalKB, firstPartyKB, imageOverages };
    } catch (e) {
      console.warn('Network analysis failed:', e);
      return null;
    }
  };

  if (document.readyState === 'complete') run();
  else window.addEventListener('load', () => setTimeout(run, 500));
}
