
import React from "react";

const Index = () => {
  console.log('Index component rendering...');
  
  return (
    <div className="min-h-screen bg-[#080F1F] text-white p-8">
      <h1 className="text-4xl font-bold text-center">Smart RV Portal</h1>
      <p className="text-center mt-4 text-gray-300">Welcome to the Smart RV Technology Hub</p>
      <div className="text-center mt-8">
        <div className="w-16 h-16 bg-[#5B9BD5] rounded-full mx-auto mb-4"></div>
        <p>If you can see this, the routing is working!</p>
      </div>
    </div>
  );
};

export default Index;
