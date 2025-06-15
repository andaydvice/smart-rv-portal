
import React from 'react';
import { isRVParkHeading } from '../utils/contentParser';

interface RVParkContentParserProps {
  lines: string[];
}

export const RVParkContentParser: React.FC<RVParkContentParserProps> = ({ lines }) => {
  const elements: React.ReactNode[] = [];
  let currentSection: string[] = [];
  let sectionCount = 0;

  const flushSection = () => {
    if (currentSection.length > 0) {
      elements.push(
        <p key={`section_${sectionCount}`} className="mb-6 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
          {currentSection.join(' ')}
        </p>
      );
      currentSection = [];
      sectionCount++;
    }
  };

  lines.forEach((line, index) => {
    if (isRVParkHeading(line)) {
      // Flush any existing section content
      flushSection();
      
      // Create heading - remove number prefix if present
      const cleanTitle = line.replace(/^\d{1,2}[.)]\s*/, '');
      elements.push(
        <h2 key={`heading_${index}`} className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-4 first:mt-0">
          {cleanTitle}
        </h2>
      );
    } else if (line.length > 0) {
      // Add to current section
      currentSection.push(line);
    } else if (currentSection.length > 0) {
      // Empty line - flush current section
      flushSection();
    }
  });

  // Flush any remaining content
  flushSection();

  return <>{elements}</>;
};
