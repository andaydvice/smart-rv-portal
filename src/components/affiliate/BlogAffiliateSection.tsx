import React from 'react';
import AffiliateProductCard from './AffiliateProductCard';
import AffiliateCTABanner from './AffiliateCTABanner';

interface BlogAffiliateSectionProps {
  category: string;
  postSlug: string;
}

const BlogAffiliateSection = ({ category, postSlug }: BlogAffiliateSectionProps) => {
  const getProductsForPost = () => {
    // RV Smart Tech products
    if (postSlug === 'rv-smart-tech') {
      return [
        {
          title: "TechnoRV Smart Control System",
          description: "Complete RV automation system with voice control, mobile app, and advanced monitoring capabilities.",
          price: "$599",
          originalPrice: "$799",
          rating: 4.8,
          reviewCount: 324,
          image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
          features: [
            "Voice-activated controls",
            "Mobile app integration",
            "Real-time diagnostics",
            "Easy installation"
          ],
          affiliateLink: "https://technorv.com/smart-control",
          badges: ["Tech Editor's Choice"]
        },
        {
          title: "RV Life Smart Hub Pro",
          description: "Central hub for all your RV smart devices with cloud connectivity and advanced automation.",
          price: "$399",
          originalPrice: "$499",
          rating: 4.7,
          reviewCount: 189,
          image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
          features: [
            "Device integration hub",
            "Cloud connectivity",
            "Automation scheduling",
            "Energy monitoring"
          ],
          affiliateLink: "https://rvlife.com/smart-hub-pro",
          badges: ["Best Value"]
        }
      ];
    }

    // Solar Power products
    if (postSlug === 'solar-power-for-rvs') {
      return [
        {
          title: "Victron SmartSolar MPPT 100/30",
          description: "Advanced MPPT charge controller with Bluetooth monitoring and optimization algorithms.",
          price: "$189",
          originalPrice: "$239",
          rating: 4.9,
          reviewCount: 567,
          image: "/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png",
          features: [
            "Maximum Power Point Tracking",
            "Bluetooth monitoring",
            "VictronConnect app",
            "Advanced battery care"
          ],
          affiliateLink: "https://victronenergy.com/charge-controllers",
          badges: ["Professional Grade"]
        },
        {
          title: "RV Solar Installation Kit - 400W",
          description: "Complete solar kit with panels, controller, wiring, and mounting hardware for easy DIY installation.",
          price: "$899",
          originalPrice: "$1199",
          rating: 4.6,
          reviewCount: 234,
          image: "/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png",
          features: [
            "400W solar capacity",
            "Complete installation kit",
            "MPPT charge controller",
            "5-year warranty"
          ],
          affiliateLink: "https://renogy.com/rv-solar-kits",
          badges: ["Complete Kit"]
        }
      ];
    }

    // Smart RV Security products
    if (postSlug === 'smart-rv-security-systems') {
      return [
        {
          title: "TechnoRV Security Pro System",
          description: "Comprehensive RV security with cameras, motion sensors, and smartphone alerts.",
          price: "$449",
          originalPrice: "$599",
          rating: 4.8,
          reviewCount: 298,
          image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
          features: [
            "HD security cameras",
            "Motion detection",
            "Mobile app alerts",
            "Night vision capability"
          ],
          affiliateLink: "https://technorv.com/security-systems",
          badges: ["Security Expert Pick"]
        }
      ];
    }

    // Top 10 RV Parks - RVShare integration
    if (postSlug === 'top-10-rv-parks-usa') {
      return [
        {
          title: "RVShare Premium Booking",
          description: "Book your stay at these amazing RV parks through RVShare for the best rates and exclusive amenities.",
          price: "From $59",
          originalPrice: "From $89",
          rating: 4.7,
          reviewCount: 1834,
          image: "/lovable-uploads/0a22c848-dff2-43f4-b1eb-800fa123a904.png",
          features: [
            "Exclusive park access",
            "Best rate guarantee",
            "Instant booking",
            "24/7 customer support"
          ],
          affiliateLink: "https://rvshare.com/rv-parks",
          badges: ["Exclusive Access"]
        }
      ];
    }

    // Default tech products for other posts
    return [
      {
        title: "RV Life Pro GPS & Trip Planning",
        description: "The ultimate RV navigation and trip planning solution with real-time updates.",
        price: "$199",
        originalPrice: "$299",
        rating: 4.8,
        reviewCount: 1247,
        image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
        features: [
          "RV-specific routing",
          "Campground database",
          "Weather integration",
          "Offline maps"
        ],
        affiliateLink: "https://rvlife.com/pro-gps",
        badges: ["Most Popular"]
      }
    ];
  };

  const products = getProductsForPost();
  
  return (
    <div className="space-y-8">
      {/* Product recommendations */}
      <div className="bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A] rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-3">
            Recommended Products for This Article
          </h3>
          <p className="text-blue-200">
            Based on the content above, here are our top-rated product recommendations:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {products.map((product, index) => (
            <AffiliateProductCard
              key={index}
              {...product}
            />
          ))}
        </div>
      </div>

      {/* CTA Banner for RVShare if relevant */}
      {(postSlug === 'top-10-rv-parks-usa' || postSlug === 'remote-work-rv-setup') && (
        <AffiliateCTABanner
          title="Ready to Experience These RV Parks?"
          description="Find and book your perfect RV rental to visit these amazing destinations"
          buttonText="Browse RV Rentals"
          affiliateLink="https://rvshare.com/destinations"
        />
      )}
    </div>
  );
};

export default BlogAffiliateSection;