import { Skeleton } from "@/components/ui/skeleton";

export const TestimonialsSkeleton = () => {
  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4 p-6 rounded-lg border">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <div className="pt-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};