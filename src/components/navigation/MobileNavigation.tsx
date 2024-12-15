import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import { SmartFeaturesLinks, CoreSystemsLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks } from "../NavbarLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface MobileNavigationProps {
  isOpen: boolean;
}

const MenuItem = ({ title, children, value }: { title: string; children: React.ReactNode; value: string }) => (
  <AccordionItem value={value} className="border-b-0">
    <AccordionTrigger className="text-gray-300 hover:text-blue-400 py-2 text-base">
      {title}
    </AccordionTrigger>
    <AccordionContent>
      <div className="pt-2 pb-3">
        {children}
      </div>
    </AccordionContent>
  </AccordionItem>
);

const MobileNavigation = ({ isOpen }: MobileNavigationProps) => {
  console.log("MobileNavigation rendered, isOpen:", isOpen);
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden">
      <div className="fixed inset-0 top-16 z-[105] bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 overflow-y-auto">
        <div className="px-4 py-6 space-y-4">
          <Accordion type="single" collapsible className="space-y-2">
            <MenuItem value="technology" title="Technology">
              <SmartFeaturesLinks />
            </MenuItem>

            <MenuItem value="rv-systems" title="RV Systems">
              <CoreSystemsLinks />
            </MenuItem>

            <MenuItem value="models" title="Models">
              <VehicleSelectionLinks />
            </MenuItem>

            <div className="py-2">
              <Link to="/calculators" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 px-4 py-2 text-base">
                <Calculator className="h-4 w-4" />
                RV Tools
              </Link>
            </div>

            <MenuItem value="support" title="Support">
              <div className="grid gap-6">
                <SupportLinks />
                <CustomerSupportLinks />
              </div>
            </MenuItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;