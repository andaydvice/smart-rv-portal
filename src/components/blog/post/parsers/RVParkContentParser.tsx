
import React from 'react';
import { isRVParkHeading } from '../utils/contentParser';

interface RVParkContentParserProps {
  lines: string[];
}

export const RVParkContentParser: React.FC<RVParkContentParserProps> = ({ lines }) => {
  const elements: React.ReactNode[] = [];
  let currentSection: string[] = [];
  let elementCount = 0;

  const flushSection = () => {
    if (currentSection.length > 0) {
      elements.push(
        <div key={`section_${elementCount}`} className="mb-6">
          {currentSection.map((paragraph, idx) => (
            <p key={`para_${elementCount}_${idx}`} className="mb-4 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
              {paragraph}
            </p>
          ))}
        </div>
      );
      currentSection = [];
      elementCount++;
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) {
      // Empty line - flush current section if it has content
      if (currentSection.length > 0) {
        flushSection();
      }
      return;
    }

    if (isRVParkHeading(trimmedLine)) {
      // Flush any existing section content before adding heading
      flushSection();
      
      // Create heading - remove number prefix for cleaner display
      const cleanTitle = trimmedLine.replace(/^\d{1,2}[.)]\s*/, '');
      elements.push(
        <h2 key={`heading_${index}`} className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-6 first:mt-0">
          {trimmedLine}
        </h2>
      );
    } else {
      // Regular content line - add to current section
      currentSection.push(trimmedLine);
    }
  });

  // Flush any remaining content
  flushSection();

  return <>{elements}</>;
};
