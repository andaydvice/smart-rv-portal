
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const { toast } = useToast();
  
  // Scroll to top on component mount
  useEffect(() => {
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
      <Helmet>
        <title>Contact Smart RV | Get Support And Advice</title>
        <meta name="description" content="Contact Smart RV for questions, support, and expert advice on technology, power systems, and travel planning." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/contact' : ''} />
      </Helmet>
      {/* REMOVED: Extra Navbar component that was causing duplication */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow pt-20 relative"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/7d42772e-e96c-45cd-9a40-5e59be1c0a60.png"
            alt="Luxury Smart RV in mountain landscape"
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
          
          {/* Emergency Contact Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12"
          >
            <OptimizedAffiliateGrid
              title="Need Immediate Help?"
              subtitle="Emergency support and urgent assistance when you can't wait for a response"
              partners={[
                {
                  partner: 'goodsam',
                  title: 'Good Sam Emergency Hotline',
                  description: '24/7 emergency roadside assistance and immediate technical support for urgent RV issues',
                  features: ['24/7 Emergency Line', 'Immediate Dispatch', 'Technical Hotline', 'Priority Response'],
                  path: '/emergency-support',
                  buttonText: 'Call Emergency Support'
                }
              ]}
              gridCols="auto"
            />
            <div className="px-4">
              <AffiliateDisclosure compact className="max-w-3xl mx-auto my-8" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Contact;
