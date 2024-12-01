import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SecuritySection = () => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value="security" className="border-gray-700">
        <AccordionTrigger className="text-xl text-blue-300">Security Features</AccordionTrigger>
        <AccordionContent className="text-gray-100 space-y-4">
          <h3 className="text-lg font-semibold text-blue-200">Overview</h3>
          <p className="leading-relaxed">
            The Smart RV security system employs multiple layers of protection to ensure the safety of both the vehicle and its occupants. From advanced encryption protocols to physical security measures, every aspect has been carefully designed and implemented.
          </p>
          
          <h3 className="text-lg font-semibold text-blue-200 mt-6">Key Security Features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Multi-factor authentication for system access</li>
            <li>End-to-end encryption for all data transmission</li>
            <li>Real-time threat detection and monitoring</li>
            <li>Automated security updates and patches</li>
            <li>Physical security sensors and alarms</li>
            <li>Secure remote access protocols</li>
          </ul>

          <h3 className="text-lg font-semibold text-blue-200 mt-6">Data Protection</h3>
          <p className="leading-relaxed">
            All user data is encrypted at rest and in transit using industry-standard protocols. Regular security audits and penetration testing ensure the system remains resilient against emerging threats. The system includes automated backup features with secure cloud storage integration.
          </p>

          <h3 className="text-lg font-semibold text-blue-200 mt-6">Emergency Response</h3>
          <p className="leading-relaxed">
            In case of security breaches or suspicious activities, the system can automatically alert authorities and the vehicle owner through multiple communication channels. Emergency protocols can be activated remotely to secure the vehicle and its contents.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SecuritySection;