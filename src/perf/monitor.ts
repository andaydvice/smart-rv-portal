import { setupWebVitals } from './webVitals';

export type PerfBudgets = {
  totalBundleKB: number; // e.g., 200
  jsKB: number; // 150
  cssKB: number; // 50
  imageMaxKB: number; // 200 each
  firstPartyTotalKB: number; // 300
};

export type PerfOptions = {
  enableOverlay?: boolean;
  budgets?: Partial<PerfBudgets>;
};

const DEFAULT_BUDGETS: PerfBudgets = {
  totalBundleKB: 200,
  jsKB: 150,
  cssKB: 50,
  imageMaxKB: 200,
  firstPartyTotalKB: 300,
};

export function initPerformanceMonitor(options: PerfOptions = {}) {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (w.__perfInit) return;
  w.__perfInit = true;
  const budgets: PerfBudgets = { ...DEFAULT_BUDGETS, ...(options.budgets || {}) };
  const isDev = import.meta.env.DEV;

  const perfState: any = w.__perf || { vitals: {}, resources: {}, timings: {} };
  w.__perf = perfState;

  // Track route start for per-route measurements
  let routeStart = performance.now();

  // SPA navigation detection - dispatch a unified 'locationchange' event
  const dispatchLocationChange = () => window.dispatchEvent(new Event('locationchange'));
  try {
    const origPush = history.pushState;
    history.pushState = function (...args: any[]) {
      const ret = origPush.apply(this, args as any);
      dispatchLocationChange();
      return ret;
    } as any;

    const origReplace = history.replaceState;
    history.replaceState = function (...args: any[]) {
      const ret = origReplace.apply(this, args as any);
      dispatchLocationChange();
      return ret;
    } as any;

    window.addEventListener('popstate', dispatchLocationChange);
  } catch {}

  // Web Vitals
  setupWebVitals((metric) => {
    perfState.vitals[metric.name] = Number(metric.value.toFixed(2));
    if (isDev) console.log(`[WebVital] ${metric.name}:`, perfState.vitals[metric.name]);
    maybeUpdateOverlay(perfState, budgets, options.enableOverlay ?? isDev);
  });

  // Navigation timing
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (nav) {
    perfState.timings = {
      loadTime: +(nav.loadEventEnd - nav.startTime).toFixed(0),
      fcp: +(nav.responseEnd - nav.startTime).toFixed(0),
      domContentLoaded: +(nav.domContentLoadedEventEnd - nav.startTime).toFixed(0),
    };
  }

  // Resource aggregation per route (use transferSize only)
  const aggregate = () => {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    let js = 0, css = 0, imgMax = 0, total = 0, firstParty = 0;
    let jsCount = 0, cssCount = 0, imgCount = 0;
    const origin = location.origin;

    const filtered = resources.filter((r) => r.startTime >= routeStart);
    filtered.forEach((r) => {
      const size = r.transferSize || 0;
      total += size;
      const isFirstParty = r.name.startsWith(origin) || r.name.startsWith('/') || r.name.includes(location.host);
      if (isFirstParty) firstParty += size;

      if (r.initiatorType === 'script') { js += size; jsCount++; }
      else if (r.initiatorType === 'link' && /css/i.test(r.name)) { css += size; cssCount++; }
      else if (r.initiatorType === 'img') { imgMax = Math.max(imgMax, size); imgCount++; }
    });

    perfState.resources = {
      totalKB: +(total / 1024).toFixed(1),
      jsKB: +(js / 1024).toFixed(1),
      cssKB: +(css / 1024).toFixed(1),
      imageMaxKB: +(imgMax / 1024).toFixed(1),
      firstPartyKB: +(firstParty / 1024).toFixed(1),
      counts: {
        total: filtered.length,
        js: jsCount,
        css: cssCount,
        img: imgCount,
      }
    };

    perfState.budgetStatus = {
      totalBundle: perfState.resources.totalKB <= budgets.totalBundleKB,
      js: perfState.resources.jsKB <= budgets.jsKB,
      css: perfState.resources.cssKB <= budgets.cssKB,
      imageMax: perfState.resources.imageMaxKB <= budgets.imageMaxKB,
      firstPartyTotal: perfState.resources.firstPartyKB <= budgets.firstPartyTotalKB,
    };

    if (isDev) {
      console.table({ ...perfState.resources, budgets });
      console.table(perfState.budgetStatus);
    }

    maybeUpdateOverlay(perfState, budgets, options.enableOverlay ?? isDev);
  };

  const onLoad = () => {
    aggregate();
    setTimeout(aggregate, 1500);
  };

  // Route change handling - reset route-scoped metrics and recompute sizes
  const onRouteChange = () => {
    routeStart = performance.now();
    delete perfState.vitals.LCP;
    delete perfState.vitals.FCP;
    maybeUpdateOverlay(perfState, budgets, options.enableOverlay ?? isDev);
    aggregate();
    setTimeout(aggregate, 1500);
  };

  if (document.readyState === 'complete') onLoad();
  else window.addEventListener('load', onLoad, { once: true });

  // Listen for SPA navigations
  window.addEventListener('locationchange', onRouteChange);
}

function maybeUpdateOverlay(state: any, budgets: PerfBudgets, enable: boolean) {
  if (!enable) return;
  const id = 'perf-overlay';
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    el.style.cssText = [
      'position:fixed',
      'right:8px',
      'bottom:8px',
      'z-index:2147483647',
      'padding:8px 10px',
      'border-radius:8px',
      'font:12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      'background:rgba(0,0,0,0.6)',
      'color:#fff',
      'backdrop-filter:saturate(1.2) blur(6px)'
    ].join(';');
    document.body.appendChild(el);
  }
  const v = state.vitals;
  const r = state.resources;
  const b = state.budgetStatus || {};
  el.innerHTML = `
    <div>Route: ${location.pathname}</div>
    <div><strong>Vitals</strong> LCP:${(v.LCP != null ? (v.LCP/1000).toFixed(2) : '-')}s CLS:${v.CLS != null ? v.CLS : '-'} INP:${v.INP != null ? Number(v.INP).toFixed(0) : '-'}ms</div>
    <div><strong>Sizes</strong> JS:${fmtKB(r?.jsKB)} (${r?.counts?.js || 0}) / ${budgets.jsKB} CSS:${fmtKB(r?.cssKB)} (${r?.counts?.css || 0}) / ${budgets.cssKB} Total:${fmtKB(r?.totalKB)} (${r?.counts?.total || 0}) / ${budgets.totalBundleKB}</div>
    <div><strong>First-party</strong> ${fmtKB(r?.firstPartyKB)} / ${budgets.firstPartyTotalKB} | Img max:${fmtKB(r?.imageMaxKB)} (${r?.counts?.img || 0}) / ${budgets.imageMaxKB}</div>
    <div style="opacity:.8">${bBadge('JS', b.js)} ${bBadge('CSS', b.css)} ${bBadge('Total', b.totalBundle)} ${bBadge('FP', b.firstPartyTotal)} ${bBadge('IMG', b.imageMax)}</div>
    <div style="opacity:.7;font-size:10px;margin-top:4px">Per-route since last navigation • Using transferSize only • Cached requests may show 0KB • Web Vitals update as new paints occur</div>
  `;
}

function fmt(v: any) {
  if (v == null) return '-';
  // LCP is in ms in web-vitals metric.value
  if (typeof v === 'number' && v > 10) return (v / 1000).toFixed(2);
  return String(v);
}

function fmtKB(v: any) {
  if (v == null || Number.isNaN(v)) return '-';
  return `${Number(v).toFixed(1)}KB`;
}

function bBadge(label: string, ok: boolean) {
  const color = ok ? 'rgba(16,185,129,.9)' : 'rgba(239,68,68,.95)';
  return `<span style="display:inline-block;margin-right:6px;padding:2px 6px;border-radius:6px;background:${color}">${label}</span>`;
}
