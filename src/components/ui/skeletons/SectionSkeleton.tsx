import { Skeleton } from "@/components/ui/skeleton";

interface SectionSkeletonProps {
  hasGrid?: boolean;
  gridCols?: number;
  height?: string;
}

export const SectionSkeleton = ({ 
  hasGrid = true, 
  gridCols = 3, 
  height = "h-64" 
}: SectionSkeletonProps) => {
  return (
    <div className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-12 w-2/3 mx-auto mb-6" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        
        {/* Content Grid */}
        {hasGrid && (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${gridCols} gap-8`}>
            {Array.from({ length: gridCols }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className={`w-full ${height} rounded-lg`} />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};