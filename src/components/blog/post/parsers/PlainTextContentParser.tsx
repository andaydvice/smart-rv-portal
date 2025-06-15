
import React from 'react';

interface PlainTextContentParserProps {
  lines: string[];
}

export const PlainTextContentParser: React.FC<PlainTextContentParserProps> = ({ lines }) => {
  const elements: React.ReactNode[] = [];
  let paragraphBuffer: string[] = [];

  lines.forEach((line, i) => {
    if (line.length > 0) {
      paragraphBuffer.push(line);
    }
    
    if (line === '' || i === lines.length - 1) {
      if (paragraphBuffer.length > 0) {
        elements.push(
          <p key={`para_${i}`} className="mb-6 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
            {paragraphBuffer.join(' ')}
          </p>
        );
        paragraphBuffer = [];
      }
    }
  });

  return <>{elements}</>;
};
