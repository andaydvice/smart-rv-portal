import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertCardProps {
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

const AlertCard: React.FC<AlertCardProps> = ({ severity, title, description }) => {
  const getSeverityStyles = () => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/10 border-red-500/50';
      case 'medium':
        return 'bg-yellow-500/10 border-yellow-500/50';
      case 'low':
        return 'bg-blue-500/10 border-blue-500/50';
      default:
        return 'bg-gray-500/10 border-gray-500/50';
    }
  };

  const getIcon = () => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('p-4 rounded-lg border', getSeverityStyles())}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;