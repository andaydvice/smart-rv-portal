
import React from 'react';

interface PlainTextContentParserProps {
  lines: string[];
}

export const PlainTextContentParser: React.FC<PlainTextContentParserProps> = ({ lines }) => {
  const elements: React.ReactNode[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const paragraphText = paragraphBuffer.join(' ');
      const sentences = paragraphText
        .split(/(?<=[.?!])\s+/)
        .filter((sentence) => sentence.trim().length > 0);

      const baseKey = `para_${elements.length}`;
      sentences.forEach((sentence, index) => {
        elements.push(
          <p key={`${baseKey}-${index}`} className="mb-6 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
            {sentence}
          </p>
        );
      });
      paragraphBuffer = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.length > 0) {
      paragraphBuffer.push(line);
    }
    
    if (line === '' || i === lines.length - 1) {
      flushParagraph();
    }
  });

  return <>{elements}</>;
};
