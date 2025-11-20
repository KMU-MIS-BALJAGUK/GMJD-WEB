'use client';

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { AuthProvider } from '@/context/AuthContext';

interface ProvidersProps {
  children: React.ReactNode;
}

// 이 파일은 오직 Context Provider와 Client-side UI 요소만 렌더링합니다.
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    // AuthProvider를 포함한 모든 Client-side 로직은 여기서 시작됩니다.
    <AuthProvider>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </AuthProvider>
  );
};

export default Providers;
