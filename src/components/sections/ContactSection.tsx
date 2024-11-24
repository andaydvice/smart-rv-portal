import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const ContactSection = () => (
  <section className="relative py-24 px-4 bg-primary text-white overflow-hidden">
    <div className="absolute inset-0 bg-[url('/lovable-uploads/b6a46bec-1ca8-4f7b-89fa-37bb5415d9fa.png')] opacity-10 bg-cover bg-center" />
    <div className="relative max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full">
          Get Started
        </span>
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Journey?</h2>
        <p className="text-lg mb-8 opacity-80">
          Connect with our team to learn more about Smart RV technology
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="default" size="lg" className="bg-white text-primary hover:bg-white/90">
            Contact Sales
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            View Brochure
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);