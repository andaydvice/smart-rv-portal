import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';

const TechnologyProductRecommendations = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]">
      <div className="max-w-6xl mx-auto">
        <OptimizedAffiliateGrid
          title="Shop Smart RV Technology"
          subtitle="Transform your RV with cutting-edge smart technologies. Each product is vetted by our tech experts and highly rated by the smart RV community."
          partners={[
            { partner: 'rvlife', title: 'Smart RV Systems', description: 'GPS tracking, WiFi boosters, and smart appliance controls for intelligent RV management' },
            { partner: 'rvwaterfilter', title: 'Water Safety Tech', description: 'Smart water filtration and monitoring systems for safe intelligent RV living' },
            { partner: 'goodsam', title: 'Tech Support', description: 'Professional installation and technical support services for smart RV systems' },
            { partner: 'rvlife', title: 'Digital Tools', description: 'Apps and digital tools for smart RV management and intelligent travel planning' }
          ]}
          gridCols="2"
        />
      </div>
    </section>
  );
};

export default TechnologyProductRecommendations;