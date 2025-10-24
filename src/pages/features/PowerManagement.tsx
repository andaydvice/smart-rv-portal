import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Battery, Sun, Zap, Activity } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from 'react-helmet-async';
import { LazyImage } from '@/components/ui/LazyImage';
import { getOptimizedImageProps } from '@/utils/imageOptimization';

const PowerManagement = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/features/power-management` : 'https://example.com/features/power-management';
  const title = 'Power management for smart RVs | Optimize energy';
  const description = 'Smart RV power management with solar integration, battery analytics, and smart distribution to optimize energy and extend off grid time.';
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="preload" as="image" href="/lovable-uploads/power-management-header.jpg" fetchPriority="high" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Power Management',
          description,
          url: canonicalUrl
        })}</script>
      </Helmet>
      {/* Hero Image Section */}
      <div className="relative w-full h-[600px] md:h-[80vh] max-h-[800px] overflow-hidden">
        <LazyImage
          {...getOptimizedImageProps({
            src: "/lovable-uploads/power-management-header.jpg?v=3",
            alt: "Modern RV interior with advanced power management dashboard showing battery levels, solar input, and electrical distribution controls",
            type: "hero"
          })}
          className="absolute inset-0 w-full h-full object-cover"
          priority={true}
          onLoad={() => console.log('NEW Power management header image loaded successfully')}
          onError={(e) => console.error('NEW Power management header image failed to load:', e)}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Battery className="h-12 w-12 text-yellow-500" />
              <h1 className="text-5xl md:text-6xl font-bold text-white">Power Management</h1>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Intelligent energy optimization with solar integration, smart distribution, and real-time analytics for extended off-grid adventures
            </p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto pt-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Smart Power Features</h2>
              <div className="space-y-4 text-gray-300 mb-6 text-left">
                <p>
                  Modern RV power systems consume between 5-50 kWh per day depending on weather conditions, with air conditioning alone increasing usage by 150-300% (Source: Roam Lab, Solar Tech Online 2024).
                </p>
                <p>
                  Smart power management helps you monitor and optimize this consumption in real-time, ensuring efficient power distribution throughout your RV.
                </p>
                <p>
                  With solar integration and intelligent load management, you can reduce annual operating costs by $1,200+ while gaining unlimited boondocking freedom (Source: Integrate Sun 2025).
                </p>
                <p>
                  Advanced battery technology plays a crucial role: lithium batteries offer 95%+ charge efficiency compared to 80-85% for lead-acid, meaning less wasted energy (Source: Mowgli Adventures, Flux Power 2024).
                </p>
              </div>
              <LazyImage
                {...getOptimizedImageProps({
                  src: "/lovable-uploads/078abbd1-5852-4d5a-a457-154a7421c673.png",
                  alt: "Smart RV power management system interface with solar and battery monitoring",
                  type: "feature"
                })}
                className="w-full h-64 object-cover rounded-lg mb-6"
                priority={false}
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300 text-left">
                <li>Solar panel integration and monitoring optimizes energy capture.</li>
                <li>Battery level tracking and alerts keep you informed.</li>
                <li>Automated power source switching ensures seamless transitions.</li>
                <li>Energy consumption analytics provide valuable insights.</li>
                <li>Smart appliance power management reduces waste.</li>
                <li>Generator auto start and stop capabilities offer convenience.</li>
                <li>Load shedding prioritizes critical systems during high demand.</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Sun className="h-6 w-6 text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Solar Integration</h3>
                <div className="text-gray-300 space-y-2 text-left">
                  <p>
                    Modern monocrystalline solar panels achieve 20-25% efficiency, converting sunlight into usable power for your RV (Source: Hydro Solar, University of Michigan 2024).
                  </p>
                  <p>
                    The choice of charge controller matters significantly: MPPT controllers extract 15-30% more power from identical panels compared to PWM controllers (Source: Integrate Sun 2025).
                  </p>
                  <p>
                    According to the RV Industry Association, there has been a 15% increase in demand for RVs equipped with solar panels, reflecting growing adoption of sustainable energy solutions.
                  </p>
                  <p>
                    Solar panel costs have dropped 90% since 2010, with average module prices reaching $0.31/W_dc in Q2 2024, making solar more accessible than ever (Source: EnergySage 2024).
                  </p>
                  <p>
                    Most solar-equipped RVs achieve return on investment within 2-3 years of full-time travel through reduced campground and generator fuel costs (Source: Integrate Sun 2025).
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Zap className="h-6 w-6 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Distribution</h3>
                <div className="text-gray-300 space-y-2 text-left">
                  <p>
                    Intelligent power routing prioritizes essential systems and automatically switches off circuits when power draw exceeds incoming capacity, following a predetermined order set for your coach's needs (Source: Family RVing Magazine).
                  </p>
                  <p>
                    The average RV draws 30 amps per hour at 110V, equal to approximately 330 watts/hour baseline consumption (Source: e RV Solar 2024).
                  </p>
                  <p>
                    Smart load management prevents overloads while ensuring critical appliances maintain power during high-demand periods.
                  </p>
                  <p>
                    Customizable power allocation allows you to set priorities based on your specific usage patterns and needs.
                  </p>
                  <p>
                    Real-time monitoring provides instant notifications for unusual power draws or potential electrical issues before they become problems.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Activity className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Usage Analytics</h3>
                <div className="text-gray-300 space-y-2 text-left">
                  <p>
                    Gain detailed insights into your power consumption patterns.
                  </p>
                  <p>
                    Our usage analytics offer comprehensive tracking.
                  </p>
                  <p>
                    It also provides actionable optimization recommendations.
                  </p>
                  <p>
                    Understand which appliances consume the most energy.
                  </p>
                  <p>
                    Identify opportunities to reduce power usage.
                  </p>
                  <p>
                    Optimize your energy habits for longer off grid stays and lower utility costs.
                  </p>
                  <p>
                    Access historical data to see trends and improvements over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Battery Technology Comparison */}
          <div className="mt-12 mb-8 bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6">Battery Technology Comparison</h2>
            <p className="text-gray-300 mb-8">
              Choosing the right battery technology significantly impacts your RV's performance and operating costs. Here's how lithium and lead-acid batteries compare based on industry data:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-3 px-4 text-yellow-400 font-semibold">Specification</th>
                    <th className="py-3 px-4 text-yellow-400 font-semibold">Lead-Acid</th>
                    <th className="py-3 px-4 text-yellow-400 font-semibold">Lithium (LiFePO4)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">Lifespan</td>
                    <td className="py-3 px-4">2-5 years</td>
                    <td className="py-3 px-4 text-green-400">10+ years</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">Cycle Life</td>
                    <td className="py-3 px-4">300-1,000 cycles</td>
                    <td className="py-3 px-4 text-green-400">3,000-5,000 cycles</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">Charge Efficiency</td>
                    <td className="py-3 px-4">80-85%</td>
                    <td className="py-3 px-4 text-green-400">95%+</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">Daily Cycle Performance</td>
                    <td className="py-3 px-4">Less than 2 years</td>
                    <td className="py-3 px-4 text-green-400">14+ years</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">Safe Depth of Discharge</td>
                    <td className="py-3 px-4">50% (lifespan reduced below)</td>
                    <td className="py-3 px-4 text-green-400">80-100%</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">Energy Waste</td>
                    <td className="py-3 px-4">15-20% (increases with age)</td>
                    <td className="py-3 px-4 text-green-400">Less than 5%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-blue-400">Key Finding:</strong> Lithium batteries provide 10x the cycle life of lead-acid batteries under most conditions. With daily cycling, lithium can last 14+ years compared to less than 2 years for standard lead-acid batteries.
                <br /><br />
                <em>Sources: RV LIFE, Battle Born Batteries, Flux Power, RELiON, Mowgli Adventures 2024</em>
              </p>
            </div>
          </div>

          {/* Professional Installation Image */}
          <div className="mt-12 mb-8">
            <LazyImage
              {...getOptimizedImageProps({
                src: "/lovable-uploads/professional-power-installation.jpg?v=1",
                alt: "Professional technician installing RV power management system with solar panels and battery monitoring equipment",
                type: "feature"
              })}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
              priority={false}
              onLoad={() => console.log('Professional installation image loaded successfully')}
              onError={(e) => console.error('Professional installation image failed to load:', e)}
            />
          </div>

          {/* Affiliate Recommendations */}
          <div className="mt-8">
            <OptimizedAffiliateGrid
              title="Professional Power System Installation"
              subtitle="Get expert installation and monitoring for your RV power management system"
              partners={[
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'RV Life Pro GPS Navigation',
                  description: 'Essential RV trip planning and GPS navigation app with power management route optimization',
                  features: ['RV-Safe Routes', 'Campground Info', 'Trip Planning', 'Power Management Tips'],
                  buttonText: 'Get RV Life Pro'
                },
                {
                  name: 'Good Sam',
                  url: 'https://goodsam.com',
                  title: 'Good Sam Electrical Support',
                  description: 'Expert electrical system support and maintenance for RV power management',
                  features: ['Electrical Diagnostics', 'System Maintenance', 'Emergency Repairs', 'Technical Support'],
                  buttonText: 'Get Electrical Support'
                }
              ]}
              gridCols="2"
            />
            
            <AffiliateDisclosure className="mt-8" />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default PowerManagement;
