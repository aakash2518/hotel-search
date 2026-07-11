import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { SEARCH_API_BASE_URL, REQUEST_TIMEOUT_MS } from '@/constants';

function sanitizeError(error: unknown): { message: string; status: number } {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    switch (status) {
      case 400:
        return { message: 'Invalid search parameters.', status: 400 };
      case 401:
        return { message: 'Search service authentication failed.', status: 502 };
      case 403:
        return { message: 'Search service access denied.', status: 502 };
      case 422:
        return { message: 'Invalid search parameters.', status: 400 };
      case 429:
        return { message: 'Search quota exceeded. Please try again later.', status: 429 };
      case 503:
        return { message: 'Search service is temporarily unavailable.', status: 503 };
      default:
        if (error.code === 'ECONNABORTED') {
          return { message: 'Search request timed out.', status: 504 };
        }
        return { message: 'Search service error. Please try again.', status: 502 };
    }
  }
  return { message: 'An unexpected error occurred.', status: 500 };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const q = searchParams.get('q')?.trim();
    if (!q || q.length < 2) {
      return NextResponse.json(
        { error: 'Destination is required and must be at least 2 characters.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.SEARCHAPI_KEY;
    if (!apiKey) {
      console.error('[hotels/route] SEARCHAPI_KEY is not configured');
      return NextResponse.json(
        { error: 'Search service is not configured. Please contact support.' },
        { status: 503 }
      );
    }

    // Build params — only include optional fields if present
    const params: Record<string, string> = {
      engine: 'google_hotels',
      q,
      api_key: apiKey,
    };

    let check_in = searchParams.get('check_in');
    let check_out = searchParams.get('check_out');
    
    // SearchAPI requires check_in_date and check_out_date for google_hotels
    // If not provided, default to tomorrow and day after tomorrow
    if (!check_in || !check_out) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);
      
      check_in = check_in || tomorrow.toISOString().split('T')[0];
      check_out = check_out || dayAfter.toISOString().split('T')[0];
    }

    const adults = searchParams.get('adults');
    const children = searchParams.get('children');
    const currency = searchParams.get('currency');
    const hl = searchParams.get('hl');

    if (check_in) params.check_in_date = check_in;
    if (check_out) params.check_out_date = check_out;
    if (adults) params.adults = adults;
    if (children) params.children = children;
    if (currency) params.currency = currency;
    if (hl) params.hl = hl;

    const response = await axios.get(SEARCH_API_BASE_URL, {
      params,
      timeout: REQUEST_TIMEOUT_MS,
    });

    // Forward only the data — never forward request metadata that could expose internals
    const { properties, brands, search_metadata } = response.data;

    // Cache for 2 minutes — same query within 2 minutes is served from cache
    return NextResponse.json(
      { properties: properties ?? [], brands, search_metadata },
      {
        status: 200,
        headers: {
          'Cache-Control': 'private, s-maxage=120, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    const { message, status } = sanitizeError(error);
    // Log internally but never expose to client
    console.error('[hotels/route] Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: message }, { status });
  }
}
