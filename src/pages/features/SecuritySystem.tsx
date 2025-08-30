import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Shield, Lock, Bell, Camera, Smartphone, MapPin, BatteryCharging, KeyRound, Wrench } from "lucide-react";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import { Helmet } from 'react-helmet-async';

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
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="h-8 w-8 text-emerald-500" />
            <h1 className="text-4xl font-bold text-white">Security System</h1>
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
                    Unlock and secure your RV with a personalized code or your smartphone—no more fumbling for keys.
                  </p>
                  <p>
                    Enjoy remote access, real time activity logs, and integration with other smart devices for a seamless, secure experience[8][10][12].
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Bell className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Alert System</h3>
                <div className="text-gray-300 space-y-2 text-left">
                  <p>
                    Get instant, customizable alerts sent directly to your phone, so you’re always in the know.
                  </p>
                  <p>
                    Wireless sensors on doors and windows, plus optional sirens, ensure you’re alerted to any unauthorized entry—no matter where you are[3][9][11].
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Camera className="h-6 w-6 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Video Surveillance</h3>
                <div className="text-gray-300 space-y-2 text-left">
                  <p>
                    Monitor your RV in real time from anywhere with high definition cameras featuring night vision and motion detection.
                  </p>
                  <p>
                    Footage is securely stored and accessible via an app, providing peace of mind and valuable evidence if needed[4][9][11].
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Smartphone className="h-6 w-6 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Mobile App Integration</h3>
                <div className="space-y-2">
                  <p className="text-gray-300 text-left">
                    Stay in control wherever you roam.
                  </p>
                  <p className="text-gray-300 text-left">
                    Effortlessly lock or unlock doors, monitor live camera feeds, and receive instant security alerts.
                  </p>
                  <p className="text-gray-300 text-left">
                    All from a dedicated mobile app designed for your RV lifestyle.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <MapPin className="h-6 w-6 text-lime-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Geofencing Capabilities</h3>
                <div className="space-y-2">
                  <p className="text-gray-300 text-left">
                    Enjoy hands free security with geofencing.
                  </p>
                  <p className="text-gray-300 text-left">
                    Your system automatically locks, unlocks, and arms or disarms based on your location.
                  </p>
                  <p className="text-gray-300 text-left">
                    This ensures your RV is always protected when you come and go.
                  </p>
                </div>
              </div>
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

          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6 text-left">Current USA Pricing (2025)</h2>
            
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
                partner: 'goodsam',
                title: 'Good Sam Security Services',
                description: 'Professional RV security consultation and emergency response services.',
                features: ['Security system consultation', 'Emergency response', '24/7 monitoring support', 'Professional installation']
              },
              {
                partner: 'goodsam',
                title: 'Good Sam Security Services',
                description: 'Professional security monitoring and emergency response services for your RV.',
                features: ['24/7 monitoring', 'Emergency response', 'Roadside assistance', 'Peace of mind']
              }
            ]}
            gridCols="2"
            className="mt-16"
          />

        </div>
      </motion.div>
    </Layout>
  );
};

export default SecuritySystem;
