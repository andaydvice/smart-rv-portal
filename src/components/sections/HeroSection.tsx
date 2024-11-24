import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="/lovable-uploads/b6a46bec-1ca8-4f7b-89fa-37bb5415d9fa.png"
        alt="Modern luxury RV parked by a lake with mountains and sunset"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative text-center text-white px-4"
    >
      <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full">
        Welcome to Smart RV
      </span>
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        The Future of Travel
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
        Experience luxury and innovation with cutting-edge technology
      </p>
      <div className="flex gap-4 justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="lg" className="bg-white text-black hover:bg-white/90">
              Schedule Demo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule a Demo</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <p>Contact our team to schedule a personalized demo of our Smart RV features.</p>
            </div>
          </DialogContent>
        </Dialog>
        <Button 
          variant="outline" 
          size="lg" 
          className="border-white text-white bg-black/40 hover:bg-white/10"
        >
          Explore Models
        </Button>
      </div>
    </motion.div>
  </section>
);