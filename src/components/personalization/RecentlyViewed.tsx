import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ExternalLink, X } from 'lucide-react';

interface ViewedItem {
  id: string;
  name: string;
  price: number;
  image: string;
  partner: string;
  affiliateLink: string;
  category: string;
  viewedAt: string;
  page: string;
}

interface RecentlyViewedProps {
  currentItem?: Omit<ViewedItem, 'viewedAt'>;
  maxItems?: number;
  className?: string;
}

const RecentlyViewed = ({ 
  currentItem, 
  maxItems = 10, 
  className = "" 
}: RecentlyViewedProps) => {
  const [viewedItems, setViewedItems] = useState<ViewedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  useEffect(() => {
    if (currentItem) {
      addToRecentlyViewed(currentItem);
    }
  }, [currentItem]);

  const loadRecentlyViewed = () => {
    try {
      const saved = localStorage.getItem('recently_viewed');
      if (saved) {
        const items = JSON.parse(saved);
        setViewedItems(items.slice(0, maxItems));
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToRecentlyViewed = (item: Omit<ViewedItem, 'viewedAt'>) => {
    const viewedItem: ViewedItem = {
      ...item,
      viewedAt: new Date().toISOString()
    };

    const updated = [
      viewedItem,
      ...viewedItems.filter(existing => existing.id !== item.id)
    ].slice(0, maxItems);

    setViewedItems(updated);
    localStorage.setItem('recently_viewed', JSON.stringify(updated));

    // Track viewing
    console.log('Item Viewed:', {
      itemId: item.id,
      itemName: item.name,
      category: item.category,
      partner: item.partner,
      page: item.page,
      timestamp: new Date().toISOString()
    });
  };

  const removeItem = (id: string) => {
    const updated = viewedItems.filter(item => item.id !== id);
    setViewedItems(updated);
    localStorage.setItem('recently_viewed', JSON.stringify(updated));
  };

  const clearAll = () => {
    setViewedItems([]);
    localStorage.removeItem('recently_viewed');
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-700 rounded w-1/3 mb-3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (viewedItems.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#5B9BD5]" />
          Recently Viewed
        </h3>
        
        {viewedItems.length > 0 && (
          <Button
            onClick={clearAll}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {viewedItems.map(item => (
          <Card 
            key={item.id} 
            className="bg-[#091020] border-gray-700 hover:border-[#5B9BD5]/50 transition-all duration-200 group"
          >
            <CardContent className="p-3">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                
                <Button
                  onClick={() => removeItem(item.id)}
                  size="sm"
                  variant="ghost"
                  className="absolute top-1 right-1 h-6 w-6 p-0 bg-black/50 hover:bg-black/75 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white line-clamp-2">
                  {item.name}
                </h4>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#5B9BD5] font-bold text-sm">
                    ${item.price}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">
                    {item.partner}
                  </span>
                </div>

                <div className="text-xs text-gray-500">
                  Viewed {formatRelativeTime(item.viewedAt)}
                </div>

                <Button
                  asChild
                  size="sm"
                  className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                >
                  <a 
                    href={item.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    View Again
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default RecentlyViewed;