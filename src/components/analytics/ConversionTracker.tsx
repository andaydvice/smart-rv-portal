import { useEffect, useRef } from 'react';

interface ConversionTrackerProps {
  pageName: string;
  affiliatePartners?: string[];
}

const ConversionTracker = ({ pageName, affiliatePartners = [] }: ConversionTrackerProps) => {
  const heatmapData = useRef<Array<{ x: number; y: number; timestamp: number }>>([]);
  const scrollDepths = useRef<number[]>([]);
  const maxScrollDepth = useRef(0);

  useEffect(() => {
    // Track mouse movements for heat map
    const trackMouseMove = (e: MouseEvent) => {
      heatmapData.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
      
      // Keep only last 1000 points
      if (heatmapData.current.length > 1000) {
        heatmapData.current = heatmapData.current.slice(-1000);
      }
    };

    // Track clicks with enhanced data
    const trackClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickData = {
        page: pageName,
        x: e.clientX,
        y: e.clientY,
        element: target.tagName,
        className: target.className,
        id: target.id,
        text: target.textContent?.slice(0, 100),
        timestamp: new Date().toISOString(),
        scrollPosition: window.scrollY,
        isAffiliate: target.closest('a[href*="amazon.com"], a[href*="renogy.com"]') !== null
      };

      // Track click data
      
      // Store click data
      const clicks = JSON.parse(localStorage.getItem('click_tracking') || '[]');
      clicks.push(clickData);
      localStorage.setItem('click_tracking', JSON.stringify(clicks.slice(-200)));
    };

    // Track scroll depth
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercent;
        
        // Track milestone depths
        if ([25, 50, 75, 90, 100].includes(scrollPercent)) {
          scrollDepths.current.push(scrollPercent);
          
          // Track scroll milestone
        }
      }
    };

    // Track affiliate link interactions
    const trackAffiliateClick = (e: Event) => {
      const link = e.target as HTMLAnchorElement;
      const affiliateData = {
        page: pageName,
        partner: affiliatePartners.find(p => link.href.includes(p.toLowerCase())) || 'unknown',
        url: link.href,
        linkText: link.textContent?.trim(),
        position: link.getBoundingClientRect(),
        timestamp: new Date().toISOString(),
        referrer: document.referrer
      };

      // Track affiliate click
      
      // Store affiliate click data
      const affiliateClicks = JSON.parse(localStorage.getItem('affiliate_tracking') || '[]');
      affiliateClicks.push(affiliateData);
      localStorage.setItem('affiliate_tracking', JSON.stringify(affiliateClicks.slice(-100)));
    };

    // Add event listeners
    document.addEventListener('mousemove', trackMouseMove);
    document.addEventListener('click', trackClick);
    window.addEventListener('scroll', trackScroll);

    // Track affiliate links
    const affiliateLinks = document.querySelectorAll('a[href*="amazon.com"], a[href*="renogy.com"], a[href*="rvlife.com"]');
    affiliateLinks.forEach(link => {
      link.addEventListener('click', trackAffiliateClick);
    });

    return () => {
      document.removeEventListener('mousemove', trackMouseMove);
      document.removeEventListener('click', trackClick);
      window.removeEventListener('scroll', trackScroll);
      
      affiliateLinks.forEach(link => {
        link.removeEventListener('click', trackAffiliateClick);
      });

      // Save final heat map data
      if (heatmapData.current.length > 0) {
        const existingData = JSON.parse(localStorage.getItem('heatmap_data') || '{}');
        existingData[pageName] = heatmapData.current;
        localStorage.setItem('heatmap_data', JSON.stringify(existingData));
      }

      // Save scroll depth summary
      const scrollSummary = {
        page: pageName,
        maxDepth: maxScrollDepth.current,
        milestones: scrollDepths.current,
        sessionDuration: performance.now(),
        timestamp: new Date().toISOString()
      };

      const scrollData = JSON.parse(localStorage.getItem('scroll_tracking') || '[]');
      scrollData.push(scrollSummary);
      localStorage.setItem('scroll_tracking', JSON.stringify(scrollData.slice(-50)));
    };
  }, [pageName, affiliatePartners]);

  return null; // This is a tracking component with no visual output
};

export default ConversionTracker;
