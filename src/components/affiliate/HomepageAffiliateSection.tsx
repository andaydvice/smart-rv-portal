
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
            { partner: 'rvtcom' as const, title: 'RVT Marketplace', description: 'Premium smart RV marketplace connecting buyers with verified professional dealers nationwide', buttonText: 'Browse Premium Smart RVs' },
            { partner: 'solardirect' as const, title: 'Solar Direct', description: 'Complete smart RV solar power solutions with industry leading warranties and year round support', buttonText: 'Go Solar Today' },
            { partner: 'battlebornbatteries' as const, title: 'Battle Born Batteries', description: 'American made premium LiFePO4 batteries with industry leading 10 year warranty and superior performance for smart RV systems', buttonText: 'Upgrade Batteries' },
            { partner: 'starlinkinstallers' as const, title: 'Starlink Installation', description: 'Professional Starlink installation services for RVs with expert mounting and setup for reliable internet anywhere', buttonText: 'Get Professional Installation' },
            { partner: 'harvesthosts' as const, title: 'Harvest Hosts', description: 'Unique overnight stays at farms wineries and attractions for memorable smart RV travel experiences', buttonText: 'Join Harvest Hosts' }
          ]}
          gridCols="3"
        />
        
      </div>
    </section>
  );
};
