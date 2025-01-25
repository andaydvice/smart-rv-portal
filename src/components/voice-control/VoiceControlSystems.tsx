import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const VoiceControlSystems = () => {
  return (
    <section className="container mx-auto px-4 py-24 text-white">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h3 className="text-4xl font-bold mb-4">The Power of Speech is Here Today</h3>
          <p className="text-2xl text-[#D3E4FD] leading-relaxed">
            Your Smart RV now responds to simple voice commands.
            Simply speak to control everything from temperature to lighting and entertainment.
          </p>
        </div>

        <div className="space-y-16">
          <div className="space-y-6">
            <h4 className="text-3xl font-semibold">Advanced Technology from Leaders</h4>
            <p className="text-xl text-[#D3E4FD] leading-relaxed">
              Just say "Jayco" or "Hey Power Pro" and your RV responds instantly. Works with Alexa and Google too.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-3xl font-semibold">Safe, Simple, Smart Control</h4>
            <p className="text-xl text-[#D3E4FD] leading-relaxed">
              Adjust your AC while keeping your hands on the wheel. Set up camp with a single command.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-3xl font-semibold">Experience Today's Smart RV Technology</h4>
            <p className="text-xl text-[#D3E4FD] leading-relaxed">
              Voice control is already transforming thousands of RVs across America, bringing the future of camping to life in luxury fifth wheels, travel trailers, and motorhomes.
            </p>
          </div>
        </div>

        <div className="text-center space-y-8 pt-8">
          <h4 className="text-3xl font-semibold">Ready to Upgrade?</h4>
          <p className="text-xl text-[#D3E4FD]">
            Discover what voice control can do for your RV adventures.
          </p>
          <Button 
            variant="default" 
            size="lg"
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-xl px-8 py-6 h-auto"
          >
            Learn More
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};