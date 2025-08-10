// Utility to send real-user monitoring (RUM) web vitals to Supabase
// Lightweight and sampled to keep overhead minimal
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals/attribution';
import { supabase } from '@/integrations/supabase/client';

export type RUMOptions = {
  sampleRate?: number; // 0..1
  buildId?: string;
  appVersion?: string;
};

let started = false;

export function startRUM(opts: RUMOptions = {}) {
  if (started || typeof window === 'undefined') return;
  started = true;

  const sampleRate = typeof opts.sampleRate === 'number' ? opts.sampleRate : (import.meta.env.DEV ? 1 : 0.5);
  const sampledIn = Math.random() < sampleRate;
  (window as any).__rum = { sampledIn };
  if (!sampledIn) return; // no-op

  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;

  const getConn = () => {
    const n = (navigator as any).connection || {}; 
    return {
      effectiveType: n.effectiveType as string | undefined,
      downlink: typeof n.downlink === 'number' ? Number(n.downlink) : undefined,
      rtt: typeof n.rtt === 'number' ? Number(n.rtt) : undefined,
    };
  };

  const context = {
    session_id: crypto?.randomUUID?.() ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    build_id: opts.buildId,
    app_version: opts.appVersion,
    user_agent: navigator.userAgent,
    device_memory: (navigator as any).deviceMemory as number | undefined,
    hardware_concurrency: navigator.hardwareConcurrency,
  };

  const state: any = {
    route: location.pathname,
    url: location.href,
    referrer: document.referrer || undefined,
    ...getConn(),
  };

  const flush = async () => {
    try {
      if (flushTimer) {
        clearTimeout(flushTimer);
        flushTimer = undefined;
      }
      if (flushedForView) return;
      flushedForView = true;

      const payload = {
        session_id: context.session_id,
        url: location.href,
        route: location.pathname,
        referrer: document.referrer || null,
        lcp_ms: state.lcp ?? null,
        inp_ms: state.inp ?? null,
        cls: state.cls != null ? Number(state.cls.toFixed?.(3) ?? state.cls) : null,
        fcp_ms: state.fcp ?? null,
        ttfb_ms: state.ttfb ?? null,
        nav_type: (nav as any)?.type ?? null,
        is_soft_nav: currentIsSoftNav,
        route_paint_ms: currentIsSoftNav && softNavStart != null ? Math.round(performance.now() - softNavStart) : null,
        device_memory: context.device_memory ?? null,
        hardware_concurrency: context.hardware_concurrency ?? null,
        effective_type: state.effectiveType ?? null,
        downlink: state.downlink ?? null,
        rtt: state.rtt ?? null,
        viewport_w: window.innerWidth,
        viewport_h: window.innerHeight,
        user_agent: context.user_agent,
        sample_rate: sampleRate,
        build_id: context.build_id ?? null,
        app_version: context.app_version ?? null,
      };

      await supabase.from('web_vitals').insert(payload);
    } catch (e) {
      if (import.meta.env.DEV) console.warn('RUM insert failed', e);
    }
  };

  let flushTimer: number | undefined;
  let flushedForView = false;
  let currentIsSoftNav = false;
  let softNavStart: number | undefined;
  const scheduleFlush = () => {
    if (flushTimer || flushedForView) return;
    flushTimer = window.setTimeout(() => {
      flushTimer = undefined;
      flush();
    }, 2000);
  };

  onLCP((m) => { state.lcp = m.value; scheduleFlush(); });
  onINP((m) => { state.inp = m.value; scheduleFlush(); });
  onCLS((m) => { state.cls = m.value; scheduleFlush(); });
  onFCP((m) => { state.fcp = m.value; scheduleFlush(); });
  onTTFB((m) => { state.ttfb = m.value; scheduleFlush(); });

  const handleVis = () => {
    if (document.visibilityState === 'hidden') flush();
  };
  window.addEventListener('visibilitychange', handleVis);
  window.addEventListener('pagehide', flush);

  // Basic SPA navigation detection: dispatch on pushState/replaceState/popstate
  const patchHistory = () => {
    const w = window as any;
    if (w.__historyPatched) return; w.__historyPatched = true;
    const wrap = (type: 'pushState' | 'replaceState') => {
      const orig = history[type];
      return function(this: History, ...args: any[]) {
        const ret = (orig as any).apply(this, args);
        window.dispatchEvent(new Event('locationchange'));
        return ret;
      } as any;
    };
    history.pushState = wrap('pushState');
    history.replaceState = wrap('replaceState');
    window.addEventListener('popstate', () => window.dispatchEvent(new Event('locationchange')));
  };
  patchHistory();

  window.addEventListener('locationchange', () => {
    // finalize current view, then start a new soft navigation view
    flush();
    state.route = location.pathname;
    state.url = location.href;
    state.referrer = document.referrer || undefined;
    const conn = getConn();
    state.effectiveType = conn.effectiveType;
    state.downlink = conn.downlink;
    state.rtt = conn.rtt;
    state.lcp = undefined; // LCP/FCP only on full navigations
    state.fcp = undefined;
    flushedForView = false;
    currentIsSoftNav = true;
    softNavStart = performance.now();
    // Fallback flush in case no metric events occur on this soft nav
    window.setTimeout(() => flush(), 3000);
    // INP/CLS continue accumulating across soft navs
  });
}
