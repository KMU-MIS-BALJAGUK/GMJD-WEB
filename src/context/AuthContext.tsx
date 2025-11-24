'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const ACCESS_TOKEN_KEY = 'access_token';

// 1. 타입 정의
// 인증 상태를 나타내는 Context의 형태를 정의합니다.
interface AuthContextType {
  accessToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// 2. Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider 컴포넌트
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // isLoggedIn 상태는 accessToken의 존재 여부로 파생됩니다.
  const isLoggedIn = !!accessToken;

  // 4. 초기 로딩 및 SessionStorage에서 토큰 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        // sessionStorage에서 토큰을 확인
        const storedToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
        if (storedToken) {
          setAccessToken(storedToken);
        }
      } catch (e) {
        console.error('Failed to load token from sessionStorage:', e);
      }
    }
    setIsLoading(false);
  }, []);

  // 5. 로그인 함수: 토큰 저장
  const login = (token: string) => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        // sessionStorage에 Access Token을 저장
        sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
        setAccessToken(token);
      } catch (e) {
        console.error('Failed to save token to sessionStorage:', e);
      }
    }
  };

  // 6. 로그아웃 함수: 토큰 제거
  const logout = () => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        // sessionStorage에서 Access Token을 제거
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        setAccessToken(null);
      } catch (e) {
        console.error('Failed to remove token from sessionStorage:', e);
      }
    }
  };

  const contextValue: AuthContextType = {
    accessToken,
    isLoggedIn,
    isLoading,
    login,
    logout,
  };

  if (isLoading) {
    return null;
  }

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
