'use client';

import { motion } from 'framer-motion';
import { Hotel, Search, MapPin, Compass, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

type EmptyStateType =
  | 'initial'
  | 'no-results'
  | 'filter-empty';

interface EmptyStateProps {
  type: EmptyStateType;
  searchQuery?: string;
  onReset?: () => void;
}

const STATE_CONFIG: Record<
  EmptyStateType,
  {
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: string;
    gradient: string;
  }
> = {
  initial: {
    icon: <Compass className="h-12 w-12" />,
    title: 'Where to next?',
    description:
      'Search over 500,000 properties worldwide. Enter your destination above to discover amazing places to stay.',
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  'no-results': {
    icon: <Hotel className="h-12 w-12" />,
    title: 'No hotels found',
    description:
      'We couldn\'t find any hotels matching your search. Try a different city, adjust your dates, or broaden your criteria.',
    action: 'Try a new search',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  'filter-empty': {
    icon: <Search className="h-12 w-12" />,
    title: 'No hotels match your filters',
    description:
      'Your active filters are hiding all results. Try relaxing your rating, price range, or property type requirements.',
    action: 'Clear all filters',
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
};

const TRAVEL_SUGGESTIONS = [
  'Paris, France',
  'Tokyo, Japan',
  'New York, USA',
  'Dubai, UAE',
  'London, UK',
  'Bali, Indonesia',
];

export default function EmptyState({ type, searchQuery, onReset }: EmptyStateProps) {
  const config = STATE_CONFIG[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      role="status"
      aria-live="polite"
    >
      {/* Icon container */}
      <div
        className={`relative flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${config.gradient} border border-white/8 mb-6 shadow-2xl`}
      >
        <div className="text-neutral-400">{config.icon}</div>
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <h2 className="text-2xl font-bold text-neutral-100 mb-3">{config.title}</h2>

      {searchQuery && type === 'no-results' && (
        <p className="text-sm text-neutral-400 mb-1">
          No results for <span className="text-neutral-200 font-medium">&quot;{searchQuery}&quot;</span>
        </p>
      )}

      <p className="text-sm text-neutral-400 max-w-md leading-relaxed mb-8">
        {config.description}
      </p>

      {config.action && onReset && (
        <Button onClick={onReset} variant="outline" size="sm">
          {config.action}
        </Button>
      )}

      {/* Suggestions for initial state */}
      {type === 'initial' && (
        <div className="mt-8 space-y-3">
          <p className="text-xs text-neutral-500 uppercase tracking-wider flex items-center gap-1.5 justify-center">
            <Sparkles className="h-3 w-3" /> Popular destinations
          </p>
          <div className="flex flex-wrap gap-2 justify-center max-w-sm">
            {TRAVEL_SUGGESTIONS.map((dest) => (
              <span
                key={dest}
                className="inline-flex items-center gap-1 text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-neutral-200 rounded-full px-3 py-1.5 transition-all cursor-default"
              >
                <MapPin className="h-3 w-3 text-blue-500" />
                {dest}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
