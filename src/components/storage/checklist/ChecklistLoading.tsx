
import React from 'react';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ChecklistLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080F1F] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="border-gray-700 bg-[#091020] shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-700 space-y-4">
            <Skeleton className="h-8 w-1/3 bg-gray-700" />
            <Skeleton className="h-4 w-1/2 bg-gray-700" />
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-24 bg-gray-700" />
              <Skeleton className="h-10 w-24 bg-gray-700" />
            </div>
          </div>
          <div className="pt-6 p-6 space-y-6">
            <Skeleton className="h-8 w-1/4 bg-gray-700" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-10 w-full bg-gray-700" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChecklistLoading;
