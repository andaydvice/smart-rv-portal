
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Refrigerator, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer2 from "@/components/ui/Footer2";

const SmartKitchen = () => {
  // Define the footer links and socials for this page
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Features", href: "/features" },
        { text: "Models", href: "/models" },
        { text: "Documentation", href: "/documentation" }
      ]
    },
    {
      title: "Other Features",
      links: [
        { text: "Navigation System", href: "/features/navigation-system" },
        { text: "Power Management", href: "/features/power-management" },
        { text: "Audio System", href: "/features/audio-system" }
      ]
    }
  ];

  const footerSocials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Refrigerator className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Smart Kitchen and Appliances</h1>
          </div>

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
      <Footer2 
        links={footerLinks}
        socials={footerSocials}
        description="Transform your RV cooking experience with our smart kitchen technologies"
      />
    </div>
  );
};

export default SmartKitchen;
