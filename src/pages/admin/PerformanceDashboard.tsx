import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';

function percentile(values: number[], p: number) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const k = Math.floor((p / 100) * (sorted.length - 1));
  return sorted[k];
}

type Row = { route: string | null; lcp_ms: number | null; inp_ms: number | null; cls: number | null; created_at: string };

type Agg = { route: string; p75LCP: number | null; p75INP: number | null; p75CLS: number | null; count: number };

const budgets = { LCP: 2500, INP: 200, CLS: 0.1 };

const PerfCard: React.FC<{ title: string; value: string; warn?: boolean }> = ({ title, value, warn }) => (
  <div className={`rounded-lg border p-4 ${warn ? 'border-red-500/60' : 'border-[hsl(var(--border))]'} bg-[hsl(var(--background))]`}>
    <div className="text-sm text-[hsl(var(--foreground))]/70">{title}</div>
    <div className="text-2xl font-semibold text-[hsl(var(--foreground))]">{value}</div>
  </div>
);

const PerformanceDashboard: React.FC = () => {
  const [rangeDays, setRangeDays] = useState(7);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const since = new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000).toISOString();
        const { data, error } = await supabase
          .from('web_vitals')
          .select('route,lcp_ms,inp_ms,cls,created_at')
          .gte('created_at', since)
          .order('created_at', { ascending: false })
          .limit(5000);
        if (error) throw error;
        if (!isMounted) return;
        setRows((data as any) || []);
      } catch (e) {
        console.warn('Failed to load vitals', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [rangeDays]);

  const agg = useMemo(() => {
    const byRoute = new Map<string, { lcp: number[]; inp: number[]; cls: number[]; count: number }>();
    for (const r of rows) {
      const key = r.route || '(unknown)';
      if (!byRoute.has(key)) byRoute.set(key, { lcp: [], inp: [], cls: [], count: 0 });
      const bucket = byRoute.get(key)!;
      if (typeof r.lcp_ms === 'number') bucket.lcp.push(r.lcp_ms);
      if (typeof r.inp_ms === 'number') bucket.inp.push(r.inp_ms);
      if (typeof r.cls === 'number') bucket.cls.push(r.cls);
      bucket.count += 1;
    }
    const out: Agg[] = [];
    byRoute.forEach((v, k) => {
      out.push({
        route: k,
        p75LCP: percentile(v.lcp, 75),
        p75INP: percentile(v.inp, 75),
        p75CLS: percentile(v.cls, 75),
        count: v.count,
      });
    });
    // sort by worst LCP
    out.sort((a, b) => (b.p75LCP ?? 0) - (a.p75LCP ?? 0));
    return out;
  }, [rows]);

  const sitewide = useMemo(() => {
    const lcp = rows.map(r => r.lcp_ms).filter((n): n is number => typeof n === 'number');
    const inp = rows.map(r => r.inp_ms).filter((n): n is number => typeof n === 'number');
    const cls = rows.map(r => r.cls).filter((n): n is number => typeof n === 'number');
    return {
      p75LCP: percentile(lcp, 75),
      p75INP: percentile(inp, 75),
      p75CLS: percentile(cls, 75),
      count: rows.length,
    };
  }, [rows]);

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 bg-[hsl(var(--background))]">
      <Helmet>
        <title>Site performance dashboard - core web vitals</title>
        <meta name="description" content="Core web vitals performance dashboard with p75 LCP, INP, and CLS by route." />
        <link rel="canonical" href={`${location.origin}/admin/perf`} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">Core web vitals performance dashboard</h1>
        <p className="mt-2 text-[hsl(var(--foreground))]/70">Real user p75 metrics across the site with budget highlights.</p>
      </header>

      <section className="mb-6 flex flex-wrap items-center gap-3">
        <label className="text-sm text-[hsl(var(--foreground))]/70">Range</label>
        <select
          value={rangeDays}
          onChange={(e) => setRangeDays(Number(e.target.value))}
          className="rounded-md bg-[hsl(var(--background))] border border-[hsl(var(--border))] px-3 py-2 text-[hsl(var(--foreground))]"
        >
          <option value={1}>1 day</option>
          <option value={7}>7 days</option>
          <option value={14}>14 days</option>
          <option value={30}>30 days</option>
        </select>
      </section>

      <section className="grid gap-4 md:grid-cols-3 mb-8">
        <PerfCard title="Sitewide p75 LCP" value={sitewide.p75LCP != null ? `${Math.round(sitewide.p75LCP)} ms` : '-'} warn={!!(sitewide.p75LCP && sitewide.p75LCP > budgets.LCP)} />
        <PerfCard title="Sitewide p75 INP" value={sitewide.p75INP != null ? `${Math.round(sitewide.p75INP)} ms` : '-'} warn={!!(sitewide.p75INP && sitewide.p75INP > budgets.INP)} />
        <PerfCard title="Sitewide p75 CLS" value={sitewide.p75CLS != null ? sitewide.p75CLS.toFixed(3) : '-'} warn={!!(sitewide.p75CLS && sitewide.p75CLS > budgets.CLS)} />
      </section>

      <section>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="min-w-full text-sm">
            <thead className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]/70">
              <tr>
                <th className="px-4 py-3 text-left">Route</th>
                <th className="px-4 py-3 text-left">p75 LCP</th>
                <th className="px-4 py-3 text-left">p75 INP</th>
                <th className="px-4 py-3 text-left">p75 CLS</th>
                <th className="px-4 py-3 text-left">Samples</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="px-4 py-6" colSpan={5}>Loading…</td></tr>
              ) : agg.length ? (
                agg.map((a) => (
                  <tr key={a.route} className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3 text-[hsl(var(--foreground))]">{a.route}</td>
                    <td className={`px-4 py-3 ${a.p75LCP && a.p75LCP > budgets.LCP ? 'text-red-400' : 'text-[hsl(var(--foreground))]'}`}>{a.p75LCP != null ? `${Math.round(a.p75LCP)} ms` : '-'}</td>
                    <td className={`px-4 py-3 ${a.p75INP && a.p75INP > budgets.INP ? 'text-red-400' : 'text-[hsl(var(--foreground))]'}`}>{a.p75INP != null ? `${Math.round(a.p75INP)} ms` : '-'}</td>
                    <td className={`px-4 py-3 ${a.p75CLS && a.p75CLS > budgets.CLS ? 'text-red-400' : 'text-[hsl(var(--foreground))]'}`}>{a.p75CLS != null ? a.p75CLS.toFixed(3) : '-'}</td>
                    <td className="px-4 py-3 text-[hsl(var(--foreground))]/70">{a.count}</td>
                  </tr>
                ))
              ) : (
                <tr><td className="px-4 py-6" colSpan={5}>No data yet. Browse the site to collect RUM metrics.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default PerformanceDashboard;
