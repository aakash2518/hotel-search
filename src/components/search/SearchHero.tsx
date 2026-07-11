'use client';

import { motion } from 'framer-motion';
import { MapPin, Star, Shield } from 'lucide-react';

const STATS = [
  { label: 'Hotels Worldwide', value: '500K+' },
  { label: 'Happy Travelers', value: '12M+' },
  { label: 'Countries', value: '190+' },
];

const FEATURES = [
  { icon: <MapPin className="h-4 w-4" />, text: 'Real-time availability' },
  { icon: <Star className="h-4 w-4" />, text: 'Verified reviews' },
  { icon: <Shield className="h-4 w-4" />, text: 'Best price guarantee' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function SearchHero() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center pt-16 pb-10 px-4"
      aria-label="Hero section"
    >
      {/* Eyebrow */}
      <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E1D4C2] bg-[#A78D78]/20 border border-[#A78D78]/40 rounded-full px-4 py-2 backdrop-blur-sm shadow-[0_0_15px_rgba(167,141,120,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#BEB5A9] animate-pulse" />
          Powered by Google Hotels Data
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-serif"
      >
        <span className="text-[#E1D4C2]">Find Your</span>
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A78D78] via-[#BEB5A9] to-[#E1D4C2]">
          Perfect Stay
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed mb-8"
      >
        Discover luxury hotels, boutique resorts, and unique accommodations worldwide.
        Search millions of properties with real-time pricing and availability.
      </motion.p>

      {/* Feature tags */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-center gap-3 mb-10"
      >
        {FEATURES.map(({ icon, text }) => (
          <span
            key={text}
            className="flex items-center gap-1.5 text-xs text-[#BEB5A9] bg-[#291C0E]/80 border border-[#6E473B]/50 rounded-full px-4 py-2 shadow-sm shadow-[#291C0E]"
          >
            <span className="text-[#A78D78]">{icon}</span>
            {text}
          </span>
        ))}
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        aria-label="Platform statistics"
      >
        {STATS.map(({ label, value }) => (
          <div key={label} className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
