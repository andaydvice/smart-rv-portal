import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CompactModel = () => {
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
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800"
                alt="Compact Smart RV"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Compact Smart</h1>
              <p className="text-blue-400 text-xl mb-4">Starting at $90,000</p>
              <p className="text-gray-300 mb-8">
                Perfect for weekend getaways, packed with smart features in an efficient, easy-to-maneuver package.
                The Compact Smart RV brings innovation to a smaller footprint without compromising on technology.
              </p>
              <div className="space-y-4 text-gray-300">
                <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>City-Optimized Navigation System</li>
                  <li>Efficient Power Management</li>
                  <li>Smart Security System</li>
                  <li>4G/5G Connectivity</li>
                  <li>Compact parking assistance</li>
                  <li>Smart space optimization</li>
                  <li>Energy-efficient appliances</li>
                  <li>Integrated smart home controls</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CompactModel;