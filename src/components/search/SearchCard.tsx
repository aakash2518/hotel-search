'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Globe,
  ChevronDown,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { searchSchema, SearchSchemaValues } from '@/schemas/searchSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CURRENCIES, LANGUAGES } from '@/constants';
import { cn } from '@/lib/utils';
import { HotelSearchParams } from '@/services/hotelService';

interface SearchCardProps {
  onSearch: (params: HotelSearchParams) => void;
  isLoading: boolean;
}

export default function SearchCard({ onSearch, isLoading }: SearchCardProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SearchSchemaValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      city: '',
      checkIn: '',
      checkOut: '',
      adults: '2',
      children: '0',
      currency: 'INR',
      language: 'en',
    },
    mode: 'onBlur',
  });

  function onSubmit(data: SearchSchemaValues) {
    const params: HotelSearchParams = { city: data.city };
    if (data.checkIn) params.checkIn = data.checkIn;
    if (data.checkOut) params.checkOut = data.checkOut;
    if (data.adults && data.adults !== '0') params.adults = data.adults;
    if (data.children && data.children !== '0') params.children = data.children;
    if (data.currency) params.currency = data.currency;
    if (data.language) params.language = data.language;
    onSearch(params);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.3 }}
      className="w-full max-w-6xl mx-auto px-4"
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 max-w-6xl mx-auto rounded-3xl"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(167,141,120,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Hotel search form"
        className="relative bg-[#291C0E]/60 backdrop-blur-2xl border border-[#A78D78]/20 rounded-3xl shadow-2xl shadow-black/50 p-6 md:p-8"
      >
        {/* Main row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-start">
          {/* City */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-1.5">
            <Label htmlFor="city" className="flex items-center gap-1.5 text-[#E1D4C2]">
              <MapPin className="h-3.5 w-3.5 text-[#A78D78]" />
              Destination <span className="text-red-400 text-xs">*</span>
            </Label>
            <div className="relative">
              <Input
                id="city"
                type="text"
                placeholder="City, region, or country"
                aria-required="true"
                aria-describedby={errors.city ? 'city-error' : undefined}
                aria-invalid={!!errors.city}
                {...register('city')}
                className={cn(
                  'pl-4',
                  errors.city && 'border-red-500/60 focus-visible:ring-red-500'
                )}
              />
            </div>
            <FieldError id="city-error" message={errors.city?.message} />
          </div>

          {/* Check In */}
          <div className="lg:col-span-2 space-y-1.5">
            <Label htmlFor="checkIn" className="flex items-center gap-1.5 text-[#E1D4C2]">
              <Calendar className="h-3.5 w-3.5 text-[#A78D78]" />
              Check-in
            </Label>
            <Input
              id="checkIn"
              type="date"
              aria-describedby={errors.checkIn ? 'checkin-error' : undefined}
              aria-invalid={!!errors.checkIn}
              {...register('checkIn')}
              className={cn(errors.checkIn && 'border-red-500/60 focus-visible:ring-red-500')}
            />
            <FieldError id="checkin-error" message={errors.checkIn?.message} />
          </div>

          {/* Check Out */}
          <div className="lg:col-span-2 space-y-1.5">
            <Label htmlFor="checkOut" className="flex items-center gap-1.5 text-[#E1D4C2]">
              <Calendar className="h-3.5 w-3.5 text-[#A78D78]" />
              Check-out
            </Label>
            <Input
              id="checkOut"
              type="date"
              aria-describedby={errors.checkOut ? 'checkout-error' : undefined}
              aria-invalid={!!errors.checkOut}
              {...register('checkOut')}
              className={cn(errors.checkOut && 'border-red-500/60 focus-visible:ring-red-500')}
            />
            <FieldError id="checkout-error" message={errors.checkOut?.message} />
          </div>

          {/* Adults + Children */}
          <div className="lg:col-span-2 space-y-1.5">
            <Label className="flex items-center gap-1.5 text-[#E1D4C2]">
              <Users className="h-3.5 w-3.5 text-[#A78D78]" />
              Guests
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  id="adults"
                  type="number"
                  min="1"
                  max="20"
                  placeholder="Adults"
                  aria-label="Number of adults"
                  aria-describedby={errors.adults ? 'adults-error' : undefined}
                  {...register('adults')}
                  className={cn(errors.adults && 'border-red-500/60')}
                />
              </div>
              <div>
                <Input
                  id="children"
                  type="number"
                  min="0"
                  max="10"
                  placeholder="Kids"
                  aria-label="Number of children"
                  aria-describedby={errors.children ? 'children-error' : undefined}
                  {...register('children')}
                  className={cn(errors.children && 'border-red-500/60')}
                />
              </div>
            </div>
            <FieldError id="adults-error" message={errors.adults?.message || errors.children?.message} />
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2 space-y-1.5">
            <Label className="invisible select-none" aria-hidden="true">Search</Label>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full h-11 text-sm bg-gradient-to-r from-[#6E473B] to-[#A78D78] text-[#E1D4C2] border-0 hover:from-[#A78D78] hover:to-[#BEB5A9] hover:text-[#291C0E] shadow-lg shadow-[#6E473B]/30 transition-all duration-300"
              aria-label={isLoading ? 'Searching for hotels…' : 'Search hotels'}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching…
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Optional row - collapsed toggle */}
        <AdvancedOptions control={control} errors={errors} />
      </form>
    </motion.div>
  );
}

// ─── Advanced Options Row ────────────────────────────────────────────────────
import { useState } from 'react';
import type { Control, FieldErrors } from 'react-hook-form';

function AdvancedOptions({
  control,
  errors,
}: {
  control: Control<SearchSchemaValues>;
  errors: FieldErrors<SearchSchemaValues>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        aria-expanded={open}
        aria-controls="advanced-options"
      >
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')}
        />
        {open ? 'Hide' : 'Show'} advanced options (currency &amp; language)
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="advanced-options"
            key="advanced"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-neutral-800/60">
              {/* Currency */}
              <div className="space-y-1.5">
                <Label htmlFor="currency-trigger" className="flex items-center gap-1.5 text-[#BEB5A9]">
                  <DollarSign className="h-3.5 w-3.5 text-[#A78D78]" />
                  Currency
                </Label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <SelectTrigger id="currency-trigger" aria-label="Select currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Language */}
              <div className="space-y-1.5">
                <Label htmlFor="language-trigger" className="flex items-center gap-1.5 text-[#BEB5A9]">
                  <Globe className="h-3.5 w-3.5 text-[#A78D78]" />
                  Language
                </Label>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <SelectTrigger id="language-trigger" aria-label="Select language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((l) => (
                          <SelectItem key={l.value} value={l.value}>
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Field Error ─────────────────────────────────────────────────────────────

function FieldError({ message, id }: { message?: string; id: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-1 text-xs text-red-400 overflow-hidden"
        >
          <AlertCircle className="h-3 w-3 shrink-0" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
