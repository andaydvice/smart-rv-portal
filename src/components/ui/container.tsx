
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Container({ children, className, fullWidth = false }: ContainerProps) {
  return (
    <div className={cn(
      "w-full mx-auto px-4 sm:px-6 lg:px-8", 
      fullWidth ? "max-w-full" : "max-w-7xl",
      className
    )}>
      {children}
    </div>
  );
}
