import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Technology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900">
        <div className="relative h-[600px] overflow-hidden">
          <img
            src="/lovable-uploads/78463f41-df70-4a6a-8e6a-c8296d7a7b13.png"
            alt="Futuristic luxury RV with LED lighting on a mountain road at dusk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Cutting Edge Technology</h1>
              <p className="text-lg md:text-xl mb-6">
                Discover the revolutionary smart features that enhance your RV experience.
              </p>
              <Link to="/models">
                <Button variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10">
                  Explore Models
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="py-12 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Innovative Features</h2>
          <p className="text-gray-300 mb-4">
            Our RVs are equipped with the latest technology ensuring convenience, safety, and entertainment.
          </p>
          <ul className="list-disc list-inside text-gray-300">
            <li>AI-driven Navigation Systems</li>
            <li>Smart Security Features</li>
            <li>Enhanced Connectivity with 5G</li>
            <li>Eco-friendly Power Management</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Technology;