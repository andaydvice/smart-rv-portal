/**
 * Safe fetch wrapper to avoid postMessage errors in Lovable environment
 */
export const safeFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  try {
    // Clone options to avoid mutation and ensure serializable data
    const safeOptions: RequestInit = {
      method: options.method || 'GET',
      headers: options.headers ? JSON.parse(JSON.stringify(options.headers)) : {},
      body: options.body,
      mode: options.mode,
      credentials: options.credentials,
      cache: options.cache,
      redirect: options.redirect,
      referrer: options.referrer,
      integrity: options.integrity,
    };

    // Remove undefined values to ensure clean serialization
    Object.keys(safeOptions).forEach(key => {
      if (safeOptions[key as keyof RequestInit] === undefined) {
        delete safeOptions[key as keyof RequestInit];
      }
    });

    return await fetch(url, safeOptions);
  } catch (error) {
    console.error('Safe fetch error:', error);
    throw error;
  }
};

/**
 * Safe API call with error handling
 */
export const safeApiCall = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const response = await safeFetch(url, options);
    
    if (!response.ok) {
      return { data: null, error: `HTTP ${response.status}: ${response.statusText}` };
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { data: null, error: errorMessage };
  }
};