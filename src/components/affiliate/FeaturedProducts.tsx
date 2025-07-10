import AffiliateProductCard from './AffiliateProductCard';

const FeaturedProducts = () => {
  const products = [
    {
      title: "RV Life Pro GPS & Trip Planning",
      description: "The most comprehensive RV GPS and trip planning app with real-time traffic and RV-specific routing.",
      price: "$199",
      originalPrice: "$299",
      rating: 4.8,
      reviewCount: 1247,
      image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
      features: [
        "RV-specific routing and navigation",
        "Comprehensive campground database",
        "Trip planning with road conditions",
        "Real-time traffic and weather updates"
      ],
      affiliateLink: "https://rvlife.com/pro-gps",
      badges: ["Best Seller", "Staff Pick"]
    },
    {
      title: "Victron Energy Smart Solar System",
      description: "Complete solar monitoring and control system with smartphone app integration for optimal RV power management.",
      price: "$189",
      originalPrice: "$249",
      rating: 4.9,
      reviewCount: 892,
      image: "/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png",
      features: [
        "Remote monitoring via smartphone",
        "Advanced battery protection",
        "Solar optimization algorithms",
        "Historical data tracking"
      ],
      affiliateLink: "https://victronenergy.com/solar-systems",
      badges: ["Premium Choice"]
    },
    {
      title: "RVShare Premium Rentals",
      description: "Access thousands of premium RV rentals with smart technology features and 24/7 roadside assistance.",
      price: "$89",
      originalPrice: "$129",
      rating: 4.7,
      reviewCount: 2156,
      image: "/lovable-uploads/0a22c848-dff2-43f4-b1eb-800fa123a904.png",
      features: [
        "Smart RV technology included",
        "24/7 roadside assistance",
        "Insurance coverage included",
        "Contactless pickup available"
      ],
      affiliateLink: "https://rvshare.com/smart-rvs",
      badges: ["Most Popular"]
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Smart RV Solutions
          </h2>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            Discover the top-rated products that are transforming the RV experience. 
            Each recommendation is carefully selected based on performance, user reviews, and value.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <AffiliateProductCard
              key={index}
              {...product}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-200">
              <strong>Why We Recommend These:</strong> Each product has been tested by our team or comes highly recommended by the RV community. 
              Our affiliate partnerships help us continue providing valuable content while never affecting our honest reviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;