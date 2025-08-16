/**
 * Analytics type definitions for Google Analytics and other tracking systems
 */

// Google Analytics gtag types
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export type GtagEventAction = 
  | 'page_view'
  | 'exception'
  | 'page_not_found'
  | 'error_boundary_triggered'
  | 'performance_issue'
  | 'route_change';

export interface GtagEventParams {
  page_title?: string;
  page_location?: string;
  page_path?: string;
  page_referrer?: string;
  description?: string;
  fatal?: boolean;
  error_id?: string;
  custom_parameter_1?: string;
  custom_parameter_2?: string;
}

// Safe gtag wrapper function
export const safeGtag = (
  command: 'event' | 'config' | 'js',
  action: GtagEventAction | string,
  params?: GtagEventParams | any
) => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag(command, action, params);
    }
  } catch (error) {
    // Silently fail analytics - don't break user experience
    console.warn('Analytics tracking failed:', error);
  }
};

export default safeGtag;