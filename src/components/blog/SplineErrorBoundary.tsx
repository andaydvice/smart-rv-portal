import React from 'react';
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class SplineErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.warn('Spline component failed to load:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Spline error details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <BlogHeaderFallback />;
    }

    return this.props.children;
  }
}

const BlogHeaderFallback = () => {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full items-center justify-center">
        <div className="text-center relative z-10 max-w-2xl px-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6">
            Smart RV Blog
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed">
            Discover the latest insights, tips, and innovations for your Smart RV lifestyle
          </p>
          <div className="mt-8 w-32 h-1 bg-gradient-to-r from-connectivity-accent to-transparent mx-auto"></div>
        </div>
      </div>
    </Card>
  );
};

export default SplineErrorBoundary;