import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Shield, Lock, Bell, Camera, Smartphone, MapPin, BatteryCharging, KeyRound, Wrench } from "lucide-react";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from 'react-helmet-async';
import { LazyImage } from "@/components/ui/LazyImage";
import { getOptimizedImageProps } from "@/utils/imageOptimization";

const SecuritySystem = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/features/security-system` : 'https://example.com/features/security-system';
  const title = 'Security system for smart RVs | Remote monitoring';
  const description = 'Smart RV security system with cameras, smart locks, GPS, alerts, and 24/7 monitoring for complete protection.';
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Security System',
          description,
          url: canonicalUrl
        })}</script>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        {/* Full-width Hero Header */}
        <div className="relative w-full h-screen">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-gray-900 z-10" />
          <LazyImage
            {...getOptimizedImageProps(
              "/security-system-hero.jpg",
              "RV security command center with multiple monitoring displays and control panels",
              "hero",
              true
            )}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center px-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Shield className="h-12 w-12 text-emerald-400" />
                <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">Security System</h1>
              </div>
              <p className="text-xl md:text-2xl text-white drop-shadow-lg max-w-3xl">
                Complete protection and monitoring for your RV
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-12">

          {/* Security Statistics Section */}
          <div className="bg-gray-800/30 p-8 rounded-lg border border-emerald-500/30 mb-12">
            <h2 className="text-3xl font-semibold text-emerald-400 mb-6 text-center">The Critical Need for RV Security</h2>
            <p className="text-gray-300 text-lg mb-6 text-left">
              RV theft is a growing concern across the United States. Over 4,000 RVs are stolen annually, with a 30% increase in thefts from 2016 to 2022. Most alarmingly, 85% of stolen motorhomes are never recovered, resulting in average insurance claims of $9,200 (Source: Gitnux, ZipDo Statistics 2025).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-red-400 mb-2">4,000+</div>
                <p className="text-gray-300">RVs stolen annually in the U.S.</p>
                <p className="text-gray-500 text-sm mt-2">(Gitnux 2025)</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-red-400 mb-2">85%</div>
                <p className="text-gray-300">Of stolen motorhomes never recovered</p>
                <p className="text-gray-500 text-sm mt-2">(ZipDo 2025)</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-emerald-400 mb-2">90-98%</div>
                <p className="text-gray-300">Recovery rate with GPS tracking</p>
                <p className="text-gray-500 text-sm mt-2">(GPS Leaders 2024)</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-emerald-400 mb-2">300%</div>
                <p className="text-gray-300">Less likely to be burglarized with cameras</p>
                <p className="text-gray-500 text-sm mt-2">(UNC Study 2024)</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg text-left mb-4">
              Security cameras prove highly effective: homes with visible cameras are 300% less likely to be burglarized, with 60-70% of burglars actively avoiding properties with security systems (Source: University of North Carolina, Security.org 2024).
            </p>
            <p className="text-gray-300 text-lg text-left">
              GPS tracking provides exceptional protection with 90-98% recovery rates for stolen vehicles, compared to just 46% overall U.S. vehicle recovery rate without GPS. Additionally, GPS-equipped vehicles are 50% less likely to be stolen and may qualify for up to 20% insurance premium reductions (Source: GPS Leaders, Fleetsmart, RAM Tracking 2024).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Advanced Security Features</h2>
              <div className="text-gray-300 mb-6 space-y-4">
                <p className="text-left">
                  Experience unparalleled peace of mind on every adventure with our cutting edge RV security system.
                </p>
                <p className="text-left">
                  This comprehensive solution integrates state of the art technology to safeguard your mobile home.
                </p>
                <p className="text-left">
                  Enjoy the confidence that comes with round the clock monitoring, providing constant vigilance over your valuable asset.
                </p>
                <p className="text-left">
                  Our system intelligently combines features like smart locks, advanced motion detection, and high definition cameras.
                </p>
                <p className="text-left">
                  This ensures robust protection whether you are parked at a bustling campsite or exploring remote landscapes.
                </p>
                <p className="text-left">
                  Your RV remains secure, allowing you to fully immerse yourself in the journey ahead.
                </p>
              </div>
              <img 
                src="/lovable-uploads/24586e9a-422f-45ee-aaaa-2ffa5f0e2274.png"
                alt="RV security system interface with cameras and smart locks" 
                className="w-full h-64 object-cover rounded-lg mb-6"
                loading="lazy"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300 text-left">
                <li className="text-left">Smart door locks with remote access allow you to control entry from anywhere, offering flexibility and convenience.</li>
                <li className="text-left">Motion sensors and security cameras provide comprehensive surveillance, detecting any unusual activity around your RV.</li>
                <li className="text-left">Real time alerts to your mobile device keep you informed of any security events, no matter where you are.</li>
                <li className="text-left">GPS tracking and geofencing capabilities help you monitor your RV’s location and set virtual boundaries for added security.</li>
                <li className="text-left">Emergency response integration ensures that help can be dispatched quickly if a critical situation arises.</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Lock className="h-6 w-6 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Locks</h3>
                <div className="text-gray-300 space-y-2 text-left">
                  <p>
                    Smart locks are critical when 70% of people forget to lock their doors when leaving home and 30% of burglars enter through unlocked doors or windows (Source: Coolest Gadgets, SecuriTeam 2024).
                  </p>
                  <p>
                    Door/window locks combined with external lights provide at least 20x greater protection against burglary. The smart lock market is growing at 15.40% annually, driven by rising security concerns (Source: Security Journal, Market.us 2024).
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong>RVLock V4/Ultra ES Pro:</strong> $100-$250 with keyless entry, remote control, DIY installation.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Bell className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Alert System</h3>
                <div className="text-gray-300 space-y-2 text-left">
                  <p>
                    Real-time alerts are critical as 55% of RV thefts occur in parking lots at commercial establishments and campgrounds, with summer break-ins spiking 30% from May-September (Source: Gitnux, SafeHome.org 2024).
                  </p>
                  <p>
                    Over 80% of security camera users value remote monitoring via mobile apps. With 39 million U.S. households using alarm systems and 13 million new installations expected in 2024, instant mobile alerts are becoming standard (Source: SafeHome.org, Consumer Affairs 2024).
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Camera className="h-6 w-6 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Video Surveillance</h3>
                <div className="text-gray-300 space-y-2 text-left">
                  <p>
                    Video surveillance is proven effective: visible cameras deter 53% of burglars, while businesses experience up to 50% decrease in employee theft and 25% reduction in retail theft (Source: Security.org, Journal of Electronic Security 2024).
                  </p>
                  <p>
                    Over 50% of homes now have at least one security camera (2024). Active monitoring systems generate larger crime reduction effects than passive systems, with combined CCTV + lighting + security guards proving most effective (Source: SafeHome.org, U.S. DOJ 40-year review).
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Smartphone className="h-6 w-6 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Mobile App Integration</h3>
                <div className="space-y-2">
                  <p className="text-gray-300 text-left">
                    The smart home security market is projected to grow from $33.9 billion (2024) to $82.1 billion by 2030, driven by remote monitoring demand and IoT advancements (Source: Grand View Research 2024).
                  </p>
                  <p className="text-gray-300 text-left">
                    With 72% of U.S. homeowners now using some form of home security and cloud-based systems providing real-time alerts and notifications, mobile app control has become the standard for modern RV security (Source: Consumer Affairs, Research Nester 2024).
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <MapPin className="h-6 w-6 text-lime-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">GPS Tracking & Geofencing</h3>
                <div className="space-y-2">
                  <p className="text-gray-300 text-left">
                    GPS tracking delivers exceptional results with 90-98% recovery rates for stolen vehicles, compared to just 46% for vehicles without GPS. Vehicles with GPS are 50% less likely to be stolen (Source: GPS Leaders, Fleetsmart 2024).
                  </p>
                  <p className="text-gray-300 text-left">
                    LoJack reports over 90% recovery rate, with many vehicles recovered within hours. Insurance companies commonly offer up to 20% premium reductions for GPS-equipped vehicles (Source: GPS Leaders, RAM Tracking 2024).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Effectiveness Comparison Table */}
          <div className="bg-gray-800/30 p-8 rounded-lg border border-emerald-500/30 mb-12">
            <h2 className="text-2xl font-semibold text-emerald-400 mb-6">Security Component Effectiveness</h2>
            <p className="text-gray-300 mb-6 text-left">
              Research from the University of North Carolina, U.S. Department of Justice, and leading security organizations demonstrates the measurable effectiveness of each security component. Here's how each feature protects your RV:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900/50">
                    <th className="p-4 text-emerald-400 border border-gray-600">Security Component</th>
                    <th className="p-4 text-emerald-400 border border-gray-600">Effectiveness</th>
                    <th className="p-4 text-emerald-400 border border-gray-600">Key Benefit</th>
                    <th className="p-4 text-emerald-400 border border-gray-600">Source</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Visible Security Cameras</td>
                    <td className="p-4 border border-gray-600">300% less likely to be burglarized</td>
                    <td className="p-4 border border-gray-600">Deters 53% of burglars</td>
                    <td className="p-4 border border-gray-600 text-sm">UNC, Security.org 2024</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">GPS Tracking System</td>
                    <td className="p-4 border border-gray-600">90-98% recovery rate</td>
                    <td className="p-4 border border-gray-600">50% less likely to be stolen</td>
                    <td className="p-4 border border-gray-600 text-sm">GPS Leaders 2024</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Smart Locks + External Lights</td>
                    <td className="p-4 border border-gray-600">20x greater protection</td>
                    <td className="p-4 border border-gray-600">Prevents 30% entry methods</td>
                    <td className="p-4 border border-gray-600 text-sm">Security Journal 2024</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Active Monitoring System</td>
                    <td className="p-4 border border-gray-600">50% crime reduction</td>
                    <td className="p-4 border border-gray-600">Real-time response capability</td>
                    <td className="p-4 border border-gray-600 text-sm">CCTV Security Pros</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Alarm Systems</td>
                    <td className="p-4 border border-gray-600">39M households protected</td>
                    <td className="p-4 border border-gray-600">Immediate alert notification</td>
                    <td className="p-4 border border-gray-600 text-sm">SafeHome.org 2023</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30">
                    <td className="p-4 border border-gray-600">Mobile App Monitoring</td>
                    <td className="p-4 border border-gray-600">80%+ user satisfaction</td>
                    <td className="p-4 border border-gray-600">Remote access anywhere</td>
                    <td className="p-4 border border-gray-600 text-sm">Grand View Research 2024</td>
                  </tr>
                  <tr className="hover:bg-gray-800/30 bg-emerald-900/10">
                    <td className="p-4 border border-gray-600 font-bold">Combined Security System</td>
                    <td className="p-4 border border-gray-600 font-bold">Highest protection level</td>
                    <td className="p-4 border border-gray-600 font-bold">Up to 20% insurance discount</td>
                    <td className="p-4 border border-gray-600 text-sm">U.S. DOJ, RAM Tracking</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <p className="text-gray-300 text-sm text-left mb-2">
                <strong className="text-emerald-400">RV Theft Context:</strong> With 4,000+ RVs stolen annually and 85% never recovered, comprehensive security is not optional. The average theft results in a $9,200 insurance claim, and 40% of victims don't have adequate coverage (Source: Gitnux, ZipDo 2025).
              </p>
              <p className="text-gray-300 text-sm text-left">
                <strong className="text-emerald-400">ROI Protection:</strong> GPS tracking alone justifies the investment with up to 20% insurance savings and 90-98% recovery rates. Combined systems provide the highest protection level recognized by the U.S. Department of Justice 40-year systematic review.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <BatteryCharging className="h-6 w-6 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Battery Backup and Reliability</h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-left">
                  Never worry about losing protection during a power outage.
                </p>
                <p className="text-gray-300 text-left">
                  Our robust battery backup keeps your security system running smoothly.
                </p>
                <p className="text-gray-300 text-left">
                  So your RV stays secure no matter what.
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <KeyRound className="h-6 w-6 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Privacy and Data Security</h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-left">
                  Your privacy is our priority.
                </p>
                <p className="text-gray-300 text-left">
                  All video streams and data are encrypted and securely stored.
                </p>
                <p className="text-gray-300 text-left">
                  This gives you complete peace of mind that your information stays private.
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <Wrench className="h-6 w-6 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Easy Installation and Compatibility</h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-left">
                  Get started in minutes with our straightforward setup process.
                </p>
                <p className="text-gray-300 text-left">
                  The system is compatible with most RV models and integrates seamlessly with existing equipment.
                </p>
                <p className="text-gray-300 text-left">
                  This makes security upgrades hassle free.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Header Image */}
          <div className="relative w-full h-96 md:h-[500px] mb-12 mt-16">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-gray-900 z-10" />
            <img 
              src="/pricing-header.jpg"
              alt="Modern RV in showroom displaying current USA pricing for 2025" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl text-center">
                Current USA Pricing (2025)
              </h2>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 mb-12">
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">System</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Equipment Cost</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Monitoring (Monthly)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Key Features</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/30 divide-y divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">ADT Self Setup</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">From $269 (base kit)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Free (self monitoring) or $9.99–$19.99</td>
                    <td className="px-6 py-4 text-sm text-gray-300">DIY install, app control, Nest Cam add ons, panic app[5]</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">SimpliSafe</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">From $250 (basic kit)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$9.99 (self monitoring with camera recording)</td>
                    <td className="px-6 py-4 text-sm text-gray-300">DIY install, app control, cloud video, easy expansion[5]</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Ring</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">From ~$200 (kit)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$4.99 (Basic), $9.99 (Standard), $19.99 (Premium)</td>
                    <td className="px-6 py-4 text-sm text-gray-300">Self monitoring, cloud storage, backup internet option[2][5]</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Cove</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">From $300 (hub/keypad)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$2.99 per camera (cloud storage)</td>
                    <td className="px-6 py-4 text-sm text-gray-300">DIY/pro install, app control, local/cloud video[5]</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc list-inside space-y-3 text-gray-300 mb-6 text-left">
              <li>
                Smart locks like the RVLock V4 or Ultra ES Pro typically cost $100–$250 and feature keyless entry, remote control, and easy DIY installation[10][12].
              </li>
              <li>
                Video DVRs for multi camera setups range from $391 (basic 5 channel DVR) to $3,200+ for advanced multi channel, GPS enabled systems[7].
              </li>
            </ul>
            <p className="text-gray-300 text-sm text-left">
              All listed prices are current as of 2025 and reflect standard retail rates in the USA[2][5][7].
            </p>
          </div>
          
          <OptimizedAffiliateGrid
            title="Security & Monitoring Solutions"
            subtitle="Protect your RV with professional security services and monitoring"
            partners={[
              {
                name: 'Good Sam',
                url: 'https://goodsam.com',
                title: 'Good Sam Security Services',
                description: 'Professional RV security consultation and emergency response services.',
                features: ['Security system consultation', 'Emergency response', '24/7 monitoring support', 'Professional installation']
              },
              {
                name: 'Good Sam',
                url: 'https://goodsam.com',
                title: 'Good Sam Security Services',
                description: 'Professional security monitoring and emergency response services for your RV.',
                features: ['24/7 monitoring', 'Emergency response', 'Roadside assistance', 'Peace of mind']
              }
            ]}
            gridCols="2"
            className="mt-16"
          />
          
          <AffiliateDisclosure className="mt-8" />

          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SecuritySystem;
