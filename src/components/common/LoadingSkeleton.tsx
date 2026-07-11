import { Skeleton } from '@/components/ui/skeleton';

function HotelCardSkeleton() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
      {/* Image */}
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      {/* Content */}
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        {/* Amenities */}
        <div className="flex gap-1.5 pt-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        {/* Price row */}
        <div className="flex items-end justify-between pt-3 border-t border-neutral-800/60">
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-14 rounded" />
            <Skeleton className="h-6 w-20 rounded" />
          </div>
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

interface LoadingSkeletonProps {
  count?: number;
}

export default function LoadingSkeleton({ count = 8 }: LoadingSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      aria-label="Loading hotels…"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <HotelCardSkeleton key={i} />
      ))}
    </div>
  );
}
