
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Footer2 from "@/components/ui/Footer2";
import { scrollToTop } from "@/utils/scrollToTop";

const Contact = () => {
  const { toast } = useToast();
  
  // Scroll to top on component mount
  useEffect(() => {
    console.log("Contact page - Scrolling to top");
    scrollToTop();
  }, []);

  // Define the footer links and socials for this page
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "/" },
        { text: "Features", href: "/features" },
        { text: "Models", href: "/models" }
      ]
    },
    {
      title: "Support",
      links: [
        { text: "Documentation", href: "/documentation" },
        { text: "Troubleshooting", href: "/troubleshooting" },
        { text: "FAQs", href: "/faqs" }
      ]
    }
  ];

  const footerSocials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
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
        </div>
      </motion.div>
      <Footer2 
        links={footerLinks}
        socials={footerSocials}
        description="Get in touch with our Smart RV experts"
      />
    </div>
  );
};

export default Contact;
