import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, ChevronDown } from "lucide-react";

const SecuritySection = () => {
  return (
    <AccordionItem value="security" className="border-0">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20">
          <Shield className="w-4 h-4 text-blue-400" />
        </div>
        <h2 className="text-blue-400 text-lg font-medium">Security</h2>
      </div>
      
      <AccordionTrigger className="hover:no-underline group w-full">
        <div className="rounded-lg border border-gray-700 bg-gray-800/50 overflow-hidden w-full flex justify-between items-center">
          <div className="px-6 py-4 text-emerald-400 text-base font-medium">
            Security Overview
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-emerald-400 transition-transform duration-200 mr-4 group-data-[state=open]:rotate-180" />
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 text-gray-300 space-y-4 text-sm leading-relaxed">
        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Protecting Your RV's Digital Systems</h3>
        <p>
          Modern RVs include connected systems that require thoughtful security measures. Understanding basic security principles helps protect your privacy and equipment.
        </p>
        <p>
          Each connected device creates potential vulnerabilities, but simple precautions significantly reduce risks.
        </p>
        
        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Essential Security Layers</h3>
        <p>Physical security starts with basic door and window sensors, providing alerts when someone attempts unauthorized access.</p>
        <p>Digital protection requires secure passwords and proper network configuration to keep unwanted visitors out of your systems.</p>
        <p>Regular security updates patch vulnerabilities that could compromise your RV's connected systems.</p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Practical Security Steps</h3>
        <p>Start by changing default passwords on all devices, including your RV's control panel and WiFi network.</p>
        <p>Use unique passwords for different systems - if one gets compromised, others remain secure.</p>
        <p>Enable two factor authentication when available, adding an extra layer of protection beyond passwords.</p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Data Protection Basics</h3>
        <p>Your RV systems collect sensitive information about usage patterns and location - understanding what's stored helps protect your privacy.</p>
        <p>Local storage keeps your data under your control, while cloud backups provide recovery options if something goes wrong.</p>
        <p>Learn which systems transmit data externally so you can make informed decisions about connectivity.</p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Network Security Tips</h3>
        <p>Separate guest networks keep visitors from accessing critical RV systems while still providing internet access.</p>
        <p>VPNs protect your data when using public campground WiFi, but know when they're necessary versus overkill.</p>
        <p>Regular network security scans help identify potential vulnerabilities before they become problems.</p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Emergency Preparedness</h3>
        <p>Document emergency procedures for quick reference when systems act unexpectedly.</p>
        <p>Keep backup access methods available in case primary security systems fail.</p>
        <p>Test alert systems periodically to ensure they function when needed.</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SecuritySection;
