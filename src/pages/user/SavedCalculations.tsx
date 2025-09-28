import React, { useState } from "react";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { Calculator, Trash2, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const SavedCalculations = () => {
  const { history, deleteCalculation, isDeleting } = useCalculatorHistory();
  const [filterType, setFilterType] = useState<string>("all");

  const filteredHistory = filterType === "all" 
    ? history 
    : history.filter(calc => calc.calculator_type === filterType);

  const calculatorTypes = [...new Set(history.map(calc => calc.calculator_type))];

  const formatCalculatorType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatInputs = (inputs: Record<string, any>) => {
    return Object.entries(inputs)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .slice(0, 3)
      .map(([key, value]) => {
        if (typeof value === 'number') {
          return `${key}: ${value}`;
        }
        if (typeof value === 'string' && !isNaN(parseFloat(value))) {
          return `${key}: ${parseFloat(value)}`;
        }
        return `${key}: ${value}`;
      })
      .join(', ');
  };

  const formatResults = (type: string, results: Record<string, any>) => {
    // Check for pre-formatted results first
    if (results.totalCostFormatted) return results.totalCostFormatted;
    if (results.efficiencyRatingFormatted) return results.efficiencyRatingFormatted;
    if (results.gallonsNeededFormatted && results.totalCostFormatted) {
      return `${results.gallonsNeededFormatted}, ${results.totalCostFormatted}`;
    }
    
    // Fallback formatting for older data
    switch (type) {
      case 'rv_cost':
        if (typeof results.totalCost === 'number') {
          return `Total: $${results.totalCost.toFixed(2)}`;
        }
        break;
      case 'gas_cost':
      case 'gas-calculator':
        if (typeof results.totalCost === 'number' && typeof results.gallonsNeeded === 'number') {
          return `${results.gallonsNeeded.toFixed(2)} gallons, $${results.totalCost.toFixed(2)}`;
        }
        break;
      case 'trip_efficiency':
        if (typeof results.efficiencyRating === 'number') {
          return `${results.efficiencyRating.toFixed(1)}% efficiency`;
        }
        break;
      default:
        // Generic fallback for any numeric result
        const firstNumericResult = Object.entries(results).find(([_, value]) => typeof value === 'number');
        if (firstNumericResult) {
          return `${firstNumericResult[0]}: ${firstNumericResult[1]}`;
        }
    }
    
    // Last resort - show first non-object value
    const firstValidResult = Object.entries(results).find(([_, value]) => 
      typeof value !== 'object' && value !== null && value !== undefined
    );
    return firstValidResult ? `${firstValidResult[0]}: ${firstValidResult[1]}` : 'No valid results';
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <DashboardHeader 
          title="Saved Calculations"
          description="View and manage your calculation history"
        />

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#60A5FA]" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 bg-[#091020] border-gray-700 text-white">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-[#091020] border-gray-700">
                <SelectItem value="all">All Calculations</SelectItem>
                {calculatorTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {formatCalculatorType(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-[#E2E8FF] text-sm flex items-center">
            Showing {filteredHistory.length} of {history.length} calculations
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <Card className="bg-[#091020] border-gray-700">
            <CardContent className="p-12 text-center">
              <Calculator className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No calculations found</h3>
              <p className="text-gray-400 mb-6">
                {filterType === "all" 
                  ? "Start using our calculators to see your saved results here"
                  : `No ${formatCalculatorType(filterType)} calculations found`
                }
              </p>
              <Button 
                onClick={() => window.location.href = '/calculators'}
                className="bg-[#60A5FA] hover:bg-blue-600"
              >
                Go to Calculators
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((calculation) => (
              <Card key={calculation.id} className="bg-[#091020] border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#60A5FA] text-lg">
                      {formatCalculatorType(calculation.calculator_type)}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCalculation(calculation.id)}
                      disabled={isDeleting}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-[#E2E8FF] flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(calculation.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Inputs:</h4>
                    <p className="text-gray-400 text-sm">
                      {formatInputs(calculation.inputs) || 'No input data'}
                    </p>
                  </div>
                  
                  {calculation.results && Object.keys(calculation.results).length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Results:</h4>
                      <p className="text-[#60A5FA] text-sm font-medium">
                        {formatResults(calculation.calculator_type, calculation.results)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCalculations;