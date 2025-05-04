
/**
 * Utility functions for normalizing and comparing state names
 */

// Map of state abbreviations to full names and vice versa
export const STATE_NAME_MAP: Record<string, string> = {
  // Abbreviation to full name
  'AZ': 'Arizona',
  'CA': 'California',
  'CO': 'Colorado',
  'TX': 'Texas',
  'FL': 'Florida',
  'NV': 'Nevada',
  'GA': 'Georgia',
  'IA': 'Iowa',
  'MN': 'Minnesota',
  'WI': 'Wisconsin',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'NY': 'New York',
  'OH': 'Ohio',
  'IN': 'Indiana',
  
  // Full name to abbreviation (for reverse lookup)
  'Arizona': 'AZ',
  'California': 'CA',
  'Colorado': 'CO',
  'Texas': 'TX',
  'Florida': 'FL',
  'Nevada': 'NV',
  'Georgia': 'GA',
  'Iowa': 'IA',
  'Minnesota': 'MN',
  'Wisconsin': 'WI',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'New York': 'NY',
  'Ohio': 'OH',
  'Indiana': 'IN'
};

/**
 * Normalizes state name to support both abbreviations and full names
 */
export const normalizeStateName = (state: string | null): string | null => {
  if (!state) return null;
  
  // Return the state as is, as both abbreviations and full names are already in STATE_NAME_MAP
  return state;
};

/**
 * Checks if two state names represent the same state
 * Can handle both abbreviations and full names
 */
export const areStatesEquivalent = (state1: string | null, state2: string | null): boolean => {
  if (state1 === state2) return true;
  if (!state1 || !state2) return false;
  
  // Check if state1 is the abbreviation or full name of state2
  if (STATE_NAME_MAP[state1] === state2) return true;
  
  // Check if state2 is the abbreviation or full name of state1
  if (STATE_NAME_MAP[state2] === state1) return true;
  
  return false;
};

/**
 * Gets all possible representations of a state (abbreviation and full name)
 */
export const getAllStateRepresentations = (state: string | null): string[] => {
  if (!state) return [];
  
  const representations = [state];
  if (STATE_NAME_MAP[state]) {
    representations.push(STATE_NAME_MAP[state]);
  }
  
  return representations;
};

