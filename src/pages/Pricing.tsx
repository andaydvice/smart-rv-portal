
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import { Helmet } from "react-helmet-async";

const Pricing = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const pricingPlans = [
    {
      name: "Smart Essentials",
      price: "$15,000",
      description: "Essential smart features for entry-level RV enhancement",
      features: [
        "Basic automation system",
        "Energy monitoring",
        "Remote climate control",
        "Mobile app access",
        "Standard support"
      ],
      popular: false
    },
    {
      name: "Smart Professional",
      price: "$35,000", 
      description: "Advanced smart systems for serious RV enthusiasts",
      features: [
        "Full automation suite",
        "Advanced energy management",
        "Smart appliance integration",
        "GPS tracking & security",
        "Voice control system",
        "Priority support",
        "Maintenance alerts"
      ],
      popular: true
    },
    {
      name: "Smart Premium",
      price: "$65,000",
      description: "Complete luxury smart RV transformation",
      features: [
        "Everything in Professional",
        "AI-powered optimization",
        "Advanced safety systems",
        "Luxury amenity controls",
        "Concierge support",
        "Custom integrations",
        "Lifetime updates"
      ],
      popular: false
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Smart RV Pricing</title>
        <meta name="description" content="Transparent pricing for Smart RV upgrades including automation, power, security, and connectivity with professional installation." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/pricing' : ''} />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full bg-gradient-to-b from-[#080F1F] to-[#151A22]"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-bold text-white mb-8 text-center"
          >
            Smart RV Pricing
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-white/80 text-center mb-16 max-w-3xl mx-auto"
          >
            Choose the perfect smart RV package that fits your lifestyle and budget. All plans include professional installation and training.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-black/20 backdrop-blur-md p-8 rounded-xl border ${
                  plan.popular ? 'border-[#5B9BD5] ring-2 ring-[#5B9BD5]/20' : 'border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#5B9BD5] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60 ml-2">+ installation</span>
                </div>
                <p className="text-white/80 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-white/90">
                      <Check className="w-5 h-5 text-[#5B9BD5] mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/contact"
                  className={`block w-full text-center py-3 rounded-full font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-[#5B9BD5] text-white hover:bg-[#4A8AC4]'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Financing Options Available</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Flexible Payment Plans</h3>
                  <ul className="space-y-2 text-white/90">
                    <li>• 0% APR for 12 months</li>
                    <li>• Extended payment plans up to 60 months</li>
                    <li>• Trade-in credit for existing systems</li>
                    <li>• Corporate and fleet discounts available</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">What's Included</h3>
                  <ul className="space-y-2 text-white/90">
                    <li>• Professional installation by certified technicians</li>
                    <li>• Comprehensive training and onboarding</li>
                    <li>• 2-year warranty on all hardware</li>
                    <li>• 30-day satisfaction guarantee</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Upgrade Your RV?</h2>
              <p className="text-white/90 text-lg mb-6">
                Schedule a consultation with our experts to discuss your specific needs and get a personalized quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact"
                  className="bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-8 py-3 rounded-full font-medium transition-colors"
                >
                  Schedule Consultation
                </Link>
                <Link 
                  to="/calculators"
                  className="bg-white/10 text-white hover:bg-white/20 border border-white/20 px-8 py-3 rounded-full font-medium transition-colors"
                >
                  Calculate Costs
                </Link>
              </div>
            </div>

            {/* Partner Value Comparison */}
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Save More with Partner Benefits</h2>
              <p className="text-white/90 text-center mb-8">
                Our trusted partners offer exclusive discounts and value-added services for Smart RV customers
              </p>
              
              <OptimizedAffiliateGrid
                title=""
                subtitle=""
                partners={[
                  {
                    partner: 'goodsam',
                    title: 'Good Sam Club Membership',
                    description: 'Save 10¢/gallon on gas, get camping discounts, and emergency roadside assistance',
                    features: ['Fuel Savings', 'Camping Discounts', 'Emergency Coverage', 'Travel Planning'],
                    path: '/club-benefits',
                    buttonText: 'Join Good Sam'
                  },
                  {
                    partner: 'rvlife',
                    title: 'RV Life Pro Membership',
                    description: 'Professional trip planning tools with RV-safe routes and campground reviews',
                    features: ['RV-Safe Routes', 'Trip Planning', 'Campground Reviews', 'Offline Maps'],
                    path: '/pro-membership',
                    buttonText: 'Go Pro'
                  }
                ]}
                gridCols="2"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Pricing;
