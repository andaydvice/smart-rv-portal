import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield } from "lucide-react";

const SecuritySection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-8 h-8 text-[#60A5FA]" />
        <h2 className="text-[#60A5FA] text-3xl font-bold">Security</h2>
      </div>
      
      <div className="rounded-2xl border-2 border-gray-800 bg-[#0F172A] shadow-lg overflow-hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="security" className="border-0">
            <AccordionTrigger className="px-8 py-6 text-[#4ADE80] text-2xl font-bold hover:no-underline hover:text-[#4ADE80]/90">
              Security Overview
            </AccordionTrigger>
            <AccordionContent className="px-8 pb-8 text-gray-200 space-y-6 text-xl leading-relaxed">
              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Protecting Your RV's Digital Systems</h3>
              <p>
                Modern RVs include connected systems that require thoughtful security measures. Understanding basic security principles helps protect your privacy and equipment.
              </p>
              <p>
                Each connected device creates potential vulnerabilities, but simple precautions significantly reduce risks.
              </p>
              
              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Essential Security Layers</h3>
              <p>Physical security starts with basic door and window sensors, providing alerts when someone attempts unauthorized access.</p>
              <p>Digital protection requires secure passwords and proper network configuration to keep unwanted visitors out of your systems.</p>
              <p>Regular security updates patch vulnerabilities that could compromise your RV's connected systems.</p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Practical Security Steps</h3>
              <p>Start by changing default passwords on all devices, including your RV's control panel and WiFi network.</p>
              <p>Use unique passwords for different systems - if one gets compromised, others remain secure.</p>
              <p>Enable two factor authentication when available, adding an extra layer of protection beyond passwords.</p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Data Protection Basics</h3>
              <p>Your RV systems collect sensitive information about usage patterns and location - understanding what's stored helps protect your privacy.</p>
              <p>Local storage keeps your data under your control, while cloud backups provide recovery options if something goes wrong.</p>
              <p>Learn which systems transmit data externally so you can make informed decisions about connectivity.</p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Network Security Tips</h3>
              <p>Separate guest networks keep visitors from accessing critical RV systems while still providing internet access.</p>
              <p>VPNs protect your data when using public campground WiFi, but know when they're necessary versus overkill.</p>
              <p>Regular network security scans help identify potential vulnerabilities before they become problems.</p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Emergency Preparedness</h3>
              <p>Document emergency procedures for quick reference when systems act unexpectedly.</p>
              <p>Keep backup access methods available in case primary security systems fail.</p>
              <p>Test alert systems periodically to ensure they function when needed.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SecuritySection;