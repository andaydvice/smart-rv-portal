
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";

const Contact = () => {
  const { toast } = useToast();
  
  // Scroll to top on component mount
  useEffect(() => {
    console.log("Contact page - Scrolling to top");
    scrollToTop();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <Layout>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow pt-20 relative"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/7d42772e-e96c-45cd-9a40-5e59be1c0a60.png"
            alt="Luxury RV in mountain landscape"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/50 to-black/80 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-bold text-white mb-8 tracking-tight"
          >
            Contact Us
          </motion.h1>
          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleSubmit} 
            className="space-y-6 bg-black/10 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl text-left"
          >
            <div className="text-sm text-white/80 mb-4 text-left">* Required</div>
            <div className="space-y-4">
              <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1 text-left">Name * </label>
              <Input 
                id="name" 
                className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:bg-white/15 transition-all" 
                required 
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1 text-left">Email * </label>
              <Input 
                id="email" 
                type="email" 
                className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:bg-white/15 transition-all" 
                required 
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1 text-left">Message * </label>
              <Textarea 
                id="message" 
                className="bg-white/10 border-white/20 text-white min-h-[150px] placeholder-white/40 focus:border-white/40 focus:bg-white/15 transition-all" 
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-white/90 text-black hover:bg-white transition-all duration-300 shadow-lg"
            >
              Send Message
            </Button>
          </motion.form>
          
          {/* Premium Support Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-[#5B9BD5]/20 to-[#4B8FE3]/20 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Premium RV Support Services</h2>
              <p className="text-white/90 text-center mb-8 max-w-2xl mx-auto">
                Need immediate expert help? Connect with certified RV professionals for installation, maintenance, and troubleshooting services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 text-center">RV Mobile Service</h3>
                  <p className="text-white/80 text-sm mb-4 text-center">
                    On-site RV repair and maintenance services that come to your location. Professional technicians available nationwide.
                  </p>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <a href="https://rvmobileservice.com/book-service" target="_blank" rel="noopener noreferrer">
                      Book Service
                    </a>
                  </Button>
                </div>
                
                <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 text-center">Smart System Installation</h3>
                  <p className="text-white/80 text-sm mb-4 text-center">
                    Professional installation of smart RV systems, solar panels, and connectivity solutions by certified technicians.
                  </p>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <a href="https://rvtechpros.com/smart-installation" target="_blank" rel="noopener noreferrer">
                      Get Installation
                    </a>
                  </Button>
                </div>
                
                <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚨</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 text-center">24/7 Emergency Support</h3>
                  <p className="text-white/80 text-sm mb-4 text-center">
                    Round-the-clock emergency assistance and roadside support specifically designed for RV travelers.
                  </p>
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <a href="https://goodsam.com/emergency-roadside" target="_blank" rel="noopener noreferrer">
                      Get Coverage
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-white/70 text-xs text-center">
                  These are affiliate partnerships that help support our platform. We only recommend services we trust and use ourselves.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Contact;
