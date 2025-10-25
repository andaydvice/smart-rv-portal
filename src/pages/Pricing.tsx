
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, HelpCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { Helmet } from "react-helmet-async";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { faqSchema } from "@/components/seo/schemas";
import smartRvPricingHero from '@/assets/smart-rv-pricing-hero.jpg';

const Pricing = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const pricingFAQs = [
    {
      question: "What's included in Smart RV pricing packages?",
      answer: "All Smart RV packages include professional installation by certified technicians, comprehensive training and onboarding, a 2-year warranty on all hardware, and a 30-day satisfaction guarantee. Each package also includes the specific features listed, mobile app access, and ongoing customer support."
    },
    {
      question: "Do you offer financing options for RV technology upgrades?",
      answer: "Yes, we offer flexible financing including 0% APR for 12 months, extended payment plans up to 60 months, trade-in credit for existing systems, and corporate and fleet discounts. Contact our team to discuss the best financing option for your situation."
    },
    {
      question: "How long does installation take?",
      answer: "Installation time varies by package. Smart Essentials typically takes 2-3 days, Smart Professional takes 3-5 days, and Smart Premium can take 5-7 days. Our certified technicians work efficiently while ensuring quality installation. We'll provide a detailed timeline during consultation."
    },
    {
      question: "Can I upgrade my package later?",
      answer: "Absolutely! All our packages are designed to be upgradeable. You can start with Smart Essentials and upgrade to Professional or Premium as your needs grow. We offer trade-in credit for your existing equipment when upgrading."
    },
    {
      question: "What warranty coverage is included?",
      answer: "All packages include a comprehensive 2-year warranty on hardware and installation. Smart Premium includes lifetime software updates. We also offer extended warranty options and service plans for additional coverage and peace of mind."
    },
    {
      question: "Do prices include installation costs?",
      answer: "The listed prices are for equipment and technology packages only. Professional installation is quoted separately based on your RV model, existing systems, and location. Most installations range from $1,500-$3,500 depending on package complexity."
    },
    {
      question: "Are there monthly fees for smart RV features?",
      answer: "Some features like cellular connectivity and certain cloud services may have optional monthly subscriptions. However, core smart RV functionality has no monthly fees. We'll clearly explain any ongoing costs during consultation."
    },
    {
      question: "What's the difference between the three packages?",
      answer: "Smart Essentials provides basic automation and monitoring, ideal for entry-level upgrades. Smart Professional adds advanced features like GPS tracking, voice control, and priority support - perfect for serious RV enthusiasts. Smart Premium includes everything plus AI-powered optimization, luxury amenity controls, and concierge support for the ultimate experience."
    },
    {
      question: "Can I customize a package?",
      answer: "Yes! While our packages are designed to cover common needs, we offer full customization. During your consultation, we can build a tailored solution that includes exactly the features you want within your budget."
    },
    {
      question: "Do you service all RV types and brands?",
      answer: "We work with all major RV types including Class A, Class B, Class C motorhomes, travel trailers, and fifth wheels. Our systems are compatible with most RV brands. We'll assess your specific RV during the consultation to ensure perfect compatibility."
    },
    {
      question: "What's included in the 30-day satisfaction guarantee?",
      answer: "If you're not completely satisfied within 30 days of installation, we'll work with you to make it right. This may include system adjustments, additional training, or in rare cases, a full refund minus installation costs. Your satisfaction is our priority."
    },
    {
      question: "How do smart RV upgrades affect resale value?",
      answer: "Smart RV technology typically increases resale value by 15-25% according to industry data. Modern buyers actively seek RVs with integrated technology, connectivity, and automation features. Premium packages show the highest ROI at resale."
    },
    {
      question: "Do you offer fleet or bulk discounts?",
      answer: "Yes, we offer special pricing for fleet owners, RV rental companies, and multiple-unit purchases. Contact our commercial team for custom fleet quotes and volume discounts."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, bank transfers, financing through our partners, and can work with RV loans that include upgrade costs. We'll help you find the most convenient payment method."
    },
    {
      question: "Is there a consultation fee?",
      answer: "No, all consultations are completely free. Our experts will assess your RV, discuss your needs, and provide a detailed quote with no obligation. Schedule your free consultation today."
    }
  ];

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
        <title>Smart RV Pricing & Packages | Technology Upgrade Costs 2025</title>
        <meta name="description" content="Transparent Smart RV technology pricing. Three packages from $15k-$65k. Professional installation, 0% financing available. Compare features, warranty, and support options." />
        <meta name="keywords" content="smart RV pricing, RV technology cost, RV upgrade packages, smart RV installation, RV automation pricing, RV connectivity cost" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/pricing' : ''} />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema(pricingFAQs))}
        </script>
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full bg-gradient-to-b from-[#080F1F] to-[#151A22]"
      >
        {/* Hero Image Section */}
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] mb-16">
          <img 
            src={smartRvPricingHero}
            alt="Smart RV technology and professional installation systems"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
            >
              Smart RV Pricing
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-lg"
            >
              Choose the perfect smart RV package that fits your lifestyle and budget. All plans include professional installation and training.
            </motion.p>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <Breadcrumbs items={[{ label: 'Pricing' }]} />
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

            {/* Comprehensive FAQ Section */}
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-8 h-8 text-[#5B9BD5]" />
                <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
              </div>
              <p className="text-white/80 text-lg mb-8">
                Everything you need to know about Smart RV pricing, packages, installation, and financing options.
              </p>

              <div className="space-y-6">
                {pricingFAQs.map((faq, index) => (
                  <div key={index} className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                    <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Comparison */}
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Compare Smart RV Packages</h2>
              <p className="text-white/80 text-lg mb-6">
                Choose the perfect package for your RV lifestyle. All packages include professional installation, comprehensive training, and warranty coverage.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4">Feature</th>
                      <th className="text-center py-3 px-4">Essentials</th>
                      <th className="text-center py-3 px-4">Professional</th>
                      <th className="text-center py-3 px-4">Premium</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Price</td>
                      <td className="text-center py-3 px-4">$15,000</td>
                      <td className="text-center py-3 px-4">$35,000</td>
                      <td className="text-center py-3 px-4">$65,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Basic Automation</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Energy Monitoring</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Voice Control</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">GPS Tracking & Security</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">AI-Powered Optimization</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Concierge Support</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Warranty Period</td>
                      <td className="text-center py-3 px-4">2 years</td>
                      <td className="text-center py-3 px-4">2 years</td>
                      <td className="text-center py-3 px-4">Lifetime</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Related Resources */}
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Explore Related Resources</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/features" className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B9BD5] rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">Smart Features</h4>
                  <p className="text-white/70 text-sm">Explore all available smart RV features</p>
                </Link>
                <Link to="/models" className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B9BD5] rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">RV Models</h4>
                  <p className="text-white/70 text-sm">See compatible RV models and classes</p>
                </Link>
                <Link to="/calculators" className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B9BD5] rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">Cost Calculator</h4>
                  <p className="text-white/70 text-sm">Calculate your RV upgrade costs</p>
                </Link>
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
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Value & Savings</h2>
              <p className="text-white/90 text-center mb-8">
                Smart RV technology provides long-term value through enhanced comfort, security, and efficiency.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Pricing;
