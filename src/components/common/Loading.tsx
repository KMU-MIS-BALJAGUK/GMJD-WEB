'use client';

import { cn } from '@/lib/utils';

export default function Loading({
  message = '불러오는 중...',
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-10 gap-3', className)}>
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue"></div>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}
