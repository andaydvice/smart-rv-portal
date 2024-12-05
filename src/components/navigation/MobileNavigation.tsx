import { SmartFeaturesLinks, CoreSystemsLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks } from "../NavbarLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface MobileNavigationProps {
  isOpen: boolean;
}

const MobileNavigation = ({ isOpen }: MobileNavigationProps) => {
  return (
    <div className={`md:hidden bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="px-2 pt-2 pb-3 max-h-[80vh] overflow-y-auto">
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