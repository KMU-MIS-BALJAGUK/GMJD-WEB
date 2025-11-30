'use client';

import { AlertTriangle } from 'lucide-react';

export default function Error({
  message = '오류가 발생했습니다.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3 text-center px-4">
      <AlertTriangle className="w-10 h-10 text-red-500" />
      <p className="text-sm text-gray-600">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
