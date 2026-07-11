'use client';

import { motion } from 'framer-motion';
import {
  AlertTriangle,
  WifiOff,
  Clock,
  ServerCrash,
  ShieldAlert,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiError } from '@/types/hotel';

interface ErrorStateProps {
  error: ApiError;
  onRetry?: () => void;
}

function getErrorConfig(error: ApiError) {
  if (error.type === 'network') {
    return {
      icon: <WifiOff className="h-12 w-12" />,
      title: 'Network Error',
      description: 'Unable to connect to the internet. Please check your connection and try again.',
      gradient: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-400',
    };
  }
  if (error.type === 'timeout') {
    return {
      icon: <Clock className="h-12 w-12" />,
      title: 'Request Timed Out',
      description: 'The search took too long to respond. Please try again — it may be a temporary issue.',
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-400',
    };
  }
  if (error.code === 429) {
    return {
      icon: <AlertTriangle className="h-12 w-12" />,
      title: 'Too Many Requests',
      description: 'You\'ve made too many searches in a short period. Please wait a moment before trying again.',
      gradient: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-400',
    };
  }
  if (error.code === 503 || error.code === 502 || error.code === 504) {
    return {
      icon: <ServerCrash className="h-12 w-12" />,
      title: 'Service Unavailable',
      description: 'The hotel search service is temporarily unavailable. Our team has been notified. Please try again in a few minutes.',
      gradient: 'from-red-500/20 to-pink-500/20',
      iconColor: 'text-red-400',
    };
  }
  if (error.code === 401 || error.code === 403) {
    return {
      icon: <ShieldAlert className="h-12 w-12" />,
      title: 'Access Denied',
      description: 'Authentication failed. Please contact support if this issue persists.',
      gradient: 'from-red-500/20 to-purple-500/20',
      iconColor: 'text-red-400',
    };
  }
  return {
    icon: <AlertTriangle className="h-12 w-12" />,
    title: 'Something Went Wrong',
    description: error.message || 'An unexpected error occurred. Please try again.',
    gradient: 'from-red-500/20 to-pink-500/20',
    iconColor: 'text-red-400',
  };
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  const config = getErrorConfig(error);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      role="alert"
      aria-live="assertive"
    >
      {/* Icon */}
      <div
        className={`relative flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${config.gradient} border border-white/8 mb-6 shadow-2xl`}
      >
        <div className={config.iconColor}>{config.icon}</div>
      </div>

      <h2 className="text-2xl font-bold text-neutral-100 mb-3">{config.title}</h2>
      <p className="text-sm text-neutral-400 max-w-md leading-relaxed mb-8">
        {config.description}
      </p>

      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}

      {error.code && (
        <p className="mt-4 text-xs text-neutral-600">Error code: {error.code}</p>
      )}
    </motion.div>
  );
}
