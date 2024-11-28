import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen pt-20 relative"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/7d42772e-e96c-45cd-9a40-5e59be1c0a60.png"
            alt="Luxury RV in mountain landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
          <form onSubmit={handleSubmit} className="space-y-6 bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Name</label>
              <Input id="name" className="bg-white/5 border-white/10 text-white placeholder-white/50" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email</label>
              <Input id="email" type="email" className="bg-white/5 border-white/10 text-white placeholder-white/50" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Message</label>
              <Textarea id="message" className="bg-white/5 border-white/10 text-white min-h-[150px] placeholder-white/50" required />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-white text-black hover:bg-white/90"
            >
              Send Message
            </Button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;