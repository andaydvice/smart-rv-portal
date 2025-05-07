
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Refrigerator, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SmartKitchenHeader from "@/components/features/smart-kitchen/SmartKitchenHeader";
import { useEffect } from "react";

const SmartKitchen = () => {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Preload kitchen image for better performance
    const imagePreload = new Image();
    imagePreload.src = "/lovable-uploads/28815e7c-77df-4758-b609-d84355448eea.png";
    imagePreload.fetchPriority = 'high';
  }, []);
  
  return (
    <Layout>
      <Navbar />
      
      {/* Full width header added at the top */}
      <SmartKitchenHeader />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow pb-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          {/* Removed the previous title since it's now in the header */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-blue-400">Connected Refrigerators and Cooking Appliances</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/28815e7c-77df-4758-b609-d84355448eea.png"
                  alt="Smart Kitchen Appliances"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
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
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/3af8fc31-188d-477e-8ab5-b94bd8c4ec77.png"
                  alt="Water Management System"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Real time water usage monitoring</li>
                <li>Advanced water purification systems</li>
                <li>Automatic leak detection and alerts</li>
                <li>Water pressure optimization</li>
                <li>Conservation recommendations</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link to="/schedule-demo">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-lg py-8 px-12">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SmartKitchen;
