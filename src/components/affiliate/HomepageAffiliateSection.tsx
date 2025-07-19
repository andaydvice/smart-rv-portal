
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';

export const HomepageAffiliateSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Premium RV Solutions & Services
          </h2>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            Discover top-rated products and services that enhance your RV lifestyle with proven results
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* RV Life Pro - Highest Commission */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400 font-medium">25% Commission</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">RV Life Pro</h3>
            <p className="text-gray-300 mb-4">
              Professional trip planning with RV-safe GPS navigation and comprehensive campground database.
            </p>
            <Button 
              asChild
              className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <a 
                href="https://rvlife.com/?ref=smartportal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Get RV Life Pro
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* RVT.com - High Ticket Sales */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm text-yellow-400 font-medium">Up to $1,000 Bonus</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">RVT Marketplace</h3>
            <p className="text-gray-300 mb-4">
              Premium RV marketplace connecting buyers with professional dealers nationwide.
            </p>
            <Button 
              asChild
              className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <a 
                href="https://rvt.com/?ref=smartrvdeals"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Browse Premium RVs
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Solar Direct - Longest Cookie */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-blue-400 fill-current" />
              <span className="text-sm text-blue-400 font-medium">365-Day Cookie</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Solar Direct</h3>
            <p className="text-gray-300 mb-4">
              Complete solar power solutions with industry-leading warranties and year-long tracking.
            </p>
            <Button 
              asChild
              className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <a 
                href="https://solardirect.com/?ref=smartsolar365"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Go Solar Today
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Dakota Lithium - Premium Batteries */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400 font-medium">7% Commission</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Dakota Lithium</h3>
            <p className="text-gray-300 mb-4">
              Premium LiFePO4 batteries with 11-year warranty and superior cold weather performance.
            </p>
            <Button 
              asChild
              className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <a 
                href="https://dakotalithium.com/?ref=smartbattery"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Upgrade Batteries
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Blue Ox - Towing Solutions */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-purple-400 fill-current" />
              <span className="text-sm text-purple-400 font-medium">10% Commission</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Blue Ox Towing</h3>
            <p className="text-gray-300 mb-4">
              Professional-grade towing systems and accessories trusted by RV professionals.
            </p>
            <Button 
              asChild
              className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <a 
                href="https://blueox.us/?ref=smarttowing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Shop Towing Gear
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Nomad Internet - Connectivity */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">$35 Per Sale</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Nomad Internet</h3>
            <p className="text-gray-300 mb-4">
              Unlimited 5G internet plans designed specifically for full-time RV travelers.
            </p>
            <Button 
              asChild
              className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <a 
                href="https://nomadinternet.com/?ref=smartnomad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Get Connected
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-200 text-left">
              <strong>Our Promise:</strong> These are our highest-performing affiliate partners with proven track records and competitive commission structures. 
              We only recommend products and services we personally use and trust for the RV community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
