import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { BlogPost } from '@/types/blog';

const blogPosts: BlogPost[] = [
  {
    category: 'Innovation',
    author: {
      initials: 'JD',
      name: 'John Doe'
    },
    date: 'Sep 16',
    title: 'The Future of Mobile Living',
    description: 'Smart RVs are revolutionizing how we experience life on the road.',
    image: '/lovable-uploads/80ea47f5-5b04-409f-8eb7-1da434a9e0de.png'
  },
  {
    category: 'Technology',
    author: {
      initials: 'AS',
      name: 'Alice Smith'
    },
    date: 'Sep 16',
    title: 'Sustainable Travel Redefined',
    description: 'Where eco-friendly design meets intelligent mobile home solutions.',
    image: '/lovable-uploads/72144d64-5f93-4ee2-8187-e495f556f206.png'
  }
];

export default function BlogGrid() {
  return (
    <div className="bg-connectivity-bg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Modern RV */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden">
            {blogPosts[0].image ? (
              <img 
                src={blogPosts[0].image} 
                alt="Modern RV Interior"
                className="w-full h-auto object-cover"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                <defs>
                  <linearGradient id="tech-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1E3B70"/>
                    <stop offset="100%" stopColor="#1E90FF"/>
                  </linearGradient>
                  <linearGradient id="window-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4"/>
                  </linearGradient>
                </defs>
                
                <rect width="400" height="300" fill="url(#tech-bg)"/>
                
                <path d="M50 200 L300 200 L350 150 L350 200 L50 200" 
                      fill="#2A4A8F" 
                      stroke="#4A90E2" 
                      strokeWidth="2"/>
                
                <rect x="100" y="160" width="40" height="25" fill="url(#window-gradient)" rx="2"/>
                <rect x="150" y="160" width="40" height="25" fill="url(#window-gradient)" rx="2"/>
                <rect x="200" y="160" width="40" height="25" fill="url(#window-gradient)" rx="2"/>
                
                <circle cx="320" cy="80" r="20" fill="#4A90E2" opacity="0.8"/>
                <circle cx="340" cy="60" r="10" fill="#4A90E2" opacity="0.6"/>
                
                <path d="M320 80 L340 60" stroke="#FFFFFF" strokeWidth="1" opacity="0.5"/>
                <path d="M320 80 L300 100" stroke="#FFFFFF" strokeWidth="1" opacity="0.5"/>
              </svg>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="bg-connectivity-darkBg text-white px-3 py-1 text-sm rounded-full">
                {blogPosts[0].category}
              </span>
              <div className="flex items-center gap-2 text-sm text-[#E2E8FF]">
                <Avatar className="w-5 h-5">
                  <span className="text-xs">{blogPosts[0].author.initials}</span>
                </Avatar>
                <span>{blogPosts[0].author.name}</span>
                <span>|</span>
                <span>{blogPosts[0].date}</span>
              </div>
            </div>
            <h2 className="text-white text-xl mb-2">{blogPosts[0].title}</h2>
            <p className="text-[#E2E8FF]">{blogPosts[0].description}</p>
          </div>
        </div>

        {/* Right Column - Eco Tech */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl overflow-hidden">
            {blogPosts[1].image ? (
              <img 
                src={blogPosts[1].image} 
                alt="Sustainable RV Travel"
                className="w-full h-auto object-cover"
              />
            ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
              <defs>
                <linearGradient id="eco-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2E8B57"/>
                  <stop offset="100%" stopColor="#98FB98"/>
                </linearGradient>
                <linearGradient id="solar-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4682B4"/>
                  <stop offset="100%" stopColor="#87CEEB"/>
                </linearGradient>
              </defs>
              
              <rect width="400" height="300" fill="url(#eco-gradient)"/>
              
              <rect x="100" y="80" width="200" height="100" fill="url(#solar-gradient)" rx="5"/>
              <path d="M100 105 L300 105" stroke="#FFFFFF" strokeWidth="1" opacity="0.5"/>
              <path d="M100 130 L300 130" stroke="#FFFFFF" strokeWidth="1" opacity="0.5"/>
              <path d="M100 155 L300 155" stroke="#FFFFFF" strokeWidth="1" opacity="0.5"/>
              
              <circle cx="320" cy="60" r="15" fill="#FFFFFF" opacity="0.8"/>
              <circle cx="350" cy="80" r="10" fill="#FFFFFF" opacity="0.6"/>
              <circle cx="330" cy="100" r="8" fill="#FFFFFF" opacity="0.4"/>
              
              <path d="M50 150 C100 100, 150 200, 200 150" 
                    stroke="#FFFFFF" 
                    strokeWidth="2" 
                    fill="none" 
                    opacity="0.6"/>
            </svg>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="bg-connectivity-darkBg text-white px-3 py-1 text-sm rounded-full">
                {blogPosts[1].category}
              </span>
              <div className="flex items-center gap-2 text-sm text-[#E2E8FF]">
                <Avatar className="w-5 h-5">
                  <span className="text-xs">{blogPosts[1].author.initials}</span>
                </Avatar>
                <span>{blogPosts[1].author.name}</span>
                <span>|</span>
                <span>{blogPosts[1].date}</span>
              </div>
            </div>
            <h2 className="text-white text-xl mb-2">{blogPosts[1].title}</h2>
            <p className="text-[#E2E8FF]">{blogPosts[1].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
