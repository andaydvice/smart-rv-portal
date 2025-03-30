
import React, { useState, useEffect } from 'react';
import DataPreviewContainer from './DataPreviewContainer';
import { Card, CardContent } from '@/components/ui/card';

// Example data item type
interface ExampleItem {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
}

const DataPreviewExample: React.FC = () => {
  const [data, setData] = useState<ExampleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  
  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Example data
        const exampleData = [
          {
            id: '1',
            title: 'Indoor Storage Facility',
            description: 'Premium indoor RV storage with climate control',
            userId: 'user123',
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Outdoor Parking',
            description: 'Secure outdoor parking for your RV',
            userId: 'user456',
            createdAt: new Date().toISOString()
          },
          {
            id: '3',
            title: 'Seasonal Storage Plan',
            description: 'Store your RV during the off-season',
            userId: 'user123',
            createdAt: new Date().toISOString()
          }
        ];
        
        setData(exampleData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Custom render function for each item
  const renderItem = (item: ExampleItem, index: number) => (
    <Card key={item.id} className="border border-gray-200 hover:border-[#5B9BD5] transition-colors">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
        <p className="text-gray-500 mt-1">{item.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-gray-400">
            User: {item.userId}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Data Preview Example</h2>
      
      {/* Example without filtering */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">All Data</h3>
        <DataPreviewContainer
          data={data}
          isLoading={isLoading}
          error={error}
          renderItem={renderItem}
        />
      </div>
      
      {/* Example with filtering */}
      <div>
        <h3 className="text-lg font-medium mb-2">Filtered by User ID</h3>
        <DataPreviewContainer
          data={data}
          userId="user123"
          isLoading={isLoading}
          error={error}
          renderItem={renderItem}
          emptyMessage="No data found for this user"
        />
      </div>
    </div>
  );
};

export default DataPreviewExample;
