
import { motion } from "framer-motion";
// Button and Link imports are removed as they are no longer used.

export const ContactSection = () => (
  // MODIFIED: Changed py-16 back to py-32 to increase section height
  <section className="relative py-32 px-4 overflow-hidden"> 
    <div className="absolute inset-0">
      <img
        src="/lovable-uploads/1c1bb4c0-13a3-42f8-9b4d-f0aa74e2adb3.png"
        alt="Modern Smart RV exterior with tablet displaying website"
        className="w-full h-full object-cover"
        loading="eager" // Keep eager loading as it might be visible on initial load for some users
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90" />
    </div>
    <div className="relative max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8" // This class is now less relevant but kept for structure
      >
        {/* MODIFIED: All content (span, h2, p, and div with buttons) has been removed from here */}
      </motion.div>
    </div>
  </section>
);
