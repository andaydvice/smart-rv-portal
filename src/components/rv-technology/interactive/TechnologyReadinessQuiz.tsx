import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { CheckCircle, ChevronRight, Star, Smartphone, Settings, Wifi } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; score: number }[];
}

interface QuizResult {
  level: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  features: string[];
  rvtLink: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'smartphone',
    question: 'How comfortable are you with smartphone apps and technology?',
    options: [
      { value: 'basic', label: 'I use basic features like calls and texts', score: 1 },
      { value: 'moderate', label: 'I use apps for social media and navigation', score: 2 },
      { value: 'advanced', label: 'I regularly use multiple apps and smart home features', score: 3 }
    ]
  },
  {
    id: 'controls',
    question: 'What type of controls do you prefer in vehicles and appliances?',
    options: [
      { value: 'manual', label: 'Physical buttons and switches', score: 1 },
      { value: 'mixed', label: 'Combination of physical and digital controls', score: 2 },
      { value: 'digital', label: 'Touchscreens and digital interfaces', score: 3 }
    ]
  },
  {
    id: 'connectivity',
    question: 'How important is internet connectivity while camping?',
    options: [
      { value: 'minimal', label: 'Not important - I want to disconnect', score: 1 },
      { value: 'occasional', label: 'Helpful for emergencies and basic communication', score: 2 },
      { value: 'essential', label: 'Critical for work, entertainment, and staying connected', score: 3 }
    ]
  },
  {
    id: 'electrical',
    question: 'What is your experience with RV electrical systems?',
    options: [
      { value: 'none', label: 'Complete beginner - I prefer simple systems', score: 1 },
      { value: 'basic', label: 'Some knowledge - willing to learn basics', score: 2 },
      { value: 'experienced', label: 'Comfortable with electrical systems and upgrades', score: 3 }
    ]
  },
  {
    id: 'maintenance',
    question: 'How do you prefer to handle RV maintenance and monitoring?',
    options: [
      { value: 'simple', label: 'Keep it simple - manual checks are fine', score: 1 },
      { value: 'assisted', label: 'Some automation with manual oversight', score: 2 },
      { value: 'automated', label: 'Full automation with smartphone monitoring', score: 3 }
    ]
  }
];

const quizResults: Record<string, QuizResult> = {
  beginner: {
    level: 'beginner',
    title: 'Tech-Friendly Beginner',
    description: 'You prefer simple, reliable systems with intuitive controls. Focus on RVs with proven technology and excellent support.',
    features: [
      'Basic electrical systems with clear manual controls',
      'Simple connectivity options (cellular boosters)',
      'Reliable battery monitoring with easy-to-read displays',
      'Traditional appliances with digital upgrades'
    ],
    rvtLink: 'https://www.rvt.com/buy/?filter=basic-technology'
  },
  intermediate: {
    level: 'intermediate',
    title: 'Smart Technology Adopter',
    description: 'You are comfortable with modern technology and want a good balance of convenience and reliability.',
    features: [
      'Integrated control panels with smartphone connectivity',
      'Solar power systems with digital monitoring',
      'WiFi preparation and cellular signal boosters',
      'Smart appliances with manual backup controls'
    ],
    rvtLink: 'https://www.rvt.com/buy/?filter=smart-features'
  },
  advanced: {
    level: 'advanced',
    title: 'Technology Enthusiast',
    description: 'You want cutting-edge RV technology and are comfortable managing complex systems for maximum convenience.',
    features: [
      'Full home automation and smartphone control',
      'Advanced solar and lithium battery systems',
      'High speed internet and connectivity solutions',
      'Comprehensive monitoring and alert systems'
    ],
    rvtLink: 'https://www.rvt.com/buy/?filter=premium-technology'
  }
};

export const TechnologyReadinessQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [quizQuestions[currentQuestion].id]: score };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, number>) => {
    const totalScore = Object.values(finalAnswers).reduce((sum, score) => sum + score, 0);
    const avgScore = totalScore / quizQuestions.length;

    let resultKey: string;
    if (avgScore <= 1.5) {
      resultKey = 'beginner';
    } else if (avgScore <= 2.5) {
      resultKey = 'intermediate';
    } else {
      resultKey = 'advanced';
    }

    setResult(quizResults[resultKey]);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <Card className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-full mb-4">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{result.title}</h3>
          <p className="text-[#E2E8FF] text-lg leading-relaxed">{result.description}</p>
        </div>

        <div className="mb-8">
          <h4 className="text-xl font-semibold text-[#60A5FA] mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Recommended Technology Features
          </h4>
          <div className="grid gap-3">
            {result.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-[#151A22]/50 rounded-lg border border-[#1a202c]">
                <CheckCircle className="h-5 w-5 text-[#5B9BD5] flex-shrink-0 mt-0.5" />
                <span className="text-[#E2E8FF]">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <ExternalLinkButton 
            href={result.rvtLink}
            variant="default"
            size="lg"
            className="flex-1 bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5]"
          >
            Browse Matching RVs
          </ExternalLinkButton>
          <Button 
            onClick={resetQuiz}
            variant="outline"
            size="lg"
            className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#151A22]"
          >
            Retake Quiz
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-full mb-4">
          <Smartphone className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">RV Technology Readiness Assessment</h3>
        <p className="text-[#E2E8FF] text-lg">Discover your ideal RV technology level in just 5 questions</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-[#E2E8FF] mb-2">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{Math.round(((currentQuestion) / quizQuestions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-[#151A22] rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-semibold text-white mb-6">{quizQuestions[currentQuestion].question}</h4>
        <div className="space-y-3">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.score)}
              className="w-full p-4 text-left bg-[#151A22]/50 hover:bg-[#151A22] border border-[#1a202c] hover:border-[#5B9BD5]/50 rounded-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[#E2E8FF] group-hover:text-white">{option.label}</span>
                <ChevronRight className="h-5 w-5 text-[#5B9BD5] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};