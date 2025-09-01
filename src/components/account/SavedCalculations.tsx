import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCalculatorHistory } from '@/hooks/useCalculatorHistory';
import { Calculator, Trash2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SavedCalculations = () => {
  const { history, deleteCalculation, isDeleting } = useCalculatorHistory();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    deleteCalculation(id);
    toast({
      title: "Calculation Deleted",
      description: "The saved calculation has been removed.",
    });
  };

  const getCalculatorDisplayName = (type: string) => {
    switch (type) {
      case 'gas-calculator':
        return 'Gas Cost Calculator';
      case 'fuel-efficiency':
        return 'Fuel Efficiency Calculator';
      case 'battery-capacity':
        return 'Battery Capacity Calculator';
      case 'power-consumption':
        return 'Power Consumption Calculator';
      case 'solar-panel':
        return 'Solar Panel Calculator';
      case 'tire-pressure':
        return 'Tire Pressure Optimizer';
      case 'towing-safety':
        return 'Towing Safety Calculator';
      case 'weight-distribution':
        return 'Weight Distribution Analyzer';
      case 'rv-cost':
        return 'RV Cost Calculator';
      default:
        return type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  const formatResultSummary = (type: string, results: any) => {
    switch (type) {
      case 'gas-calculator':
        return `$${results.totalCost?.toFixed(2) || '0'} (${results.gallonsNeeded?.toFixed(1) || '0'} gal)`;
      case 'fuel-efficiency':
        return `${results.mpg?.toFixed(1) || '0'} MPG`;
      case 'battery-capacity':
        return `${results.totalCapacity || '0'} Ah`;
      case 'power-consumption':
        return `${results.totalPower || '0'} W`;
      case 'solar-panel':
        return `${results.panelsNeeded || '0'} panels`;
      default:
        return JSON.stringify(results).substring(0, 50) + '...';
    }
  };

  if (history.length === 0) {
    return (
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-[#60A5FA] flex items-center">
            <Calculator className="h-6 w-6 mr-2" />
            Saved Calculations
          </CardTitle>
          <CardDescription className="text-gray-400">
            Your saved calculator results will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calculator className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No saved calculations yet</p>
            <Button 
              variant="outline" 
              className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-white"
              onClick={() => window.location.href = '/calculators'}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to Calculators
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-[#60A5FA] flex items-center">
          <Calculator className="h-6 w-6 mr-2" />
          Saved Calculations ({history.length})
        </CardTitle>
        <CardDescription className="text-gray-400">
          Access and manage your saved calculator results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((calculation) => (
            <div
              key={calculation.id}
              className="flex items-center justify-between p-4 bg-[#131a2a] rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="h-4 w-4 text-[#60A5FA]" />
                  <h3 className="font-semibold text-white">
                    {getCalculatorDisplayName(calculation.calculator_type)}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 mb-1">
                  Result: {formatResultSummary(calculation.calculator_type, calculation.results)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(calculation.created_at).toLocaleDateString()} at{' '}
                  {new Date(calculation.created_at).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-white"
                  onClick={() => window.location.href = '/calculators'}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => handleDelete(calculation.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedCalculations;