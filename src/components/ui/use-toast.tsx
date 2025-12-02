'use client';

import { toastEventBus } from '@/lib/eventBus';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type ToastVariant = 'default' | 'destructive';

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
  variant?: ToastVariant;
  action?: React.ReactNode;
}

interface ToastContextType {
  toasts: ToastData[];
  toast: (props: Omit<ToastData, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback((props: Omit<ToastData, 'id'>) => {
    const id = crypto.randomUUID();

    const toastObj: ToastData = {
      id,
      duration: props.duration ?? 3000,
      ...props,
    };

    setToasts((prev) => [...prev, toastObj]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toastObj.duration);
  }, []);

  useEffect(() => {
    const unsubscribe = toastEventBus.subscribe((payload) => {
      toast(payload);
    });

    return unsubscribe;
  }, [toast]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>{children}</ToastContext.Provider>
  );
}
