import { useState, useMemo, useCallback } from 'react';
import { HotelProperty, FilterState, SortOption } from '@/types/hotel';
import { DEFAULT_FILTER_STATE } from '@/constants';
import { extractPrice, normalizePropertyType } from '@/utils/formatters';

interface UseFiltersReturn {
  filters: FilterState;
  sortOption: SortOption;
  setMinRating: (v: number) => void;
  setPriceRange: (min: number, max: number) => void;
  togglePropertyType: (type: string) => void;
  setFreeCancellationOnly: (v: boolean) => void;
  setSortOption: (v: SortOption) => void;
  resetFilters: () => void;
  filteredAndSorted: HotelProperty[];
  activeFilterCount: number;
}

export function useFilters(hotels: HotelProperty[]): UseFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.RELEVANCE);

  const setMinRating = useCallback((v: number) => {
    setFilters((prev) => ({ ...prev, minRating: v }));
  }, []);

  const setPriceRange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  }, []);

  const togglePropertyType = useCallback((type: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type],
    }));
  }, []);

  const setFreeCancellationOnly = useCallback((v: boolean) => {
    setFilters((prev) => ({ ...prev, freeCancellationOnly: v }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTER_STATE);
    setSortOption(SortOption.RELEVANCE);
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = [...hotels];

    // Filter by rating
    if (filters.minRating > 0) {
      result = result.filter((h) => (h.overall_rating ?? 0) >= filters.minRating);
    }

    // Filter by price
    if (filters.minPrice > 0 || filters.maxPrice < DEFAULT_FILTER_STATE.maxPrice) {
      result = result.filter((h) => {
        const price = extractPrice(h);
        if (price === Infinity) return true; // keep hotels with no price info
        return price >= filters.minPrice && price <= filters.maxPrice;
      });
    }

    // Filter by property types
    if (filters.propertyTypes.length > 0) {
      result = result.filter((h) =>
        filters.propertyTypes.includes(normalizePropertyType(h.type))
      );
    }

    // Filter by free cancellation
    if (filters.freeCancellationOnly) {
      result = result.filter((h) => h.free_cancellation === true);
    }

    // Sort
    switch (sortOption) {
      case SortOption.PRICE_ASC:
        result.sort((a, b) => extractPrice(a) - extractPrice(b));
        break;
      case SortOption.PRICE_DESC:
        result.sort((a, b) => extractPrice(b) - extractPrice(a));
        break;
      case SortOption.RATING_DESC:
        result.sort((a, b) => (b.overall_rating ?? 0) - (a.overall_rating ?? 0));
        break;
      case SortOption.REVIEWS_DESC:
        result.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
        break;
      default:
        // Keep original order (relevance)
        break;
    }

    return result;
  }, [hotels, filters, sortOption]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.minRating > 0) count++;
    if (filters.minPrice > DEFAULT_FILTER_STATE.minPrice || filters.maxPrice < DEFAULT_FILTER_STATE.maxPrice) count++;
    if (filters.propertyTypes.length > 0) count++;
    if (filters.freeCancellationOnly) count++;
    return count;
  }, [filters]);

  return {
    filters,
    sortOption,
    setMinRating,
    setPriceRange,
    togglePropertyType,
    setFreeCancellationOnly,
    setSortOption,
    resetFilters,
    filteredAndSorted,
    activeFilterCount,
  };
}
