'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile } from '@/lib/api/mypage/mypage';
import Loading from '@/components/common/Loading';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const BACKEND_AUTH_BASE_API = `${API_BASE_URL}/oauth/google/callback`;

interface DecodedTokenPayload {
  sub: string;
  exp: number;
  isRegistered?: boolean;
  [key: string]: unknown;
}

const CoreCallbackLogic: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login); // Zustand로 변경
  const queryClient = useQueryClient();

  const isRequestSent = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authCode = searchParams.get('code');

    if (!authCode) {
      setError('인가 코드가 없습니다. 다시 로그인해주세요.');
      setLoading(false);
      return;
    }

    if (isRequestSent.current) return;
    isRequestSent.current = true;

    const exchangeCodeForTokens = async () => {
      try {
        const response = await axios.get(BACKEND_AUTH_BASE_API, {
          params: { code: authCode },
        });

        // AccessToken 가져오기
        const fullToken = response.headers['authorization'];
        const accessToken = fullToken?.startsWith('Bearer ')
          ? fullToken.substring(7)
          : response.data.accessToken || null;

        if (!accessToken) {
          throw new Error('서버에서 토큰을 주지 않았습니다.');
        }

        // Zustand에 토큰 저장
        login(accessToken);

        // React Query로 프로필 프리패치
        await queryClient.prefetchQuery({
          queryKey: ['userProfile'],
          queryFn: fetchUserProfile,
        });

        // isRegistered 판별
        const { jwtDecode } = await import('jwt-decode');
        const decoded: DecodedTokenPayload = jwtDecode(accessToken);

        const isRegistered =
          typeof decoded.isRegistered === 'boolean' ? decoded.isRegistered : false;

        router.replace(isRegistered ? '/' : '/signup/register');
      } catch (e) {
        let message = '로그인 처리 중 오류가 발생했습니다.';

        if (axios.isAxiosError(e)) {
          message = e.response?.data?.message || '서버 오류가 발생했습니다.';
        } else if (e instanceof Error) {
          message = e.message;
        }

        setError(message);
        setLoading(false);
      }
    };

    exchangeCodeForTokens();
  }, [searchParams, router, login, queryClient]);

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
          {loading ? <Loading message="로그인 중입니다..." /> : <Loading message="이동 중..." />}
        </div>
      )}
    </div>
  );
};

const GoogleAuthCallbackPage = () => {
  return (
    <Suspense>
      <CoreCallbackLogic />
    </Suspense>
  );
};

export default GoogleAuthCallbackPage;
