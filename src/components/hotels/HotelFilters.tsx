'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Tag, CheckCircle2, Star } from 'lucide-react';
import { FilterState } from '@/types/hotel';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PROPERTY_TYPES, DEFAULT_FILTER_STATE } from '@/constants';
import { cn } from '@/lib/utils';

interface HotelFiltersProps {
  filters: FilterState;
  activeFilterCount: number;
  onMinRating: (v: number) => void;
  onPriceRange: (min: number, max: number) => void;
  onTogglePropertyType: (type: string) => void;
  onFreeCancellation: (v: boolean) => void;
  onReset: () => void;
}

const STAR_OPTIONS = [0, 3, 3.5, 4, 4.5];

export default function HotelFilters({
  filters,
  activeFilterCount,
  onMinRating,
  onPriceRange,
  onTogglePropertyType,
  onFreeCancellation,
  onReset,
}: HotelFiltersProps) {
  return (
    <aside
      className="w-full lg:w-72 shrink-0"
      aria-label="Hotel filters"
      role="complementary"
    >
      <div className="sticky top-20 bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl p-5 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold text-neutral-100">Filters</span>
            {activeFilterCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-[10px] font-bold text-white"
              >
                {activeFilterCount}
              </motion.span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-7 px-2 text-xs text-neutral-400 hover:text-neutral-100"
              aria-label="Reset all filters"
            >
              <X className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
        </div>

        <Separator />

        {/* Minimum Rating */}
        <FilterSection
          icon={<Star className="h-3.5 w-3.5 text-amber-400" />}
          title="Minimum Rating"
        >
          <div className="flex flex-wrap gap-1.5">
            {STAR_OPTIONS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => onMinRating(v)}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                  filters.minRating === v
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
                )}
                aria-pressed={filters.minRating === v}
                aria-label={v === 0 ? 'Any rating' : `${v}+ stars`}
              >
                {v === 0 ? (
                  'Any'
                ) : (
                  <>
                    <Star className="h-2.5 w-2.5 fill-current" />
                    {v}+
                  </>
                )}
              </button>
            ))}
          </div>
        </FilterSection>

        <Separator />

        {/* Price Range */}
        <FilterSection
          icon={<Tag className="h-3.5 w-3.5 text-blue-400" />}
          title="Price Range (per night)"
        >
          <div className="px-1 space-y-3">
            <Slider
              min={0}
              max={DEFAULT_FILTER_STATE.maxPrice}
              step={500}
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) => onPriceRange(min, max)}
              aria-label="Price range slider"
            />
            <div className="flex justify-between text-xs text-neutral-400">
              <span>₹{filters.minPrice.toLocaleString()}</span>
              <span>₹{filters.maxPrice.toLocaleString()}{filters.maxPrice >= DEFAULT_FILTER_STATE.maxPrice ? '+' : ''}</span>
            </div>
          </div>
        </FilterSection>

        <Separator />

        {/* Property Type */}
        <FilterSection
          icon={<Tag className="h-3.5 w-3.5 text-purple-400" />}
          title="Property Type"
        >
          <div className="space-y-2.5">
            {PROPERTY_TYPES.map((type) => (
              <div key={type} className="flex items-center gap-2.5">
                <Checkbox
                  id={`type-${type.toLowerCase().replace(/\s/g, '-')}`}
                  checked={filters.propertyTypes.includes(type)}
                  onCheckedChange={() => onTogglePropertyType(type)}
                />
                <Label
                  htmlFor={`type-${type.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-xs text-neutral-300 cursor-pointer font-normal"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        <Separator />

        {/* Free Cancellation */}
        <FilterSection
          icon={<CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
          title="Cancellation"
        >
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="free-cancellation"
              checked={filters.freeCancellationOnly}
              onCheckedChange={(v) => onFreeCancellation(v === true)}
            />
            <Label
              htmlFor="free-cancellation"
              className="text-xs text-neutral-300 cursor-pointer font-normal"
            >
              Free cancellation only
            </Label>
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}

function FilterSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        {icon}
        <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}
