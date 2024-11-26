import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Navigation, Shield, Battery, Wifi } from "lucide-react";

const LuxuryModel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16">
        <Link to="/models">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
          </Button>
        </Link>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src="https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=800"
              alt="Luxury Class RV"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
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
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-400" />
                  Advanced Navigation System with real-time traffic updates
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  Premium Security Suite with 360° surveillance
                </li>
                <li className="flex items-center gap-2">
                  <Battery className="w-5 h-5 text-yellow-400" />
                  Extended Range Power System with smart energy management
                </li>
                <li className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-purple-400" />
                  High-Speed Internet connectivity with satellite backup
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryModel;