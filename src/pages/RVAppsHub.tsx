import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import AffiliateProductCard from '@/components/affiliate/AffiliateProductCard';
import AffiliateComparisonTable from '@/components/affiliate/AffiliateComparisonTable';
import AffiliateCTABanner from '@/components/affiliate/AffiliateCTABanner';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import CustomerReviewsSection from '@/components/affiliate/CustomerReviewsSection';
import { 
  MobileProductCarousel, 
  MobileScrollHint, 
  MobileAnalytics, 
  PullToRefresh, 
  FloatingActionButtons, 
  AppInstallPrompt,
  ABTestingProductCard,
  SmartNotificationCenter,
  MobileConversionOptimizer
} from '@/components/mobile';
import PerformanceMonitor from '@/components/performance/PerformanceMonitor';
import OptimizedImage from '@/components/performance/OptimizedImage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Wifi, MapPin, Battery, Settings, Shield } from 'lucide-react';

const RVAppsHub = () => {
  const appCategories = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Navigation & Travel",
      description: "GPS apps designed specifically for RV travel with height/weight restrictions",
      color: "text-blue-400"
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Connectivity",
      description: "Stay connected on the road with internet and communication tools",
      color: "text-green-400"
    },
    {
      icon: <Battery className="h-6 w-6" />,
      title: "Power Management",
      description: "Monitor and optimize your RV's electrical systems",
      color: "text-yellow-400"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Maintenance",
      description: "Track maintenance schedules and system diagnostics",
      color: "text-purple-400"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety & Security",
      description: "Emergency services and security monitoring apps",
      color: "text-red-400"
    }
  ];

  const featuredApps = [
    {
      title: "RV LIFE Pro GPS Navigation",
      description: "The ultimate RV-safe GPS with custom routing for your specific RV dimensions.",
      price: "$49.99/year",
      originalPrice: "$69.99/year",
      rating: 4.8,
      reviewCount: 15420,
      image: "/lovable-uploads/245a19e1-8ec4-41fc-bedd-d6a440d9a381.png",
      features: [
        "RV-specific routing",
        "Campground database",
        "Offline maps",
        "Real-time traffic"
      ],
      affiliateLink: "https://rvlife.com/pro-gps",
      badges: ["Editor's Choice", "Most Popular"]
    },
    {
      title: "Campendium Camping App",
      description: "Discover amazing campsites with detailed reviews from fellow RVers.",
      price: "$19.99/year",
      originalPrice: "$29.99/year",
      rating: 4.7,
      reviewCount: 8932,
      image: "/lovable-uploads/3af8fc31-188d-477e-8ab5-b94bd8c4ec77.png",
      features: [
        "50,000+ campsite reviews",
        "Photo galleries",
        "Offline access",
        "Cell signal strength"
      ],
      affiliateLink: "https://campendium.com/premium",
      badges: ["Best Value", "Community Choice"]
    },
    {
      title: "Victron Connect",
      description: "Monitor and control your Victron energy products remotely.",
      price: "Free",
      rating: 4.6,
      reviewCount: 3421,
      image: "/lovable-uploads/83016e8b-ff85-42b1-910f-4f4781ac341b.png",
      features: [
        "Battery monitoring",
        "Solar system control",
        "Historical data",
        "Remote diagnostics"
      ],
      affiliateLink: "https://victronenergy.com/connect",
      badges: ["Free", "Professional Grade"]
    }
  ];

  const comparisonData = {
    title: "Top RV GPS Apps Comparison",
    products: [
      {
        name: "RV LIFE Pro",
        price: "$49.99/year",
        rating: 4.8,
        image: "/lovable-uploads/245a19e1-8ec4-41fc-bedd-d6a440d9a381.png",
        features: {
          "RV-specific routing": true,
          "Offline maps": true,
          "Campground database": "50,000+",
          "Trip planning": true,
          "Real-time traffic": true,
          "Weather integration": true,
          "Community reviews": "100,000+"
        },
        pros: ["Most comprehensive features", "Excellent RV routing"],
        cons: ["Higher price point"],
        affiliateLink: "https://rvlife.com/pro-gps",
        badge: "Best Overall"
      },
      {
        name: "Campendium",
        price: "$19.99/year",
        rating: 4.7,
        image: "/lovable-uploads/3af8fc31-188d-477e-8ab5-b94bd8c4ec77.png",
        features: {
          "RV-specific routing": false,
          "Offline maps": true,
          "Campground database": "30,000+",
          "Trip planning": true,
          "Real-time traffic": false,
          "Weather integration": false,
          "Community reviews": "50,000+"
        },
        pros: ["Great value", "Strong community"],
        cons: ["No RV routing"],
        affiliateLink: "https://campendium.com/premium",
        badge: "Best Value"
      },
      {
        name: "iOverlander",
        price: "Free",
        rating: 4.5,
        image: "/lovable-uploads/9cb71164-7823-47a1-b788-5afc310ad5e5.png",
        features: {
          "RV-specific routing": false,
          "Offline maps": true,
          "Campground database": "20,000+",
          "Trip planning": false,
          "Real-time traffic": false,
          "Weather integration": false,
          "Community reviews": "25,000+"
        },
        pros: ["Completely free", "International coverage"],
        cons: ["Limited features"],
        affiliateLink: "https://ioverlander.com",
        badge: "Free Option"
      }
    ],
          featureCategories: [
      {
        title: "Core Features",
        features: ["RV-specific routing", "Offline maps", "Campground database"]
      },
      {
        title: "Advanced Features", 
        features: ["Trip planning", "Real-time traffic", "Weather integration"]
      },
      {
        title: "Community",
        features: ["Community reviews"]
      }
    ]
  };

  const refreshDeals = async () => {
    // Simulate API call to refresh affiliate deals
    console.log('Refreshing RV app deals...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Deals refreshed!');
  };

  return (
    <Layout>
      <Helmet>
        <title>Essential RV Apps & Tools Hub - Smart RV Technology Guide</title>
        <meta name="description" content="Discover the best mobile apps and digital tools for RV travel. GPS navigation, campsite finders, power monitoring, and connectivity solutions." />
      </Helmet>

      <PullToRefresh onRefresh={refreshDeals}>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Container className="py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Smartphone className="h-12 w-12 text-[#5B9BD5]" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#5B9BD5] to-[#4B8FE3] bg-clip-text text-transparent">
                Essential RV Apps & Tools
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your smartphone into the ultimate RV command center with our curated collection of apps and digital tools designed specifically for the modern RVer.
            </p>
          </div>

          {/* App Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {appCategories.map((category, index) => (
              <Card key={index} className="bg-[#091020] border-gray-700 hover:border-[#5B9BD5]/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`flex justify-center mb-4 ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Smart Notifications */}
          <div className="mb-8">
            <SmartNotificationCenter />
          </div>

          {/* Featured Apps - Mobile Optimized with A/B Testing */}
          <Card className="bg-[#0a0a0a] border-gray-800 mb-12" id="featured-apps">
            <CardHeader>
              <CardTitle className="text-2xl text-[#5B9BD5] text-center">⭐ Must-Have RV Apps</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Desktop Grid with A/B Testing */}
              <div className="hidden lg:grid grid-cols-3 gap-6">
                {featuredApps.map((app, index) => (
                  <ABTestingProductCard
                    key={index}
                    {...app}
                    affiliatePartner="rvlife"
                    productCategory="rv-apps"
                    className="h-full"
                  />
                ))}
              </div>
              
              {/* Mobile Conversion Optimizer */}
              <div className="lg:hidden">
                <MobileConversionOptimizer
                  products={featuredApps}
                  onProductClick={(product) => window.open(product.affiliateLink, '_blank')}
                  onWishlistAdd={(product) => console.log('Added to wishlist:', product.title)}
                  onShare={(product) => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.title,
                        text: product.description,
                        url: product.affiliateLink
                      });
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* App Comparison */}
          <AffiliateComparisonTable
            {...comparisonData}
            className="mb-12"
          />

          {/* Hardware Recommendations - Mobile Optimized */}
          <Card className="bg-[#091020] border-gray-700 mb-12" id="hardware">
            <CardHeader>
              <CardTitle className="text-2xl text-[#5B9BD5]">📱 Mobile Hardware for RVers</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Desktop Grid */}
              <div className="hidden lg:grid grid-cols-2 gap-6">
                <AffiliateProductCard
                  title="WeBoost Drive Reach RV Cell Signal Booster"
                  description="Boost your cell signal by up to 32x for better app performance and connectivity."
                  price="$499.99"
                  originalPrice="$599.99"
                  rating={4.6}
                  reviewCount={1834}
                  image="/lovable-uploads/9b681f27-359c-4d90-8629-5b2b198abf0f.png"
                  features={[
                    "Works with all carriers",
                    "Covers up to 5,000 sq ft",
                    "Easy RV installation",
                    "FCC approved"
                  ]}
                  affiliateLink="https://weboost.com/drive-reach-rv"
                  badges={["Signal Solution"]}
                />
                
                <AffiliateProductCard
                  title="Samsung Galaxy Tab Active4 Pro Rugged Tablet"
                  description="Rugged tablet perfect for RV navigation and entertainment in any weather."
                  price="$649.99"
                  originalPrice="$799.99"
                  rating={4.4}
                  reviewCount={567}
                  image="/lovable-uploads/ee026535-e835-46ae-b779-be457eb8ff04.png"
                  features={[
                    "MIL-STD-810H certified",
                    "IP68 water/dust resistant",
                    "Replaceable battery",
                    "S Pen included"
                  ]}
                  affiliateLink="https://samsung.com/tab-active4-pro"
                  badges={["Rugged", "RV Ready"]}
                />
              </div>
              
              {/* Mobile Carousel */}
              <div className="lg:hidden">
                <MobileProductCarousel 
                  products={[
                    {
                      title: "WeBoost Drive Reach RV Cell Signal Booster",
                      description: "Boost your cell signal by up to 32x for better app performance and connectivity.",
                      price: "$499.99",
                      originalPrice: "$599.99",
                      rating: 4.6,
                      reviewCount: 1834,
                      image: "/lovable-uploads/9b681f27-359c-4d90-8629-5b2b198abf0f.png",
                      features: [
                        "Works with all carriers",
                        "Covers up to 5,000 sq ft",
                        "Easy RV installation",
                        "FCC approved"
                      ],
                      affiliateLink: "https://weboost.com/drive-reach-rv",
                      badges: ["Signal Solution"]
                    },
                    {
                      title: "Samsung Galaxy Tab Active4 Pro Rugged Tablet",
                      description: "Rugged tablet perfect for RV navigation and entertainment in any weather.",
                      price: "$649.99",
                      originalPrice: "$799.99",
                      rating: 4.4,
                      reviewCount: 567,
                      image: "/lovable-uploads/ee026535-e835-46ae-b779-be457eb8ff04.png",
                      features: [
                        "MIL-STD-810H certified",
                        "IP68 water/dust resistant",
                        "Replaceable battery",
                        "S Pen included"
                      ],
                      affiliateLink: "https://samsung.com/tab-active4-pro",
                      badges: ["Rugged", "RV Ready"]
                    }
                  ]}
                />
              </div>
            </CardContent>
          </Card>

          {/* Customer Reviews Section */}
          <CustomerReviewsSection
            productCategory="rv-apps"
            affiliatePartner="rvlife"
            className="mb-12"
          />

          {/* CTA Banner */}
          <AffiliateCTABanner
            title="Start Your Digital RV Journey Today"
            description="Get equipped with the essential apps and tools that will transform your RV adventures. Download the must-have apps and upgrade your RV tech setup."
            buttonText="Shop RV Tech Deals"
            affiliateLink="https://amazon.com/rv-electronics"
            className="mb-8"
          />

          {/* Performance Monitoring */}
          <PerformanceMonitor 
            pageName="RVAppsHub"
            enableCoreWebVitals={true}
            enableResourceTiming={true}
            enableNavigationTiming={true}
          />

          {/* Mobile Scroll Hint */}
          <MobileScrollHint targetSection="featured-apps" text="Explore must-have apps" />
          
          {/* App Install Prompt */}
          <AppInstallPrompt />
          
          {/* Floating Action Buttons */}
          <FloatingActionButtons />
          
          {/* Mobile Analytics Tracking */}
          <MobileAnalytics 
            pageName="RVAppsHub" 
            affiliatePartners={["RV LIFE", "Campendium", "Victron", "WeBoost", "Samsung"]}
          />

          {/* Affiliate Disclosure */}
          <AffiliateDisclosure />
        </Container>
      </div>
      </PullToRefresh>
    </Layout>
  );
};

export default RVAppsHub;