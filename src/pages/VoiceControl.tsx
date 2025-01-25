import { Mic, Cloud, MessageSquare, Shield, Home, Cpu, Smartphone, Sun, Home as HomeIcon } from "lucide-react";

const VoiceControl = () => {
  console.log("VoiceControl component rendering");
  
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="relative w-full">
        <section className="h-screen w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <img 
              src="/lovable-uploads/ff43ed8a-b7cd-42f7-a45e-a3a706d39d07.png"
              alt="Futuristic RV interior with smart display and mountain view"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
                Voice Control for Smart RVs
              </h1>
              <p className="text-xl text-white/90 mb-12 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
                Experience RV living's future: Voice control technology for hands-free system operation
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                <Mic className="w-6 h-6" />
                Start Voice Control
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A1F2E33]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mic className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">The Power of Speech is Here Today</h3>
                </div>
                <p className="text-white/90">
                  Your Smart RV now responds to simple voice commands. Simply speak to control everything from temperature to lighting and entertainment.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Cpu className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">Advanced Technology from Leaders</h3>
                </div>
                <p className="text-white/90">
                  Just say "Jayco" or "Hey Power Pro" and your RV responds instantly. Works with Alexa and Google too.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">Safe, Simple, Smart Control</h3>
                </div>
                <p className="text-white/90">
                  Adjust your AC while keeping your hands on the wheel. Set up camp with a single command.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Home className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">Experience Today's Smart RV Technology</h3>
                </div>
                <p className="text-white/90">
                  Voice control is already transforming thousands of RVs across America, bringing the future of camping to life in luxury fifth wheels, travel trailers, and motorhomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A1F2E33]">
          <h2 className="text-4xl font-bold text-white text-center my-12">Voice Control Systems</h2>
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[rgba(26,31,46,0.95)] p-8 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Mic className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">JayVoice</h3>
                </div>
                <div className="space-y-4 text-white/90">
                  <p>JayVoice, integrated with the JAYCOMMAND system, offers advanced voice control for Jayco Smart RVs.</p>
                  <p>Users activate it by saying "Jayco," causing the ceiling mounted voice receiver to light up.</p>
                  <p>This centrally located receiver enables control throughout the entire RV, including living areas and bedrooms.</p>
                  <p>RV owners can manage various functions like air conditioning, lighting, furnaces, and more using simple voice commands.</p>
                  <p>For instance, "Jayco, main A/C" operates the air conditioning. The system recognizes predetermined commands, streamlining RV operation and enhancing user convenience.</p>
                  <p>JayVoice eliminates the need for manual adjustments or searching for control panels, allowing users to manage their RV environment hands free.</p>
                  <p>This technology represents a significant advancement in RV automation, making the camping experience more comfortable and user friendly for Jayco Smart RV owners.</p>
                </div>
              </div>

              <div className="bg-[rgba(26,31,46,0.95)] p-8 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Cloud className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">Power Pro</h3>
                </div>
                <div className="space-y-4 text-white/90">
                  <p>Power Pro is a best in class digitally controlled voice recognition system designed to simplify and enhance the RVing experience.</p>
                  <p>It offers complete control of RV functions through simple voice commands, a responsive mobile app, or a button based hardwired panel in the RV.</p>
                  <p>The patent pending AI trained voice recognition system with natural language understanding ensures accurate command recognition, allowing users to control various aspects of their RV, including lighting, awnings, slides, and system monitoring.</p>
                  <p>Power Pro works without the need for Wi-Fi connectivity, as its functionality is fully embedded in the system, providing reliable control and customisation options to enhance comfort, efficiency, and safety during RV operation</p>
                </div>
              </div>

              <div className="bg-[rgba(26,31,46,0.95)] p-8 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">Smart Assistant</h3>
                </div>
                <div className="space-y-4 text-white/90">
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

        <div className="w-full max-w-6xl mx-auto px-4 py-16 bg-[#1A1F2E33]">
          <img 
            src="/lovable-uploads/ab7d2423-0ab6-4868-83b1-c84f220e5736.png"
            alt="Smart RV voice control system visualization showing various connected features"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <section className="py-20 bg-[#0B1121]">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">Benefits of Voice Control</h2>
          
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
              <div className="text-[#3B82F6] mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 3H9V21H15V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 9H15V15H21V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H3V15H9V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Convenience & Hands-Free Control</h3>
              <p className="text-gray-400">Control your RV systems without lifting a finger</p>
            </div>

            <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
              <Shield className="text-[#3B82F6] mb-6 w-8 h-8" />
              <h3 className="text-2xl font-semibold mb-4">Enhanced Safety</h3>
              <p className="text-gray-400">Keep your focus on driving and surroundings</p>
            </div>

            <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
              <MessageSquare className="text-[#3B82F6] mb-6 w-8 h-8" />
              <h3 className="text-2xl font-semibold mb-4">Personalization</h3>
              <p className="text-gray-400">Customize commands to your preferences</p>
            </div>

            <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
              <Smartphone className="text-[#3B82F6] mb-6 w-8 h-8" />
              <h3 className="text-2xl font-semibold mb-4">Smart Device Integration</h3>
              <p className="text-gray-400">Seamless connection with your devices</p>
            </div>

            <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
              <Sun className="text-[#3B82F6] mb-6 w-8 h-8" />
              <h3 className="text-2xl font-semibold mb-4">Efficiency</h3>
              <p className="text-gray-400">Streamline your RV management</p>
            </div>

            <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
              <HomeIcon className="text-[#3B82F6] mb-6 w-8 h-8" />
              <h3 className="text-2xl font-semibold mb-4">Accessibility</h3>
              <p className="text-gray-400">Make RV control easier for everyone</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A1F2E33]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mic className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">The Power of Speech is Here Today</h3>
                </div>
                <p className="text-white/90">
                  Your Smart RV now responds to simple voice commands. Simply speak to control everything from temperature to lighting and entertainment.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Cpu className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">Advanced Technology from Leaders</h3>
                </div>
                <p className="text-white/90">
                  Just say "Jayco" or "Hey Power Pro" and your RV responds instantly. Works with Alexa and Google too.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">Safe, Simple, Smart Control</h3>
                </div>
                <p className="text-white/90">
                  Adjust your AC while keeping your hands on the wheel. Set up camp with a single command.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Home className="w-8 h-8 text-[#5B9BD5]" />
                  <h3 className="text-2xl font-bold text-[#5B9BD5]">Experience Today's Smart RV Technology</h3>
                </div>
                <p className="text-white/90">
                  Voice control is already transforming thousands of RVs across America, bringing the future of camping to life in luxury fifth wheels, travel trailers, and motorhomes.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-[#5B9BD5] mb-4">Ready to Upgrade?</h3>
            <p className="text-white/90 mb-6">Discover what voice control can do for your RV adventures.</p>
            <button className="px-8 py-3 bg-[#5B9BD5] hover:bg-[#4A8AC4] rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VoiceControl;
