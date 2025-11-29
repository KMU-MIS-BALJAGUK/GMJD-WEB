'use client';

import './globals.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { ReactQueryProvider } from '@/lib/queryClient';

import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <ReactQueryProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
