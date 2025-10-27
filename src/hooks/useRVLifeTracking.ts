/**
 * RV Life Pro Analytics Tracking Hook
 *
 * Custom React hook for comprehensive tracking of user interactions
 * with RV Life Pro affiliate content including page views, scroll depth,
 * CTA clicks, video plays, form interactions, and time on page.
 */

import { useEffect, useRef, useCallback } from 'react';
import { analytics } from '@/utils/analytics';
import { trackAffiliateClick } from '@/utils/affiliate/rvLifeProTracking';

export interface UseRVLifeTrackingOptions {
  /**
   * Page identifier for tracking
   */
  pageName: string;

  /**
   * Enable scroll depth tracking
   * @default true
   */
  trackScrollDepth?: boolean;

  /**
   * Enable time on page tracking
   * @default true
   */
  trackTimeOnPage?: boolean;

  /**
   * Scroll depth thresholds to track (percentage)
   * @default [25, 50, 75, 90, 100]
   */
  scrollThresholds?: number[];

  /**
   * Enable automatic page view tracking
   * @default true
   */
  trackPageView?: boolean;
}

export interface RVLifeTrackingHook {
  /**
   * Track a CTA button click
   */
  trackCTAClick: (ctaName: string, location: string) => void;

  /**
   * Track video play event
   */
  trackVideoPlay: (videoId: string, videoTitle: string) => void;

  /**
   * Track video completion
   */
  trackVideoComplete: (videoId: string, videoTitle: string, watchTime: number) => void;

  /**
   * Track form interaction
   */
  trackFormInteraction: (formName: string, fieldName: string, action: string) => void;

  /**
   * Track form submission
   */
  trackFormSubmit: (formName: string, success: boolean) => void;

  /**
   * Track custom event
   */
  trackCustomEvent: (eventName: string, metadata?: Record<string, any>) => void;

  /**
   * Track feature interaction
   */
  trackFeatureClick: (featureName: string, action: string) => void;
}

/**
 * RV Life Pro Analytics Tracking Hook
 *
 * Provides comprehensive tracking for all user interactions
 * related to RV Life Pro affiliate content.
 *
 * @example
 * const { trackCTAClick, trackVideoPlay, trackFormSubmit } = useRVLifeTracking({
 *   pageName: 'rv-life-pro-landing',
 *   trackScrollDepth: true,
 *   trackTimeOnPage: true,
 * });
 */
export function useRVLifeTracking(
  options: UseRVLifeTrackingOptions
): RVLifeTrackingHook {
  const {
    pageName,
    trackScrollDepth = true,
    trackTimeOnPage = true,
    scrollThresholds = [25, 50, 75, 90, 100],
    trackPageView = true,
  } = options;

  // Refs for tracking
  const scrollDepthTracked = useRef<Set<number>>(new Set());
  const pageStartTime = useRef<number>(Date.now());
  const lastActivityTime = useRef<number>(Date.now());
  const isTracking = useRef<boolean>(true);

  // Track page view on mount
  useEffect(() => {
    if (trackPageView) {
      analytics.trackPageView(
        `RV Life Pro - ${pageName}`,
        window.location.pathname,
        window.location.href
      );

      if (import.meta.env.DEV) {
        console.log('📄 Page view tracked:', pageName);
      }
    }
  }, [pageName, trackPageView]);

  // Scroll depth tracking
  useEffect(() => {
    if (!trackScrollDepth) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;

      scrollThresholds.forEach((threshold) => {
        if (scrollPercentage >= threshold && !scrollDepthTracked.current.has(threshold)) {
          scrollDepthTracked.current.add(threshold);

          analytics.trackUserEngagement('scroll_depth', threshold, {
            page: pageName,
            product: 'RV Life Pro',
            threshold: `${threshold}%`,
          });

          if (import.meta.env.DEV) {
            console.log(`📊 Scroll depth: ${threshold}% on ${pageName}`);
          }
        }
      });

      // Update last activity time
      lastActivityTime.current = Date.now();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackScrollDepth, scrollThresholds, pageName]);

  // Time on page tracking
  useEffect(() => {
    if (!trackTimeOnPage) return;

    const trackTimeSpent = () => {
      if (!isTracking.current) return;

      const timeSpent = Math.floor((Date.now() - pageStartTime.current) / 1000); // seconds
      const timeSinceActivity = Math.floor((Date.now() - lastActivityTime.current) / 1000);

      // Only track if user was active in last 30 seconds
      if (timeSinceActivity < 30) {
        analytics.trackUserEngagement('time_on_page', timeSpent, {
          page: pageName,
          product: 'RV Life Pro',
          timeSpent: `${timeSpent}s`,
        });

        if (import.meta.env.DEV) {
          console.log(`⏱️ Time on page: ${timeSpent}s on ${pageName}`);
        }
      }
    };

    // Track every 30 seconds
    const interval = setInterval(trackTimeSpent, 30000);

    // Track on page unload
    const handleUnload = () => {
      trackTimeSpent();
      isTracking.current = false;
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
      trackTimeSpent(); // Final tracking
    };
  }, [trackTimeOnPage, pageName]);

  // Track CTA clicks
  const trackCTAClick = useCallback(
    (ctaName: string, location: string) => {
      trackAffiliateClick(ctaName, `${pageName}-${location}`);

      analytics.trackUserEngagement('cta_click', undefined, {
        page: pageName,
        product: 'RV Life Pro',
        ctaName,
        location,
      });

      if (import.meta.env.DEV) {
        console.log('🎯 CTA clicked:', { ctaName, location, page: pageName });
      }
    },
    [pageName]
  );

  // Track video play
  const trackVideoPlay = useCallback(
    (videoId: string, videoTitle: string) => {
      analytics.trackUserEngagement('video_play', undefined, {
        page: pageName,
        product: 'RV Life Pro',
        videoId,
        videoTitle,
      });

      if (import.meta.env.DEV) {
        console.log('▶️ Video played:', { videoId, videoTitle, page: pageName });
      }
    },
    [pageName]
  );

  // Track video completion
  const trackVideoComplete = useCallback(
    (videoId: string, videoTitle: string, watchTime: number) => {
      analytics.trackUserEngagement('video_complete', watchTime, {
        page: pageName,
        product: 'RV Life Pro',
        videoId,
        videoTitle,
        watchTime: `${watchTime}s`,
      });

      if (import.meta.env.DEV) {
        console.log('✅ Video completed:', {
          videoId,
          videoTitle,
          watchTime,
          page: pageName,
        });
      }
    },
    [pageName]
  );

  // Track form interaction
  const trackFormInteraction = useCallback(
    (formName: string, fieldName: string, action: string) => {
      analytics.trackUserEngagement('form_interaction', undefined, {
        page: pageName,
        product: 'RV Life Pro',
        formName,
        fieldName,
        action,
      });

      if (import.meta.env.DEV) {
        console.log('📝 Form interaction:', {
          formName,
          fieldName,
          action,
          page: pageName,
        });
      }
    },
    [pageName]
  );

  // Track form submission
  const trackFormSubmit = useCallback(
    (formName: string, success: boolean) => {
      analytics.trackUserEngagement('form_submit', success ? 1 : 0, {
        page: pageName,
        product: 'RV Life Pro',
        formName,
        success,
      });

      if (success) {
        analytics.trackConversion('lead_generation', undefined, 'USD');
      }

      if (import.meta.env.DEV) {
        console.log('📬 Form submitted:', { formName, success, page: pageName });
      }
    },
    [pageName]
  );

  // Track custom events
  const trackCustomEvent = useCallback(
    (eventName: string, metadata?: Record<string, any>) => {
      analytics.trackUserEngagement(eventName, undefined, {
        page: pageName,
        product: 'RV Life Pro',
        ...metadata,
      });

      if (import.meta.env.DEV) {
        console.log('🔔 Custom event:', { eventName, metadata, page: pageName });
      }
    },
    [pageName]
  );

  // Track feature clicks
  const trackFeatureClick = useCallback(
    (featureName: string, action: string) => {
      analytics.trackFeatureUsage(featureName, {
        page: pageName,
        product: 'RV Life Pro',
        action,
      });

      if (import.meta.env.DEV) {
        console.log('⚡ Feature clicked:', { featureName, action, page: pageName });
      }
    },
    [pageName]
  );

  return {
    trackCTAClick,
    trackVideoPlay,
    trackVideoComplete,
    trackFormInteraction,
    trackFormSubmit,
    trackCustomEvent,
    trackFeatureClick,
  };
}

export default useRVLifeTracking;
