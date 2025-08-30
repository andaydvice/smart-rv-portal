
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-connectivity-darkBg border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Smart RV Portal</h3>
            <p className="text-gray-400">
              Revolutionary RV technology and smart systems for the modern mobile lifestyle.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-connectivity-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#calculators" className="text-gray-400 hover:text-connectivity-accent transition-colors">
                  Calculators
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-connectivity-accent transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <p className="text-gray-400">
              Get in touch for support and inquiries about smart RV solutions.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2024 Smart RV Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
