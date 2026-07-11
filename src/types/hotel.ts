// ─── Hotel API Types ────────────────────────────────────────────────────────

export interface HotelImage {
  thumbnail: string;
  original_image: string;
}

export interface HotelRatePlan {
  lowest?: string;
  extracted_lowest?: number;
  before_taxes_fees?: string;
  extracted_before_taxes_fees?: number;
}

export interface HotelEcoRating {
  rating?: number;
  description?: string;
}

export interface HotelNearbyPlace {
  name: string;
  transportations?: Array<{
    type: string;
    duration: string;
  }>;
}

export interface HotelEssentialInfo {
  check_in_time?: string;
  check_out_time?: string;
  pets_allowed?: boolean;
  free_breakfast?: boolean;
  free_cancellation?: boolean;
}

export interface HotelAmenityHighlight {
  name: string;
  icon_path?: string;
}

export interface HotelProperty {
  type: string;
  name: string;
  description?: string;
  link?: string;
  gps_coordinates?: {
    latitude: number;
    longitude: number;
  };
  check_in_time?: string;
  check_out_time?: string;
  rate_per_night?: HotelRatePlan;
  total_rate?: HotelRatePlan;
  prices?: Array<{
    source: string;
    logo?: string;
    num_guests?: number;
    rate_per_night?: HotelRatePlan;
  }>;
  nearby_places?: HotelNearbyPlace[];
  hotel_class?: string;
  extracted_hotel_class?: number;
  images?: HotelImage[];
  overall_rating?: number;
  reviews?: number;
  ratings?: Array<{
    stars: number;
    count: number;
  }>;
  location_rating?: number;
  reviews_breakdown?: Array<{
    name: string;
    description: string;
    total_mentioned: number;
    positive: number;
    negative: number;
    neutral: number;
  }>;
  amenities?: string[];
  excluded_amenities?: string[];
  essential_info?: string[];
  property_token?: string;
  serpapi_property_details_link?: string;
  eco_certified?: boolean;
  eco_rating?: HotelEcoRating;
  free_cancellation?: boolean;
  special_offer?: string;
  deal?: string;
  deal_description?: string;
  address?: string;
  phone?: string;
  website?: string;
}

export interface HotelSearchResponse {
  properties?: HotelProperty[];
  search_metadata?: {
    id: string;
    status: string;
    created_at: string;
    processed_at: string;
    total_time_taken: number;
    request_time_taken: number;
    parsing_time_taken: number;
    total: number;
    engine_url: string;
    raw_engine_url: string;
    prettify_html_file: string;
    json_endpoint: string;
  };
  search_parameters?: Record<string, string>;
  brands?: Array<{ id: number; name: string }>;
  error?: string;
}

// ─── Form / Filter Types ─────────────────────────────────────────────────────

export interface SearchFormValues {
  city: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  currency: string;
  language: string;
}

export interface FilterState {
  minRating: number;
  minPrice: number;
  maxPrice: number;
  propertyTypes: string[];
  freeCancellationOnly: boolean;
}

// ─── Sort / UI Enums ─────────────────────────────────────────────────────────

export enum SortOption {
  RELEVANCE = 'relevance',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  RATING_DESC = 'rating_desc',
  REVIEWS_DESC = 'reviews_desc',
}

export interface ApiError {
  message: string;
  code?: number;
  type: 'api' | 'network' | 'timeout' | 'unknown';
}
