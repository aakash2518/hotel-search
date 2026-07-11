'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HotelProperty } from '@/types/hotel';
import HotelCard from './HotelCard';

interface HotelGridProps {
  hotels: HotelProperty[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export default function HotelGrid({ hotels }: HotelGridProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={hotels.map((h) => h.name).join('-').slice(0, 60)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        role="list"
        aria-label="Hotel search results"
      >
        {hotels.map((hotel, index) => (
          <div key={`${hotel.name}-${index}`} role="listitem">
            <HotelCard hotel={hotel} index={index} />
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
