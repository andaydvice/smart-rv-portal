import { HeroSection } from "../components/voice-control/HeroSection";
import { VoiceControlSystems } from "../components/voice-control/VoiceControlSystems";
import { BenefitsGrid } from "../components/voice-control/BenefitsGrid";
import FeaturesSection from "../components/voice-control/FeaturesSection";

const VoiceControl = () => {
  console.log("VoiceControl component rendering");
  
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white">
      <main className="relative w-full">
        <HeroSection />
        <h2 className="text-4xl font-bold text-white text-center mt-16 mb-8">
          Voice Control Transforms Your RV Experience
        </h2>
        <VoiceControlSystems />
        <div className="w-full max-w-6xl mx-auto px-4 py-16 bg-[#1A1F2E33]">
          <img 
            src="/lovable-uploads/ab7d2423-0ab6-4868-83b1-c84f220e5736.png"
            alt="Smart RV voice control system visualization showing various connected features"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <BenefitsGrid />
        <FeaturesSection />
      </main>
    </div>
  );
};

export default VoiceControl;