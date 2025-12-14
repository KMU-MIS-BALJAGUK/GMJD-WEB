// src/app/layout.tsx

import './globals.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { ReactQueryProvider } from '@/lib/queryClient';
import { ToastProvider } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { metadata } from './metadata';
import AuthInitializer from '../components/AuthInitializer';

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <ReactQueryProvider>
            <AuthInitializer />
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
