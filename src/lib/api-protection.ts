
/**
 * API Protection Utilities
 * @deprecated Use src/lib/request.js instead
 */

import { toast } from "@/hooks/use-toast";
import { request } from "./request.js";

// Rate limiting cache
interface RateLimitCache {
  [endpoint: string]: {
    count: number;
    resetTime: number;
  };
}

const API_RATE_LIMITS: RateLimitCache = {};
const DEFAULT_LIMIT = 5; // Default requests per minute
const DEFAULT_WINDOW = 60000; // 1 minute in ms

/**
 * Checks if a request is allowed based on rate limiting rules
 * @param endpoint Unique identifier for the API endpoint
 * @param limit Maximum number of requests in the time window
 * @param timeWindow Time window in milliseconds
 * @returns Whether the request should proceed
 * @deprecated Use request.js directly instead
 */
export const checkRateLimit = (endpoint: string, limit = DEFAULT_LIMIT, timeWindow = DEFAULT_WINDOW): boolean => {
  console.warn("api-protection.ts is deprecated. Use src/lib/request.js instead.");
  
  const now = Date.now();
  
  // Initialize or reset expired entries
  if (!API_RATE_LIMITS[endpoint] || API_RATE_LIMITS[endpoint].resetTime < now) {
    API_RATE_LIMITS[endpoint] = {
      count: 1,
      resetTime: now + timeWindow
    };
    return true;
  }
  
  // Check if limit exceeded
  if (API_RATE_LIMITS[endpoint].count >= limit) {
    const waitSeconds = Math.ceil((API_RATE_LIMITS[endpoint].resetTime - now) / 1000);
    toast({
      title: "Too many requests",
      description: `Please wait ${waitSeconds} seconds before trying again.`,
      variant: "destructive"
    });
    return false;
  }
  
  // Increment counter and allow request
  API_RATE_LIMITS[endpoint].count += 1;
  return true;
};

/**
 * Wrapper for fetch with additional security and error handling
 * @deprecated Use request.js directly instead
 */
export const secureFetch = async (url: string, options: RequestInit = {}) => {
  console.warn("secureFetch is deprecated. Use src/lib/request.js instead.");
  
  // Forward to new request system
  return request(url, options).then(response => response.response);
};
