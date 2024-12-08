import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PowerTab = () => {
  return (
    <Card className="bg-gray-800/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-[1.75rem] font-medium text-gray-200">Smart RV Power Management</CardTitle>
        <CardDescription className="text-sm text-gray-300">Power system specifications and optimization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="sources" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-gray-200">Understanding Your Power Sources</AccordionTrigger>
            <AccordionContent className="text-sm space-y-4 text-gray-300">
              <p>Your Smart RV intelligently manages power from four sources to keep you comfortable on the road.</p>
              <p>The solar panels on your roof automatically generate electricity whenever daylight hits them, even on cloudy days.</p>
              <p>Your house batteries store this power so you can run appliances when boondocking or overnight.</p>
              <p>Shore power gives you unlimited electricity when plugged into a campground pedestal.</p>
              <p>Your generator serves as backup power, automatically starting when needed if you enable this feature.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="system" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-[#60A5FA]">How Your Smart Power System Works</AccordionTrigger>
            <AccordionContent className="text-sm space-y-4">
              <p>The system constantly monitors how much power each appliance uses and shows this on your dashboard in simple terms – like "Coffee Maker: 900 watts for 5 minutes."</p>
              <p>When multiple appliances run at once, the system prevents blown fuses by managing which ones can operate together.</p>
              <p>You'll receive clear notifications like "AC and Microwave cannot run together on 30-amp service" to prevent power issues.</p>
              <p>The battery monitor shows your power level just like a fuel gauge, making it easy to know when to recharge.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="troubleshooting" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-[#60A5FA]">When Things Aren't Working Right</AccordionTrigger>
            <AccordionContent className="text-sm space-y-4">
              <p>If your batteries aren't charging from solar: First check if your panels are dirty – even light dust can reduce power by 30%.</p>
              <p>If you plug into shore power but have no electricity: Verify your power cord is fully inserted and locked at both ends.</p>
              <p>When your generator won't start automatically: Check that both the fuel tank is at least quarter full and the generator switch shows "Auto."</p>
              <p>For unexpectedly high power usage: Look for plugged-in devices you rarely use – even small items like phone chargers consume power continuously.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="important" className="border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-[#60A5FA]">Important Things to Know</AccordionTrigger>
            <AccordionContent className="text-sm space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-200 mb-3">
                  <span>Power Usage: 2.7 kWh/day</span>
                </div>
                <p>Your residential RV refrigerator uses about 2.7 kilowatt-hours per day – the biggest power consumer in most RVs.</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-200 mb-3">
                  <span>AC Power Draw: 1,500W</span>
                </div>
                <p>The air conditioner draws 1,500 watts while running, which is why you get about 3 hours of runtime on battery power.</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-200 mb-3">
                  <span>Charging Time: 2-4 hours</span>
                </div>
                <p>Charging batteries from shore power takes about 4 hours for a full charge from 20%, but only 2 hours from 50%.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default PowerTab;