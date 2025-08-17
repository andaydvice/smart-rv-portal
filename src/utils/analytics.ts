/**
 * Comprehensive analytics system for SEO and performance tracking
 * Integrates with Google Analytics 4 and custom tracking
 */

interface AnalyticsEvent {
  name: string;
  parameters?: Record<string, any>;
}

interface SEOEvent extends AnalyticsEvent {
  page_title?: string;
  page_location?: string;
  search_term?: string;
  affiliate_product?: string;
  performance_metric?: string;
}

class AnalyticsManager {
  private isInitialized = false;
  private eventQueue: AnalyticsEvent[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    // Wait for GA4 to be available
    if (typeof window !== 'undefined') {
      // Initialize GA4 if not already done
      if (!(window as any).gtag) {
        await this.loadGA4();
      }
      this.isInitialized = true;
      this.flushEventQueue();
    }
  }

  private async loadGA4() {
    const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with actual tracking ID
    
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function() {
      (window as any).dataLayer.push(arguments);
    };
    
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        custom_parameter_1: 'seo_metric'
      }
    });
  }

  private flushEventQueue() {
    if (this.isInitialized) {
      this.eventQueue.forEach(event => this.sendEvent(event));
      this.eventQueue = [];
    }
  }

  private sendEvent(event: AnalyticsEvent) {
    if (!this.isInitialized) {
      this.eventQueue.push(event);
      return;
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.name, event.parameters);
    }

    // Also log to console in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', event.name, event.parameters);
    }
  }

  // SEO-specific tracking methods
  trackPageView(title: string, path: string, canonical?: string) {
    this.sendEvent({
      name: 'page_view',
      parameters: {
        page_title: title,
        page_location: canonical || window.location.href,
        page_path: path,
        timestamp: Date.now()
      }
    });
  }

  trackSearch(query: string, results: number, filters?: Record<string, any>) {
    this.sendEvent({
      name: 'search',
      parameters: {
        search_term: query,
        search_results: results,
        search_filters: filters ? JSON.stringify(filters) : undefined,
        timestamp: Date.now()
      }
    });
  }

  trackAffiliateClick(productName: string, productId: string, category: string, position: number) {
    this.sendEvent({
      name: 'affiliate_click',
      parameters: {
        affiliate_product: productName,
        product_id: productId,
        product_category: category,
        click_position: position,
        timestamp: Date.now()
      }
    });
  }

  trackUserEngagement(engagementType: string, value?: number, metadata?: Record<string, any>) {
    this.sendEvent({
      name: 'user_engagement',
      parameters: {
        engagement_type: engagementType,
        engagement_value: value,
        engagement_metadata: metadata ? JSON.stringify(metadata) : undefined,
        timestamp: Date.now()
      }
    });
  }

  trackPerformanceMetric(metricName: string, value: number, rating: string) {
    this.sendEvent({
      name: 'performance_metric',
      parameters: {
        metric_name: metricName,
        metric_value: value,
        metric_rating: rating,
        page_path: window.location.pathname,
        timestamp: Date.now()
      }
    });
  }

  trackSEOMetric(metricName: string, value: any, context?: Record<string, any>) {
    this.sendEvent({
      name: 'seo_metric',
      parameters: {
        seo_metric_name: metricName,
        seo_metric_value: value,
        seo_context: context ? JSON.stringify(context) : undefined,
        page_path: window.location.pathname,
        timestamp: Date.now()
      }
    });
  }

  trackError(errorType: string, errorMessage: string, errorStack?: string) {
    this.sendEvent({
      name: 'error',
      parameters: {
        error_type: errorType,
        error_message: errorMessage,
        error_stack: errorStack,
        page_path: window.location.pathname,
        timestamp: Date.now()
      }
    });
  }

  // Conversion tracking for lead generation
  trackConversion(conversionType: string, value?: number, currency = 'USD') {
    this.sendEvent({
      name: 'conversion',
      parameters: {
        conversion_type: conversionType,
        value: value,
        currency: currency,
        timestamp: Date.now()
      }
    });
  }

  // Track feature usage for product insights
  trackFeatureUsage(featureName: string, context?: Record<string, any>) {
    this.sendEvent({
      name: 'feature_usage',
      parameters: {
        feature_name: featureName,
        feature_context: context ? JSON.stringify(context) : undefined,
        timestamp: Date.now()
      }
    });
  }
}

// Create singleton instance
export const analytics = new AnalyticsManager();

// Convenience functions
export const trackPageView = analytics.trackPageView.bind(analytics);
export const trackSearch = analytics.trackSearch.bind(analytics);
export const trackAffiliateClick = analytics.trackAffiliateClick.bind(analytics);
export const trackUserEngagement = analytics.trackUserEngagement.bind(analytics);
export const trackPerformanceMetric = analytics.trackPerformanceMetric.bind(analytics);
export const trackSEOMetric = analytics.trackSEOMetric.bind(analytics);
export const trackError = analytics.trackError.bind(analytics);
export const trackConversion = analytics.trackConversion.bind(analytics);
export const trackFeatureUsage = analytics.trackFeatureUsage.bind(analytics);