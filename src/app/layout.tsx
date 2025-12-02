'use client';

import './globals.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { ReactQueryProvider } from '@/lib/queryClient';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { ToastProvider } from '@/components/common/toast/ToastProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Zustand store access
  const login = useAuthStore((state) => state.login);

  // 앱 시작 시 토큰 로드
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) login(token);
  }, [login]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/*  전역 토스트 프로바이더로 감싸기 */}
        <ToastProvider>
          <ReactQueryProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </ReactQueryProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
