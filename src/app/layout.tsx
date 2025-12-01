// src/app/layout.tsx

'use client';

import './globals.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { ReactQueryProvider } from '@/lib/queryClient';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

import { ToastProvider } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) login(token);
  }, [login]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <ReactQueryProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </ReactQueryProvider>

          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
