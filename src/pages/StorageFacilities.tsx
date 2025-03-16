import { Container } from "@/components/ui/container";
import StorageFacilitiesMap from "@/components/storage/StorageFacilitiesMap";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Warehouse } from "lucide-react";
import "../styles/force-markers.css"; // Only load the minimal, clean CSS

// Helper function to normalize state names consistently
const normalizeStateName = (stateAbbr: string): string => {
  return stateAbbr === 'AZ' ? 'Arizona' : 
         stateAbbr === 'CA' ? 'California' : 
         stateAbbr === 'CO' ? 'Colorado' :
         stateAbbr === 'TX' ? 'Texas' :
         stateAbbr === 'FL' ? 'Florida' :
         stateAbbr === 'NV' ? 'Nevada' :
         stateAbbr === 'GA' ? 'Georgia' :
         stateAbbr === 'IA' ? 'Iowa' :
         stateAbbr === 'MN' ? 'Minnesota' :
         stateAbbr === 'WI' ? 'Wisconsin' :
         stateAbbr === 'OR' ? 'Oregon' :
         stateAbbr === 'PA' ? 'Pennsylvania' :
         stateAbbr === 'NY' ? 'New York' :
         stateAbbr === 'OH' ? 'Ohio' :
         stateAbbr === 'IN' ? 'Indiana' :
         stateAbbr;
};

// Create a function to count facilities by state without relying on RPC
// This runs client-side when the Supabase RPC is not available
export async function getStateCountsWithSQL() {
  const { supabase } = await import('@/integrations/supabase/client');
  
  // Execute a plain SQL query
  const { data, error } = await supabase
    .from('storage_facilities')
    .select('state');
  
  if (error || !data) {
    console.error('Error fetching states:', error);
    return [];
  }
  
  // Count occurrences of each state using normalized state names
  const stateCounts: Record<string, number> = {};
  data.forEach(item => {
    if (!item.state) return;
    
    // Normalize the state name
    const normalizedState = normalizeStateName(item.state);
    
    // Add to counts with the normalized name
    stateCounts[normalizedState] = (stateCounts[normalizedState] || 0) + 1;
  });
  
  // Convert to array format
  return Object.entries(stateCounts).map(([state, count]) => ({
    state,
    count
  })).sort((a, b) => a.state.localeCompare(b.state));
}

export default function StorageFacilities() {
  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen w-full bg-[#080F1F] text-white">
        {/* Hero Header with Image */}
        <div className="relative w-full h-[400px]">
          <img 
            src="/lovable-uploads/e9503bf4-354a-4790-8a83-fefea32abc5b.png" 
            alt="Indoor RV Storage Facility" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] to-transparent">
            <Container className="h-full flex flex-col justify-center items-center" fullWidth>
              <div className="text-center max-w-3xl bg-black/40 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Warehouse className="h-7 w-7 text-[#F97316]" />
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Indoor RV Storage Facilities
                  </h1>
                </div>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Find the perfect indoor storage solution for your RV across the USA including Oregon, Pennsylvania, New York, Minnesota, Iowa, Wisconsin, California, Arizona, Colorado, Texas, Florida, Georgia and Nevada.
                </p>
              </div>
            </Container>
          </div>
        </div>
        
        <Container fullWidth className="px-2 md:px-4">
          <div className="py-8">
            <StorageFacilitiesMap />
          </div>
        </Container>
      </div>
    </Layout>
  );
}
