/**
 * Performance configuration and monitoring for SEO optimization
 * Tracks Core Web Vitals and ensures targets are met
 */

export interface PerformanceTargets {
  // Core Web Vitals (SEO ranking factors)
  lcp: number; // Largest Contentful Paint (ms)
  fid: number; // First Input Delay (ms) 
  inp: number; // Interaction to Next Paint (ms)
  cls: number; // Cumulative Layout Shift (score)
  fcp: number; // First Contentful Paint (ms)
  ttfb: number; // Time to First Byte (ms)
  
  // Additional performance budgets
  loadTime: number; // Total page load time (ms)
  bundleSize: number; // Total JS bundle size (KB)
  imageSize: number; // Max image size (KB)
  firstPartySize: number; // First-party resources (KB)
}

export const SEO_PERFORMANCE_TARGETS: PerformanceTargets = {
  // Google's Core Web Vitals thresholds for "Good" rating
  lcp: 2500,   // ≤ 2.5s for good SEO
  fid: 100,    // ≤ 100ms for good SEO  
  inp: 200,    // ≤ 200ms for good SEO (replacing FID)
  cls: 0.1,    // ≤ 0.1 for good SEO
  fcp: 1800,   // ≤ 1.8s for good user experience
  ttfb: 800,   // ≤ 800ms for good server response
  
  // Performance budgets for fast loading
  loadTime: 3000,      // 3s max load time
  bundleSize: 200,     // 200KB JS budget
  imageSize: 200,      // 200KB per image
  firstPartySize: 300  // 300KB first-party total
};

export const checkPerformanceTarget = (metric: string, value: number): 'good' | 'needs_improvement' | 'poor' => {
  const targets = SEO_PERFORMANCE_TARGETS;
  
  switch (metric) {
    case 'LCP':
      return value <= targets.lcp ? 'good' : value <= 4000 ? 'needs_improvement' : 'poor';
    case 'FID':
      return value <= targets.fid ? 'good' : value <= 300 ? 'needs_improvement' : 'poor';
    case 'INP':
      return value <= targets.inp ? 'good' : value <= 500 ? 'needs_improvement' : 'poor';
    case 'CLS':
      return value <= targets.cls ? 'good' : value <= 0.25 ? 'needs_improvement' : 'poor';
    case 'FCP':
      return value <= targets.fcp ? 'good' : value <= 3000 ? 'needs_improvement' : 'poor';
    case 'TTFB':
      return value <= targets.ttfb ? 'good' : value <= 1800 ? 'needs_improvement' : 'poor';
    default:
      return 'good';
  }
};

export const formatPerformanceStatus = (rating: 'good' | 'needs_improvement' | 'poor'): string => {
  switch (rating) {
    case 'good':
      return '✅ Good';
    case 'needs_improvement':
      return '⚠️ Needs Improvement';
    case 'poor':
      return '❌ Poor';
    default:
      return '❓ Unknown';
  }
};

export const getPerformanceRecommendations = (metric: string, value: number): string[] => {
  const rating = checkPerformanceTarget(metric, value);
  if (rating === 'good') return [];
  
  const recommendations: { [key: string]: string[] } = {
    'LCP': [
      'Optimize images with WebP format and responsive sizing',
      'Implement lazy loading for below-the-fold images',
      'Reduce server response times (TTFB)',
      'Remove unused CSS and JavaScript',
      'Use a CDN for static assets'
    ],
    'FID': [
      'Reduce JavaScript execution time',
      'Code split large bundles',
      'Remove unused JavaScript',
      'Use web workers for heavy computations',
      'Defer non-essential JavaScript'
    ],
    'INP': [
      'Optimize event handlers',
      'Reduce main thread blocking',
      'Use CSS transforms instead of layout-triggering properties',
      'Implement proper debouncing',
      'Minimize DOM updates'
    ],
    'CLS': [
      'Set dimensions for images and videos',
      'Reserve space for ads and embeds',
      'Avoid inserting content above existing content',
      'Use CSS aspect-ratio for responsive images',
      'Preload critical fonts'
    ],
    'FCP': [
      'Inline critical CSS',
      'Minimize render-blocking resources',
      'Optimize web fonts with font-display: swap',
      'Reduce server response time',
      'Enable compression (gzip/brotli)'
    ],
    'TTFB': [
      'Optimize server performance',
      'Use a faster hosting provider',
      'Implement proper caching',
      'Reduce database query times',
      'Use a CDN'
    ]
  };
  
  return recommendations[metric] || [];
};