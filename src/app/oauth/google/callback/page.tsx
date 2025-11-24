'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // 1. 디코딩 라이브러리 임포트

// 백엔드 API 주소
const BACKEND_AUTH_BASE_API: string = 'https://dev.gmjd.site/oauth/google/callback';

// 2. 토큰 내부 구조(Payload) 타입 정의
interface DecodedTokenPayload {
  sub: string; // 유저 ID
  exp: number; // 만료 시간
  isRegistered?: boolean; // 토큰 안에 들어있을 수도 있는 값
  role?: string;
  [key: string]: any; // 그 외 다른 값들
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
      setError('로그인에 필요한 인가 코드가 URL에서 누락되었습니다.');
      setLoading(false);
      return;
    }

    if (isRequestSent.current) return;
    isRequestSent.current = true;

    const exchangeCodeForTokens = async () => {
      try {
        console.log('🚀 서버로 인가 코드 전송:', authCode);

        const response = await axios.get(BACKEND_AUTH_BASE_API, {
          params: { code: authCode },
        });

        console.log('✅ 서버 응답 전체:', response);

        // -------------------------------------------------------------
        // 🔎 [핵심] isRegistered 값 찾기 (Body vs Token)
        // -------------------------------------------------------------

        let isRegistered: boolean | undefined = undefined;

        // 1단계: 응답 바디(Body) 확인
        if (typeof response.data.isRegistered === 'boolean') {
          isRegistered = response.data.isRegistered;
          console.log('📦 [확인] Body에서 isRegistered 발견:', isRegistered);
        }

        // 2단계: 토큰 추출
        const fullToken = response.headers['authorization'];
        const accessToken: string | null = fullToken
          ? fullToken.replace('Bearer ', '')
          : response.data.accessToken || null;

        if (!accessToken) {
          throw new Error('액세스 토큰을 찾을 수 없습니다.');
        }

        // 3단계: Body에 없었다면, 토큰 디코딩 시도!
        if (isRegistered === undefined) {
          try {
            const decoded: DecodedTokenPayload = jwtDecode(accessToken);
            console.log('🔓 [디코딩] 토큰 해독 결과:', decoded);

            if (typeof decoded.isRegistered === 'boolean') {
              isRegistered = decoded.isRegistered;
              console.log('🔑 [확인] Token 내부에서 isRegistered 발견:', isRegistered);
            }
          } catch (decodeError) {
            console.error('토큰 디코딩 실패:', decodeError);
          }
        }

        // -------------------------------------------------------------
        // 🚦 분기 처리
        // -------------------------------------------------------------

        // 만약 끝까지 못 찾았으면 기본값(false=신규) 처리하거나 에러 띄움
        if (isRegistered === undefined) {
          console.warn('⚠️ isRegistered 값을 찾을 수 없습니다. 신규 회원으로 간주합니다.');
          isRegistered = false;
        }

        // 토큰 저장
        login(accessToken);

        // 페이지 이동
        if (isRegistered === true) {
          console.log('🏠 기존 회원 -> 메인 페이지(/)로 이동');
          router.replace('/');
        } else {
          console.log('📝 신규 회원 -> 회원가입 페이지(/signup/register)로 이동');
          router.replace('/signup/register');
        }
      } catch (e: unknown) {
        console.error('❌ 에러 발생:', e);
        // ... (에러 처리 로직 동일)
        let errorMessage = '알 수 없는 오류 발생';
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
          <h2 className="text-xl font-bold mb-3">오류 발생</h2>
          <p className="text-sm">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-5 px-5 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors shadow-md"
          >
            홈으로 가기
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-4 border-blue-500 border-opacity-25"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            {loading ? '인증 정보를 확인 중입니다...' : '잠시만 기다려주세요.'}
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
