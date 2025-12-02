'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  PropsWithChildren,
} from 'react';
import { X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

/** 👉 showToast에 넘길 때 쓰는 옵션 타입 (type은 선택) */
interface ToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((options: ToastOptions) => {
    const id = Date.now();

    const toast: ToastItem = {
      id,
      title: options.title,
      description: options.description,
      // ✅ type 안 넘기면 기본값 'info'
      type: options.type ?? 'info',
      // ✅ duration 안 넘기면 기본값 3000
      duration: options.duration ?? 3000,
    };

    setToasts((prev) => [...prev, toast]);

    const timeout = toast.duration ?? 3000;
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, timeout);
  }, []);

  const handleClose = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getTypeStyle = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500 bg-emerald-50 text-emerald-900';
      case 'error':
        return 'border-red-500 bg-red-50 text-red-900';
      case 'info':
      default:
        return 'border-sky-500 bg-sky-50 text-sky-900';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* 토스트 컨테이너 */}
      <div className="pointer-events-none fixed inset-0 z-[9999] flex flex-col items-center mt-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex max-w-sm items-start gap-3 rounded-lg border px-4 py-3 shadow-md ${getTypeStyle(
              toast.type,
            )}`}
          >
            <div className="flex-1">
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description && (
                <p className="mt-1 text-xs leading-snug text-black/70">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              className="ml-2 mt-0.5 rounded p-1 hover:bg-black/5"
              onClick={() => handleClose(toast.id)}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast는 ToastProvider 안에서만 사용할 수 있습니다.');
  }
  return ctx;
}
