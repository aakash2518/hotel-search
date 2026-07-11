'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  MapPin,
  Users,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Waves,
  ExternalLink,
  CheckCircle,
  Building2,
  Clock,
} from 'lucide-react';
import { HotelProperty } from '@/types/hotel';
import { Badge } from '@/components/ui/badge';
import {
  formatPrice,
  formatRating,
  formatReviews,
  getStarArray,
  truncate,
  formatPropertyType,
  normalizePropertyType,
} from '@/utils/formatters';
import { cn } from '@/lib/utils';

interface HotelCardProps {
  hotel: HotelProperty;
  index: number;
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-3 w-3" />,
  parking: <Car className="h-3 w-3" />,
  breakfast: <Coffee className="h-3 w-3" />,
  gym: <Dumbbell className="h-3 w-3" />,
  pool: <Waves className="h-3 w-3" />,
};

function getAmenityIcon(amenity: string): React.ReactNode {
  const key = amenity.toLowerCase();
  if (key.includes('wi-fi') || key.includes('wifi') || key.includes('internet')) return AMENITY_ICONS.wifi;
  if (key.includes('parking')) return AMENITY_ICONS.parking;
  if (key.includes('breakfast')) return AMENITY_ICONS.breakfast;
  if (key.includes('gym') || key.includes('fitness')) return AMENITY_ICONS.gym;
  if (key.includes('pool') || key.includes('swim')) return AMENITY_ICONS.pool;
  return null;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

function HotelCard({ hotel, index }: HotelCardProps) {
  const [imgError, setImgError] = useState(false);
  const price = formatPrice(hotel);
  const rating = hotel.overall_rating;
  const stars = getStarArray(hotel.extracted_hotel_class);
  const amenities = (hotel.amenities ?? []).slice(0, 6);
  const propertyType = normalizePropertyType(hotel.type);
  const displayType = formatPropertyType(hotel.type);
  const hasFreeCancellation = hotel.free_cancellation === true;
  const mainImage = !imgError ? (hotel.images?.[0]?.original || hotel.images?.[0]?.thumbnail) : null;

  return (
    <motion.article
      variants={cardVariants}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-neutral-700 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 flex flex-col"
      aria-label={`Hotel: ${hotel.name}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800 shrink-0">
        {mainImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mainImage}
            alt={`${hotel.name} — hotel photo`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-800 to-neutral-900">
            <Building2 className="h-12 w-12 text-neutral-600" />
            <span className="text-xs text-neutral-600">No image available</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Rating pill */}
        {rating !== undefined && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-xs font-semibold text-white">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span aria-label={`Rating: ${rating} out of 5`}>{formatRating(rating)}</span>
            {hotel.reviews && (
              <span className="text-neutral-400 font-normal">
                ({formatReviews(hotel.reviews)})
              </span>
            )}
          </div>
        )}

        {/* Deal badge */}
        {hotel.deal && (
          <div className="absolute top-3 left-3">
            <Badge variant="success" className="text-[10px] shadow-lg">
              {hotel.deal}
            </Badge>
          </div>
        )}

        {/* Free cancellation pill */}
        {hasFreeCancellation && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-emerald-950/80 backdrop-blur-sm text-emerald-400 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30">
            <CheckCircle className="h-3 w-3" />
            Free cancellation
          </div>
        )}

        {/* Property type */}
        <div className="absolute bottom-3 right-3">
          <Badge variant="secondary" className="text-[10px] bg-black/60 border-white/10 text-neutral-300">
            {displayType || 'Hotel'}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Hotel class stars */}
        {stars.length > 0 && (
          <div className="flex items-center gap-0.5" aria-label={`${stars.length}-star hotel`}>
            {stars.map((_, i) => (
              <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" aria-hidden="true" />
            ))}
          </div>
        )}

        {/* Hotel name */}
        <h2 className="font-semibold text-base text-neutral-100 leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
          {hotel.name}
        </h2>

        {/* Address */}
        {hotel.address && (
          <p className="flex items-start gap-1.5 text-xs text-neutral-400 line-clamp-1">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-neutral-500 mt-0.5" aria-hidden="true" />
            <span>{hotel.address}</span>
          </p>
        )}

        {/* Description */}
        {hotel.description && (
          <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
            {truncate(hotel.description, 120)}
          </p>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {amenities.map((amenity) => {
              const icon = getAmenityIcon(amenity);
              return (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-1 text-[10px] text-neutral-400 bg-neutral-800/80 border border-neutral-700/50 rounded-full px-2 py-0.5"
                  title={amenity}
                >
                  {icon && <span aria-hidden="true">{icon}</span>}
                  {truncate(amenity, 20)}
                </span>
              );
            })}
            {(hotel.amenities?.length ?? 0) > 6 && (
              <span className="text-[10px] text-neutral-500 px-2 py-0.5">
                +{(hotel.amenities?.length ?? 0) - 6} more
              </span>
            )}
          </div>
        )}

        {/* Check-in / Check-out times */}
        {(hotel.check_in_time || hotel.check_out_time) && (
          <div className="flex items-center gap-3 text-[10px] text-neutral-500">
            <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
            {hotel.check_in_time && <span>In: {hotel.check_in_time}</span>}
            {hotel.check_out_time && <span>Out: {hotel.check_out_time}</span>}
          </div>
        )}

        {/* Nearby places */}
        {hotel.nearby_places && hotel.nearby_places.length > 0 && (
          <div className="text-[10px] text-neutral-500 line-clamp-1">
            <MapPin className="h-3 w-3 inline mr-1" aria-hidden="true" />
            Near: {hotel.nearby_places.slice(0, 2).map((p) => p.name).join(', ')}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + CTA */}
        <div className="flex items-end justify-between pt-3 border-t border-neutral-800/60 mt-auto">
          <div>
            {price ? (
              <>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">Per night</p>
                <p className="text-xl font-bold text-white" aria-label={`Price: ${price} per night`}>
                  {price}
                </p>
                {hotel.total_rate?.lowest && hotel.rate_per_night?.lowest && (
                  <p className="text-[10px] text-neutral-500">
                    Total: {hotel.total_rate.lowest}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-neutral-400 italic">Contact for pricing</p>
            )}
          </div>

          {hotel.link && (
            <a
              href={hotel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 px-3 py-2 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={`View ${hotel.name} on Google Hotels — opens in new tab`}
            >
              View Deal
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default memo(HotelCard);
