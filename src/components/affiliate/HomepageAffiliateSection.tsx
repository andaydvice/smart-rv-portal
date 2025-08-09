
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, TrendingUp, Shield, Zap, Globe } from 'lucide-react';
import { OptimizedAffiliateGrid } from './OptimizedAffiliateGrid';

export const HomepageAffiliateSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]">
      <div className="max-w-6xl mx-auto">
        <OptimizedAffiliateGrid
          title="Premium Smart RV Solutions & Services"
          subtitle="Discover top-rated smart RV products and services that enhance your experience with proven results"
          partners={[
            { partner: 'rvlife' as const, title: 'RV Life Pro', description: 'Professional smart RV trip planning with RV safe GPS navigation and comprehensive campground database', buttonText: 'Get RV Life Pro' },
            { partner: 'rvtcom' as const, title: 'RVT Marketplace', description: 'Premium smart RV marketplace connecting buyers with verified professional dealers nationwide', buttonText: 'Browse Premium Smart RVs' },
            { partner: 'solardirect' as const, title: 'Solar Direct', description: 'Complete smart RV solar power solutions with industry leading warranties and year round support', buttonText: 'Go Solar Today' },
            { partner: 'dakotalithium' as const, title: 'Dakota Lithium', description: 'Premium LiFePO4 batteries with industry leading 11 year warranty and superior cold weather performance for smart RV systems', buttonText: 'Upgrade Batteries' },
            { partner: 'blueox' as const, title: 'Blue Ox Towing', description: 'Professional grade towing systems and accessories trusted by smart RV professionals worldwide', buttonText: 'Shop Towing Gear' },
            { partner: 'nomadinternet' as const, title: 'Nomad Internet', description: 'Unlimited 5G internet plans designed specifically for full time smart RV travelers and remote workers', buttonText: 'Get Connected' }
          ]}
          gridCols="3"
          videoId="homepage-premium-solutions"
          videoTitle="Premium RV Solutions Overview"
          priority="high"
        />
        
      </div>
    </section>
  );
};
