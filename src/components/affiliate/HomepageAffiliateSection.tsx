import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export const HomepageAffiliateSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Smart RV Journey Today
          </h2>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            Get the tools and services that make RV life easier, safer, and more enjoyable
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* RVShare */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm text-blue-400 font-medium">Most Popular</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">RVShare Rentals</h3>
            <p className="text-gray-300 mb-4">
              Experience smart RV living before you buy. Thousands of tech-equipped RVs available nationwide.
            </p>
            <Button 
              asChild
              className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <a 
                href="https://rvshare.com/?ref=smartroadportal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Browse Smart RVs
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* RV Life */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm text-blue-400 font-medium">Best Value</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">RV Life Pro</h3>
            <p className="text-gray-300 mb-4">
              Complete RV planning toolkit with GPS navigation, campground finder, and maintenance tracking.
            </p>
            <Button 
              asChild
              className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <a 
                href="https://rvlife.com/?ref=smartroadportal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Get RV Life Pro
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Good Sam */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm text-blue-400 font-medium">Peace of Mind</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Good Sam Services</h3>
            <p className="text-gray-300 mb-4">
              Comprehensive RV insurance, roadside assistance, and emergency services for peace of mind.
            </p>
            <Button 
              asChild
              className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <a 
                href="https://goodsam.com/?ref=smartroadportal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Protect Your RV
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-200">
              <strong>Our Promise:</strong> These are our top recommended partners based on real user experiences and value. 
              Our affiliate partnerships help us provide free content while maintaining honest, unbiased reviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};