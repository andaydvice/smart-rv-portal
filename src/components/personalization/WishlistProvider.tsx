import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  partner: string;
  affiliate_link: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  category?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: Omit<WishlistItem, 'created_at' | 'updated_at' | 'user_id'>) => void;
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
          // Handle error silently
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
      // Handle error silently
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
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              partner: item.partner,
              affiliate_link: item.affiliate_link,
              category: item.category,
              user_id: user.id,
              created_at: item.created_at
            })));

          if (error) {
            // Handle error silently
          }
        }
      } else {
        // Save to localStorage for anonymous users
        localStorage.setItem('wishlist', JSON.stringify(newItems));
      }
    } catch (error) {
      // Handle error silently
    }
  };

  const addToWishlist = (item: Omit<WishlistItem, 'created_at' | 'updated_at' | 'user_id'>) => {
    const newItem: WishlistItem = {
      ...item,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'temp'
    };

    const newItems = [newItem, ...items.filter(existing => existing.id !== item.id)];
    setItems(newItems);
    saveWishlist(newItems);

  };

  const removeFromWishlist = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    saveWishlist(newItems);

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