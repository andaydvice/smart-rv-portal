import AffiliateProductCard from '@/components/affiliate/AffiliateProductCard';

const TechnologyProductRecommendations = () => {
  const products = [
    {
      title: "TechnoRV Smart GPS Tracker",
      description: "Professional GPS tracking system with real-time location monitoring and theft alerts. 5-7% commission program.",
      price: "$199",
      originalPrice: "$299", 
      rating: 4.8,
      reviewCount: 423,
      image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
      features: [
        "Real-time GPS tracking",
        "Theft alert notifications",
        "Smartphone app control",
        "Long battery life"
      ],
      affiliateLink: "https://technorv.com/gps-tracker?ref=smartroadportal",
      badges: ["TechnoRV Partner"]
    },
    {
      title: "TechnoRV WiFi Signal Booster",
      description: "Boost your RV's WiFi signal strength for reliable internet connectivity anywhere you travel.",
      price: "$149",
      originalPrice: "$199",
      rating: 4.6,
      reviewCount: 1289,
      image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
      features: [
        "5x signal amplification",
        "Easy RV installation",
        "Works with all carriers",
        "Weather resistant design"
      ],
      affiliateLink: "https://technorv.com/wifi-booster?ref=smartroadportal",
      badges: ["Connectivity Essential"]
    },
    {
      title: "RV Water Filter Store Premium System",
      description: "Complete water filtration system with smart monitoring capabilities. 10-15% commission program.",
      price: "$299",
      originalPrice: "$399",
      rating: 4.7,
      reviewCount: 567,
      image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
      features: [
        "Multi-stage filtration",
        "Smart filter monitoring",
        "Easy installation",
        "NSF certified"
      ],
      affiliateLink: "https://rvwaterfilterstore.com/?ref=smartroadportal",
      badges: ["Water Safety"]
    },
    {
      title: "TechnoRV Smart Tank Monitor",
      description: "Monitor all your RV tank levels remotely with precision sensors and smartphone integration.",
      price: "$179",
      originalPrice: "$249",
      rating: 4.5,
      reviewCount: 234,
      image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
      features: [
        "Precise tank level monitoring",
        "Mobile app integration",
        "Multiple tank support",
        "Low level alerts"
      ],
      affiliateLink: "https://technorv.com/tank-monitor?ref=smartroadportal",
      badges: ["Smart Monitoring"]
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Shop Smart RV Technology
          </h2>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            Transform your RV with these cutting-edge smart technologies. 
            Each product is vetted by our tech experts and highly rated by the RV community.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <AffiliateProductCard
              key={index}
              {...product}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-3">
              Why Choose These Smart RV Technologies?
            </h3>
            <p className="text-blue-200">
              Our recommendations are based on extensive testing, user reviews, and compatibility with modern RV systems. 
              Each product offers exceptional value and proven performance in real-world RV conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyProductRecommendations;