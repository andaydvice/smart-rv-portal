import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  partner: string;
  affiliateLink: string;
  addedAt: string;
  category?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Load from Supabase for authenticated users
        const { data, error } = await supabase
          .from('user_wishlists')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading wishlist:', error);
        } else {
          setItems(data || []);
        }
      } else {
        // Load from localStorage for anonymous users
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          setItems(JSON.parse(savedWishlist));
        }
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveWishlist = async (newItems: WishlistItem[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Save to Supabase for authenticated users
        // For simplicity, we'll clear and re-insert (in production, you'd want smarter sync)
        await supabase
          .from('user_wishlists')
          .delete()
          .eq('user_id', user.id);

        if (newItems.length > 0) {
          const { error } = await supabase
            .from('user_wishlists')
            .insert(newItems.map(item => ({
              ...item,
              user_id: user.id,
              created_at: item.addedAt
            })));

          if (error) {
            console.error('Error saving wishlist:', error);
          }
        }
      } else {
        // Save to localStorage for anonymous users
        localStorage.setItem('wishlist', JSON.stringify(newItems));
      }
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  };

  const addToWishlist = (item: Omit<WishlistItem, 'addedAt'>) => {
    const newItem = {
      ...item,
      addedAt: new Date().toISOString()
    };

    const newItems = [newItem, ...items.filter(existing => existing.id !== item.id)];
    setItems(newItems);
    saveWishlist(newItems);

    // Track wishlist addition
    console.log('Wishlist Addition:', {
      itemId: item.id,
      itemName: item.name,
      partner: item.partner,
      price: item.price,
      timestamp: new Date().toISOString()
    });
  };

  const removeFromWishlist = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    saveWishlist(newItems);

    // Track wishlist removal
    console.log('Wishlist Removal:', {
      itemId: id,
      timestamp: new Date().toISOString()
    });
  };

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
    saveWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      loading
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};