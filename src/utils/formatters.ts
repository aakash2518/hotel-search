import { HotelProperty } from '@/types/hotel';

/**
 * Extracts the numeric price value from a hotel property.
 * Returns Infinity if no price is available (for sorting).
 */
export function extractPrice(hotel: HotelProperty): number {
  return (
    hotel.rate_per_night?.extracted_lowest ??
    hotel.total_rate?.extracted_lowest ??
    Infinity
  );
}

/**
 * Formats a price string for display. Falls back gracefully.
 */
export function formatPrice(hotel: HotelProperty): string | null {
  return (
    hotel.rate_per_night?.lowest ??
    hotel.total_rate?.lowest ??
    null
  );
}

/**
 * Returns a display-ready star rating string, e.g. "4.5"
 */
export function formatRating(rating?: number): string {
  if (rating === undefined || rating === null) return 'N/A';
  return rating.toFixed(1);
}

/**
 * Formats review count with commas, e.g. 1245 → "1,245"
 */
export function formatReviews(count?: number): string {
  if (!count) return '0';
  return count.toLocaleString('en-US');
}

/**
 * Converts extracted hotel class (1-5) to an array for star rendering.
 */
export function getStarArray(hotelClass?: number): number[] {
  const stars = Math.round(hotelClass ?? 0);
  return Array.from({ length: Math.min(5, Math.max(0, stars)) }, (_, i) => i);
}

/**
 * Truncates text to a max length, appending ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Returns a human-readable property type label.
 */
export function formatPropertyType(type?: string): string {
  if (!type) return 'Property';
  return type
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Normalizes the hotel type string to match PROPERTY_TYPES constant.
 */
export function normalizePropertyType(type?: string): string {
  if (!type) return 'Hotel';
  const t = type.toLowerCase();
  if (t.includes('resort')) return 'Resort';
  if (t.includes('motel')) return 'Motel';
  if (t.includes('inn')) return 'Inn';
  if (t.includes('hostel')) return 'Hostel';
  if (t.includes('boutique')) return 'Boutique Hotel';
  if (t.includes('apartment')) return 'Apartment';
  if (t.includes('villa')) return 'Villa';
  if (t.includes('vacation') || t.includes('rental')) return 'Vacation Rental';
  return 'Hotel';
}
