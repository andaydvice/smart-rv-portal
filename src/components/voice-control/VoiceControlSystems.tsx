import { Mic, Cloud, MessageSquare } from "lucide-react";

export const VoiceControlSystems = () => {
  return (
    <section className="py-16 bg-connectivity-bg">
      <h2 className="text-4xl font-bold text-white text-center my-12">Voice Control Systems</h2>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-connectivity-darkBg p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Mic className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">JayVoice</h3>
            </div>
            <div className="space-y-3 text-[#E2E8FF] text-sm">
              <p>JayVoice, integrated with the JAYCOMMAND system, offers advanced voice control for Jayco Smart RVs.</p>
              <p>Users activate it by saying "Jayco," causing the ceiling mounted voice receiver to light up.</p>
              <p>This centrally located receiver enables control throughout the entire RV, including living areas and bedrooms.</p>
              <p>RV owners can manage various functions like air conditioning, lighting, furnaces, and more using simple voice commands.</p>
              <p>For instance, "Jayco, main A/C" operates the air conditioning. The system recognizes predetermined commands, streamlining RV operation.</p>
              <p>JayVoice eliminates the need for manual adjustments or searching for control panels, allowing users to manage their RV environment hands free.</p>
              <p>This technology represents a significant advancement in RV automation, making the camping experience more comfortable and user friendly for Jayco Smart RV owners.</p>
            </div>
          </div>

          <div className="bg-connectivity-darkBg p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Power Pro</h3>
            </div>
            <div className="space-y-3 text-[#E2E8FF] text-sm">
              <p>Power Pro is a best in class digitally controlled voice recognition system designed to simplify and enhance the RVing experience.</p>
              <p>It offers complete control of RV functions through simple voice commands, a responsive mobile app, or a button based hardwired panel in the RV.</p>
              <p>The patent pending AI trained voice recognition system with natural language understanding ensures accurate command recognition, allowing users to control various aspects of their RV, including lighting, awnings, slides, and system monitoring.</p>
              <p>Power Pro works without the need for Wi-Fi connectivity, as its functionality is fully embedded in the system, providing reliable control and customisation options to enhance comfort, efficiency, and safety during RV operation</p>
            </div>
          </div>

          <div className="bg-connectivity-darkBg p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Smart Assistant</h3>
            </div>
            <div className="space-y-3 text-[#E2E8FF] text-sm">
              <p>Smart Assistant integrates traditional voice assistant technology into RVs, enabling users to control various aspects of their vehicle and access information through simple voice commands.</p>
              <p>This system leverages natural language processing to understand and respond to user queries effectively.</p>
              <p>Users can manage climate control, lighting, entertainment systems, and even access travel information or local points of interest.</p>
              <p>The assistant can also provide weather updates, set reminders, and answer general questions, enhancing the overall RV experience.</p>
              <p>Unlike some proprietary systems, Smart Assistant often works with popular voice assistants like Amazon Alexa or Google Assistant, allowing for a familiar user experience and broader compatibility with smart devices.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
