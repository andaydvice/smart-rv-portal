import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Bed, Moon, Thermometer, Wind, Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const RVComfortGuide = () => {
  const comfortBenefits = [
    {
      icon: <Bed className="h-6 w-6 text-blue-400" />,
      title: "Better Sleep Quality",
      description: "RV-specific mattress sizes and materials optimize sleep in compact spaces",
      gradient: "from-blue-500/10 to-purple-500/10"
    },
    {
      icon: <Thermometer className="h-6 w-6 text-green-400" />,
      title: "Temperature Control",
      description: "Specialized bedding materials help regulate temperature in varying climates",
      gradient: "from-green-500/10 to-teal-500/10"
    },
    {
      icon: <Wind className="h-6 w-6 text-cyan-400" />,
      title: "Moisture Management",
      description: "Breathable materials prevent condensation buildup common in RV sleeping areas",
      gradient: "from-cyan-500/10 to-blue-500/10"
    },
    {
      icon: <Heart className="h-6 w-6 text-red-400" />,
      title: "Health & Wellness",
      description: "Proper support and materials promote better rest and overall health on the road",
      gradient: "from-red-500/10 to-pink-500/10"
    }
  ];

  const mattressSizes = [
    { size: "RV Short Queen", dimensions: "60\" x 75\"", standard: "60\" x 80\"" },
    { size: "RV Full", dimensions: "53\" x 75\"", standard: "54\" x 75\"" },
    { size: "RV Twin", dimensions: "38\" x 75\"", standard: "38\" x 75\"" },
    { size: "RV King", dimensions: "72\" x 80\"", standard: "76\" x 80\"" }
  ];

  return (
    <Layout>
      <Helmet>
        <title>RV Comfort Guide - Mattresses, Bedding & Sleep Solutions | Smart RV Hub</title>
        <meta name="description" content="Transform your RV into a comfortable home with our guide to RV mattresses, bedding, and sleep accessories. Expert recommendations for better sleep on the road." />
        <meta name="keywords" content="RV mattress, RV bedding, RV comfort, RV sleep, motorhome mattress, travel trailer bedding, RV pillows" />
        <link rel="canonical" href="https://smartrvhub.com/rv-comfort-guide" />
        <meta property="og:title" content="RV Comfort Guide - Better Sleep on the Road" />
        <meta property="og:description" content="Expert guide to RV mattresses, bedding, and comfort solutions for better sleep while traveling." />
        <meta property="og:image" content="https://smartrvhub.com/og-comfort-guide.jpg" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#080F1F] via-[#0A1128] to-[#151A22]">
        <Container className="py-12 space-y-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              RV Comfort Guide
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Transform your RV into a comfortable home with the right mattress, bedding, and sleep accessories. 
              Expert recommendations for better rest on the road.
            </p>
          </motion.div>

          {/* RV Mattress Sizing Guide */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">RV Mattress Sizing Guide</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                RV mattresses are different from home mattresses. Most RVs use shorter lengths and custom widths to fit their unique spaces.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mattressSizes.map((size, index) => (
                <Card key={index} className="bg-connectivity-darkBg border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">{size.size}</h3>
                    <div className="space-y-2">
                      <p className="text-blue-300 font-medium">RV: {size.dimensions}</p>
                      <p className="text-gray-400 text-sm">Standard: {size.standard}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Benefits of Quality RV Bedding */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why RV-Specific Comfort Matters</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                RV living presents unique comfort challenges that standard home bedding can't address.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {comfortBenefits.map((benefit, index) => (
                <Card key={index} className="bg-connectivity-darkBg border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Featured Comfort Products */}
          <OptimizedAffiliateGrid
            title="Premium RV Comfort Solutions"
            subtitle="Curated comfort products designed specifically for RV living, featuring premium memory foam mattresses and organic bedding."
            partners={[
              {
                partner: 'rvlife',
                title: 'RV Life Sleep Solutions',
                description: 'Complete guide to RV sleep comfort with product recommendations and installation tips for better rest.',
                features: ['Sleep Comfort Guide', 'Product Reviews', 'Installation Tips', 'Expert Recommendations'],
                buttonText: 'Get Sleep Guide'
              },
              {
                partner: 'goodsam',
                title: 'Good Sam RV Comfort',
                description: 'Premium RV comfort accessories and bedding solutions with member discounts and expert support.',
                features: ['Member Discounts', 'Premium Comfort', 'Expert Support', 'Quality Guarantee'],
                buttonText: 'Shop Comfort Solutions'
              }
            ]}
            gridCols="2"
          />

          {/* Comfort Tips Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <Card className="bg-connectivity-darkBg border-gray-700">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Star className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Essential RV Comfort Tips</h2>
                  <p className="text-gray-300 max-w-2xl mx-auto">
                    Professional recommendations for creating the most comfortable sleep environment in your RV.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-blue-300">Mattress Selection</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Choose medium-firm for better support</li>
                      <li>• Consider memory foam for pressure relief</li>
                      <li>• Measure your RV space carefully</li>
                      <li>• Look for moisture-resistant materials</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-green-300">Climate Control</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use breathable bedding materials</li>
                      <li>• Consider moisture-wicking sheets</li>
                      <li>• Invest in proper ventilation</li>
                      <li>• Use mattress protectors</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-purple-300">Space Optimization</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Multi-functional bedding storage</li>
                      <li>• Compact pillow solutions</li>
                      <li>• Under-bed storage systems</li>
                      <li>• Seasonal bedding rotation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Affiliate Disclosure */}
          <AffiliateDisclosure />
        </Container>
      </div>
    </Layout>
  );
};

export default RVComfortGuide;