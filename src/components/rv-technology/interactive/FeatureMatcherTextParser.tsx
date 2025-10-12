import React from 'react';

interface FeatureMatcherTextParserProps {
  text: string;
  className?: string;
}

export const FeatureMatcherTextParser: React.FC<FeatureMatcherTextParserProps> = ({ 
  text, 
  className = "text-white/90" 
}) => {
  // Clean and normalize the text
  const cleanText = text
    .trim()
    // Remove markdown code blocks
    .replace(/```[a-z]*\n?/g, '')
    // Remove any remaining backticks
    .replace(/`/g, '')
    // Remove markdown bold/italic
    .replace(/\*\*/g, '')
    .replace(/\*/g, '');
  
  // Split text into sentences, handling various punctuation
  const sentences = cleanText
    .split(/(?<=[.?!])\s+/)
    .filter((sentence) => sentence.trim().length > 0)
    .map(s => s.trim());

  return (
    <div className="space-y-4">
      {sentences.map((sentence, index) => (
        <p 
          key={index} 
          className={`${className} text-base leading-relaxed`}
        >
          {sentence}
        </p>
      ))}
    </div>
  );
};
