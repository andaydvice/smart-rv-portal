import React from 'react';
import { Clock, Calendar, CheckCircle } from 'lucide-react';

interface PageSummaryProps {
  question?: string;
  answer: string;
  keyPoints?: string[];
  readingTime?: string;
  lastUpdated?: string;
  className?: string;
}

export function PageSummary({
  question,
  answer,
  keyPoints,
  readingTime,
  lastUpdated,
  className = ''
}: PageSummaryProps) {
  return (
    <div className={`bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-500/40 rounded-lg p-6 mb-8 backdrop-blur-sm ${className}`}>
      {question && (
        <h2 className="text-xl md:text-2xl font-semibold text-blue-300 mb-3">
          {question}
        </h2>
      )}

      <p className="text-white text-base md:text-lg mb-4 leading-relaxed">
        {answer}
      </p>

      {keyPoints && keyPoints.length > 0 && (
        <div className="space-y-2 mb-4">
          <p className="text-blue-300 font-medium text-sm">Key Points:</p>
          <ul className="space-y-2">
            {keyPoints.map((point, index) => (
              <li key={index} className="text-gray-200 flex items-start text-sm md:text-base">
                <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0 w-4 h-4" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(readingTime || lastUpdated) && (
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-blue-500/20 text-xs md:text-sm text-gray-300">
          {readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readingTime} read
            </span>
          )}
          {lastUpdated && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Updated {lastUpdated}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
