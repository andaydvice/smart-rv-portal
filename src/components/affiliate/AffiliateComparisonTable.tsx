import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Star, ExternalLink } from 'lucide-react';

interface ComparisonProduct {
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  features: {
    [key: string]: boolean | string;
  };
  pros: string[];
  cons: string[];
  affiliateLink: string;
  badge?: string;
  image: string;
}

interface AffiliateComparisonTableProps {
  title: string;
  products: ComparisonProduct[];
  featureCategories: {
    title: string;
    features: string[];
  }[];
  className?: string;
}

const AffiliateComparisonTable = ({
  title,
  products,
  featureCategories,
  className = ""
}: AffiliateComparisonTableProps) => {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-400" />
      ) : (
        <X className="h-5 w-5 text-red-400" />
      );
    }
    return <span className="text-sm text-gray-300">{value}</span>;
  };

  return (
    <Card className={`bg-[#091020] border-gray-700 text-white ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl text-[#5B9BD5]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mobile-first responsive design */}
        <div className="lg:hidden space-y-6">
          {products.map((product, index) => (
            <div key={index} className="bg-[#131a2a] rounded-lg p-4 border border-gray-700">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{product.name}</h3>
                    {product.badge && (
                      <span className="bg-[#5B9BD5] text-white px-2 py-1 text-xs rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">({product.rating})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-[#5B9BD5]">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                {featureCategories.map((category) => (
                  <div key={category.title}>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">{category.title}</h4>
                    <div className="space-y-1">
                      {category.features.map((feature) => (
                        <div key={feature} className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">{feature}</span>
                          {renderFeatureValue(product.features[feature])}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                asChild
                className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white min-h-[44px] touch-manipulation"
              >
                <a 
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Check Price
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Desktop table view */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 font-medium text-gray-300">Product</th>
                {products.map((product, index) => (
                  <th key={index} className="text-center p-4 min-w-[200px]">
                    <div className="space-y-2">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg mx-auto"
                      />
                      <div className="flex items-center justify-center gap-2">
                        <h3 className="font-semibold text-white">{product.name}</h3>
                        {product.badge && (
                          <span className="bg-[#5B9BD5] text-white px-2 py-1 text-xs rounded-full">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg font-bold text-[#5B9BD5]">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <Button 
                        asChild
                        size="sm"
                        className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
                      >
                        <a 
                          href={product.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          Check Price
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureCategories.map((category) => (
                <React.Fragment key={category.title}>
                  <tr>
                    <td colSpan={products.length + 1} className="p-4 bg-[#131a2a] font-medium text-gray-300 border-b border-gray-700">
                      {category.title}
                    </td>
                  </tr>
                  {category.features.map((feature, featureIndex) => (
                    <tr key={featureIndex} className="border-b border-gray-700/50">
                      <td className="p-4 text-gray-400">{feature}</td>
                      {products.map((product, productIndex) => (
                        <td key={productIndex} className="p-4 text-center">
                          {renderFeatureValue(product.features[feature])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-6">
          *This comparison contains affiliate links. We may earn a commission at no extra cost to you.
        </p>
      </CardContent>
    </Card>
  );
};

export default AffiliateComparisonTable;