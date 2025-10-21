import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface StarterQuestion {
  text: string;
  icon?: React.ReactNode;
}

interface StarterQuestionsProps {
  questions: StarterQuestion[];
  onQuestionClick: (question: string) => void;
}

export const StarterQuestions: React.FC<StarterQuestionsProps> = ({ questions, onQuestionClick }) => {
  return (
    <Card className="bg-[#151A22]/50 border-[#5B9BD5]/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-[#5B9BD5]" />
          <h4 className="text-white font-semibold">Try asking:</h4>
        </div>
        <div className="grid gap-3">
          {questions.map((question, index) => (
            <Button
              key={index}
              onClick={() => onQuestionClick(question.text)}
              variant="outline"
              className="justify-start text-left h-auto py-3 px-4 border-[#1a202c] text-[#E2E8FF] hover:bg-[#1a202c] hover:text-white hover:border-[#5B9BD5]/50"
            >
              <span className="line-clamp-2">{question.text}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
