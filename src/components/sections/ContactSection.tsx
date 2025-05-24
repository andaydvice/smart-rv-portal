
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const ContactSection = () => (
  // MODIFIED: Added min-h-[70vh] and flex utilities for better image display and content centering
  <section className="relative py-32 px-4 overflow-hidden min-h-[70vh] flex flex-col justify-center"> 
    <div className="absolute inset-0">
      <img
        src="/lovable-uploads/1c1bb4c0-13a3-42f8-9b4d-f0aa74e2adb3.png"
        alt="Modern Smart RV exterior with tablet displaying website"
        className="w-full h-full object-cover" // object-cover will fill the space, cropping if necessary
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90" />
    </div>
    <div className="relative max-w-4xl mx-auto text-center w-full"> {/* Added w-full here for safety with flex parent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl image-overlay-headline">
          Get in Touch
        </h2>
        <p className="text-lg leading-8 text-secondary-foreground sm:text-xl">
          Have questions or ready to upgrade your RV experience? Contact us today! We're here to help you navigate the world of smart RV technology.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {/* MODIFIED: Using default button variant for correct branded hover state */}
          <Button 
            size="lg" 
            variant="default" // This variant handles branded colors including hover
            onClick={() => console.log('Contact Us button clicked')}
          >
            Contact Us
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

