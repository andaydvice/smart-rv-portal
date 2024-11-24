import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="/lovable-uploads/7b0008af-4737-468b-820b-1f3d6b92a458.png"
        alt="Luxury RV in scenic mountain landscape with pink sunset clouds"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative text-center text-white px-4 max-w-5xl mx-auto"
    >
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
      >
        Welcome to Smart RV
      </motion.span>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
      >
        The Future of <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Luxury Travel
        </span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-200"
      >
        Experience unparalleled luxury and innovation with cutting-edge smart technology
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Schedule Demo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule a Demo</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-gray-600">
                Contact our team to schedule a personalized demo of our Smart RV features.
              </p>
            </div>
          </DialogContent>
        </Dialog>
        <Button 
          variant="outline" 
          size="lg" 
          className="border-2 border-white text-white bg-transparent hover:bg-white/10 text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Explore Models
        </Button>
      </motion.div>
    </motion.div>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
  </section>
);