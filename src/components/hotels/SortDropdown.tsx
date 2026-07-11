'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortOption } from '@/types/hotel';
import { SORT_OPTIONS } from '@/constants';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  resultCount: number;
}

export default function SortDropdown({ value, onChange, resultCount }: SortDropdownProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div aria-live="polite" aria-atomic="true" className="text-sm text-neutral-400">
        <span className="font-semibold text-neutral-200">{resultCount.toLocaleString()}</span>{' '}
        {resultCount === 1 ? 'hotel' : 'hotels'} found
      </div>

      <div className="flex items-center gap-2.5">
        <ArrowUpDown className="h-4 w-4 text-neutral-400 shrink-0" aria-hidden="true" />
        <span className="text-xs text-neutral-400 shrink-0">Sort by:</span>
        <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
          <SelectTrigger
            id="sort-select"
            className="w-52 h-9 text-xs"
            aria-label="Sort hotels by"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
