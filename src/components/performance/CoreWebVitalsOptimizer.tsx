import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Clock, Gauge, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface WebVitalsMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay  
  cls: number; // Cumulative Layout Shift
  inp: number; // Interaction to Next Paint
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

interface PerformanceOptimization {
  id: string;
  name: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  description: string;
  implemented: boolean;
  estimatedImprovement: string;
}

const CoreWebVitalsOptimizer = () => {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({
    lcp: 0,
    fid: 0,
    cls: 0,
    inp: 0,
    fcp: 0,
    ttfb: 0
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [optimizations, setOptimizations] = useState<PerformanceOptimization[]>([]);
  const [performanceScore, setPerformanceScore] = useState(0);

  useEffect(() => {
    initializeWebVitals();
    loadOptimizations();
  }, []);

  const initializeWebVitals = () => {
    if (typeof window === 'undefined') return;

    setIsMonitoring(true);

    // LCP - Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID - First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS - Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });

    // INP - Interaction to Next Paint (simulated)
    let interactions: number[] = [];
    document.addEventListener('click', () => {
      const start = performance.now();
      requestAnimationFrame(() => {
        const inp = performance.now() - start;
        interactions.push(inp);
        setMetrics(prev => ({ ...prev, inp: Math.max(...interactions) }));
      });
    });

    // FCP - First Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
      }
    }).observe({ entryTypes: ['paint'] });

    // TTFB - Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      setMetrics(prev => ({ ...prev, ttfb: navigationEntry.responseStart - navigationEntry.requestStart }));
    }
  };

  const loadOptimizations = () => {
    const optimizationList: PerformanceOptimization[] = [
      {
        id: 'image-optimization',
        name: 'Image Optimization',
        impact: 'high',
        effort: 'medium',
        description: 'Implement WebP format and responsive images with lazy loading',
        implemented: true,
        estimatedImprovement: '20-30% LCP improvement'
      },
      {
        id: 'code-splitting',
        name: 'Route-based Code Splitting',
        impact: 'high',
        effort: 'medium',
        description: 'Split JavaScript bundles by routes to reduce initial load time',
        implemented: true,
        estimatedImprovement: '15-25% FCP improvement'
      },
      {
        id: 'critical-css',
        name: 'Critical CSS Inlining',
        impact: 'medium',
        effort: 'low',
        description: 'Inline critical CSS and defer non-critical styles',
        implemented: false,
        estimatedImprovement: '10-15% FCP improvement'
      },
      {
        id: 'preload-fonts',
        name: 'Font Preloading',
        impact: 'medium',
        effort: 'low',
        description: 'Preload critical fonts to prevent layout shifts',
        implemented: false,
        estimatedImprovement: '5-10% CLS improvement'
      },
      {
        id: 'service-worker',
        name: 'Advanced Service Worker',
        impact: 'high',
        effort: 'high',
        description: 'Implement intelligent caching strategies for faster repeat visits',
        implemented: true,
        estimatedImprovement: '40-50% return visit speed'
      },
      {
        id: 'resource-hints',
        name: 'Resource Hints',
        impact: 'medium',
        effort: 'low',
        description: 'Add dns-prefetch, preconnect, and prefetch hints',
        implemented: false,
        estimatedImprovement: '5-10% TTFB improvement'
      },
      {
        id: 'bundle-analysis',
        name: 'Bundle Size Optimization',
        impact: 'high',
        effort: 'medium',
        description: 'Analyze and reduce JavaScript bundle size',
        implemented: false,
        estimatedImprovement: '20-30% load time improvement'
      }
    ];

    setOptimizations(optimizationList);
  };

  const calculatePerformanceScore = () => {
    let score = 0;
    
    // LCP scoring (good: ≤2.5s, needs improvement: 2.5-4s, poor: >4s)
    if (metrics.lcp <= 2500) score += 25;
    else if (metrics.lcp <= 4000) score += 15;
    else score += 5;
    
    // FID scoring (good: ≤100ms, needs improvement: 100-300ms, poor: >300ms)
    if (metrics.fid <= 100) score += 25;
    else if (metrics.fid <= 300) score += 15;
    else score += 5;
    
    // CLS scoring (good: ≤0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (metrics.cls <= 0.1) score += 25;
    else if (metrics.cls <= 0.25) score += 15;
    else score += 5;
    
    // INP scoring (good: ≤200ms, needs improvement: 200-500ms, poor: >500ms)
    if (metrics.inp <= 200) score += 25;
    else if (metrics.inp <= 500) score += 15;
    else score += 5;

    setPerformanceScore(score);
  };

  useEffect(() => {
    calculatePerformanceScore();
  }, [metrics]);

  const getMetricStatus = (metric: keyof WebVitalsMetrics, value: number) => {
    const thresholds = {
      lcp: { good: 2500, needsImprovement: 4000 },
      fid: { good: 100, needsImprovement: 300 },
      cls: { good: 0.1, needsImprovement: 0.25 },
      inp: { good: 200, needsImprovement: 500 },
      fcp: { good: 1800, needsImprovement: 3000 },
      ttfb: { good: 800, needsImprovement: 1800 }
    };

    const threshold = thresholds[metric];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const formatMetricValue = (metric: keyof WebVitalsMetrics, value: number) => {
    if (metric === 'cls') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  const implementOptimization = async (optimizationId: string) => {
    // Simulate implementing optimization
    setOptimizations(prev => 
      prev.map(opt => 
        opt.id === optimizationId 
          ? { ...opt, implemented: true }
          : opt
      )
    );

    // Simulate performance improvement
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        lcp: prev.lcp * 0.9,
        fcp: prev.fcp * 0.9,
        cls: prev.cls * 0.9
      }));
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Performance Score Overview */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Gauge className="h-6 w-6 text-[#5B9BD5]" />
            Core Web Vitals Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${(performanceScore / 100) * 351.86} 351.86`}
                    className={`${
                      performanceScore >= 90 ? 'text-green-500' :
                      performanceScore >= 50 ? 'text-yellow-500' :
                      'text-red-500'
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{performanceScore}</span>
                </div>
              </div>
              <p className="text-gray-400 mt-2">Performance Score</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(metrics).map(([key, value]) => {
                const status = getMetricStatus(key as keyof WebVitalsMetrics, value);
                return (
                  <div key={key} className="text-center p-3 bg-[#131a2a] rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      {status === 'good' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {status === 'needs-improvement' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {status === 'poor' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                    </div>
                    <p className="text-lg font-bold text-white">
                      {formatMetricValue(key as keyof WebVitalsMetrics, value)}
                    </p>
                    <p className="text-xs text-gray-400 uppercase">{key}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Optimizations */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <TrendingUp className="h-6 w-6 text-[#5B9BD5]" />
            Performance Optimizations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimizations.map((optimization) => (
              <div 
                key={optimization.id}
                className="flex items-center justify-between p-4 bg-[#131a2a] rounded-lg border border-gray-700"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-medium">{optimization.name}</h4>
                    <Badge
                      variant={optimization.impact === 'high' ? 'destructive' : 
                              optimization.impact === 'medium' ? 'default' : 'secondary'}
                      className={`${
                        optimization.impact === 'high' ? 'bg-red-600' :
                        optimization.impact === 'medium' ? 'bg-yellow-600' :
                        'bg-green-600'
                      } text-white`}
                    >
                      {optimization.impact.toUpperCase()} IMPACT
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      {optimization.effort.toUpperCase()} EFFORT
                    </Badge>
                    {optimization.implemented && (
                      <Badge variant="outline" className="border-green-600 text-green-400">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        IMPLEMENTED
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{optimization.description}</p>
                  <p className="text-[#5B9BD5] text-xs">{optimization.estimatedImprovement}</p>
                </div>
                
                {!optimization.implemented && (
                  <Button
                    onClick={() => implementOptimization(optimization.id)}
                    className="bg-[#5B9BD5] hover:bg-[#4B8FE3] ml-4"
                  >
                    Implement
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-[#5B9BD5]/10 to-[#4B8FE3]/10 rounded-lg border border-[#5B9BD5]/30">
            <h4 className="text-[#5B9BD5] font-medium mb-2">
              <Zap className="h-4 w-4 inline mr-1" />
              Performance Insights
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Current LCP: {formatMetricValue('lcp', metrics.lcp)} - Target: ≤2.5s</li>
              <li>• Current CLS: {formatMetricValue('cls', metrics.cls)} - Target: ≤0.1</li>
              <li>• Current INP: {formatMetricValue('inp', metrics.inp)} - Target: ≤200ms</li>
              <li>• Implemented: {optimizations.filter(o => o.implemented).length}/{optimizations.length} optimizations</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Monitoring */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Clock className="h-6 w-6 text-[#5B9BD5]" />
            Real-time Performance Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Monitoring Status</span>
              <Badge 
                variant={isMonitoring ? 'default' : 'outline'}
                className={isMonitoring ? 'bg-green-600 text-white' : 'border-gray-600 text-gray-400'}
              >
                {isMonitoring ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-[#131a2a] rounded-lg">
                <p className="text-2xl font-bold text-[#5B9BD5]">
                  {optimizations.filter(o => o.implemented).length}
                </p>
                <p className="text-sm text-gray-400">Optimizations Active</p>
              </div>
              <div className="text-center p-3 bg-[#131a2a] rounded-lg">
                <p className="text-2xl font-bold text-white">
                  {Math.round((performanceScore / 100) * 100)}%
                </p>
                <p className="text-sm text-gray-400">Performance Goal</p>
              </div>
              <div className="text-center p-3 bg-[#131a2a] rounded-lg">
                <p className="text-2xl font-bold text-green-400">
                  {Object.values(metrics).filter((_, i) => 
                    getMetricStatus(Object.keys(metrics)[i] as keyof WebVitalsMetrics, metrics[Object.keys(metrics)[i] as keyof WebVitalsMetrics]) === 'good'
                  ).length}/6
                </p>
                <p className="text-sm text-gray-400">Metrics Passing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoreWebVitalsOptimizer;