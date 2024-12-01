import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PowerManagementSection = () => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value="power-management" className="border-gray-700">
        <AccordionTrigger className="text-xl text-blue-300">Power That Puts You in Control</AccordionTrigger>
        <AccordionContent className="text-gray-100 space-y-4">
          <h3 className="text-lg font-semibold text-blue-200">Intelligent Multi-Source Integration</h3>
          <p className="leading-relaxed">
            Take command of your energy future with cutting-edge power management that seamlessly blends multiple power sources to deliver unmatched reliability.
          </p>
          <p className="leading-relaxed">
            Intelligent algorithms constantly analyze your power usage patterns, automatically optimizing distribution between shore power, solar input, and battery reserves.
          </p>

          <h3 className="text-lg font-semibold text-blue-200 mt-6">Advanced Power Protection</h3>
          <p className="leading-relaxed">
            Sophisticated power conditioning shields your valuable electronics from harmful surges while maintaining steady, clean power delivery.
          </p>
          <p className="leading-relaxed">
            Advanced load management ensures your critical systems never go dark, automatically prioritizing essential operations during high demand.
          </p>

          <h3 className="text-lg font-semibold text-blue-200 mt-6">Premium Battery Technology</h3>
          <p className="leading-relaxed">
            Premium lithium iron phosphate batteries form the backbone of your energy storage, offering superior longevity and safety compared to traditional solutions.
          </p>
          <p className="leading-relaxed">
            Smart charging technology maintains peak battery performance through precision temperature monitoring and adaptive charging profiles.
          </p>

          <h3 className="text-lg font-semibold text-blue-200 mt-6">Predictive Maintenance & Monitoring</h3>
          <p className="leading-relaxed">
            Continuous health monitoring predicts potential issues before they impact your power availability, while automated maintenance cycles maximize battery lifespan.
          </p>
          <p className="leading-relaxed">
            Dedicated emergency power reserves stand ready to support your essential operations when you need them most.
          </p>

          <h3 className="text-lg font-semibold text-blue-200 mt-6">Solar Optimization & Forecasting</h3>
          <p className="leading-relaxed">
            State-of-the-art solar controllers squeeze maximum efficiency from your panels regardless of weather conditions, while sophisticated monitoring catches performance issues early.
          </p>
          <p className="leading-relaxed">
            Intelligent weather forecasting combines with historical data to optimize your power strategy, automatically adjusting consumption based on predicted solar availability.
          </p>

          <h3 className="text-lg font-semibold text-blue-200 mt-6">Complete Power Control</h3>
          <p className="leading-relaxed">
            This complete power solution delivers the independence and reliability modern users demand, while remaining remarkably simple to manage.
          </p>
          <p className="leading-relaxed">
            Real-time insights put total control at your fingertips, ensuring you're never in the dark about your power status.
          </p>
          <p className="leading-relaxed">
            Your energy future starts here – with a system that's as intelligent as it is dependable.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PowerManagementSection;