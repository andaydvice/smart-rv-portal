import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Troubleshooting = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        <img 
          src="/lovable-uploads/69d5ac06-d442-462c-8114-0761265710bd.png" 
          alt="Smart RV Troubleshooting Guide"
          className="w-full h-[60vh] object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Smart RV Troubleshooting Guide
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Quick solutions to common issues for your Smart RV experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="power">
              <AccordionTrigger className="text-lg font-semibold">
                Power System Issues
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4">
                <p>Common power system troubleshooting steps:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Check battery charge levels in the Smart RV app</li>
                  <li>Verify shore power connection is secure</li>
                  <li>Inspect solar panel connections if equipped</li>
                  <li>Reset power management system through main control panel</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="connectivity">
              <AccordionTrigger className="text-lg font-semibold">
                Internet Connectivity Problems
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4">
                <p>If experiencing connectivity issues:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Check signal strength in your current location</li>
                  <li>Restart the onboard Wi-Fi router</li>
                  <li>Verify data plan status</li>
                  <li>Update router firmware if available</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="climate">
              <AccordionTrigger className="text-lg font-semibold">
                Climate Control System
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4">
                <p>For temperature control issues:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Clean or replace air filters</li>
                  <li>Check zone settings in climate control app</li>
                  <li>Verify temperature sensors are unobstructed</li>
                  <li>Ensure all vents are open and unblocked</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="appliances">
              <AccordionTrigger className="text-lg font-semibold">
                Smart Appliance Troubleshooting
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4">
                <p>For appliance-related issues:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Verify appliance is connected to RV network</li>
                  <li>Check for software updates</li>
                  <li>Reset appliance through smart home interface</li>
                  <li>Ensure proper power supply to appliance</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Still having issues? Our support team is here to help.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Contact Support
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Troubleshooting;