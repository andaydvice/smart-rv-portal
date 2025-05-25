
import { Shield, Home, Cpu, Smartphone, Sun, Home as HomeIcon } from "lucide-react";

export const BenefitsGrid = () => {
  return (
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
          <h3 className="text-2xl font-semibold mb-4 text-white">Convenience & Hands Free Control</h3>
          <div className="text-gray-400 text-left space-y-2">
            <p>Control your RV systems without lifting a finger.</p>
            <p>Adjust lighting, temperature, or entertainment systems effortlessly while cooking, relaxing, or preparing for departure.</p>
            <p>This means less time fumbling with switches and more time enjoying your journey.</p>
          </div>
        </div>

        <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
          <Shield className="text-[#3B82F6] mb-6 w-8 h-8" />
          <h3 className="text-2xl font-semibold mb-4 text-white">Enhanced Safety</h3>
          <div className="text-gray-400 text-left space-y-2">
            <p>Keep your focus on driving and surroundings.</p>
            <p>Make critical adjustments, like turning on hazard lights or checking system statuses, without taking your hands off the wheel or your eyes off the road.</p>
            <p>This significantly reduces distractions, contributing to a safer travel experience for everyone onboard.</p>
          </div>
        </div>

        <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
          <Cpu className="text-[#3B82F6] mb-6 w-8 h-8" />
          <h3 className="text-2xl font-semibold mb-4 text-white">Personalization</h3>
          <div className="text-gray-400 text-left space-y-2">
            <p>Customize commands to your preferences.</p>
            <p>Many systems allow you to create unique voice cues for specific actions or even chain multiple commands into a single, personalized phrase.</p>
            <p>For example, saying "Goodnight mode" could dim the lights, lower the thermostat, and lock the doors simultaneously.</p>
          </div>
        </div>

        <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
          <Smartphone className="text-[#3B82F6] mb-6 w-8 h-8" />
          <h3 className="text-2xl font-semibold mb-4 text-white">Smart Device Integration</h3>
          <div className="text-gray-400 text-left space-y-2">
            <p>Seamless connection with your devices.</p>
            <p>Integrate your RV's voice control with popular smart home ecosystems like Alexa or Google Assistant.</p>
            <p>This allows for a unified experience, enabling control over both your RV and connected personal devices from a single voice interface.</p>
          </div>
        </div>

        <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
          <Sun className="text-[#3B82F6] mb-6 w-8 h-8" />
          <h3 className="text-2xl font-semibold mb-4 text-white">Efficiency</h3>
          <div className="text-gray-400 text-left space-y-2">
            <p>Streamline your RV management.</p>
            <p>Quickly execute routine tasks like adjusting climate settings before arrival, turning off all lights with one command, or checking tank levels instantly.</p>
            <p>This saves valuable time and effort, letting you focus more on the adventure and less on manual operations.</p>
          </div>
        </div>

        <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
          <HomeIcon className="text-[#3B82F6] mb-6 w-8 h-8" />
          <h3 className="text-2xl font-semibold mb-4 text-white">Accessibility</h3>
          <div className="text-gray-400 text-left space-y-2">
            <p>Make RV control easier for everyone.</p>
            <p>Voice commands provide an invaluable alternative for individuals with mobility limitations or other physical challenges.</p>
            <p>It ensures that all essential RV functions can be managed comfortably, promoting independence and a more inclusive travel experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
