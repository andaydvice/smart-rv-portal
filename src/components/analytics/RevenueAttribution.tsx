import { useEffect } from 'react';

interface RevenueAttributionProps {
  pageName: string;
  category?: string;
  products?: Array<{
    id: string;
    name: string;
    price: number;
    partner: string;
  }>;
}

const RevenueAttribution = ({ pageName, category, products = [] }: RevenueAttributionProps) => {
  
  useEffect(() => {
    // Track page visit for attribution
    const visitData = {
      page: pageName,
      category,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        partner: p.partner,
        estimatedCommission: calculateEstimatedCommission(p.price, p.partner)
      }))
    };

    // Revenue attribution logging removed for production
    
    // Store visit for attribution analysis
    const visits = JSON.parse(localStorage.getItem('revenue_attribution') || '[]');
    visits.push(visitData);
    localStorage.setItem('revenue_attribution', JSON.stringify(visits.slice(-100)));

    // Track product impressions
    const observeProductCards = () => {
      const productCards = document.querySelectorAll('[data-product-id]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const productId = entry.target.getAttribute('data-product-id');
            const product = products.find(p => p.id === productId);
            
            if (product) {
              const impressionData = {
                page: pageName,
                productId: product.id,
                productName: product.name,
                partner: product.partner,
                price: product.price,
                estimatedCommission: calculateEstimatedCommission(product.price, product.partner),
                timestamp: new Date().toISOString(),
                viewportPosition: entry.intersectionRatio
              };

              // Product impression logging removed for production
              
              const impressions = JSON.parse(localStorage.getItem('product_impressions') || '[]');
              impressions.push(impressionData);
              localStorage.setItem('product_impressions', JSON.stringify(impressions.slice(-200)));
            }
          }
        });
      }, { threshold: 0.5 });

      productCards.forEach(card => observer.observe(card));
      
      return () => observer.disconnect();
    };

    // Delay to ensure DOM is ready
    const timeoutId = setTimeout(observeProductCards, 1000);

    return () => clearTimeout(timeoutId);
  }, [pageName, category, products]);

  return null;
};

// Helper functions
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

function calculateEstimatedCommission(price: number, partner: string): number {
  // Estimated commission rates by partner
  const commissionRates: Record<string, number> = {
    'amazon': 0.04, // 4%
    'renogy': 0.08, // 8%
    'rvlife': 0.06, // 6%
    'goodsam': 0.05, // 5%
    'default': 0.05 // 5%
  };

  const rate = commissionRates[partner.toLowerCase()] || commissionRates.default;
  return Math.round(price * rate * 100) / 100; // Round to 2 decimal places
}

export default RevenueAttribution;