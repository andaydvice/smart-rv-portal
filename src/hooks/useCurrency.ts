import { useState, useEffect } from 'react';
import { useGeoLocation } from './useGeoLocation';

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyData {
  primaryCurrency: string;
  secondaryCurrency?: string;
  exchangeRate: number;
  lastUpdated: Date;
}

export const useCurrency = () => {
  const { geoData } = useGeoLocation();
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [currencyData, setCurrencyData] = useState<CurrencyData>({
    primaryCurrency: 'USD',
    exchangeRate: 1,
    lastUpdated: new Date()
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);

  useEffect(() => {
    updateCurrencyData();
  }, [geoData]);

  const updateCurrencyData = async () => {
    // USD is always primary currency
    const primary = 'USD';
    const secondary = geoData.isUSA ? undefined : geoData.currency;

    if (!secondary || secondary === 'USD') {
      setCurrencyData({
        primaryCurrency: primary,
        exchangeRate: 1,
        lastUpdated: new Date()
      });
      return;
    }

    setIsLoading(true);
    try {
      const rate = await fetchExchangeRate('USD', secondary);
      setCurrencyData({
        primaryCurrency: primary,
        secondaryCurrency: secondary,
        exchangeRate: rate,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.warn('Failed to fetch exchange rate:', error);
      // Fallback to USD only
      setCurrencyData({
        primaryCurrency: primary,
        exchangeRate: 1,
        lastUpdated: new Date()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchExchangeRate = async (from: string, to: string): Promise<number> => {
    // Use multiple fallback APIs for exchange rates
    const apis = [
      () => fetchFromFreeCurrencyAPI(from, to),
      () => fetchFromExchangeRateAPI(from, to),
      () => fetchFromFallbackAPI(from, to)
    ];

    for (const api of apis) {
      try {
        const rate = await api();
        if (rate && rate > 0) {
          return rate;
        }
      } catch (error) {
        console.warn('Exchange rate API failed:', error);
      }
    }

    // Return approximate static rates as last resort
    return getStaticExchangeRate(from, to);
  };

  const fetchFromFreeCurrencyAPI = async (from: string, to: string): Promise<number> => {
    const response = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_placeholder&currencies=${to}&base_currency=${from}`
    );
    const data = await response.json();
    return data.data[to];
  };

  const fetchFromExchangeRateAPI = async (from: string, to: string): Promise<number> => {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );
    const data = await response.json();
    return data.rates[to];
  };

  const fetchFromFallbackAPI = async (from: string, to: string): Promise<number> => {
    // Simple HTTP API fallback
    const response = await fetch(
      `https://api.fxratesapi.com/latest?base=${from}&symbols=${to}`
    );
    const data = await response.json();
    return data.rates[to];
  };

  const getStaticExchangeRate = (from: string, to: string): number => {
    // Approximate rates for major currencies (updated periodically)
    const staticRates: Record<string, number> = {
      'CAD': 1.35,
      'EUR': 0.85,
      'GBP': 0.73,
      'AUD': 1.52,
      'JPY': 150,
    };
    return staticRates[to] || 1;
  };

  const formatPrice = (price: number, options?: { 
    showBoth?: boolean; 
    primary?: boolean;
    compact?: boolean;
  }) => {
    const { showBoth = showSecondary, primary = true, compact = false } = options || {};
    
    const formatCurrency = (amount: number, currency: string) => {
      try {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: compact ? 0 : 2,
          maximumFractionDigits: compact ? 0 : 2,
        }).format(amount);
      } catch (error) {
        return `${currency} ${amount.toFixed(compact ? 0 : 2)}`;
      }
    };

    const primaryPrice = formatCurrency(price, currencyData.primaryCurrency);
    
    if (!showBoth || !currencyData.secondaryCurrency) {
      return primaryPrice;
    }

    const secondaryAmount = price * currencyData.exchangeRate;
    const secondaryPrice = formatCurrency(secondaryAmount, currencyData.secondaryCurrency);

    if (primary) {
      return `${primaryPrice} (≈${secondaryPrice})`;
    } else {
      return `${secondaryPrice} (≈${primaryPrice})`;
    }
  };

  const convertPrice = (price: number, targetCurrency?: string): number => {
    if (!targetCurrency || targetCurrency === 'USD') {
      return price;
    }
    
    if (targetCurrency === currencyData.secondaryCurrency) {
      return price * currencyData.exchangeRate;
    }
    
    return price; // Fallback to original price
  };

  const toggleCurrencyDisplay = () => {
    setShowSecondary(!showSecondary);
    localStorage.setItem('show_secondary_currency', JSON.stringify(!showSecondary));
  };

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem('show_secondary_currency');
    if (saved) {
      try {
        setShowSecondary(JSON.parse(saved));
      } catch (error) {
        console.warn('Invalid currency display preference:', error);
      }
    }
  }, []);

  return {
    currencyData,
    isLoading,
    showSecondary,
    formatPrice,
    convertPrice,
    toggleCurrencyDisplay,
    updateCurrencyData
  };
};