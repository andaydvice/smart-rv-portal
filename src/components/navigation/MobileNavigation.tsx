import { SmartFeaturesLinks, CoreSystemsLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks } from "../NavbarLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

interface MobileNavigationProps {
  isOpen: boolean;
}

const MobileNavigation = ({ isOpen }: MobileNavigationProps) => {
  console.log("Mobile navigation isOpen:", isOpen);
  
  return (
    <div 
      className={`${isOpen ? 'block' : 'hidden'} md:hidden fixed inset-x-0 top-16 bottom-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 overflow-y-auto`}
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="technology" className="border-b-0">
            <AccordionTrigger className="text-gray-300 hover:text-blue-400 py-2 text-base">
              Technology
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 pb-3">
                <SmartFeaturesLinks />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rv-systems" className="border-b-0">
            <AccordionTrigger className="text-gray-300 hover:text-blue-400 py-2 text-base">
              RV Systems
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 pb-3">
                <CoreSystemsLinks />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="models" className="border-b-0">
            <AccordionTrigger className="text-gray-300 hover:text-blue-400 py-2 text-base">
              Models
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 pb-3">
                <VehicleSelectionLinks />
              </div>
            </AccordionContent>
          </AccordionItem>

          <div className="py-2">
            <Link to="/calculators" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 px-4 py-2 text-base">
              <Calculator className="h-4 w-4" />
              RV Tools
            </Link>
          </div>

          <AccordionItem value="support" className="border-b-0">
            <AccordionTrigger className="text-gray-300 hover:text-blue-400 py-2 text-base">
              Support
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 pb-3 grid gap-6">
                <SupportLinks />
                <CustomerSupportLinks />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default MobileNavigation;