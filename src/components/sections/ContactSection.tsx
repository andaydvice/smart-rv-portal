import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const ContactSection = () => (
  <section className="relative py-32 px-4 overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="/lovable-uploads/b6a46bec-1ca8-4f7b-89fa-37bb5415d9fa.png"
        alt="Scenic mountain landscape"
        className="w-full h-full object-cover object-center bg-no-repeat will-change-transform"
        loading="eager"
        style={{
          imageRendering: '-webkit-optimize-contrast',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90 backdrop-blur-[2px]" />
    </div>
    <div className="relative max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20">
          Get Started
        </span>
        <h2 className="text-5xl font-bold mb-6 text-white">Ready to Transform Your Journey?</h2>
        <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
          Connect with our team to learn more about Smart RV technology and begin your luxury travel experience
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            size="lg"
            className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Contact Sales
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white bg-transparent hover:bg-white/10 text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            View Brochure
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);