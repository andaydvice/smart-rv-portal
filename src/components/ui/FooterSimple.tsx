
import React from 'react';

interface FooterSimpleProps {
  siteName: string;
  year: number;
}

const FooterSimple: React.FC<FooterSimpleProps> = ({ siteName, year }) => {
  return (
    <footer className="w-full py-6 mt-12 bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {year} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSimple;
