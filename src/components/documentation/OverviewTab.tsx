import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OverviewTab = () => {
  return (
    <Card className="bg-gray-800/90 border-gray-700">
      <CardHeader className="space-y-4">
        <CardTitle className="text-blue-400 text-3xl">System Architecture</CardTitle>
        <CardDescription className="text-blue-100 font-medium text-xl">Understanding the Smart RV's core systems</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 text-gray-100">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white mb-4">Core Components</h3>
          <p className="text-lg leading-relaxed mb-6">
            At the heart of our Smart RV lies the Central Control Unit (CCU), a sophisticated system that orchestrates all onboard operations with precision and reliability. This advanced component serves as the brain of your vehicle, ensuring seamless integration of all smart features.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            The Power Management System represents the next evolution in RV energy control, delivering optimal power distribution while maximizing efficiency. It continuously monitors and adjusts power flow to ensure all systems receive exactly what they need, when they need it.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Our Network Infrastructure provides enterprise-grade connectivity throughout your RV, ensuring reliable communication between all smart systems. This robust framework supports both internal system operations and external connectivity needs.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white mb-4">Integration Points</h3>
          <p className="text-lg leading-relaxed mb-6">
            The Mobile App Connectivity feature transforms your smartphone into a powerful remote control center, offering comprehensive system management from anywhere in the world. Through our intuitive interface, you can monitor and control every aspect of your RV's operation.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Our Cloud Services integration provides real-time data synchronization and backup, ensuring your settings and preferences are always secure and accessible. This service also enables advanced features like predictive maintenance and usage analytics.
          </p>
          <p className="text-lg leading-relaxed">
            Third-party Device Support extends the capabilities of your Smart RV through seamless integration with popular smart home devices and services. This open ecosystem approach ensures your RV can evolve with your needs and preferences.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;