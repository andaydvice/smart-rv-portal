
import React from "react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080F1F] to-[#151A22] text-white">
      {/* Header */}
      <header className="py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#5B9BD5] mb-4">Smart RV Portal</h1>
          <p className="text-xl text-gray-300">Next-generation connectivity and control for your RV</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#091020] border border-gray-700 rounded-lg p-6 text-center hover:border-[#5B9BD5]/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#5B9BD5] to-[#4B8FE3] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Essential Apps & Tools</h3>
              <p className="text-gray-400 mb-4">GPS navigation, campsite finders, and mobile tech for the modern RVer.</p>
              <button className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Explore Apps
              </button>
            </div>
            
            <div className="bg-[#091020] border border-gray-700 rounded-lg p-6 text-center hover:border-[#5B9BD5]/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☀️</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Solar Power Guide</h3>
              <p className="text-gray-400 mb-4">Complete guide to RV solar systems, equipment, and installation tips.</p>
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Solar Solutions
              </button>
            </div>
            
            <div className="bg-[#091020] border border-gray-700 rounded-lg p-6 text-center hover:border-[#5B9BD5]/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Emergency Preparedness</h3>
              <p className="text-gray-400 mb-4">Safety equipment, roadside assistance, and emergency planning resources.</p>
              <button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Stay Safe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2024 Smart RV Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
