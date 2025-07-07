import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AffiliateProductCard from '@/components/affiliate/AffiliateProductCard';
import AffiliateCTABanner from '@/components/affiliate/AffiliateCTABanner';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

interface AffiliateRecommendationsProps {
  rvType: string;
  tripDistance: number;
  days: number;
  totalCost: number;
}

const AffiliateRecommendations = ({ rvType, tripDistance, days, totalCost }: AffiliateRecommendationsProps) => {
  // Get recommendations based on RV type and trip parameters
  const getRecommendations = () => {
    const isLongTrip = days > 7;
    const isLargeRV = ['large', 'fifthWheel', 'superSize'].includes(rvType);
    const isLongDistance = tripDistance > 500;

    const recommendations = [];

    // Essential RV accessories
    if (isLongTrip) {
      recommendations.push({
        title: "Victron Energy Smart Battery Monitor",
        description: "Track your RV's battery usage and health with precision monitoring for extended trips.",
        price: "$199",
        originalPrice: "$249",
        rating: 4.8,
        reviewCount: 1247,
        image: "/lovable-uploads/3175b015-a5c7-4df7-b8ca-b8a130b05519.png",
        features: [
          "Bluetooth connectivity",
          "Real-time battery monitoring",
          "Historical data tracking",
          "Easy smartphone app"
        ],
        affiliateLink: "https://amazon.com/victron-battery-monitor",
        badges: ["Best Seller", "Long Trip Essential"]
      });
    }

    // Fuel savings for long distance
    if (isLongDistance) {
      recommendations.push({
        title: "FUELSHARK Fuel Saver Device",
        description: "Improve your RV's fuel efficiency by up to 15% on long-distance trips.",
        price: "$39.99",
        originalPrice: "$59.99",
        rating: 4.3,
        reviewCount: 892,
        image: "/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png",
        features: [
          "Easy plug-in installation",
          "Works with all engines",
          "Up to 15% fuel savings",
          "Money-back guarantee"
        ],
        affiliateLink: "https://amazon.com/fuelshark-device",
        badges: ["Fuel Saver"]
      });
    }

    // Large RV specific
    if (isLargeRV) {
      recommendations.push({
        title: "KING Jack Digital TV Antenna",
        description: "Get crystal clear TV reception even in remote locations with this powerful directional antenna.",
        price: "$399",
        originalPrice: "$499",
        rating: 4.6,
        reviewCount: 623,
        image: "/lovable-uploads/7b0008af-4737-468b-820b-1f3d6b92a458.png",
        features: [
          "360° rotation",
          "Built-in signal finder",
          "Works with multiple TVs",
          "Weather resistant"
        ],
        affiliateLink: "https://amazon.com/king-jack-antenna",
        badges: ["Large RV Recommended"]
      });
    }

    // Always include popular essentials
    recommendations.push({
      title: "Progressive Industries EMS-HW30C Surge Protector",
      description: "Protect your RV's electrical system from power surges and faulty campground wiring.",
      price: "$299",
      originalPrice: "$349",
      rating: 4.9,
      reviewCount: 2156,
      image: "/lovable-uploads/9ad50274-5f5b-47fa-8278-32599d734b3e.png",
      features: [
        "50 amp surge protection",
        "LED diagnostic display",
        "Automatic shut-off",
        "Weather resistant housing"
      ],
      affiliateLink: "https://amazon.com/progressive-ems-protector",
      badges: ["Essential", "Top Rated"]
    });

    return recommendations.slice(0, 3); // Return top 3 recommendations
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6 mt-8">
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#60A5FA] flex items-center gap-2">
            💡 Recommended for Your Trip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Based on your {rvType} RV, {days}-day trip covering {tripDistance} miles, here are our top recommendations to enhance your journey:
          </p>
          
          {/* Mobile-optimized grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {recommendations.map((product, index) => (
              <AffiliateProductCard
                key={index}
                {...product}
                className="h-full"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost savings CTA */}
      <AffiliateCTABanner
        title="Save on Your RV Trip Costs"
        description={`Your estimated trip cost is $${totalCost}. Get exclusive discounts on RV essentials and services.`}
        buttonText="View All Deals"
        affiliateLink="https://rvshare.com/deals"
        className="my-6"
      />

      {/* Insurance recommendation */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-800 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-green-300">🛡️ Protect Your Investment</h3>
              <p className="text-gray-300 text-sm mb-3">
                Don't let unexpected breakdowns ruin your trip. Get comprehensive RV insurance and roadside assistance.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• 24/7 roadside assistance</li>
                <li>• Nationwide towing coverage</li>
                <li>• Emergency repair services</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a 
                href="https://www.progressive.com/rv-insurance/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center min-h-[44px] flex items-center justify-center touch-manipulation"
              >
                Get Quote
              </a>
              <a 
                href="https://www.goodsam.com/roadside-assistance"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center min-h-[44px] flex items-center justify-center touch-manipulation"
              >
                Roadside Help
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <AffiliateDisclosure compact />
    </div>
  );
};

export default AffiliateRecommendations;