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
        <AccordionTrigger className="text-xl text-blue-300">Network Infrastructure</AccordionTrigger>
        <AccordionContent className="text-gray-100 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-200 mb-6">Network Infrastructure That Never Lets You Down</h3>
          
          <p className="leading-relaxed">
            A revolutionary networking solution adapts to your needs with intelligent self-healing mesh technology that maximizes uptime and performance.
          </p>

          <p className="leading-relaxed">
            Dual-band WiFi with cutting-edge MIMO technology delivers blazing-fast speeds across both 2.4GHz and 5GHz frequencies, while seamless 4G LTE backup ensures you're always connected.
          </p>

          <p className="leading-relaxed">
            The system constantly monitors signal strength and network metrics, automatically selecting the optimal connection path for uninterrupted service.
          </p>

          <p className="leading-relaxed">
            Your critical operations stay protected through a dedicated control network that keeps system functions separate from regular traffic.
          </p>

          <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">Security Features</h3>

          <p className="leading-relaxed">
            Enterprise-grade WPA3 encryption and hardware-accelerated firewalls stand guard over your digital assets, while deep packet inspection spots threats before they can impact your network.
          </p>

          <p className="leading-relaxed">
            Built-in VPN support with military-grade AES-256 encryption lets you work securely from anywhere.
          </p>

          <p className="leading-relaxed">
            Smart network segmentation through VLAN technology keeps sensitive data isolated and secure.
          </p>

          <p className="leading-relaxed">
            Advanced intrusion detection works 24/7 to identify and block potential attacks before they can compromise your system.
          </p>

          <p className="leading-relaxed">
            Automated security updates and patch management mean your defenses stay current without manual intervention.
          </p>

          <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">Traffic Management</h3>

          <p className="leading-relaxed">
            Intelligent traffic prioritization ensures emergency communications and critical system messages always get through first.
          </p>

          <p className="leading-relaxed">
            Security cameras and sensor data receive priority bandwidth allocation, while entertainment traffic flows smoothly at a managed level.
          </p>

          <p className="leading-relaxed">
            A local cache server keeps your most important data and updates readily available, reducing external bandwidth needs and maintaining access even during network outages.
          </p>

          <p className="leading-relaxed mt-6">
            This advanced infrastructure delivers the reliability and security modern businesses demand, while remaining simple enough for anyone to manage.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NetworkInfrastructureSection;