import { Mic, Cloud, Facebook, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const VoiceControl = () => {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/97e63b3f-4389-48fd-995b-6d490d682089.png"
            alt="RV at sunset with voice control interface"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
            Voice Control for Smart RVs
          </h1>
          <p className="text-xl md:text-2xl mb-12 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
            Experience RV living's future: Voice control technology for hands-free system operation
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Mic className="w-6 h-6" />
            Start Voice Control
          </button>
        </motion.div>
      </section>

      {/* Voice Systems Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Voice Systems</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "JayVoice",
              description: "Advanced voice control system by Jayco",
              icon: Mic
            },
            {
              title: "Power Pro",
              description: "Comprehensive RV management by WFCO",
              icon: Cloud
            },
            {
              title: "Smart Assistant",
              description: "Traditional voice assistant integration",
              icon: Mic
            }
          ].map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#1A1F2E]/95 p-8 rounded-lg text-center"
            >
              <system.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">{system.title}</h3>
              <p className="text-gray-300">{system.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-[#111827]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Benefits</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Convenience",
              description: "Control your RV systems without lifting a finger"
            },
            {
              title: "Safety",
              description: "Keep your focus on driving and surroundings"
            },
            {
              title: "Efficiency",
              description: "Streamline your RV management"
            }
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#1A1F2E]/95 p-8 rounded-lg text-center"
            >
              <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] py-16 px-4 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Smart RV</h3>
            <p className="text-gray-400 mb-4">
              Revolutionizing the future of recreational vehicles with smart technology.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
          
          {[
            {
              title: "Quick Links",
              links: ["Models", "Features", "Technology"]
            },
            {
              title: "Features",
              links: ["Navigation System", "Security System", "Power Management"]
            },
            {
              title: "Contact Us",
              links: ["1234 Smart Drive", "Tech Valley, CA 94025", "info@smartrv.com"]
            }
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-xl font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default VoiceControl;