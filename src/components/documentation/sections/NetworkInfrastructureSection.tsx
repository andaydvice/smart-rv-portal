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
          <h3 className="text-lg font-semibold text-blue-200">System Architecture</h3>
          <p className="leading-relaxed">
            The network infrastructure utilizes a hybrid mesh topology with self-healing capabilities. Primary connectivity is provided through a dual-band WiFi system (2.4GHz + 5GHz) with MIMO technology, while a 4G LTE module serves as a backup connection. The system automatically switches between available networks based on signal strength and reliability metrics.
          </p>
          <p className="leading-relaxed">
            For internal communication, the system employs a dedicated control network separate from user traffic. This segregation ensures that critical system functions remain unaffected by high user data consumption.
          </p>
          <h3 className="text-lg font-semibold text-blue-200 mt-6">Security Implementation</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>WPA3-Enterprise encryption for wireless security</li>
            <li>Hardware-accelerated firewall with deep packet inspection</li>
            <li>VPN support with AES-256 encryption</li>
            <li>Network segmentation with VLAN support</li>
            <li>Intrusion detection and prevention system</li>
            <li>Automated security updates and patch management</li>
          </ul>
          <h3 className="text-lg font-semibold text-blue-200 mt-6">Performance Optimization</h3>
          <p className="leading-relaxed">
            The network stack implements advanced QoS mechanisms that prioritize traffic based on its criticality. Emergency communications and system control messages receive the highest priority, followed by security camera feeds and sensor data, with entertainment traffic managed at a lower priority level.
          </p>
          <p className="leading-relaxed">
            The system includes a local cache server that stores frequently accessed data and system updates, reducing external bandwidth requirements and ensuring critical information remains available even during network outages.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NetworkInfrastructureSection;