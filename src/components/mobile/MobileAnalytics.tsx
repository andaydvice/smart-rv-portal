import { useEffect } from 'react';

interface MobileAnalyticsProps {
  pageName: string;
  affiliatePartners: string[];
}

const MobileAnalytics = ({ pageName, affiliatePartners }: MobileAnalyticsProps) => {
  useEffect(() => {
    // Track mobile-specific page view
    const trackMobilePageView = () => {
      if (window.innerWidth < 768) {
        console.log('Mobile Page View:', {
          page: pageName,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          screenSize: `${window.screen.width}x${window.screen.height}`,
          viewportSize: `${window.innerWidth}x${window.innerHeight}`,
          affiliatePartners,
          touchSupport: 'ontouchstart' in window,
          connectionType: (navigator as any)?.connection?.effectiveType || 'unknown'
        });
      }
    };

    trackMobilePageView();

    // Track touch interactions on affiliate links
    const trackTouchInteractions = () => {
      const affiliateLinks = document.querySelectorAll('a[href*="amazon.com"], a[href*="renogy.com"], a[href*="rvlife.com"], a[href*="goodsam.com"]');
      
      affiliateLinks.forEach(link => {
        const trackTouch = (event: Event) => {
          console.log('Mobile Affiliate Link Touch:', {
            url: (link as HTMLAnchorElement).href,
            text: link.textContent?.trim(),
            timestamp: new Date().toISOString(),
            touchType: event.type,
            page: pageName
          });
        };

        link.addEventListener('touchstart', trackTouch);
        link.addEventListener('click', trackTouch);
      });
    };

    // Delay to ensure DOM is ready
    setTimeout(trackTouchInteractions, 1000);

    // Track scroll depth on mobile
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      if (window.innerWidth < 768) {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScrollDepth) {
          maxScrollDepth = scrollPercent;
          
          // Track milestone scroll depths
          if ([25, 50, 75, 90].includes(scrollPercent)) {
            console.log('Mobile Scroll Milestone:', {
              page: pageName,
              scrollDepth: scrollPercent,
              timestamp: new Date().toISOString()
            });
          }
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth);
    
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, [pageName, affiliatePartners]);

  return null; // This is a tracking component, no visual output
};

export default MobileAnalytics;