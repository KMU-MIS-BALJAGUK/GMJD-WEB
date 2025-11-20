'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. 타입 정의
// 인증 상태를 나타내는 Context의 형태를 정의합니다.
interface AuthContextType {
  accessToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

//  2. Context 생성
// 기본값은 TypeScript의 타입에 맞춰 설정합니다.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//  3. Provider 컴포넌트
// 앱 전체를 감싸서 로그인 상태를 제공하는 컴포넌트입니다.
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // isLoggedIn 상태는 accessToken의 존재 여부로 파생됩니다.
  const isLoggedIn = !!accessToken;

  //  4. 초기 로딩 및 LocalStorage에서 토큰 불러오기
  useEffect(() => {
    // 앱이 처음 로드될 때 localStorage에서 토큰을 확인합니다.
    try {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        setAccessToken(storedToken);
      }
    } catch (e) {
      console.error('Failed to load token from localStorage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  //  5. 로그인 함수: 토큰 저장
  const login = (token: string) => {
    try {
      localStorage.setItem('access_token', token);
      setAccessToken(token);
    } catch (e) {
      console.error('Failed to save token to localStorage:', e);
    }
  };

  // 6. 로그아웃 함수: 토큰 제거
  const logout = () => {
    try {
      localStorage.removeItem('access_token');
      setAccessToken(null);
    } catch (e) {
      console.error('Failed to remove token from localStorage:', e);
    }
  };

  const contextValue: AuthContextType = {
    accessToken,
    isLoggedIn,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// 7. 커스텀 훅: Context 사용의 편의성을 높입니다.
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
