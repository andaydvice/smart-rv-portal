import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import SEO from "@/components/seo/SEO";
import { organizationSchema, faqSchema } from "@/components/seo/schemas";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { HelpCircle, Package, Wrench, ShoppingBag } from "lucide-react";

const Products = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const canonical = typeof window !== 'undefined' ? window.location.origin + "/products" : '';

  const productsFAQs = [
    {
      question: "What types of RV products and services do you offer?",
      answer: "We offer comprehensive RV technology solutions including smart monitoring systems, internet connectivity packages (WiFi boosters, cellular modems, satellite prep), security solutions (cameras, alarms, GPS tracking), power management systems (solar panels, lithium batteries, inverters), and professional installation and maintenance services. All products are specifically designed for mobile living."
    },
    {
      question: "Do you offer professional installation for all products?",
      answer: "Yes, professional installation is available for all our products and is highly recommended for complex systems. Our certified technicians have extensive experience with RV electrical systems, connectivity solutions, and smart technology integration. Installation typically takes 1-5 days depending on the product complexity."
    },
    {
      question: "Are your products compatible with all RV types?",
      answer: "Our products are compatible with most RV types including Class A, Class B, and Class C motorhomes, travel trailers, fifth wheels, and toy haulers. We assess compatibility during consultation to ensure proper fit and function for your specific RV model and year."
    },
    {
      question: "What warranty coverage comes with RV products?",
      answer: "Most products include manufacturer warranties ranging from 1-5 years, plus our installation warranty. Extended warranty options are available. We stand behind all products and services with comprehensive support and troubleshooting assistance."
    },
    {
      question: "Can I purchase products without installation?",
      answer: "Yes, you can purchase products for DIY installation. We provide detailed installation guides, technical support, and video tutorials for self-installers. However, professional installation ensures optimal performance and warranty coverage."
    },
    {
      question: "Do you offer financing for RV product purchases?",
      answer: "Yes, we offer flexible financing options including 0% APR for 12 months on purchases over $1,000, extended payment plans up to 60 months, and special financing for complete system upgrades. Contact our team to explore financing options that fit your budget."
    },
    {
      question: "How do I choose the right internet solution for my RV?",
      answer: "The best internet solution depends on your travel style. Full-time boondockers benefit from Starlink or multi-carrier cellular. Weekend warriors often prefer WiFi extenders and single-carrier hotspots. We offer free consultations to assess your needs and recommend the optimal connectivity solution."
    },
    {
      question: "What's included in maintenance service plans?",
      answer: "Our maintenance plans include annual system inspections, software updates, component testing, troubleshooting assistance, priority scheduling, and discounted repair rates. Plans are customized based on your installed systems and can be bundled for savings."
    },
    {
      question: "Can I upgrade my current RV systems?",
      answer: "Absolutely! We specialize in upgrading existing RV systems. Common upgrades include replacing AGM batteries with lithium, adding solar panels, installing WiFi boosters, and integrating smart automation. We'll assess your current setup and recommend cost-effective upgrade paths."
    },
    {
      question: "Do you sell refurbished or used RV equipment?",
      answer: "We occasionally offer certified refurbished equipment at discounted prices. All refurbished items undergo rigorous testing, include warranty coverage, and are clearly marked. Contact us to inquire about current refurbished inventory."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, Amex, Discover), PayPal, bank transfers, checks, and financing through our approved lenders. For large purchases, we can arrange split payments or deposits."
    },
    {
      question: "How long does product delivery take?",
      answer: "In-stock items typically ship within 1-3 business days with delivery in 3-7 days. Custom orders or special-order items may take 2-6 weeks. Installation appointments are typically scheduled within 1-2 weeks of product delivery."
    },
    {
      question: "Do you offer returns or exchanges?",
      answer: "Yes, we offer a 30-day return policy on most products (some restrictions apply for custom or installed items). Unopened items in original packaging receive full refunds. Exchanges are available for defective or incompatible products."
    },
    {
      question: "Can I get a product recommendation consultation?",
      answer: "Yes! We offer free product consultation calls where our experts assess your RV, discuss your lifestyle and needs, and recommend the best products and solutions. No obligation to purchase. Schedule your consultation today."
    },
    {
      question: "Do you offer package deals or bundle discounts?",
      answer: "Yes, we offer significant discounts on bundled products. For example, pairing solar panels with lithium batteries, or combining WiFi, security, and power management in a complete smart RV package. Bundles save 15-30% compared to individual purchases."
    }
  ];

  const productSchemas = [faqSchema(productsFAQs)];

  return (
    <Layout>
      <SEO
        title="RV Products & Services | Smart RV Portal"
        description="Discover premium RV products and services for your smart RV lifestyle. From rentals to technology upgrades, find everything you need."
        keywords="RV rentals, RV marketplace, mobile internet, solar kits, RV accessories, digital nomad gear, RV services"
        canonical={canonical}
        ogImage="/lovable-uploads/e2566d0d-bbd0-4401-9293-2d105eea8105.png"
        ogImageAlt="Smart RV dealership with premium technology solutions"
        structuredData={[
          organizationSchema,
          ...productSchemas
        ]}
      />
      
      {/* Hero Image Section */}
      <div className="w-full h-[60vh] relative overflow-hidden">
        <img 
          src="/lovable-uploads/e2566d0d-bbd0-4401-9293-2d105eea8105.png"
          alt="Smart RV dealership aerial view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              RV Marketplace
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto px-4">
              Your trusted source for premium RV products, services, and exclusive deals
            </p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full bg-gradient-to-b from-[#080F1F] to-[#151A22]"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <Breadcrumbs items={[{ label: 'Products & Services' }]} />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-white/80 text-center mb-4 max-w-3xl mx-auto"
          >
            Welcome to our curated marketplace of premium RV products and services. 
          </motion.p>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg text-white/70 text-center mb-16 max-w-3xl mx-auto"
          >
            From cutting-edge technology solutions to essential travel gear, we've partnered with trusted brands to bring you the best in RV innovation.
          </motion.p>

          {/* Enhanced Introduction */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Premium RV Technology & Equipment</h2>
            <p className="text-[#E2E8FF] text-lg max-w-3xl mx-auto mb-6">
              Discover our curated selection of professional-grade RV products, from cutting-edge connectivity solutions to advanced power management systems. Every product is specifically chosen for reliability, performance, and compatibility with modern RV lifestyles.
            </p>
            <p className="text-[#E2E8FF] max-w-3xl mx-auto mb-8">
              Whether you're upgrading an existing RV or building your dream mobile setup from scratch, our expert team helps you select the perfect combination of technology, equipment, and services for your unique needs and budget.
            </p>
          </div>

          {/* Product Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Technology Solutions</h3>
              <p className="text-gray-300 mb-6">
                Smart systems, connectivity solutions, and automation technology for modern RVs.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Smart monitoring systems</li>
                <li>• Internet connectivity</li>
                <li>• Security solutions</li>
                <li>• Power management</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Essential Gear</h3>
              <p className="text-gray-300 mb-6">
                High quality accessories and equipment for comfort, safety, and convenience.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Solar power systems</li>
                <li>• Water filtration</li>
                <li>• Storage solutions</li>
                <li>• Safety equipment</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Services & Support</h3>
              <p className="text-gray-300 mb-6">
                Professional services, maintenance, and support for your RV lifestyle.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Professional installation</li>
                <li>• Maintenance services</li>
                <li>• Trip planning tools</li>
                <li>• Emergency support</li>
              </ul>
            </motion.div>
          </div>

          {/* Featured Product Bundles */}
          <div className="mb-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Popular Product Bundles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#091020] p-6 rounded-lg border border-[#5B9BD5]/30">
                <Package className="h-8 w-8 text-[#5B9BD5] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Complete Connectivity Bundle</h3>
                <p className="text-gray-300 mb-4">
                  WiFi booster, cellular modem, signal antenna, and professional installation. Stay connected anywhere you travel.
                </p>
                <p className="text-[#5B9BD5] font-semibold">Save 25% vs individual purchase</p>
                <Link to="/pricing" className="inline-block mt-4 text-blue-400 hover:text-blue-300">
                  View pricing →
                </Link>
              </div>

              <div className="bg-[#091020] p-6 rounded-lg border border-[#5B9BD5]/30">
                <Wrench className="h-8 w-8 text-[#10B981] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Power Independence Package</h3>
                <p className="text-gray-300 mb-4">
                  Solar panels, lithium battery bank, inverter/charger, and monitoring system. Go off-grid with confidence.
                </p>
                <p className="text-[#10B981] font-semibold">Save 30% vs individual purchase</p>
                <Link to="/pricing" className="inline-block mt-4 text-blue-400 hover:text-blue-300">
                  View pricing →
                </Link>
              </div>
            </div>
          </div>

          {/* Comprehensive FAQ Section */}
          <div className="mb-16 bg-[#091020] p-8 rounded-xl border border-[#1a202c]">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-8 h-8 text-[#5B9BD5]" />
              <h2 className="text-3xl font-bold text-white">Product & Service FAQs</h2>
            </div>
            <p className="text-[#E2E8FF] text-lg mb-8">
              Common questions about our RV products, services, installation, warranties, and purchasing options.
            </p>

            <div className="space-y-6">
              {productsFAQs.map((faq, index) => (
                <div key={index} className="bg-[#151A22] p-6 rounded-lg border border-[#1a202c]">
                  <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-[#E2E8FF] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Service Highlights */}
          <div className="mb-16 grid md:grid-cols-3 gap-6">
            <div className="bg-[#091020] p-6 rounded-lg border border-[#1a202c] text-center">
              <ShoppingBag className="h-10 w-10 text-[#5B9BD5] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Expert Selection</h3>
              <p className="text-gray-300">
                Every product is tested and approved by our RV technology experts for quality and reliability.
              </p>
            </div>
            <div className="bg-[#091020] p-6 rounded-lg border border-[#1a202c] text-center">
              <Wrench className="h-10 w-10 text-[#10B981] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Professional Installation</h3>
              <p className="text-gray-300">
                Certified technicians ensure proper installation for optimal performance and warranty coverage.
              </p>
            </div>
            <div className="bg-[#091020] p-6 rounded-lg border border-[#1a202c] text-center">
              <Package className="h-10 w-10 text-[#F59E0B] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Bundle Savings</h3>
              <p className="text-gray-300">
                Save 15-30% with our curated product bundles designed for complete RV solutions.
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <TestimonialsSection />

          {/* Explore More */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mt-12 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Continue Exploring</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/models" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg p-4 transition-all">
                <h4 className="text-white font-semibold mb-2">RV Models</h4>
                <p className="text-gray-400 text-sm">Explore our RV lineup</p>
              </Link>
              <Link to="/rv-marketplace" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-green-500 rounded-lg p-4 transition-all">
                <h4 className="text-white font-semibold mb-2">RV Marketplace</h4>
                <p className="text-gray-400 text-sm">Buy and sell RVs</p>
              </Link>
              <Link to="/features" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-purple-500 rounded-lg p-4 transition-all">
                <h4 className="text-white font-semibold mb-2">Smart Features</h4>
                <p className="text-gray-400 text-sm">See available features</p>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Products;