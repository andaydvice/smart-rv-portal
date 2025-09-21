import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { scrollToTop } from '@/utils/scrollToTop';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Route, Shield, Calculator } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Smart RV Hub - Your Complete RV Technology Guide</title>
        <meta name="description" content="Discover smart RV living with our comprehensive guides on solar power, connectivity, and advanced RV technology. Expert reviews, calculators, and practical advice." />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Smart RV Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your complete guide to smart RV living with cutting-edge technology, solar power, and connectivity solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/solar-power-guide">
                <Button className="bg-connectivity-accent hover:bg-blue-600 text-white px-8 py-3 text-lg">
                  Solar Power Guide
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/calculators">
                <Button variant="outline" className="border-connectivity-accent text-connectivity-accent hover:bg-connectivity-accent hover:text-white px-8 py-3 text-lg">
                  RV Calculators
                  <Calculator className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Smart RV Solutions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6 text-center">
              <Zap className="h-12 w-12 text-connectivity-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Solar Power</h3>
              <p className="text-gray-300 mb-4">
                Complete solar solutions for off-grid RV living with expert recommendations and calculators
              </p>
              <Link to="/solar-power-guide" className="text-connectivity-accent hover:underline">
                Learn More →
              </Link>
            </div>

            <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6 text-center">
              <Route className="h-12 w-12 text-connectivity-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Trip Planning</h3>
              <p className="text-gray-300 mb-4">
                Smart route planning and navigation tools designed specifically for RV travel
              </p>
              <Link to="/calculators" className="text-connectivity-accent hover:underline">
                Explore Tools →
              </Link>
            </div>

            <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6 text-center">
              <Shield className="h-12 w-12 text-connectivity-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Safety & Support</h3>
              <p className="text-gray-300 mb-4">
                Emergency resources, troubleshooting guides, and professional RV support services
              </p>
              <Link to="/troubleshooting" className="text-connectivity-accent hover:underline">
                Get Help →
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-connectivity-darkBg border-t border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Smart RV Journey
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Get expert guidance on solar power, connectivity, and smart RV technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button className="bg-connectivity-accent hover:bg-blue-600 text-white px-8 py-3">
                  Shop RV Solutions
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" className="border-connectivity-accent text-connectivity-accent hover:bg-connectivity-accent hover:text-white px-8 py-3">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <AffiliateDisclosure />
      </div>
    </Layout>
  );
};

export default Index;