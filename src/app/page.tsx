'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchHero from '@/components/search/SearchHero';
import SearchCard from '@/components/search/SearchCard';
import HotelGrid from '@/components/hotels/HotelGrid';
import HotelFilters from '@/components/hotels/HotelFilters';
import SortDropdown from '@/components/hotels/SortDropdown';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import Pagination from '@/components/common/Pagination';
import { useHotelSearch } from '@/features/hotels/useHotelSearch';
import { useFilters } from '@/hooks/useFilters';
import { ITEMS_PER_PAGE } from '@/constants';
import { HotelSearchParams } from '@/services/hotelService';

export default function HomePage() {
  const { hotels, isLoading, error, hasSearched, search } = useHotelSearch();
  const {
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
  } = useFilters(hotels);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);

  const paginatedHotels = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSorted, currentPage]);

  // Reset to page 1 whenever filters or sort change
  const handleMinRating = useCallback(
    (v: number) => { setMinRating(v); setCurrentPage(1); },
    [setMinRating]
  );
  const handlePriceRange = useCallback(
    (min: number, max: number) => { setPriceRange(min, max); setCurrentPage(1); },
    [setPriceRange]
  );
  const handleToggleType = useCallback(
    (t: string) => { togglePropertyType(t); setCurrentPage(1); },
    [togglePropertyType]
  );
  const handleFreeCancellation = useCallback(
    (v: boolean) => { setFreeCancellationOnly(v); setCurrentPage(1); },
    [setFreeCancellationOnly]
  );
  const handleSort = useCallback(
    (v: Parameters<typeof setSortOption>[0]) => { setSortOption(v); setCurrentPage(1); },
    [setSortOption]
  );
  const handleResetFilters = useCallback(() => {
    resetFilters();
    setCurrentPage(1);
  }, [resetFilters]);

  const handleSearch = useCallback(
    (params: HotelSearchParams) => {
      search(params);
      setCurrentPage(1);
      handleResetFilters();
      // Smooth scroll to results after search
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    },
    [search, handleResetFilters]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    []
  );

  // Determine which empty state to show
  const showInitial = !hasSearched && !isLoading;
  const showNoResults = hasSearched && !isLoading && !error && hotels.length === 0;
  const showFilterEmpty =
    hasSearched && !isLoading && !error && hotels.length > 0 && filteredAndSorted.length === 0;
  const showResults = hasSearched && !isLoading && !error && paginatedHotels.length > 0;

  return (
    <>
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-[#6E473B]/20 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#A78D78]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-[#BEB5A9]/5 blur-[100px]" />
      </div>

      <main id="main-content" className="relative z-10 min-h-screen">
        {/* Hero + Search */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SearchHero />

          {/* Search Card */}
          <div className="relative mb-12">
            <SearchCard onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>

        {/* Results Area */}
        <div
          ref={resultsRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        >
          <AnimatePresence mode="wait">
            {/* Initial state */}
            {showInitial && (
              <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState type="initial" />
              </motion.div>
            )}

            {/* Loading */}
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-6">
                  <div className="h-6 w-48 bg-neutral-800 animate-pulse rounded-lg" />
                </div>
                <LoadingSkeleton count={8} />
              </motion.div>
            )}

            {/* Error */}
            {!isLoading && error && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ErrorState error={error} onRetry={() => window.location.reload()} />
              </motion.div>
            )}

            {/* No results */}
            {showNoResults && (
              <motion.div key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState type="no-results" />
              </motion.div>
            )}

            {/* Results */}
            {(showResults || showFilterEmpty) && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Filters sidebar */}
                  <HotelFilters
                    filters={filters}
                    activeFilterCount={activeFilterCount}
                    onMinRating={handleMinRating}
                    onPriceRange={handlePriceRange}
                    onTogglePropertyType={handleToggleType}
                    onFreeCancellation={handleFreeCancellation}
                    onReset={handleResetFilters}
                  />

                  {/* Main results column */}
                  <div className="flex-1 min-w-0">
                    {/* Sort + count bar */}
                    <div className="mb-5">
                      <SortDropdown
                        value={sortOption}
                        onChange={handleSort}
                        resultCount={filteredAndSorted.length}
                      />
                    </div>

                    {/* Filter empty state */}
                    {showFilterEmpty ? (
                      <EmptyState type="filter-empty" onReset={handleResetFilters} />
                    ) : (
                      <>
                        <HotelGrid hotels={paginatedHotels} />
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
