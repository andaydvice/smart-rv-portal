/**
 * Critical CSS optimization utilities
 */

interface CriticalCSSConfig {
  aboveTheFoldHeight: number;
  mediaQueries: string[];
  excludeSelectors: string[];
}

class CriticalCSSOptimizer {
  private config: CriticalCSSConfig = {
    aboveTheFoldHeight: 800,
    mediaQueries: ['(max-width: 768px)', '(max-width: 1024px)'],
    excludeSelectors: ['.hidden', '.sr-only', '[data-testid]']
  };

  // Extract critical CSS for above-the-fold content
  extractCriticalCSS(): string {
    if (typeof document === 'undefined') return '';

    const criticalStyles: string[] = [];
    const processedRules = new Set<string>();

    // Get all stylesheets
    const styleSheets = Array.from(document.styleSheets);

    styleSheets.forEach(sheet => {
      try {
        if (sheet.cssRules) {
          Array.from(sheet.cssRules).forEach(rule => {
            if (rule instanceof CSSStyleRule) {
              const selector = rule.selectorText;
              const ruleText = rule.cssText;

              // Skip if already processed
              if (processedRules.has(ruleText)) return;

              // Check if selector applies to above-the-fold content
              if (this.isCriticalSelector(selector)) {
                criticalStyles.push(ruleText);
                processedRules.add(ruleText);
              }
            } else if (rule instanceof CSSMediaRule) {
              // Handle media queries
              const media = rule.media.mediaText;
              if (this.isCriticalMediaQuery(media)) {
                Array.from(rule.cssRules).forEach(mediaRule => {
                  if (mediaRule instanceof CSSStyleRule) {
                    const selector = mediaRule.selectorText;
                    if (this.isCriticalSelector(selector)) {
                      criticalStyles.push(`@media ${media} { ${mediaRule.cssText} }`);
                    }
                  }
                });
              }
            }
          });
        }
      } catch (error) {
        // Skip inaccessible stylesheets (CORS)
        console.warn('Cannot access stylesheet:', error);
      }
    });

    return criticalStyles.join('\n');
  }

  private isCriticalSelector(selector: string): boolean {
    // Skip excluded selectors
    if (this.config.excludeSelectors.some(exclude => selector.includes(exclude))) {
      return false;
    }

    try {
      // Check if elements matching the selector are in the viewport
      const elements = document.querySelectorAll(selector);
      
      return Array.from(elements).some(element => {
        const rect = element.getBoundingClientRect();
        return rect.top < this.config.aboveTheFoldHeight && rect.bottom > 0;
      });
    } catch (error) {
      // Invalid selector, skip
      return false;
    }
  }

  private isCriticalMediaQuery(media: string): boolean {
    return this.config.mediaQueries.some(query => media.includes(query));
  }

  // Inline critical CSS
  inlineCriticalCSS(): void {
    const criticalCSS = this.extractCriticalCSS();
    
    if (criticalCSS) {
      const styleElement = document.createElement('style');
      styleElement.id = 'critical-css';
      styleElement.textContent = criticalCSS;
      
      // Insert at the beginning of head for highest priority
      const head = document.head;
      head.insertBefore(styleElement, head.firstChild);
      
      console.log('✅ Critical CSS inlined:', Math.round(criticalCSS.length / 1024), 'KB');
    }
  }

  // Defer non-critical CSS
  deferNonCriticalCSS(): void {
    const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    
    linkElements.forEach(link => {
      const href = (link as HTMLLinkElement).href;
      
      // Skip inline and critical stylesheets
      if (!href || href.includes('critical') || href.includes('inline')) return;
      
      // Convert to preload and load asynchronously
      (link as HTMLLinkElement).rel = 'preload';
      (link as HTMLLinkElement).as = 'style';
      
      // Load after critical rendering path
      const loadStylesheet = () => {
        (link as HTMLLinkElement).rel = 'stylesheet';
        (link as HTMLLinkElement).removeAttribute('as');
      };
      
      if (document.readyState === 'complete') {
        setTimeout(loadStylesheet, 0);
      } else {
        window.addEventListener('load', loadStylesheet);
      }
    });
  }

  // Monitor and optimize font loading
  optimizeFontLoading(): void {
    // Add font-display: swap to improve perceived performance
    const fontFaces = Array.from(document.fonts);
    
    fontFaces.forEach(font => {
      // This would typically be done in CSS, but we can monitor here
      console.log('Font loaded:', font.family, font.style, font.weight);
    });

    // Preload critical fonts
    const criticalFonts = [
      '/fonts/inter-var.woff2'
    ];

    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = fontUrl;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Get CSS performance metrics
  getCSSMetrics(): {
    totalStylesheets: number;
    totalRules: number;
    criticalRules: number;
    estimatedCriticalSize: number;
  } {
    const styleSheets = Array.from(document.styleSheets);
    let totalRules = 0;
    let criticalRules = 0;

    styleSheets.forEach(sheet => {
      try {
        if (sheet.cssRules) {
          totalRules += sheet.cssRules.length;
          
          Array.from(sheet.cssRules).forEach(rule => {
            if (rule instanceof CSSStyleRule) {
              if (this.isCriticalSelector(rule.selectorText)) {
                criticalRules++;
              }
            }
          });
        }
      } catch (error) {
        // Skip inaccessible stylesheets
      }
    });

    const criticalCSS = this.extractCriticalCSS();

    return {
      totalStylesheets: styleSheets.length,
      totalRules,
      criticalRules,
      estimatedCriticalSize: criticalCSS.length
    };
  }
}

// Singleton instance
export const criticalCSSOptimizer = new CriticalCSSOptimizer();

// Initialize CSS optimizations
export const initializeCSSOptimizations = () => {
  // Disabled to prevent loading issues
  console.log('CSS optimizations disabled for stability');
  return;
};

const runOptimizations = () => {
  // Disabled to prevent loading issues
  console.log('CSS optimizations disabled for stability');
  return;
};