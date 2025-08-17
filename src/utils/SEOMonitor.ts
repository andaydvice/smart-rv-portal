/**
 * SEO Performance Monitoring System
 * Tracks SEO-related metrics, validates implementation, and reports issues
 */

import { analytics, trackSEOMetric } from './analytics';

export interface SEOIssue {
  type: 'warning' | 'error' | 'info';
  category: string;
  message: string;
  element?: string;
  impact: 'low' | 'medium' | 'high';
}

export interface SEOReport {
  score: number;
  issues: SEOIssue[];
  recommendations: string[];
  metrics: Record<string, any>;
  timestamp: number;
}

class SEOMonitor {
  private issues: SEOIssue[] = [];
  private observers: MutationObserver[] = [];

  constructor() {
    this.startMonitoring();
  }

  /**
   * Start monitoring SEO-related DOM changes
   */
  private startMonitoring() {
    if (typeof window === 'undefined') return;

    // Monitor head changes for meta tag updates
    const headObserver = new MutationObserver(() => {
      this.validateMetaTags();
    });

    headObserver.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['content', 'href']
    });

    this.observers.push(headObserver);

    // Monitor body for content changes that affect SEO
    const bodyObserver = new MutationObserver(() => {
      this.validateContent();
    });

    if (document.body) {
      bodyObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['alt', 'title', 'aria-label']
      });
    }

    this.observers.push(bodyObserver);
  }

  /**
   * Validate meta tags completeness and correctness
   */
  private validateMetaTags() {
    this.clearIssues('meta-tags');

    // Check essential meta tags
    const title = document.title;
    const description = this.getMetaContent('description');
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    const ogTitle = this.getMetaContent('og:title');
    const ogDescription = this.getMetaContent('og:description');
    const ogImage = this.getMetaContent('og:image');

    // Title validation
    if (!title) {
      this.addIssue({
        type: 'error',
        category: 'meta-tags',
        message: 'Missing page title',
        impact: 'high'
      });
    } else if (title.length > 60) {
      this.addIssue({
        type: 'warning',
        category: 'meta-tags',
        message: `Title too long (${title.length} chars). Recommended: under 60 characters`,
        impact: 'medium'
      });
    } else if (title.length < 10) {
      this.addIssue({
        type: 'warning',
        category: 'meta-tags',
        message: `Title too short (${title.length} chars). Recommended: 10-60 characters`,
        impact: 'medium'
      });
    }

    // Description validation
    if (!description) {
      this.addIssue({
        type: 'error',
        category: 'meta-tags',
        message: 'Missing meta description',
        impact: 'high'
      });
    } else if (description.length > 160) {
      this.addIssue({
        type: 'warning',
        category: 'meta-tags',
        message: `Meta description too long (${description.length} chars). Recommended: under 160 characters`,
        impact: 'medium'
      });
    } else if (description.length < 50) {
      this.addIssue({
        type: 'warning',
        category: 'meta-tags',
        message: `Meta description too short (${description.length} chars). Recommended: 50-160 characters`,
        impact: 'medium'
      });
    }

    // Canonical URL validation
    if (!canonical) {
      this.addIssue({
        type: 'warning',
        category: 'meta-tags',
        message: 'Missing canonical URL',
        impact: 'medium'
      });
    } else if (!canonical.href.startsWith('https://')) {
      this.addIssue({
        type: 'warning',
        category: 'meta-tags',
        message: 'Canonical URL should use HTTPS',
        impact: 'low'
      });
    }

    // Open Graph validation
    if (!ogTitle) {
      this.addIssue({
        type: 'warning',
        category: 'meta-tags',
        message: 'Missing Open Graph title',
        impact: 'medium'
      });
    }

    if (!ogDescription) {
      this.addIssue({
        type: 'warning',
        category: 'meta-tags',
        message: 'Missing Open Graph description',
        impact: 'medium'
      });
    }

    if (!ogImage) {
      this.addIssue({
        type: 'warning',
        category: 'meta-tags',
        message: 'Missing Open Graph image',
        impact: 'medium'
      });
    }

    // Track meta tag completeness
    trackSEOMetric('meta_tags_complete', {
      title: !!title,
      description: !!description,
      canonical: !!canonical,
      ogTitle: !!ogTitle,
      ogDescription: !!ogDescription,
      ogImage: !!ogImage
    });
  }

  /**
   * Validate content structure and SEO elements
   */
  private validateContent() {
    this.clearIssues('content');

    // Check for H1 tags
    const h1Tags = document.querySelectorAll('h1');
    if (h1Tags.length === 0) {
      this.addIssue({
        type: 'error',
        category: 'content',
        message: 'Missing H1 heading',
        impact: 'high'
      });
    } else if (h1Tags.length > 1) {
      this.addIssue({
        type: 'warning',
        category: 'content',
        message: `Multiple H1 tags found (${h1Tags.length}). Recommended: exactly one H1 per page`,
        impact: 'medium'
      });
    }

    // Check heading hierarchy
    this.validateHeadingHierarchy();

    // Check images for alt attributes
    this.validateImageAltAttributes();

    // Check for structured data
    this.validateStructuredData();
  }

  /**
   * Validate heading hierarchy (H1 > H2 > H3, etc.)
   */
  private validateHeadingHierarchy() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && currentLevel !== 1) {
        this.addIssue({
          type: 'warning',
          category: 'content',
          message: 'First heading should be H1',
          element: heading.tagName.toLowerCase(),
          impact: 'medium'
        });
      }

      if (currentLevel > previousLevel + 1) {
        this.addIssue({
          type: 'warning',
          category: 'content',
          message: `Heading hierarchy skip: ${heading.tagName} follows H${previousLevel}`,
          element: heading.tagName.toLowerCase(),
          impact: 'low'
        });
      }

      previousLevel = currentLevel;
    });
  }

  /**
   * Validate images have proper alt attributes
   */
  private validateImageAltAttributes() {
    const images = document.querySelectorAll('img');
    let missingAlt = 0;
    let emptyAlt = 0;

    images.forEach(img => {
      if (!img.hasAttribute('alt')) {
        missingAlt++;
      } else if (img.alt.trim() === '') {
        emptyAlt++;
      }
    });

    if (missingAlt > 0) {
      this.addIssue({
        type: 'warning',
        category: 'content',
        message: `${missingAlt} images missing alt attributes`,
        impact: 'medium'
      });
    }

    if (emptyAlt > 0) {
      this.addIssue({
        type: 'info',
        category: 'content',
        message: `${emptyAlt} images have empty alt attributes (decorative images)`,
        impact: 'low'
      });
    }

    trackSEOMetric('image_alt_compliance', {
      totalImages: images.length,
      missingAlt,
      emptyAlt,
      compliantImages: images.length - missingAlt
    });
  }

  /**
   * Validate structured data presence and format
   */
  private validateStructuredData() {
    const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    if (structuredDataScripts.length === 0) {
      this.addIssue({
        type: 'info',
        category: 'content',
        message: 'No structured data found',
        impact: 'low'
      });
      return;
    }

    let validSchemas = 0;
    let invalidSchemas = 0;

    structuredDataScripts.forEach(script => {
      try {
        const data = JSON.parse(script.textContent || '');
        if (data['@context'] && data['@type']) {
          validSchemas++;
        } else {
          invalidSchemas++;
        }
      } catch (e) {
        invalidSchemas++;
        this.addIssue({
          type: 'warning',
          category: 'content',
          message: 'Invalid JSON-LD structured data',
          impact: 'medium'
        });
      }
    });

    trackSEOMetric('structured_data', {
      totalSchemas: structuredDataScripts.length,
      validSchemas,
      invalidSchemas
    });
  }

  /**
   * Generate comprehensive SEO report
   */
  generateReport(): SEOReport {
    this.validateMetaTags();
    this.validateContent();

    const highIssues = this.issues.filter(issue => issue.impact === 'high').length;
    const mediumIssues = this.issues.filter(issue => issue.impact === 'medium').length;
    const lowIssues = this.issues.filter(issue => issue.impact === 'low').length;

    // Calculate SEO score (100 - penalties)
    const score = Math.max(0, 100 - (highIssues * 20) - (mediumIssues * 10) - (lowIssues * 5));

    const recommendations = this.generateRecommendations();

    const report: SEOReport = {
      score,
      issues: [...this.issues],
      recommendations,
      metrics: {
        title: document.title,
        titleLength: document.title.length,
        description: this.getMetaContent('description'),
        descriptionLength: this.getMetaContent('description')?.length || 0,
        hasCanonical: !!document.querySelector('link[rel="canonical"]'),
        h1Count: document.querySelectorAll('h1').length,
        imageCount: document.querySelectorAll('img').length,
        structuredDataCount: document.querySelectorAll('script[type="application/ld+json"]').length,
        highIssues,
        mediumIssues,
        lowIssues
      },
      timestamp: Date.now()
    };

    // Track SEO score
    trackSEOMetric('seo_score', score, {
      url: window.location.pathname,
      issues: this.issues.length
    });

    return report;
  }

  /**
   * Generate actionable recommendations based on current issues
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const issueTypes = new Set(this.issues.map(issue => issue.message));

    if (issueTypes.has('Missing page title')) {
      recommendations.push('Add a descriptive page title (10-60 characters)');
    }

    if (issueTypes.has('Missing meta description')) {
      recommendations.push('Add a compelling meta description (50-160 characters)');
    }

    if (issueTypes.has('Missing H1 heading')) {
      recommendations.push('Add an H1 heading that describes the main page content');
    }

    if (this.issues.some(issue => issue.message.includes('images missing alt attributes'))) {
      recommendations.push('Add descriptive alt text to all images for accessibility and SEO');
    }

    if (issueTypes.has('Missing canonical URL')) {
      recommendations.push('Add a canonical URL to prevent duplicate content issues');
    }

    if (this.issues.some(issue => issue.category === 'content' && issue.impact === 'high')) {
      recommendations.push('Fix critical content structure issues for better search engine understanding');
    }

    return recommendations;
  }

  /**
   * Utility methods
   */
  private getMetaContent(name: string): string | null {
    const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"], meta[property="og:${name}"]`) as HTMLMetaElement;
    return meta ? meta.content : null;
  }

  private addIssue(issue: SEOIssue) {
    this.issues.push(issue);
  }

  private clearIssues(category: string) {
    this.issues = this.issues.filter(issue => issue.category !== category);
  }

  /**
   * Clean up observers
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Create singleton instance
export const seoMonitor = new SEOMonitor();

// Export convenience functions
export const generateSEOReport = () => seoMonitor.generateReport();
export const destroySEOMonitor = () => seoMonitor.destroy();