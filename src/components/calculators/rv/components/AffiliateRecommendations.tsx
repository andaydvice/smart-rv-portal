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

    // RVShare rental recommendations (45% commission)
    recommendations.push({
      title: "RVShare Premium RV Rentals",
      description: "Compare and book premium RV rentals nationwide. Save on your trip by renting instead of buying.",
      price: "$89/night",
      originalPrice: "$129/night",
      rating: 4.7,
      reviewCount: 8429,
      image: "/lovable-uploads/3175b015-a5c7-4df7-b8ca-b8a130b05519.png",
      features: [
        "24/7 roadside assistance",
        "Insurance included", 
        "Nationwide availability",
        "Instant booking"
      ],
      affiliateLink: "https://rvshare.com/?ref=smartroadportal",
      badges: ["RVShare Partner", "Best Value"]
    });

    // Outdoorsy rentals ($60+ commission per booking)
    if (isLongTrip || isLargeRV) {
      recommendations.push({
        title: "Outdoorsy Luxury RV Rentals",
        description: "Book luxury RVs and unique outdoor experiences. Perfect for premium travel experiences.",
        price: "$150/night",
        originalPrice: "$200/night", 
        rating: 4.8,
        reviewCount: 5234,
        image: "/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png",
        features: [
          "Luxury RV selection",
          "Unique experiences", 
          "Premium insurance",
          "Concierge service"
        ],
        affiliateLink: "https://outdoorsy.com/?ref=smartroadportal",
        badges: ["Outdoorsy Partner", "Luxury"]
      });
    }

    // RV Life trip planning (25% commission)
    if (isLongDistance) {
      recommendations.push({
        title: "RV Life Trip Planning Tools",
        description: "Plan your perfect RV route with GPS navigation, campground reviews, and trip planning tools.",
        price: "$49/year",
        originalPrice: "$69/year",
        rating: 4.6,
        reviewCount: 3892,
        image: "/lovable-uploads/7b0008af-4737-468b-820b-1f3d6b92a458.png",
        features: [
          "RV-safe GPS navigation",
          "Campground database",
          "Trip planning tools",
          "Real-time traffic updates"
        ],
        affiliateLink: "https://rvlife.com/?ref=smartroadportal",
        badges: ["RV Life Partner", "Trip Planning"]
      });
    }

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

      {/* RVShare rental CTA */}
      <AffiliateCTABanner
        title="Save on Your RV Trip - Rent Instead of Buy"
        description={`Your estimated trip cost is $${totalCost}. Compare rental prices and save thousands with RVShare.`}
        buttonText="Compare RV Rentals"
        affiliateLink="https://rvshare.com/?ref=smartroadportal"
        className="my-6"
      />

      {/* Good Sam roadside assistance */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-800 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-green-300">🛡️ Good Sam Roadside Assistance</h3>
              <p className="text-gray-300 text-sm mb-3">
                Don't let unexpected breakdowns ruin your trip. Get comprehensive RV roadside assistance and services.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• 24/7 RV-specific roadside assistance</li>
                <li>• Unlimited distance towing</li>
                <li>• Emergency repair services</li>
                <li>• Trip interruption coverage</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a 
                href="https://www.goodsam.com/roadside-assistance/?ref=smartroadportal"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center min-h-[44px] flex items-center justify-center touch-manipulation"
              >
                Get Good Sam Coverage
              </a>
              <a 
                href="https://rvlife.com/?ref=smartroadportal"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center min-h-[44px] flex items-center justify-center touch-manipulation"
              >
                Plan Your Route
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