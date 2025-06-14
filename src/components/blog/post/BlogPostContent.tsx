
import React from 'react';

interface Author {
  initials: string;
  name: string;
}

interface BlogPostContentProps {
  category: string;
  title: string;
  author: Author;
  description?: string;
  content: string;
}

export const BlogPostContent = ({
  category,
  title,
  author,
  description,
  content,
}: BlogPostContentProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-[#1B2028] text-white px-4 py-2 text-sm rounded-full">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-left">{title}</h1>

      {description && (
        <div className="text-[#E2E8FF] text-xl md:text-2xl font-medium mb-8 text-left leading-relaxed">
          {description}
        </div>
      )}

      <div className="flex items-center gap-3 text-white/80 mb-10">
        <div className="bg-[#1B2028] w-10 h-10 rounded-full flex items-center justify-center font-semibold">
          {author.initials}
        </div>
        <span className="font-medium">{author.name}</span>
      </div>

      <div className="blog-content text-left space-y-8">
        <div className="text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
          <p className="mb-6">
            Ensuring the security of your RV is paramount, whether you're on a remote adventure or parked at a bustling campsite.
          </p>
          
          <p className="mb-6">
            Modern smart RV security systems offer a range of features, from advanced surveillance cameras and motion detectors to smart locks and real-time alerts sent directly to your smartphone.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-6">
          Advanced Security Features
        </h2>
        
        <div className="text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
          <p className="mb-6">
            Discover how these technologies can provide you with peace of mind, allowing you to fully enjoy your travels without worrying about the safety of your mobile home and belongings.
          </p>
          
          <p className="mb-6">
            We delve into the key components of a robust RV security setup, installation tips, and how to choose the system that best fits your needs and budget.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-6">
          Key Security Components
        </h2>
        
        <div className="text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
          <p className="mb-6">
            Modern RV security systems integrate multiple layers of protection to ensure comprehensive coverage of your mobile home.
          </p>
          
          <p className="mb-6">
            From perimeter monitoring to interior surveillance, these systems work together to create an impenetrable security network around your RV.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-6">
          Installation and Setup
        </h2>
        
        <div className="text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
          <p className="mb-6">
            Professional installation ensures your security system operates at peak efficiency while maintaining the integrity of your RV's structure.
          </p>
          
          <p className="mb-6">
            Understanding the installation process helps you make informed decisions about system placement and configuration for maximum effectiveness.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-6">
          Peace of Mind on the Road
        </h2>
        
        <div className="text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
          <p className="mb-6">
            With a comprehensive security system in place, you can explore new destinations with confidence, knowing your RV and belongings are protected.
          </p>
          
          <p className="mb-6">
            Smart security technology transforms your RV into a secure mobile sanctuary, enhancing your travel experience through advanced protection and monitoring capabilities.
          </p>
        </div>
      </div>
    </div>
  );
};
