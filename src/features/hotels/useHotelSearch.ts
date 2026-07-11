'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { searchHotels, HotelSearchParams } from '@/services/hotelService';
import { HotelProperty, ApiError } from '@/types/hotel';
import { parseApiError } from '@/utils/errorHandler';
import { STALE_TIME_MS } from '@/constants';
import { useState, useCallback } from 'react';

interface UseHotelSearchReturn {
  hotels: HotelProperty[];
  isLoading: boolean;
  isFetching: boolean;
  error: ApiError | null;
  hasSearched: boolean;
  search: (params: HotelSearchParams) => void;
  reset: () => void;
}

export function useHotelSearch(): UseHotelSearchReturn {
  const [searchParams, setSearchParams] = useState<HotelSearchParams | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const queryKey = searchParams
    ? ['hotels', searchParams]
    : ['hotels', null];

  const { data, isLoading, isFetching, error: queryError } = useQuery({
    queryKey,
    queryFn: () => {
      if (!searchParams) return Promise.resolve({ properties: [] });
      return searchHotels(searchParams);
    },
    enabled: searchParams !== null,
    staleTime: STALE_TIME_MS,
    retry: 1,
    placeholderData: keepPreviousData,
  });

  const search = useCallback((params: HotelSearchParams) => {
    setHasSearched(true);
    setSearchParams(params);
  }, []);

  const reset = useCallback(() => {
    setHasSearched(false);
    setSearchParams(null);
  }, []);

  const error: ApiError | null = queryError ? parseApiError(queryError) : null;
  const hotels = data?.properties ?? [];

  return {
    hotels,
    isLoading: isLoading && isFetching,
    isFetching,
    error,
    hasSearched,
    search,
    reset,
  };
}
