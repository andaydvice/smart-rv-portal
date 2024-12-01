import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NetworkInfrastructureSection = () => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value="network-infrastructure" className="border-gray-700">
        <AccordionTrigger className="text-xl text-blue-300">RV Network Troubleshooting Guide</AccordionTrigger>
        <AccordionContent className="text-gray-100 space-y-4">
          <p className="leading-relaxed">
            Having internet problems in your RV? Let us explore common networking challenges and practical solutions.
            Many RVers struggle with weak signals, dropped connections, and confusing network setups.
          </p>

          <h3 className="text-2xl font-semibold text-blue-200 mb-6">Common RV Network Issues</h3>
          
          <p className="leading-relaxed">
            Dead zones in your RV often occur due to metal construction and compact layouts blocking wireless signals.
          </p>

          <p className="leading-relaxed">
            Campground WiFi frequently disappoints because multiple RVs share limited bandwidth through aging equipment.
          </p>

          <p className="leading-relaxed">
            Cellular boosters do not always perform as expected because location, terrain, and weather affect signal strength.
          </p>

          <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">How RV Networks Work</h3>

          <p className="leading-relaxed">
            Understanding your RV network infrastructure helps diagnose problems faster and make smarter upgrade decisions.
          </p>

          <p className="leading-relaxed">
            Typical RV setups combine multiple technologies: WiFi for local connections, cellular for backup, and sometimes satellite for remote locations.
          </p>

          <p className="leading-relaxed">
            Network repeaters and mesh systems help distribute signals throughout your RV, but proper placement is crucial.
          </p>

          <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">DIY Network Improvements</h3>

          <p className="leading-relaxed">
            Testing signal strength in different RV locations helps identify problem areas before making equipment changes.
          </p>

          <p className="leading-relaxed">
            Simple adjustments like router placement and antenna positioning often solve issues without expensive upgrades.
          </p>

          <p className="leading-relaxed">
            Cable routing through RV walls requires careful planning to avoid damage while improving coverage.
          </p>

          <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">Understanding Network Security</h3>

          <p className="leading-relaxed">
            Public campground networks pose security risks for banking, work, and personal data.
          </p>

          <p className="leading-relaxed">
            Basic network security measures protect your devices without making connections complicated.
          </p>

          <p className="leading-relaxed">
            VPNs add security but can slow connections. Learn when they are worth using.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NetworkInfrastructureSection;