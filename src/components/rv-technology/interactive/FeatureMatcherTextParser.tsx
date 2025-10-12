import React from 'react';

interface FeatureMatcherTextParserProps {
  text: string;
  className?: string;
}

export const FeatureMatcherTextParser: React.FC<FeatureMatcherTextParserProps> = ({ text, className = "text-white/90" }) => {
  // Split text into sentences
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .filter((sentence) => sentence.trim().length > 0);

  return (
    <>
      {sentences.map((sentence, index) => (
        <p key={index} className={`mb-4 ${className} text-lg leading-relaxed`}>
          {sentence.trim()}
        </p>
      ))}
    </>
  );
};
