import React from "react";

const CalculatorIntro = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#60A5FA] mb-4 md:mt-8">
        RV Intelligence Center
      </h1>
      <div className="text-lg text-gray-300 max-w-3xl mx-auto">
        <p className="mb-4 block md:inline">Professional tools</p>
        <p className="md:hidden">for smarter RV travel planning</p>
        <p className="hidden md:inline ml-2">for smarter RV travel planning</p>
      </div>
    </div>
  );
};

export default CalculatorIntro;