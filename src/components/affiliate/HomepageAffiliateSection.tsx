
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, TrendingUp, Shield, Zap, Globe } from 'lucide-react';
import { OptimizedAffiliateGrid } from './OptimizedAffiliateGrid';

export const HomepageAffiliateSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]">
      <div className="max-w-6xl mx-auto">
        <OptimizedAffiliateGrid
          title="Premium RV Solutions & Services"
          subtitle="Discover top-rated products and services that enhance your RV lifestyle with proven results"
          partners={[
            { partner: 'rvlife' as const, title: 'RV Life Pro', description: 'Professional trip planning with RV safe GPS navigation and comprehensive campground database', buttonText: 'Get RV Life Pro' },
            { partner: 'rvtcom' as const, title: 'RVT Marketplace', description: 'Premium RV marketplace connecting buyers with verified professional dealers nationwide', buttonText: 'Browse Premium RVs' },
            { partner: 'solardirect' as const, title: 'Solar Direct', description: 'Complete solar power solutions with industry leading warranties and year round support', buttonText: 'Go Solar Today' },
            { partner: 'dakotalithium' as const, title: 'Dakota Lithium', description: 'Premium LiFePO4 batteries with industry leading 11 year warranty and superior cold weather performance', buttonText: 'Upgrade Batteries' },
            { partner: 'blueox' as const, title: 'Blue Ox Towing', description: 'Professional grade towing systems and accessories trusted by RV professionals worldwide', buttonText: 'Shop Towing Gear' },
            { partner: 'nomadinternet' as const, title: 'Nomad Internet', description: 'Unlimited 5G internet plans designed specifically for full time RV travelers and remote workers', buttonText: 'Get Connected' }
          ]}
          gridCols="3"
          videoId="rv-solutions-overview"
          videoTitle="Premium RV Solutions Showcase"
          priority="high"
        />
        
        <div className="text-center mt-8">
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-200 text-left">
              <strong>Our Promise:</strong> These are carefully selected partners with proven track records of excellent customer service and quality products. 
              We only recommend products and services we personally use and trust for the RV community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
