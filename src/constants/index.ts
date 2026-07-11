import { SortOption } from '@/types/hotel';

export const ITEMS_PER_PAGE = 12;

export const CURRENCIES = [
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — British Pound' },
  { value: 'JPY', label: 'JPY — Japanese Yen' },
  { value: 'AUD', label: 'AUD — Australian Dollar' },
  { value: 'CAD', label: 'CAD — Canadian Dollar' },
  { value: 'CHF', label: 'CHF — Swiss Franc' },
  { value: 'INR', label: 'INR — Indian Rupee' },
  { value: 'SGD', label: 'SGD — Singapore Dollar' },
  { value: 'AED', label: 'AED — UAE Dirham' },
] as const;

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'es', label: 'Español' },
  { value: 'it', label: 'Italiano' },
  { value: 'pt', label: 'Português' },
  { value: 'ja', label: '日本語' },
  { value: 'zh-cn', label: '中文 (简体)' },
  { value: 'ar', label: 'العربية' },
  { value: 'hi', label: 'हिन्दी' },
] as const;

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: SortOption.RELEVANCE, label: 'Relevance' },
  { value: SortOption.PRICE_ASC, label: 'Price: Low to High' },
  { value: SortOption.PRICE_DESC, label: 'Price: High to Low' },
  { value: SortOption.RATING_DESC, label: 'Highest Rating' },
  { value: SortOption.REVIEWS_DESC, label: 'Most Reviewed' },
];

export const PROPERTY_TYPES = [
  'Hotel',
  'Resort',
  'Motel',
  'Inn',
  'Hostel',
  'Boutique Hotel',
  'Apartment',
  'Villa',
  'Vacation Rental',
];

export const DEFAULT_FILTER_STATE = {
  minRating: 0,
  minPrice: 0,
  maxPrice: 50000,
  propertyTypes: [] as string[],
  freeCancellationOnly: false,
};

export const SEARCH_API_BASE_URL = 'https://www.searchapi.io/api/v1/search';

export const STALE_TIME_MS = 5 * 60 * 1000; // 5 minutes

export const REQUEST_TIMEOUT_MS = 15000; // 15 seconds
