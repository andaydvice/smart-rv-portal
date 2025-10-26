
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
            { name: 'A1 Solar Store', url: 'https://a1solarstore.com', title: 'A1 SolarStore - Solar Power Systems', description: 'Complete off-grid solar solutions with premium panels, battery banks, and power stations. 180-day cookie, 90% confirmation rate.', buttonText: 'Shop Solar Systems' },
            { name: 'Solar Direct', url: 'https://solardirect.com', title: 'Solar Direct - Complete Solutions', description: 'Premium solar panels, lithium batteries, charge controllers, and inverters with 365-day cookie and industry-leading warranties.', buttonText: 'Get Solar Direct' },
            { name: 'RV Life Pro', url: 'https://rvlife.com', title: 'RV Life Pro', description: 'Professional smart RV trip planning with RV safe GPS navigation and comprehensive campground database', buttonText: 'Get RV Life Pro' },
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
