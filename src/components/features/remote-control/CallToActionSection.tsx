
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToActionSection = () => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-6">Experience Total Control</h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Take command of your smart RV experience with our comprehensive remote control system, designed for intelligent convenience, security, and peace of mind.
      </p>
      <Link to="/products">
        <Button size="lg" className="text-lg py-6 px-8 min-h-[44px]">
          Explore Smart RV Gear
        </Button>
      </Link>
    </div>
  );
};

export default CallToActionSection;
