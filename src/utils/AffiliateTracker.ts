/**
 * Advanced Affiliate Tracking and Attribution System
 * Provides comprehensive affiliate link tracking, UTM management, and conversion attribution
 */

import { trackAffiliateClick, trackConversion } from './analytics';

interface AffiliateLink {
  id: string;
  originalUrl: string;
  affiliateUrl: string;
  productName: string;
  productId: string;
  category: string;
  commission: number;
  provider: string;
  utmParams?: UTMParams;
}

interface UTMParams {
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

interface ConversionEvent {
  affiliateId: string;
  conversionType: 'click' | 'sale' | 'lead' | 'view';
  value?: number;
  currency?: string;
  orderId?: string;
  timestamp: number;
  userAgent: string;
  referrer: string;
  sessionId: string;
}

interface AttributionModel {
  type: 'first_click' | 'last_click' | 'linear' | 'time_decay' | 'position_based';
  lookbackWindow: number; // days
}

interface TrackingSession {
  sessionId: string;
  userId?: string;
  startTime: number;
  affiliateClicks: ConversionEvent[];
  conversions: ConversionEvent[];
  utmParams?: UTMParams;
  referrer: string;
  landingPage: string;
}

class AffiliateTracker {
  private affiliateLinks: Map<string, AffiliateLink> = new Map();
  private sessions: Map<string, TrackingSession> = new Map();
  private currentSession: TrackingSession;
  private attributionModel: AttributionModel = {
    type: 'last_click',
    lookbackWindow: 30
  };

  constructor() {
    this.currentSession = this.initializeSession();
    this.setupEventListeners();
    this.loadStoredData();
  }

  private initializeSession(): TrackingSession {
    const sessionId = this.generateSessionId();
    const session: TrackingSession = {
      sessionId,
      startTime: Date.now(),
      affiliateClicks: [],
      conversions: [],
      referrer: document.referrer,
      landingPage: window.location.href,
      utmParams: this.extractUTMParams()
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private extractUTMParams(): UTMParams | undefined {
    const urlParams = new URLSearchParams(window.location.search);
    
    const source = urlParams.get('utm_source');
    const medium = urlParams.get('utm_medium');
    const campaign = urlParams.get('utm_campaign');
    
    if (source && medium && campaign) {
      return {
        source,
        medium,
        campaign,
        term: urlParams.get('utm_term') || undefined,
        content: urlParams.get('utm_content') || undefined
      };
    }
    
    return undefined;
  }

  private setupEventListeners(): void {
    // Track all link clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && this.isAffiliateLink(link.href)) {
        this.handleAffiliateClick(link);
      }
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.saveSessionData();
      }
    });

    // Track beforeunload
    window.addEventListener('beforeunload', () => {
      this.saveSessionData();
    });

    // Cross-domain message handling for conversion tracking
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'affiliate_conversion') {
        this.handleConversionMessage(event.data);
      }
    });
  }

  // Affiliate Link Management
  registerAffiliateLink(link: Omit<AffiliateLink, 'id'>): string {
    const id = `aff_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const affiliateLink: AffiliateLink = {
      ...link,
      id
    };

    this.affiliateLinks.set(id, affiliateLink);
    return id;
  }

  generateTrackingUrl(affiliateId: string, customParams?: Record<string, string>): string {
    const affiliate = this.affiliateLinks.get(affiliateId);
    if (!affiliate) {
      throw new Error(`Affiliate link not found: ${affiliateId}`);
    }

    const url = new URL(affiliate.affiliateUrl);
    
    // Add tracking parameters
    url.searchParams.set('ref', 'smart-rv-systems');
    url.searchParams.set('sid', this.currentSession.sessionId);
    url.searchParams.set('aid', affiliateId);
    
    // Add UTM parameters if configured
    if (affiliate.utmParams) {
      Object.entries(affiliate.utmParams).forEach(([key, value]) => {
        if (value) {
          url.searchParams.set(`utm_${key}`, value);
        }
      });
    }

    // Add custom parameters
    if (customParams) {
      Object.entries(customParams).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    return url.toString();
  }

  private isAffiliateLink(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const affiliateId = urlObj.searchParams.get('aid');
      return !!affiliateId && this.affiliateLinks.has(affiliateId);
    } catch {
      return false;
    }
  }

  private handleAffiliateClick(link: HTMLAnchorElement): void {
    const url = new URL(link.href);
    const affiliateId = url.searchParams.get('aid');
    
    if (!affiliateId) return;

    const affiliate = this.affiliateLinks.get(affiliateId);
    if (!affiliate) return;

    const clickEvent: ConversionEvent = {
      affiliateId,
      conversionType: 'click',
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      sessionId: this.currentSession.sessionId
    };

    this.currentSession.affiliateClicks.push(clickEvent);

    // Track with analytics
    trackAffiliateClick(
      affiliate.productName,
      affiliate.productId,
      affiliate.category,
      this.currentSession.affiliateClicks.length
    );

    // Store click for attribution
    this.storeClick(clickEvent);
  }

  private handleConversionMessage(data: any): void {
    const conversionEvent: ConversionEvent = {
      affiliateId: data.affiliateId,
      conversionType: data.conversionType || 'sale',
      value: data.value,
      currency: data.currency || 'USD',
      orderId: data.orderId,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      sessionId: this.currentSession.sessionId
    };

    this.recordConversion(conversionEvent);
  }

  // Conversion Tracking
  recordConversion(conversion: ConversionEvent): void {
    this.currentSession.conversions.push(conversion);
    
    // Apply attribution model
    const attributedClick = this.applyAttribution(conversion);
    
    if (attributedClick) {
      const affiliate = this.affiliateLinks.get(attributedClick.affiliateId);
      
      // Track conversion with analytics
      trackConversion(
        conversion.conversionType,
        conversion.value,
        conversion.currency
      );

      // Calculate commission
      if (affiliate && conversion.value) {
        const commission = conversion.value * (affiliate.commission / 100);
        
        // Track commission
        this.trackCommission({
          affiliateId: conversion.affiliateId,
          orderId: conversion.orderId,
          conversionValue: conversion.value,
          commission,
          currency: conversion.currency || 'USD'
        });
      }
    }

    this.saveSessionData();
  }

  private applyAttribution(conversion: ConversionEvent): ConversionEvent | null {
    const eligibleClicks = this.getEligibleClicks(conversion);
    
    if (eligibleClicks.length === 0) return null;

    switch (this.attributionModel.type) {
      case 'first_click':
        return eligibleClicks[0];
      
      case 'last_click':
        return eligibleClicks[eligibleClicks.length - 1];
      
      case 'linear':
        // For linear attribution, we'll return the last click but track all
        eligibleClicks.forEach(click => {
          this.trackAttributedConversion(click, conversion, 1 / eligibleClicks.length);
        });
        return eligibleClicks[eligibleClicks.length - 1];
      
      default:
        return eligibleClicks[eligibleClicks.length - 1];
    }
  }

  private getEligibleClicks(conversion: ConversionEvent): ConversionEvent[] {
    const cutoffTime = conversion.timestamp - (this.attributionModel.lookbackWindow * 24 * 60 * 60 * 1000);
    
    return this.currentSession.affiliateClicks.filter(click => 
      click.timestamp >= cutoffTime && 
      click.affiliateId === conversion.affiliateId
    );
  }

  private trackAttributedConversion(click: ConversionEvent, conversion: ConversionEvent, weight: number): void {
    // This would send attribution data to analytics
    console.log('Attributed conversion:', {
      click: click.affiliateId,
      conversion: conversion.conversionType,
      weight,
      value: conversion.value ? conversion.value * weight : undefined
    });
  }

  private trackCommission(data: {
    affiliateId: string;
    orderId?: string;
    conversionValue: number;
    commission: number;
    currency: string;
  }): void {
    // Track commission data
    console.log('Commission tracked:', data);
    
    // This would typically be sent to a backend system
    this.sendCommissionData(data);
  }

  private sendCommissionData(data: any): void {
    // In a real implementation, this would send data to your backend
    fetch('/api/affiliate/commission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch(error => {
      console.error('Failed to send commission data:', error);
    });
  }

  // UTM Parameter Management
  appendUTMParams(url: string, utmParams: UTMParams): string {
    const urlObj = new URL(url);
    
    Object.entries(utmParams).forEach(([key, value]) => {
      if (value) {
        urlObj.searchParams.set(`utm_${key}`, value);
      }
    });

    return urlObj.toString();
  }

  getCurrentUTMParams(): UTMParams | undefined {
    return this.currentSession.utmParams;
  }

  // Cross-device Tracking
  setUserId(userId: string): void {
    this.currentSession.userId = userId;
    
    // Link previous anonymous sessions to this user
    this.linkAnonymousSessions(userId);
  }

  private linkAnonymousSessions(userId: string): void {
    // This would typically involve server-side processing
    // to link anonymous sessions to the identified user
    console.log('Linking anonymous sessions to user:', userId);
  }

  // Data Persistence
  private storeClick(click: ConversionEvent): void {
    const stored = localStorage.getItem('affiliate_clicks') || '[]';
    const clicks = JSON.parse(stored);
    clicks.push(click);
    
    // Keep only last 100 clicks
    if (clicks.length > 100) {
      clicks.splice(0, clicks.length - 100);
    }
    
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
  }

  private saveSessionData(): void {
    const sessionData = {
      currentSession: this.currentSession,
      affiliateLinks: Array.from(this.affiliateLinks.entries())
    };
    
    localStorage.setItem('affiliate_session', JSON.stringify(sessionData));
  }

  private loadStoredData(): void {
    try {
      const stored = localStorage.getItem('affiliate_session');
      if (stored) {
        const data = JSON.parse(stored);
        
        if (data.currentSession) {
          // Only restore if session is recent (within 24 hours)
          const sessionAge = Date.now() - data.currentSession.startTime;
          if (sessionAge < 24 * 60 * 60 * 1000) {
            this.currentSession = data.currentSession;
          }
        }
        
        if (data.affiliateLinks) {
          this.affiliateLinks = new Map(data.affiliateLinks);
        }
      }
    } catch (error) {
      console.error('Failed to load stored affiliate data:', error);
    }
  }

  // Analytics and Reporting
  getSessionAnalytics(): {
    sessionId: string;
    clickCount: number;
    conversionCount: number;
    totalValue: number;
    topAffiliates: Array<{
      affiliateId: string;
      clicks: number;
      conversions: number;
      value: number;
    }>;
  } {
    const clicksByAffiliate = new Map<string, number>();
    const conversionsByAffiliate = new Map<string, number>();
    const valueByAffiliate = new Map<string, number>();

    this.currentSession.affiliateClicks.forEach(click => {
      clicksByAffiliate.set(click.affiliateId, (clicksByAffiliate.get(click.affiliateId) || 0) + 1);
    });

    this.currentSession.conversions.forEach(conversion => {
      conversionsByAffiliate.set(conversion.affiliateId, (conversionsByAffiliate.get(conversion.affiliateId) || 0) + 1);
      valueByAffiliate.set(conversion.affiliateId, (valueByAffiliate.get(conversion.affiliateId) || 0) + (conversion.value || 0));
    });

    const topAffiliates = Array.from(this.affiliateLinks.keys()).map(affiliateId => ({
      affiliateId,
      clicks: clicksByAffiliate.get(affiliateId) || 0,
      conversions: conversionsByAffiliate.get(affiliateId) || 0,
      value: valueByAffiliate.get(affiliateId) || 0
    })).sort((a, b) => b.value - a.value);

    return {
      sessionId: this.currentSession.sessionId,
      clickCount: this.currentSession.affiliateClicks.length,
      conversionCount: this.currentSession.conversions.length,
      totalValue: this.currentSession.conversions.reduce((sum, conv) => sum + (conv.value || 0), 0),
      topAffiliates
    };
  }

  // Attribution Model Configuration
  setAttributionModel(model: AttributionModel): void {
    this.attributionModel = model;
  }

  getAttributionModel(): AttributionModel {
    return this.attributionModel;
  }
}

// Create singleton instance
export const affiliateTracker = new AffiliateTracker();

// Convenience functions
export const registerAffiliateLink = affiliateTracker.registerAffiliateLink.bind(affiliateTracker);
export const generateTrackingUrl = affiliateTracker.generateTrackingUrl.bind(affiliateTracker);
export const recordConversion = affiliateTracker.recordConversion.bind(affiliateTracker);
export const appendUTMParams = affiliateTracker.appendUTMParams.bind(affiliateTracker);
export const getCurrentUTMParams = affiliateTracker.getCurrentUTMParams.bind(affiliateTracker);
export const setUserId = affiliateTracker.setUserId.bind(affiliateTracker);
export const getSessionAnalytics = affiliateTracker.getSessionAnalytics.bind(affiliateTracker);
export const setAttributionModel = affiliateTracker.setAttributionModel.bind(affiliateTracker);
