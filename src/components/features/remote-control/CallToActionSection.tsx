
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToActionSection = () => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-6">Experience Total Control</h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Take command of your smart RV experience with our comprehensive remote control system, designed for convenience, security, and peace of mind.
      </p>
      <Link to="/schedule-demo">
        <Button size="lg" className="text-lg py-6 px-8">
          Schedule a Live Demo
        </Button>
      </Link>
    </div>
  );
};

export default CallToActionSection;
