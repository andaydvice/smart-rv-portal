
import { motion } from "framer-motion";
import { Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SmartKitchenHeader from "@/components/features/smart-kitchen/SmartKitchenHeader";
import KitchenComparisonTable from "@/components/features/smart-kitchen/KitchenComparisonTable";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { useEffect } from "react";
import { VideoSection } from "@/components/ui/VideoSection";

const SmartKitchen = () => {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Preload kitchen image for better performance
    const imagePreload = new Image();
    imagePreload.src = "/lovable-uploads/9b681f27-359c-4d90-8629-5b2b198abf0f.png";
    imagePreload.fetchPriority = 'high';
  }, []);
  
  return (
    <Layout>
      {/* SmartKitchenHeader already has the header image and titles */}
      <SmartKitchenHeader />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow pb-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          {/* Grid with kitchen features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-blue-400">Connected Refrigerators and Cooking Appliances</h2>
              </div>
              <VideoSection
                videoId="smart-systems-demo"
                title="Smart Kitchen Appliances Demo"
                description="Experience connected appliances and intelligent cooking systems"
                className="mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Remote monitoring and control of appliances</li>
                <li>Smart temperature and freshness management</li>
                <li>Automated grocery tracking and ordering</li>
                <li>Recipe suggestions based on available ingredients</li>
                <li>Energy usage optimization</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-blue-400">Water Management Systems</h2>
                <div className="flex items-center gap-3 mt-2">
                  <Droplet className="h-6 w-6 text-cyan-400" />
                  <span className="text-white">Smart Water Solutions</span>
                </div>
              </div>
              <VideoSection
                videoId="connectivity-demo"
                title="Kitchen Water Management Demo"
                description="See smart water monitoring and conservation in action"
                className="mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Real time water usage monitoring</li>
                <li>Advanced water purification systems</li>
                <li>Automatic leak detection and alerts</li>
                <li>Water pressure optimization</li>
                <li>Conservation recommendations</li>
              </ul>
            </div>
          </div>

          {/* Add the comparison table section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-16"
          >
            <KitchenComparisonTable />
          </motion.div>

          {/* Smart Kitchen Solutions */}
          <OptimizedAffiliateGrid
            title="Smart Kitchen Enhancement Solutions"
            subtitle="Upgrade your RV kitchen with premium water filtration, appliance monitoring, and professional installation services."
            partners={[
              {
                name: 'RV Water Filter Store',
                url: 'https://rvwaterfilterstore.com',
                title: 'Premium Water Filtration',
                description: 'Advanced water filtration systems ensuring clean, safe water for all your kitchen needs with guaranteed quality.',
                features: [
                  'Multi-stage filtration',
                  'NSF certified systems',
                  'Easy installation',
                  'Water quality guarantee'
                ]
              },
              {
                name: 'Inverters R Us',
                url: 'https://invertersrus.com',
                title: 'Smart Power Monitoring',
                description: 'Professional power monitoring systems for refrigerators, cooking appliances, and kitchen automation.',
                features: [
                  'Power usage monitoring',
                  'System health alerts',
                  'Energy efficiency tracking',
                  'Professional installation'
                ]
              },
              {
                name: 'Good Sam',
                url: 'https://goodsam.com',
                title: 'Kitchen Installation Support',
                description: 'Expert installation and support services for all your smart kitchen upgrades and maintenance needs.',
                features: [
                  'Professional installation',
                  'System setup assistance',
                  'Ongoing maintenance support',
                  'Emergency service calls'
                ]
              }
            ]}
            gridCols="3"
            className="mb-16"
          />
          
          <AffiliateDisclosure className="mb-8" />

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-lg py-8 px-12">
                Explore Top Deals
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SmartKitchen;
