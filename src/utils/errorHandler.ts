import { ApiError } from '@/types/hotel';

export function parseApiError(error: unknown): ApiError {
  // Axios error with response
  if (isAxiosError(error) && error.response) {
    const status = error.response.status;
    const data = error.response.data as { error?: string } | null;
    const serverMessage = data?.error;

    switch (status) {
      case 400:
        return {
          message: serverMessage || 'Invalid search request. Please check your inputs.',
          code: 400,
          type: 'api',
        };
      case 401:
        return {
          message: 'Authentication failed. Please contact support.',
          code: 401,
          type: 'api',
        };
      case 403:
        return {
          message: 'Access denied. You do not have permission for this action.',
          code: 403,
          type: 'api',
        };
      case 404:
        return {
          message: 'The requested resource was not found.',
          code: 404,
          type: 'api',
        };
      case 429:
        return {
          message: 'Too many requests. Please wait a moment and try again.',
          code: 429,
          type: 'api',
        };
      case 502:
      case 503:
      case 504:
        return {
          message: 'The hotel search service is temporarily unavailable. Please try again shortly.',
          code: status,
          type: 'api',
        };
      default:
        return {
          message: serverMessage || 'An unexpected error occurred. Please try again.',
          code: status,
          type: 'api',
        };
    }
  }

  // Network / timeout
  if (isAxiosError(error) && error.code === 'ECONNABORTED') {
    return {
      message: 'The request timed out. Please check your connection and try again.',
      type: 'timeout',
    };
  }

  if (isAxiosError(error) && !error.response) {
    return {
      message: 'Network error. Please check your internet connection.',
      type: 'network',
    };
  }

  return {
    message: 'An unexpected error occurred. Please try again.',
    type: 'unknown',
  };
}

// Type guard for axios errors without importing axios
function isAxiosError(error: unknown): error is {
  response?: { status: number; data: unknown };
  code?: string;
  message: string;
} {
  return typeof error === 'object' && error !== null && 'message' in error;
}
