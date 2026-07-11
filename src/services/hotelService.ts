import apiClient from '@/lib/axios';
import { HotelSearchResponse, SearchFormValues } from '@/types/hotel';

export interface HotelSearchParams extends Partial<Omit<SearchFormValues, 'city'>> {
  city: string;
}

export async function searchHotels(params: HotelSearchParams): Promise<HotelSearchResponse> {
  const searchParams = new URLSearchParams({ q: params.city });

  if (params.checkIn) searchParams.append('check_in', params.checkIn);
  if (params.checkOut) searchParams.append('check_out', params.checkOut);
  if (params.adults && params.adults !== '0') searchParams.append('adults', params.adults);
  if (params.children && params.children !== '0') searchParams.append('children', params.children);
  if (params.currency) searchParams.append('currency', params.currency);
  if (params.language) searchParams.append('hl', params.language);

  const response = await apiClient.get<HotelSearchResponse>(
    `/api/hotels?${searchParams.toString()}`
  );

  return response.data;
}
