import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AdventureModel = () => {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-16"
      >
        <div className="max-w-7xl mx-auto px-4 py-20">
          <Link to="/models">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
            </Button>
          </Link>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800"
                alt="Adventure Class RV"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Adventure Class</h1>
              <p className="text-blue-400 text-xl mb-4">Starting at $120,000</p>
              <p className="text-gray-300 mb-8">
                Built for the modern explorer, combining durability with smart technology for off-grid adventures.
                The Adventure Class RV is designed for those who want to explore without compromising on comfort and technology.
              </p>
              <div className="space-y-4 text-gray-300">
                <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Solar Power Integration with battery backup</li>
                  <li>All-Terrain Monitoring system</li>
                  <li>Off-Road Navigation with trail mapping</li>
                  <li>Satellite Connectivity for remote areas</li>
                  <li>Reinforced chassis and suspension</li>
                  <li>Water purification system</li>
                  <li>Emergency communication system</li>
                  <li>Weather monitoring station</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdventureModel;