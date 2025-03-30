
import React from 'react';
import { X } from 'lucide-react';

interface PremiumNotificationProps {
  title: string;
  status: string;
  onClose: () => void;
  showClose: boolean;
}

const PremiumNotification: React.FC<PremiumNotificationProps> = ({
  title,
  status,
  onClose,
  showClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative max-w-md w-full rounded-lg overflow-hidden">
        {/* Main content area with dark background */}
        <div className="bg-[#131a2a] text-white p-6 pt-8">
          {/* Close button */}
          {showClose && (
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          {/* Title */}
          <h2 className="text-[#5B9BD5] text-2xl font-bold text-center mb-6">{title}</h2>
          
          {/* Address */}
          <div className="flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-center text-white font-medium">1234 Storage Blvd, Los Angeles, California</p>
          </div>
          
          {/* Phone */}
          <div className="flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p className="text-center text-white font-medium">(555) 123-4567</p>
          </div>
          
          {/* Facilities header */}
          <h3 className="text-gray-400 text-sm font-bold uppercase text-center mb-3">FACILITIES & AMENITIES</h3>
          
          {/* Facilities grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#1d2434] text-[#5B9BD5] text-sm font-medium px-3 py-2 rounded text-center">
              Indoor Storage
            </div>
            <div className="bg-[#1d2434] text-[#5B9BD5] text-sm font-medium px-3 py-2 rounded text-center">
              Climate Controlled
            </div>
            <div className="bg-[#1d2434] text-[#5B9BD5] text-sm font-medium px-3 py-2 rounded text-center">
              24/7 Access
            </div>
            <div className="bg-[#1d2434] text-[#5B9BD5] text-sm font-medium px-3 py-2 rounded text-center">
              Security System
            </div>
          </div>
          
          {/* Status message */}
          <div className="border-l-2 border-[#5B9BD5] pl-3 italic text-gray-300 mb-8">
            <p>{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumNotification;
