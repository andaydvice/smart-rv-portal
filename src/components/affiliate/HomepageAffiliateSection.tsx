
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
            { name: 'RV Life Pro', url: 'https://rvlife.com', title: 'RV Life Pro', description: 'Professional smart RV trip planning with RV safe GPS navigation and comprehensive campground database', buttonText: 'Get RV Life Pro' },
            { name: 'Overland Solar', url: 'https://overlandsolar.com', title: 'Overland Solar', description: 'Complete offgrid solar solutions for adventure vehicles with premium quality and support', buttonText: 'Go Solar Today' },
            { name: 'EcoFlow', url: 'https://ecoflow.com', title: 'EcoFlow Power Stations', description: 'High-value portable power stations and solar generators designed for smart RV living', buttonText: 'Get Portable Power' },
            { name: 'Cruise America', url: 'https://cruiseamerica.com', title: 'Cruise America Rentals', description: 'Experience smart RV features with America\'s largest professional RV rental company', buttonText: 'Book Professional RV' },
            { name: 'Starlink Installers', url: 'https://starlink.com', title: 'Starlink Installation', description: 'Professional Starlink installation services for RVs with expert mounting and setup for reliable internet anywhere', buttonText: 'Get Professional Installation' },
            { name: 'Nomad Internet', url: 'https://nomadinternet.com', title: 'Nomad Internet', description: 'Unlimited 5G internet plans designed specifically for fulltime RV travelers and remote workers', buttonText: 'Get Unlimited Data' }
          ]}
          gridCols="3"
        />
        
      </div>
    </section>
  );
};
