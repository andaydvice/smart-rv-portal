import React from 'react';

// Video configuration for affiliate recommendations across the site
export interface VideoConfig {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  placement: string[];
  affiliatePartners: string[];
  expectedConversionLift: string;
}

export const AFFILIATE_VIDEO_CONFIG: Record<string, VideoConfig> = {
  // High-Priority Calculator Videos (High Commission Partners)
  'power-management-demo': {
    id: 'power-management-demo',
    title: 'Smart Power Management Demo',
    description: 'Demonstrates realtime battery monitoring and power optimization preventing costly dead battery situations',
    priority: 'high',
    placement: ['Power Calculator Results'],
    affiliatePartners: ['RV Life', 'Good Sam'],
    expectedConversionLift: '35-45%'
  },
  
  'solar-power-demo': {
    id: 'solar-power-demo', 
    title: 'Solar Power ROI Demonstration',
    description: 'Shows actual cost savings and payback period for solar systems on RVs',
    priority: 'high',
    placement: ['Power Calculator Results', 'Solar Guide'],
    affiliatePartners: ['RV Life'],
    expectedConversionLift: '40-50%'
  },

  'battery-comparison-demo': {
    id: 'battery-comparison-demo',
    title: 'Lithium Battery Comparison',
    description: 'Compares lithium battery options against standard batteries showing long-term value',
    priority: 'high', 
    placement: ['Power Calculator Results'],
    affiliatePartners: ['Good Sam'],
    expectedConversionLift: '30-40%'
  },

  'towing-safety-demo': {
    id: 'towing-safety-demo',
    title: 'Professional Towing Safety Demo',
    description: 'Demonstrates professional-grade towing safety equipment preventing expensive breakdowns',
    priority: 'high',
    placement: ['Towing Calculator Results'],
    affiliatePartners: ['Good Sam', 'RV Life'],
    expectedConversionLift: '25-35%'
  },

  'rv-trip-planning': {
    id: 'rv-trip-planning',
    title: 'Smart RV Trip Planning Demo', 
    description: 'Shows RV Life GPS preventing costly routing mistakes and finding RV-friendly stops',
    priority: 'high',
    placement: ['RV Calculator Results'],
    affiliatePartners: ['RV Life', 'RVshare', 'Outdoorsy', 'Good Sam'],
    expectedConversionLift: '30-40%'
  },

  // Medium-Priority Feature Videos
  'smart-systems-demo': {
    id: 'smart-systems-demo',
    title: 'Smart RV Control Systems Demo',
    description: 'Showcases automated RV systems and remote monitoring for investment protection',
    priority: 'high',
    placement: ['Smart Systems Calculator'],
    affiliatePartners: ['RV Life', 'Good Sam'],
    expectedConversionLift: '25-35%'
  },

  'connectivity-demo': {
    id: 'connectivity-demo',
    title: 'RV Internet Connectivity Solutions',
    description: 'Demonstrates Starlink and cellular internet solutions for remote work and travel',
    priority: 'medium',
    placement: ['Smart Systems Calculator'],
    affiliatePartners: ['WeBoost'],
    expectedConversionLift: '20-30%'
  },

  'tire-monitoring-demo': {
    id: 'tire-monitoring-demo',
    title: 'Tire Monitoring Technology Demo',
    description: 'Shows tire pressure monitoring and safety alerts preventing blowouts and accidents',
    priority: 'high',
    placement: ['Towing Calculator'],
    affiliatePartners: ['Good Sam'],
    expectedConversionLift: '25-35%'
  }
};

// Helper function to get video configuration by ID
export const getVideoConfig = (videoId: string): VideoConfig | undefined => {
  return AFFILIATE_VIDEO_CONFIG[videoId];
};

// Helper function to get high-priority videos
export const getHighPriorityVideos = (): VideoConfig[] => {
  return Object.values(AFFILIATE_VIDEO_CONFIG).filter(config => config.priority === 'high');
};

// Helper function to get videos by placement
export const getVideosByPlacement = (placement: string): VideoConfig[] => {
  return Object.values(AFFILIATE_VIDEO_CONFIG).filter(config => 
    config.placement.includes(placement)
  );
};

export default AFFILIATE_VIDEO_CONFIG;