import { Mic, Cloud, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";

const VoiceControl = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0E17] text-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/9cb71164-7823-47a1-b788-5afc310ad5e5.png"
              alt="RV at sunset with voice control interface"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Voice Control Transforms Your RV Experience
            </h1>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="flex items-start gap-3">
                <div className="text-blue-400">
                  <Mic className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-2">The Power of Seamless Voice Technology</h3>
                  <p className="text-gray-300">Transform your RV experience with advanced voice commands</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-blue-400">
                  <Cloud className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-2">Advanced Technology Built-in</h3>
                  <p className="text-gray-300">State-of-the-art voice recognition for seamless control</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-blue-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-2">Safe, Simple, Smart Control</h3>
                  <p className="text-gray-300">Hands-free operation for enhanced safety</p>
                </div>
              </div>
            </div>

            <button className="mt-12 px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors">
              Learn More
            </button>
          </div>
        </section>

        {/* Voice Control Systems */}
        <section className="py-20 px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Voice Control Systems</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "JayVoice",
                description: "Advanced voice control system by Jayco with natural language processing and multi-language support.",
                icon: Mic
              },
              {
                title: "PowerPro",
                description: "Comprehensive RV management system with voice commands for all essential functions.",
                icon: Cloud
              },
              {
                title: "Smart Assistant",
                description: "AI-powered voice assistant specifically designed for RV control and automation.",
                icon: MessageSquare
              }
            ].map((system, index) => (
              <motion.div
                key={system.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#1B2028]/90 p-8 rounded-lg"
              >
                <system.icon className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{system.title}</h3>
                <p className="text-gray-300">{system.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Section with Image */}
        <section className="py-20 px-4 bg-[#151A22]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Benefits of Voice Control</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <img 
                src="/lovable-uploads/9cb71164-7823-47a1-b788-5afc310ad5e5.png"
                alt="Smart RV Interface"
                className="rounded-lg shadow-xl"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Convenience",
                    description: "Control your RV systems effortlessly"
                  },
                  {
                    title: "Enhanced Safety",
                    description: "Keep your focus on the road"
                  },
                  {
                    title: "Smart Usage",
                    description: "Optimize your RV's performance"
                  },
                  {
                    title: "Accessibility",
                    description: "Easy control for everyone"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-[#1B2028]/90 rounded-lg"
                  >
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Voice Control Features</h2>
            <div className="space-y-4">
              {[
                "Lighting",
                "Climate Control",
                "Entertainment Systems",
                "Security Features",
                "Power Management",
                "Navigation Control"
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[#1B2028]/90 rounded-lg flex items-center justify-between"
                >
                  <span>{feature}</span>
                  <Mic className="w-5 h-5 text-blue-400" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#151A22]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience the Future?</h2>
            <p className="text-gray-300 mb-8">
              Join us in revolutionizing RV living with cutting-edge voice control technology.
            </p>
            <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors">
              Get Started
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default VoiceControl;