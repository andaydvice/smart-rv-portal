/**
 * SEO Testing Framework for automated testing and A/B testing
 * Provides comprehensive SEO testing capabilities
 */

import { trackSEOMetric } from './analytics';

interface SEOTest {
  id: string;
  name: string;
  type: 'meta_title' | 'meta_description' | 'heading' | 'schema' | 'performance';
  variants: SEOVariant[];
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'paused' | 'completed';
  results?: SEOTestResults;
}

interface SEOVariant {
  id: string;
  name: string;
  content: string;
  traffic_percentage: number;
  conversions?: number;
  impressions?: number;
  clicks?: number;
  ctr?: number;
}

interface SEOTestResults {
  winner?: string;
  confidence: number;
  improvement: number;
  metrics: {
    [variantId: string]: {
      conversions: number;
      impressions: number;
      clicks: number;
      ctr: number;
      bounce_rate: number;
      time_on_page: number;
    };
  };
}

interface CoreWebVitalsMetrics {
  lcp: number;
  fid: number;
  cls: number;
  inp?: number;
  ttfb: number;
  fcp: number;
}

interface SEOAuditResult {
  score: number;
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    category: string;
    message: string;
    element?: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  recommendations: string[];
  metrics: {
    core_web_vitals: CoreWebVitalsMetrics;
    seo_score: number;
    accessibility_score: number;
    performance_score: number;
  };
}

class SEOTestingFramework {
  private activeTests: Map<string, SEOTest> = new Map();
  private testResults: Map<string, SEOTestResults> = new Map();

  // A/B Testing for SEO
  createABTest(config: {
    name: string;
    type: SEOTest['type'];
    variants: Omit<SEOVariant, 'id'>[];
    duration_days: number;
  }): string {
    const testId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const test: SEOTest = {
      id: testId,
      name: config.name,
      type: config.type,
      variants: config.variants.map((variant, index) => ({
        ...variant,
        id: `variant_${index + 1}`,
        conversions: 0,
        impressions: 0,
        clicks: 0,
        ctr: 0
      })),
      startDate: new Date(),
      endDate: new Date(Date.now() + config.duration_days * 24 * 60 * 60 * 1000),
      status: 'active'
    };

    this.activeTests.set(testId, test);
    
    // Track test creation
    trackSEOMetric('ab_test_created', {
      test_id: testId,
      test_type: config.type,
      variants_count: config.variants.length
    });

    return testId;
  }

  getVariantForUser(testId: string, userId?: string): SEOVariant | null {
    const test = this.activeTests.get(testId);
    if (!test || test.status !== 'active') return null;

    // Simple hash-based distribution for consistent user experience
    const userHash = userId ? this.hashString(userId) : Math.random();
    const normalizedHash = userHash % 1;

    let cumulativePercentage = 0;
    for (const variant of test.variants) {
      cumulativePercentage += variant.traffic_percentage / 100;
      if (normalizedHash <= cumulativePercentage) {
        return variant;
      }
    }

    return test.variants[0]; // Fallback to first variant
  }

  recordTestMetric(testId: string, variantId: string, metric: {
    type: 'impression' | 'click' | 'conversion';
    value?: number;
  }): void {
    const test = this.activeTests.get(testId);
    if (!test) return;

    const variant = test.variants.find(v => v.id === variantId);
    if (!variant) return;

    switch (metric.type) {
      case 'impression':
        variant.impressions = (variant.impressions || 0) + 1;
        break;
      case 'click':
        variant.clicks = (variant.clicks || 0) + 1;
        break;
      case 'conversion':
        variant.conversions = (variant.conversions || 0) + (metric.value || 1);
        break;
    }

    // Update CTR
    if (variant.impressions && variant.impressions > 0) {
      variant.ctr = (variant.clicks || 0) / variant.impressions;
    }

    // Track metric update
    trackSEOMetric('ab_test_metric', {
      test_id: testId,
      variant_id: variantId,
      metric_type: metric.type,
      metric_value: metric.value || 1
    });
  }

  analyzeTestResults(testId: string): SEOTestResults | null {
    const test = this.activeTests.get(testId);
    if (!test) return null;

    const results: SEOTestResults = {
      confidence: 0,
      improvement: 0,
      metrics: {}
    };

    // Calculate metrics for each variant
    test.variants.forEach(variant => {
      results.metrics[variant.id] = {
        conversions: variant.conversions || 0,
        impressions: variant.impressions || 0,
        clicks: variant.clicks || 0,
        ctr: variant.ctr || 0,
        bounce_rate: 0, // Would be calculated from actual analytics
        time_on_page: 0 // Would be calculated from actual analytics
      };
    });

    // Simple statistical analysis (in production, use proper statistical tests)
    const controlVariant = test.variants[0];
    const testVariants = test.variants.slice(1);

    let bestVariant = controlVariant;
    let maxImprovement = 0;

    testVariants.forEach(variant => {
      const controlCTR = controlVariant.ctr || 0;
      const variantCTR = variant.ctr || 0;
      
      if (variantCTR > controlCTR) {
        const improvement = ((variantCTR - controlCTR) / controlCTR) * 100;
        if (improvement > maxImprovement) {
          maxImprovement = improvement;
          bestVariant = variant;
        }
      }
    });

    results.winner = bestVariant.id;
    results.improvement = maxImprovement;
    results.confidence = this.calculateConfidence(controlVariant, bestVariant);

    this.testResults.set(testId, results);
    return results;
  }

  // Automated SEO Auditing
  async runSEOAudit(url?: string): Promise<SEOAuditResult> {
    const targetUrl = url || window.location.href;
    
    const audit: SEOAuditResult = {
      score: 0,
      issues: [],
      recommendations: [],
      metrics: {
        core_web_vitals: await this.measureCoreWebVitals(),
        seo_score: 0,
        accessibility_score: 0,
        performance_score: 0
      }
    };

    // Meta tags audit
    this.auditMetaTags(audit);
    
    // Content audit
    this.auditContent(audit);
    
    // Performance audit
    this.auditPerformance(audit);
    
    // Accessibility audit
    this.auditAccessibility(audit);
    
    // Schema markup audit
    this.auditSchemaMarkup(audit);

    // Calculate overall score
    audit.score = this.calculateOverallScore(audit);

    // Track audit completion
    trackSEOMetric('seo_audit_completed', {
      url: targetUrl,
      score: audit.score,
      issues_count: audit.issues.length
    });

    return audit;
  }

  private async measureCoreWebVitals(): Promise<CoreWebVitalsMetrics> {
    return new Promise((resolve) => {
      const metrics: Partial<CoreWebVitalsMetrics> = {};

      // Use Web Vitals library if available
      if (typeof window !== 'undefined' && 'performance' in window) {
        // LCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            metrics.lcp = entries[entries.length - 1].startTime;
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // FCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            metrics.fcp = entries[0].startTime;
          }
        }).observe({ entryTypes: ['paint'] });

        // CLS
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          metrics.cls = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });

        // TTFB
        const navigation = performance.getEntriesByType('navigation')[0] as any;
        if (navigation) {
          metrics.ttfb = navigation.responseStart - navigation.requestStart;
        }

        setTimeout(() => {
          resolve({
            lcp: metrics.lcp || 0,
            fid: metrics.fid || 0,
            cls: metrics.cls || 0,
            inp: metrics.inp || 0,
            ttfb: metrics.ttfb || 0,
            fcp: metrics.fcp || 0
          });
        }, 3000); // Wait 3 seconds to collect metrics
      } else {
        resolve({
          lcp: 0,
          fid: 0,
          cls: 0,
          ttfb: 0,
          fcp: 0
        });
      }
    });
  }

  private auditMetaTags(audit: SEOAuditResult): void {
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');

    if (!title || !title.textContent || title.textContent.length === 0) {
      audit.issues.push({
        type: 'error',
        category: 'meta_tags',
        message: 'Missing or empty title tag',
        impact: 'high'
      });
    } else if (title.textContent.length > 60) {
      audit.issues.push({
        type: 'warning',
        category: 'meta_tags',
        message: 'Title tag is too long (over 60 characters)',
        impact: 'medium'
      });
    }

    if (!description) {
      audit.issues.push({
        type: 'error',
        category: 'meta_tags',
        message: 'Missing meta description',
        impact: 'high'
      });
    } else {
      const content = description.getAttribute('content');
      if (!content || content.length === 0) {
        audit.issues.push({
          type: 'error',
          category: 'meta_tags',
          message: 'Empty meta description',
          impact: 'high'
        });
      } else if (content.length > 160) {
        audit.issues.push({
          type: 'warning',
          category: 'meta_tags',
          message: 'Meta description is too long (over 160 characters)',
          impact: 'medium'
        });
      }
    }

    if (!canonical) {
      audit.issues.push({
        type: 'warning',
        category: 'meta_tags',
        message: 'Missing canonical URL',
        impact: 'medium'
      });
    }
  }

  private auditContent(audit: SEOAuditResult): void {
    const h1Elements = document.querySelectorAll('h1');
    const images = document.querySelectorAll('img');

    if (h1Elements.length === 0) {
      audit.issues.push({
        type: 'error',
        category: 'content',
        message: 'Missing H1 tag',
        impact: 'high'
      });
    } else if (h1Elements.length > 1) {
      audit.issues.push({
        type: 'warning',
        category: 'content',
        message: 'Multiple H1 tags found',
        impact: 'medium'
      });
    }

    // Check images for alt text
    let imagesWithoutAlt = 0;
    images.forEach(img => {
      if (!img.getAttribute('alt')) {
        imagesWithoutAlt++;
      }
    });

    if (imagesWithoutAlt > 0) {
      audit.issues.push({
        type: 'warning',
        category: 'accessibility',
        message: `${imagesWithoutAlt} images missing alt text`,
        impact: 'medium'
      });
    }
  }

  private auditPerformance(audit: SEOAuditResult): void {
    // This would integrate with actual performance metrics
    if (audit.metrics.core_web_vitals.lcp > 2500) {
      audit.issues.push({
        type: 'error',
        category: 'performance',
        message: 'Largest Contentful Paint is too slow (> 2.5s)',
        impact: 'high'
      });
    }

    if (audit.metrics.core_web_vitals.cls > 0.1) {
      audit.issues.push({
        type: 'warning',
        category: 'performance',
        message: 'Cumulative Layout Shift is too high (> 0.1)',
        impact: 'medium'
      });
    }
  }

  private auditAccessibility(audit: SEOAuditResult): void {
    // Basic accessibility checks
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label && !input.getAttribute('aria-label')) {
        audit.issues.push({
          type: 'warning',
          category: 'accessibility',
          message: 'Form input missing label or aria-label',
          element: input.tagName.toLowerCase(),
          impact: 'medium'
        });
      }
    });
  }

  private auditSchemaMarkup(audit: SEOAuditResult): void {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    if (jsonLdScripts.length === 0) {
      audit.issues.push({
        type: 'info',
        category: 'schema',
        message: 'No structured data found',
        impact: 'low'
      });
    } else {
      jsonLdScripts.forEach((script, index) => {
        try {
          JSON.parse(script.textContent || '');
        } catch (e) {
          audit.issues.push({
            type: 'error',
            category: 'schema',
            message: `Invalid JSON-LD schema at position ${index + 1}`,
            impact: 'medium'
          });
        }
      });
    }
  }

  private calculateOverallScore(audit: SEOAuditResult): number {
    const totalIssues = audit.issues.length;
    const errorCount = audit.issues.filter(i => i.type === 'error').length;
    const warningCount = audit.issues.filter(i => i.type === 'warning').length;

    // Simple scoring algorithm (can be made more sophisticated)
    let score = 100;
    score -= errorCount * 10; // -10 points per error
    score -= warningCount * 5; // -5 points per warning

    return Math.max(0, Math.min(100, score));
  }

  private calculateConfidence(control: SEOVariant, test: SEOVariant): number {
    // Simplified confidence calculation
    // In production, use proper statistical tests like chi-square or t-test
    const controlSample = control.impressions || 0;
    const testSample = test.impressions || 0;
    
    const minSampleSize = 1000;
    const totalSample = controlSample + testSample;
    
    if (totalSample < minSampleSize) {
      return 0; // Not enough data
    }
    
    // Simple confidence based on sample size
    const confidenceScore = Math.min(95, (totalSample / minSampleSize) * 95);
    return confidenceScore;
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) / 2147483647; // Normalize to 0-1
  }

  // Competitive Analysis
  async analyzeCompetitor(competitorUrl: string): Promise<{
    domain: string;
    title: string;
    description: string;
    keywords: string[];
    schema_types: string[];
    performance_score: number;
    seo_score: number;
  }> {
    // This would typically use an external API for competitive analysis
    // For now, return a placeholder
    return {
      domain: new URL(competitorUrl).hostname,
      title: '',
      description: '',
      keywords: [],
      schema_types: [],
      performance_score: 0,
      seo_score: 0
    };
  }
}

// Create singleton instance
export const seoTestingFramework = new SEOTestingFramework();

// Convenience functions
export const createABTest = seoTestingFramework.createABTest.bind(seoTestingFramework);
export const getVariantForUser = seoTestingFramework.getVariantForUser.bind(seoTestingFramework);
export const recordTestMetric = seoTestingFramework.recordTestMetric.bind(seoTestingFramework);
export const analyzeTestResults = seoTestingFramework.analyzeTestResults.bind(seoTestingFramework);
export const runSEOAudit = seoTestingFramework.runSEOAudit.bind(seoTestingFramework);