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
          <h3 className="text-2xl font-semibold mb-4">Convenience & Hands-Free Control</h3>
          <p className="text-gray-400">Control your RV systems without lifting a finger</p>
        </div>

        <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
          <Shield className="text-[#3B82F6] mb-6 w-8 h-8" />
          <h3 className="text-2xl font-semibold mb-4">Enhanced Safety</h3>
          <p className="text-gray-400">Keep your focus on driving and surroundings</p>
        </div>

        <div className="bg-[#151B2E] rounded-2xl p-8 flex flex-col items-start">
          <Cpu className="text-[#3B82F6] mb-6 w-8 h-8" />
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
  );
};