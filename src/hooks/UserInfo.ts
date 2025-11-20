'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; // AuthContext에서 토큰을 가져옵니다.

// 💡 백엔드에서 사용자 정보를 가져올 API 엔드포인트 URL
const USER_INFO_API_URL = 'https://dev.gmjd.site/api/v1/user/me';

// 마이페이지에서 필요한 모든 필드를 포함한 사용자 정보 타입을 정의합니다.
// 이 타입은 백엔드 API 응답 구조와 일치해야 합니다.
interface User {
  profileImageUrl: string;
  name: string;
  introduction: string;
  level: number;
  email: string;
  universityName: string;
  major: string;
  skillList: string[];
  categoryList: string[];
}

// 2. 전체 API 응답 구조를 정의합니다.
interface ApiResponse {
  code: number;
  msg: string;
  data: User;
}
// 사용자 정보를 불러오는 커스텀 훅
export const UserInfo = () => {
  const { accessToken, isLoggedIn, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. 로그인되지 않았거나 토큰이 없으면 초기화 후 중단
    if (!isLoggedIn || !accessToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const fetchUserInfo = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 2. 인증 헤더(Authorization: Bearer <토큰>)를 포함하여 API 요청
        const response = await fetch(USER_INFO_API_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`, // 💡 토큰을 헤더에 담아 전송
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          // 토큰 만료 또는 유효하지 않은 경우, 로그아웃 처리 후 리다이렉트 유도
          logout();
          throw new Error('인증 토큰이 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.');
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '사용자 정보를 가져오는 데 실패했습니다.');
        }

        const data: User = await response.json();
        setUser(data); // 3. 성공적으로 사용자 상태 업데이트
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [accessToken, isLoggedIn, logout]); // 토큰, 로그인 상태, 로그아웃 함수가 바뀔 때마다 실행

  return { user, isLoading, error };
};
