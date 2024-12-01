import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TechnicalTab = () => {
  return (
    <Card className="bg-gray-800/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-blue-400 text-2xl">Technical Specifications</CardTitle>
        <CardDescription className="text-blue-100 font-medium text-lg">Detailed system specifications and requirements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-100">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white mb-4">Hardware Requirements</h3>
          <p className="text-lg leading-relaxed mb-6">
            The Dual-core ARM processor powers our system with exceptional performance and energy efficiency. This advanced processor ensures smooth operation of all onboard systems while maintaining optimal power consumption.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            With 4GB RAM minimum, the system provides ample memory for multitasking and running complex operations simultaneously. This generous memory allocation ensures responsive performance even under heavy loads.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            The 64GB SSD storage offers quick access to system files and plenty of space for your personal data. This solid-state solution provides reliability and speed while withstanding the rigors of mobile use.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Dual-band WiFi with 4G LTE support ensures you stay connected wherever your journey takes you. This comprehensive connectivity solution adapts to available networks automatically.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white mb-4">Software Stack</h3>
          <p className="text-lg leading-relaxed mb-6">
            Our Custom Linux distribution has been specifically engineered for RV operations, providing a stable and secure foundation for all system functions. This specialized operating system optimizes performance while minimizing resource usage.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Real-time threat monitoring actively protects your system from security risks, ensuring your data and privacy remain secure. This comprehensive security solution adapts to new threats as they emerge.
          </p>
          <p className="text-lg leading-relaxed">
            Over-the-air (OTA) update capability keeps your system current with the latest features and security patches. Updates are delivered seamlessly without interrupting your RV experience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalTab;