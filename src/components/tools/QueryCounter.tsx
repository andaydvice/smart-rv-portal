import { AlertCircle, Check } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QueryCounterProps {
  queriesUsed: number;
  queriesRemaining: number;
  hasAccess: boolean;
}

export const QueryCounter = ({ queriesUsed, queriesRemaining, hasAccess }: QueryCounterProps) => {
  if (hasAccess) {
    return (
      <Alert className="bg-[#1a202c] border-[#5B9BD5] mb-6">
        <Check className="h-4 w-4 text-[#5B9BD5]" />
        <AlertDescription className="text-[#E2E8FF]">
          <span className="font-semibold text-[#5B9BD5]">Unlimited Access Active</span> - Ask as many questions as you need!
        </AlertDescription>
      </Alert>
    );
  }

  if (queriesRemaining === 0) {
    return (
      <Alert className="bg-[#1a202c] border-yellow-500 mb-6">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
        <AlertDescription className="text-[#E2E8FF]">
          <span className="font-semibold text-yellow-500">You've used all 3 free queries</span> - Sign up to continue!
        </AlertDescription>
      </Alert>
    );
  }

  if (queriesRemaining === 1) {
    return (
      <Alert className="bg-[#1a202c] border-yellow-500 mb-6">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
        <AlertDescription className="text-[#E2E8FF]">
          <span className="font-semibold text-yellow-500">1 free query remaining</span> - Sign up to continue using our AI tools!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-[#1a202c] border-[#5B9BD5] mb-6">
      <AlertCircle className="h-4 w-4 text-[#5B9BD5]" />
      <AlertDescription className="text-[#E2E8FF]">
        <span className="font-semibold text-[#5B9BD5]">{queriesRemaining} of 3 free queries remaining</span> - Try our AI tools risk-free!
      </AlertDescription>
    </Alert>
  );
};
