import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ExternalLinkButton } from "@/components/ui/external-link-button";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { scrollToTop } from "@/utils/scrollToTop";
import { Helmet } from "react-helmet-async";
import {
  ShoppingCart,
  DollarSign,
  MapPin,
  Calculator,
  Star,
  Shield,
  Users,
  CheckCircle,
  TrendingUp,
  FileText,
  ArrowLeft
} from 'lucide-react';

const RVMarketplace = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const marketplaceServices = [
    {
      icon: ShoppingCart,
      title: "Buy RVs",
      description: "Browse thousands of new and used RVs from verified dealers and private sellers nationwide.",
      features: [
        "Largest RV inventory in America",
        "Verified dealer network",
        "Secure transaction process",
        "Expert buyer support"
      ],
      buttonText: "Browse RVs Now",
      url: "https://www.rvt.com/buy/",
      color: "text-[#10B981]"
    },
    {
      icon: DollarSign,
      title: "Sell Your RV",
      description: "List your RV to reach millions of potential buyers with professional selling tools.",
      features: [
        "Maximum market exposure",
        "Professional listing tools",
        "Qualified buyer matching",
        "Fast sales process"
      ],
      buttonText: "List Your RV",
      url: "https://www.rvt.com/sell-rv.php",
      color: "text-[#F59E0B]"
    },
    {
      icon: MapPin,
      title: "Find Dealers",
      description: "Connect with trusted RV dealers in your area for sales, service, and support.",
      features: [
        "Nationwide dealer network",
        "Certified professionals",
        "Local service centers",
        "Factory authorized dealers"
      ],
      buttonText: "Find Dealers",
      url: "https://www.rvt.com/dealersearch.php",
      color: "text-[#3B82F6]"
    },
    {
      icon: Calculator,
      title: "Price Checker",
      description: "Get accurate RV valuations and market pricing to make informed buying or selling decisions.",
      features: [
        "Real-time market values",
        "Historical price data",
        "Condition adjustments",
        "Regional pricing insights"
      ],
      buttonText: "Check RV Prices",
      url: "https://www.rvt.com/price-checker/",
      color: "text-[#8B5CF6]"
    },
    {
      icon: Star,
      title: "RV Reviews",
      description: "Read detailed reviews from real RVers and industry experts to make the best choice.",
      features: [
        "Real owner experiences",
        "Expert analysis",
        "Detailed comparisons",
        "Updated regularly"
      ],
      buttonText: "Read Reviews",
      url: "https://www.rvinsider.com/",
      color: "text-[#EF4444]"
    }
  ];

  const trustStats = [
    { number: "500K+", label: "RV Listings" },
    { number: "10K+", label: "Verified Dealers" },
    { number: "2M+", label: "Monthly Visitors" },
    { number: "98%", label: "Customer Satisfaction" }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified & Trusted",
      description: "All dealers are verified and listings are authenticated for your peace of mind."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get help from RV industry experts throughout your buying or selling journey."
    },
    {
      icon: CheckCircle,
      title: "Secure Transactions",
      description: "Safe and secure payment processing with buyer and seller protection."
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Access real-time market data and trends to make informed decisions."
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>RV Marketplace - Buy, Sell & Find Dealers | Smart RV Technology</title>
        <meta name="description" content="America's trusted RV marketplace. Buy and sell motorhomes, travel trailers, and fifth wheels. Find verified dealers, check prices, and read reviews." />
        <meta name="keywords" content="RV marketplace, buy RV, sell RV, RV dealers, RV prices, RV reviews, motorhomes, travel trailers" />
        <link rel="canonical" href="https://smartrvtechnology.com/rv-marketplace" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22]">
        {/* Hero Section */}
        <section 
          className="relative w-full h-[70vh] m-0 p-0 flex items-center justify-center"
          style={{
            backgroundImage: "url('/assets/rv-hero-image.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark Overlay */}
          <div 
            className="absolute top-0 left-0 w-full h-full z-[5]"
            style={{
              background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))'
            }}
          />
          
          {/* Text Overlay */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute z-10 text-center text-white p-5 max-w-[800px]"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
            }}
          >
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Find Your Perfect RV
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8"
            >
              Buy, Sell & Connect with Confidence on America's Trusted RV Marketplace
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <ExternalLinkButton 
                href="https://www.rvt.com/buy/"
                variant="default"
                size="lg" 
                className="bg-gradient-to-r from-[#5B9BD5] to-[#4B8FE3] hover:from-[#4B8FE3] hover:to-[#3A7BD5] text-white px-8 py-4 text-lg"
              >
                Browse RVs Now
              </ExternalLinkButton>
              <ExternalLinkButton 
                href="https://www.rvt.com/sell-rv.php"
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#080F1F] px-8 py-4 text-lg"
              >
                List Your RV
              </ExternalLinkButton>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            >
              {trustStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-[#5B9BD5]">{stat.number}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-[#151A22]">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Complete RV Marketplace Services
              </h2>
              <p className="text-xl text-[#E2E8FF] max-w-3xl mx-auto">
                Everything you need to buy, sell, and maintain your RV in one trusted platform.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {marketplaceServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="bg-[#091020] border border-[#1a202c] rounded-lg p-8 hover:border-[#5B9BD5] transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <service.icon className={`h-8 w-8 ${service.color} mr-4`} />
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  </div>
                  
                  <p className="text-[#E2E8FF] mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-[#E2E8FF]">
                        <CheckCircle className="h-5 w-5 text-[#10B981] mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <ExternalLinkButton 
                    href={service.url}
                    variant="default"
                    className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white font-semibold py-3"
                  >
                    {service.buttonText}
                  </ExternalLinkButton>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Why Choose Our Marketplace
              </h2>
              <p className="text-xl text-[#E2E8FF] max-w-3xl mx-auto">
                Join millions of RVers who trust our platform for all their RV needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="text-center p-6"
                >
                  <div className="bg-[#091020] border border-[#1a202c] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="h-8 w-8 text-[#5B9BD5]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-[#E2E8FF] leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Educational Content Section */}
        <section className="py-20 bg-[#151A22]">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Expert RV Guidance
              </h2>
              <p className="text-xl text-[#E2E8FF] max-w-3xl mx-auto">
                Access comprehensive guides and tools to make informed RV decisions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-[#091020] border border-[#1a202c] rounded-lg p-8"
              >
                <FileText className="h-8 w-8 text-[#10B981] mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">RV Buying Guide</h3>
                <p className="text-[#E2E8FF] mb-6">
                  Complete guide for first-time RV buyers covering everything from types to financing.
                </p>
                <ExternalLinkButton 
                  href="https://www.rvt.com/buy/"
                  variant="outline"
                  className="border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white"
                >
                  Learn More
                </ExternalLinkButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-[#091020] border border-[#1a202c] rounded-lg p-8"
              >
                <TrendingUp className="h-8 w-8 text-[#F59E0B] mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">RV Selling Tips</h3>
                <p className="text-[#E2E8FF] mb-6">
                  Maximize your RV's value with professional selling strategies and market insights.
                </p>
                <ExternalLinkButton 
                  href="https://www.rvt.com/sell-rv.php"
                  variant="outline"
                  className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white"
                >
                  Get Started
                </ExternalLinkButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-[#091020] border border-[#1a202c] rounded-lg p-8"
              >
                <Calculator className="h-8 w-8 text-[#8B5CF6] mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Market Analysis</h3>
                <p className="text-[#E2E8FF] mb-6">
                  Understanding RV values, market trends, and pricing strategies for buyers and sellers.
                </p>
                <ExternalLinkButton 
                  href="https://www.rvt.com/price-checker/"
                  variant="outline"
                  className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white"
                >
                  Check Prices
                </ExternalLinkButton>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Final CTA Section */}
        <section className="py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center bg-gradient-to-r from-[#5B9BD5]/20 to-[#4B8FE3]/20 rounded-2xl p-12 border border-[#5B9BD5]/30"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Start Your RV Journey Today
              </h2>
              <p className="text-xl text-[#E2E8FF] mb-8 max-w-2xl mx-auto">
                Join millions of RVers who trust America's premier marketplace for buying, selling, and connecting with the RV community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ExternalLinkButton 
                  href="https://www.rvt.com/buy/"
                  variant="default"
                  size="lg"
                  className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-8 py-4 text-lg font-semibold"
                >
                  Browse RVs Now
                </ExternalLinkButton>
                <ExternalLinkButton 
                  href="https://www.rvt.com/sell-rv.php"
                  variant="outline"
                  size="lg"
                  className="border-[#5B9BD5] text-[#5B9BD5] hover:bg-[#5B9BD5] hover:text-white px-8 py-4 text-lg font-semibold"
                >
                  List Your RV
                </ExternalLinkButton>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Related Shopping */}
        <section className="py-8">
          <Container>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mt-12">
              <h3 className="text-xl font-semibold text-white mb-4">Browse RV Products</h3>
              <Link to="/products" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-green-500 rounded-lg p-4 transition-all block">
                <h4 className="text-white font-semibold mb-2">RV Products & Accessories</h4>
                <p className="text-gray-400 text-sm">Shop premium RV products and upgrades</p>
              </Link>
            </div>
          </Container>
        </section>

        {/* Affiliate Disclosure */}
        <section className="py-8 bg-[#151A22]">
          <Container>
            <AffiliateDisclosure className="mx-auto max-w-4xl" />

            {/* Related Navigation */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mt-12 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Explore More</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/models">
                  <Button variant="outline" className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    View RV Models
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    RV Products
                  </Button>
                </Link>
                <Link to="/tools">
                  <Button variant="outline" className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Planning Tools
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </Layout>
  );
};

export default RVMarketplace;