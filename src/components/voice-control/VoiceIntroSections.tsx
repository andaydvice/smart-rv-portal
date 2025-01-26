import { Mic, Server, Shield, Home, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const VoiceIntroSections = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="flex items-start gap-4">
          <Mic className="w-8 h-8 text-[#2E7DFF] flex-shrink-0" />
          <div>
            <h3 className="text-[#2E7DFF] text-xl font-semibold mb-2">The Power of Speech is Here Today</h3>
            <p className="text-white/90">Your Smart RV now responds to simple voice commands. Simply speak to control everything from temperature to lighting and entertainment.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Server className="w-8 h-8 text-[#2E7DFF] flex-shrink-0" />
          <div>
            <h3 className="text-[#2E7DFF] text-xl font-semibold mb-2">Advanced Technology from Leaders</h3>
            <p className="text-white/90">Just say "Jayco" or "Hey Power Pro" and your RV responds instantly. Works with Alexa and Google too.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-[#2E7DFF] flex-shrink-0" />
          <div>
            <h3 className="text-[#2E7DFF] text-xl font-semibold mb-2">Safe, Simple, Smart Control</h3>
            <p className="text-white/90">Adjust your AC while keeping your hands on the wheel. Set up camp with a single command.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Home className="w-8 h-8 text-[#2E7DFF] flex-shrink-0" />
          <div>
            <h3 className="text-[#2E7DFF] text-xl font-semibold mb-2">Experience Today's Smart RV Technology</h3>
            <p className="text-white/90">Voice control is already transforming thousands of RVs across America, bringing the future of camping to life in luxury fifth wheels, travel trailers, and motorhomes.</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto text-center">
        <Separator className="mb-16" />
        <div className="flex flex-col items-center gap-4">
          <Phone className="w-8 h-8 text-[#2E7DFF] flex-shrink-0" />
          <div>
            <h3 className="text-[#2E7DFF] text-xl font-semibold mb-2">Ready to Upgrade?</h3>
            <p className="text-white/90">Discover what voice control can do for your RV adventures.</p>
            <button className="mt-4 bg-[#2E7DFF] text-white px-6 py-2 rounded-lg hover:bg-[#2E7DFF]/90 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};