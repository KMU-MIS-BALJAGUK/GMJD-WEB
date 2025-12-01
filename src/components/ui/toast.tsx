'use client';

import { ToastData } from './use-toast';
import { cn } from '@/lib/utils';

export function Toast({ data }: { data: ToastData }) {
  return (
    <div
      className={cn(
        'min-w-[260px] rounded-md border bg-white px-4 py-3 shadow-md animate-slideUp',
        data.variant === 'destructive' && 'border-red-300 bg-red-50 text-red-700',
        data.variant === 'default' && 'border-green-300 text-green-700'
      )}
    >
      {data.title && <p className="font-medium">{data.title}</p>}
      {data.description && <p className="text-sm text-gray-600 mt-1">{data.description}</p>}
      {data.action && <div className="mt-2">{data.action}</div>}
    </div>
  );
}
