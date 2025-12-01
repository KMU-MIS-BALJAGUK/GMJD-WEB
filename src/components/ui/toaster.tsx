'use client';

import { useToast } from './use-toast';
import { Toast } from './toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
      {toasts.map((t) => (
        <Toast key={t.id} data={t} />
      ))}
    </div>
  );
}
