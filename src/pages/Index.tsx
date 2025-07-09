
import React from "react";

console.log('Index.tsx file loaded');

const Index = () => {
  console.log('Index component rendering...');
  
  return (
    <div className="min-h-screen bg-[#080F1F] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#5B9BD5] mb-4">🚀</h1>
        <h2 className="text-4xl font-bold mb-4">Smart RV Portal</h2>
        <p className="text-xl text-gray-300 mb-8">Welcome to the Smart RV Technology Hub</p>
        <div className="w-32 h-32 bg-gradient-to-r from-[#5B9BD5] to-[#4B8FE3] rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl">✓</span>
        </div>
        <p className="text-green-400 text-lg font-semibold">Routing is working perfectly!</p>
      </div>
    </div>
  );
};

export default Index;
