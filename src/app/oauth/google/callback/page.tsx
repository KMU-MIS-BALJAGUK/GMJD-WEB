'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
// 백엔드 API 주소
const BACKEND_AUTH_BASE_API: string = `${API_BASE_URL}/oauth/google/callback`;
// 토큰 구조 정의
interface DecodedTokenPayload {
  sub: string;
  exp: number;
  isRegistered?: boolean; // 토큰 안에 있을 수도 있음
  [key: string]: unknown;
}

const CoreCallbackLogic: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  // 중복 요청 방지
  const isRequestSent = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authCode: string | null = searchParams.get('code');

    if (!authCode) {
      setError('인가 코드가 없습니다. 다시 로그인해주세요.');
      setLoading(false);
      return;
    }

    if (isRequestSent.current) return;
    isRequestSent.current = true;

    const exchangeCodeForTokens = async () => {
      try {
        if (!API_BASE_URL) {
          throw new Error(
            'API_BASE_URL 환경 변수가 설정되지 않았습니다. 백엔드 주소를 확인해주세요.'
          );
        }

        // 1. API 호출
        const response = await axios.get(BACKEND_AUTH_BASE_API, {
          params: { code: authCode },
        });

        const fullToken: string | undefined = response.headers['authorization'];

        const accessToken: string | null = fullToken?.startsWith('Bearer ')
          ? fullToken.substring(7)
          : response.data.accessToken || null; // 헤더에 없으면 바디를 확인

        if (!accessToken) {
          throw new Error('서버에서 토큰을 주지 않았습니다.');
        }
        login(accessToken);

        // isRegistered 값 찾기

        let isRegistered: boolean | undefined = undefined;

        try {
          const { jwtDecode } = await import('jwt-decode');

          const decoded: DecodedTokenPayload = jwtDecode(accessToken);
          if (typeof decoded.isRegistered === 'boolean') {
            isRegistered = decoded.isRegistered;
          }
        } catch (e) {
          console.error('JWT 디코딩 중 오류가 발생했습니다. (isRegistered 확인 실패):', e);
          throw new Error('유효하지 않은 토큰 형식입니다. 다시 로그인해주세요.');
        }

        // 값을 못 찾았으면 신규 회원으로 간주 (안전장치)
        if (isRegistered === undefined) {
          isRegistered = false;
        }

        if (isRegistered === true) {
          router.replace('/');
        } else {
          router.replace('/signup/register');
        }
      } catch (e: unknown) {
        let errorMessage = '로그인 처리 중 오류가 발생했습니다.';
        if (axios.isAxiosError(e)) {
          errorMessage = e.response?.data?.message || `서버 에러: ${e.response?.status}`;
        } else if (e instanceof Error) {
          errorMessage = e.message;
        }
        setError(errorMessage);
        setLoading(false);
      }
    };

    exchangeCodeForTokens();
  }, [searchParams, router, login]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      {error ? (
        <div className="text-red-600 p-6 border border-red-300 rounded-xl shadow-lg bg-red-50">
          <h2 className="text-xl font-bold mb-3">로그인 실패</h2>
          <p className="text-sm">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-5 px-5 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors shadow-md"
          >
            홈으로 돌아가기
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-4 border-blue-500 border-opacity-25"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            {loading ? '로그인 중입니다...' : '이동 중...'}
          </p>
        </div>
      )}
    </div>
  );
};

const GoogleAuthCallbackPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoreCallbackLogic />
    </Suspense>
  );
};

export default GoogleAuthCallbackPage;
