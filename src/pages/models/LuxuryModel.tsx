import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LuxuryModel = () => {
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
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800"
                alt="Luxury Class RV"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Luxury Class</h1>
              <p className="text-blue-400 text-xl mb-4">Starting at $150,000</p>
              <p className="text-gray-300 mb-8">
                Experience unparalleled luxury with our flagship model, featuring advanced automation and premium finishes. 
                The Luxury Class RV sets new standards in mobile living with its state-of-the-art technology and comfort features.
              </p>
              <div className="space-y-4 text-gray-300">
                <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Advanced Navigation System with real-time traffic updates</li>
                  <li>Premium Security Suite with 360° surveillance</li>
                  <li>Extended Range Power System with smart energy management</li>
                  <li>High-Speed Internet connectivity with satellite backup</li>
                  <li>Luxury interior with premium materials and finishes</li>
                  <li>Smart climate control with zone management</li>
                  <li>Automated parking assistance</li>
                  <li>Premium entertainment system</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LuxuryModel;