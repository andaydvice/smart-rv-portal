
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, TrendingUp, Shield, Zap, Globe } from 'lucide-react';
import { OptimizedAffiliateGrid } from './OptimizedAffiliateGrid';

export const HomepageAffiliateSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]" style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}>
      <div className="max-w-6xl mx-auto">
        <OptimizedAffiliateGrid
          title="Premium Smart RV Solutions & Services"
          subtitle="Discover top-rated Smart RV products and services that enhance your experience with proven results"
          partners={[
            { partner: 'rvlife' as const, title: 'RV Life Pro', description: 'Professional smart RV trip planning with RV safe GPS navigation and comprehensive campground database', buttonText: 'Get RV Life Pro' },
            { partner: 'overlandsolar' as const, title: 'Overland Solar', description: 'Complete off-grid solar solutions for adventure vehicles with premium quality and support', buttonText: 'Go Solar Today' },
            { partner: 'ecoflow' as const, title: 'EcoFlow Power Stations', description: 'High-value portable power stations and solar generators designed for smart RV living', buttonText: 'Get Portable Power' },
            { partner: 'cruiseamerica' as const, title: 'Cruise America Rentals', description: 'Experience smart RV features with America\'s largest professional RV rental company', buttonText: 'Book Professional RV' },
            { partner: 'starlinkinstallers' as const, title: 'Starlink Installation', description: 'Professional Starlink installation services for RVs with expert mounting and setup for reliable internet anywhere', buttonText: 'Get Professional Installation' },
            { partner: 'nomadinternet' as const, title: 'Nomad Internet', description: 'Unlimited 5G internet plans designed specifically for full-time RV travelers and remote workers', buttonText: 'Get Unlimited Data' }
          ]}
          gridCols="3"
        />
        
      </div>
    </section>
  );
};
