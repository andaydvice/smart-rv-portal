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
        <Shield className="w-6 h-6 text-[#60A5FA]" />
        <h2 className="text-[#60A5FA] text-2xl font-semibold">Security</h2>
      </div>
      
      <div className="rounded-2xl border border-gray-800/50 bg-[#0F172A]/50 overflow-hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="security" className="border-0">
            <AccordionTrigger className="px-6 py-4 text-[#4ADE80] text-xl hover:no-underline hover:text-[#4ADE80]/90">
              Security Overview
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-gray-300 space-y-4 text-lg">
              <h3 className="text-lg font-semibold text-blue-200">Protecting Your RV's Digital Systems</h3>
              <p className="leading-relaxed">
                Modern RVs include connected systems that require thoughtful security measures. Understanding basic security principles helps protect your privacy and equipment.
              </p>
              <p className="leading-relaxed">
                Each connected device creates potential vulnerabilities, but simple precautions significantly reduce risks.
              </p>
              
              <h3 className="text-lg font-semibold text-blue-200 mt-6">Essential Security Layers</h3>
              <div className="space-y-2">
                <p>Physical security starts with basic door and window sensors, providing alerts when someone attempts unauthorized access.</p>
                <p>Digital protection requires secure passwords and proper network configuration to keep unwanted visitors out of your systems.</p>
                <p>Regular security updates patch vulnerabilities that could compromise your RV's connected systems.</p>
              </div>

              <h3 className="text-lg font-semibold text-blue-200 mt-6">Practical Security Steps</h3>
              <div className="space-y-2">
                <p>Start by changing default passwords on all devices, including your RV's control panel and WiFi network.</p>
                <p>Use unique passwords for different systems - if one gets compromised, others remain secure.</p>
                <p>Enable two factor authentication when available, adding an extra layer of protection beyond passwords.</p>
              </div>

              <h3 className="text-lg font-semibold text-blue-200 mt-6">Data Protection Basics</h3>
              <div className="space-y-2">
                <p>Your RV systems collect sensitive information about usage patterns and location - understanding what's stored helps protect your privacy.</p>
                <p>Local storage keeps your data under your control, while cloud backups provide recovery options if something goes wrong.</p>
                <p>Learn which systems transmit data externally so you can make informed decisions about connectivity.</p>
              </div>

              <h3 className="text-lg font-semibold text-blue-200 mt-6">Network Security Tips</h3>
              <div className="space-y-2">
                <p>Separate guest networks keep visitors from accessing critical RV systems while still providing internet access.</p>
                <p>VPNs protect your data when using public campground WiFi, but know when they're necessary versus overkill.</p>
                <p>Regular network security scans help identify potential vulnerabilities before they become problems.</p>
              </div>

              <h3 className="text-lg font-semibold text-blue-200 mt-6">Emergency Preparedness</h3>
              <div className="space-y-2">
                <p>Document emergency procedures for quick reference when systems act unexpectedly.</p>
                <p>Keep backup access methods available in case primary security systems fail.</p>
                <p>Test alert systems periodically to ensure they function when needed.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SecuritySection;
