
import React from "react";
import { Link } from "react-router-dom";

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CallToAction = ({ title, description, buttonText, buttonLink }: CallToActionProps) => {
  return (
    // MODIFIED: Added text-white for better visibility of title
    <div className="text-left py-10 px-4 bg-[#1E2A3E] rounded-xl text-white">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-300 mb-8 max-w-2xl">
        {description}
      </p>
      <Link to={buttonLink} className="inline-block py-3 px-8 bg-[#5B9BD5] hover:bg-[#4B8FE3] rounded-lg text-lg font-medium transition-colors">
        {buttonText}
      </Link>
    </div>
  );
};

export default CallToAction;
