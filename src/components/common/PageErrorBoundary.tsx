
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Props {
  children: React.ReactNode;
}

class ErrorBoundaryInner extends React.Component<Props, { hasError: boolean; error?: Error }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Page error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="text-2xl font-semibold text-white">Something went wrong</h2>
            <p className="text-gray-300">
              {this.state.error?.message || "We're having trouble displaying this content"}
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => window.location.reload()} className="bg-[#5B9BD5]">
                <RefreshCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const PageErrorBoundary = ({ children }: Props) => {
  return <ErrorBoundaryInner>{children}</ErrorBoundaryInner>;
};

