'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

// 백엔드 API 주소
const BACKEND_AUTH_BASE_API: string = 'https://dev.gmjd.site/oauth/google/callback';

const CoreCallbackLogic: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authCode: string | null = searchParams.get('code');

    // 인가 코드가 없으면 에러 처리
    if (!authCode) {
      setError('로그인에 필요한 인가 코드가 URL에서 누락되었습니다.');
      setLoading(false);
      return;
    }

    const exchangeCodeForTokens = async () => {
      try {
        // 1. 백엔드로 인가 코드 전송 (GET 요청)
        const response = await axios.get(BACKEND_AUTH_BASE_API, {
          params: { code: authCode },
        });

        // 2. 응답 데이터에서 가입 여부 확인
        // 백엔드 응답 Body 예시: { "isRegistered": true, "message": "..." }
        const isRegistered: boolean = response.data.isRegistered;

        // 3. 응답 헤더에서 토큰 추출
        // 백엔드 응답 Header 예시: Authorization: Bearer eyJhbGci...
        const fullToken = response.headers['authorization'];
        const accessToken: string | null = fullToken ? fullToken.replace('Bearer ', '') : null;

        if (accessToken) {
          // 4. 토큰 저장 (로그인 처리)
          login(accessToken);
          console.log(`✅ 로그인 성공! 가입 여부: ${isRegistered ? '기존 회원' : '신규 회원'}`);

          // 5. 페이지 분기 처리
          if (isRegistered) {
            router.push('/'); // 기존 회원은 메인으로
          } else {
            router.push('/signup/register'); // 신규 회원은 회원가입 페이지로
          }
        } else {
          throw new Error('서버 응답 헤더에서 액세스 토큰을 찾을 수 없습니다.');
        }
      } catch (e: unknown) {
        console.error('❌ 로그인 처리 중 에러 발생:', e);

        let errorMessage = '알 수 없는 오류 발생';
        if (axios.isAxiosError(e)) {
          // 서버가 4xx, 5xx 에러를 보낸 경우
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

  // UI 렌더링
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      {error ? (
        <div className="text-red-600 p-6 border border-red-300 rounded-xl shadow-lg bg-red-50">
          <h2 className="text-xl font-bold mb-3">로그인 처리 오류</h2>
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
            {loading ? '로그인 처리 중입니다...' : '잠시만 기다려주세요.'}
          </p>
        </div>
      )}
    </div>
  );
};

const GoogleAuthCallbackPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh] text-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      }
    >
      <CoreCallbackLogic />
    </Suspense>
  );
};

export default GoogleAuthCallbackPage;
