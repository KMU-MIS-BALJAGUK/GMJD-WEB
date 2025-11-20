'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
//  AuthContext 연결: 토큰을 전역 상태에 저장하기 위해 useAuth 훅을 가져옵니다.
import { useAuth } from '@/context/AuthContext';

// 백엔드 API 엔드포인트: 인가 코드를 GET 요청으로 보낼 주소
// 인가 코드는 이 주소 뒤에 쿼리 파라미터로 붙여서 보낼 것입니다.
const BACKEND_AUTH_BASE_API: string = 'https://dev.gmjd.site/oauth/google/callback';

/**
 * GoogleAuthCallbackPage:
 * 구글에서 받은 인가 코드를 백엔드에 전달하고,
 * 응답 헤더에서 액세스 토큰을 추출하여 로그인을 완료하는 페이지입니다.
 * * 타입: React.FC (Function Component)를 사용하여 TypeScript 컴포넌트임을 명시합니다.
 */
const CoreCallbackLogic: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login } = useAuth();

  // 상태 변수에 타입 명시: 로딩 상태는 boolean, 에러 메시지는 string 또는 null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // authCode는 문자열(string)이거나 없을 경우 null입니다.
    const authCode: string | null = searchParams.get('code');

    if (!authCode) {
      setError('로그인에 필요한 인가 코드가 URL에서 누락되었습니다.');
      setLoading(false);
      return;
    }

    //  쿼리 파라미터에 인가 코드를 직접 포함하여 요청할 최종 URL 생성
    // (예: https://dev.gmjd.site/oauth/google/callback?code=AUTH_CODE_FROM_GOOGLE)
    const finalApiUrl = `${BACKEND_AUTH_BASE_API}?code=${authCode}`;

    const exchangeCodeForTokens = async () => {
      try {
        // 2. 백엔드 API에 GET 요청을 보냅니다.
        const response: Response = await fetch(finalApiUrl, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          // 서버 응답이 200 OK가 아닐 경우 에러 처리
          const errorText: string = await response.text();
          throw new Error(`토큰 교환 실패: ${response.status} - ${errorText.substring(0, 50)}...`);
        }

        // 3-1. 액세스 토큰 추출 (응답 헤더에서!)
        // 헤더 값도 string 또는 null입니다.
        const fullToken: string | null = response.headers.get('Authorization');
        const accessToken: string | null = fullToken ? fullToken.replace('Bearer ', '') : null;

        if (accessToken) {
          console.log('액세스 토큰 추출 성공, AuthContext에 저장 중:', accessToken);

          // 추출한 토큰을 AuthContext의 login 함수에 전달하여
          // 전역 상태 및 LocalStorage에 저장합니다.
          login(accessToken);

          // 3-2. 성공 후 마이페이지로 이동
          router.push('/mypage');
        } else {
          throw new Error(
            '서버 응답 헤더에서 액세스 토큰을 찾을 수 없습니다. 헤더 설정을 확인해주세요.'
          );
        }
      } catch (e: unknown) {
        // TypeScript에서 오류 처리를 위해 unknown으로 타입을 지정
        // 오류 객체의 message를 안전하게 사용하기 위해 타입 가드 사용
        setError(`로그인 실패: ${e instanceof Error ? e.message : '알 수 없는 오류 발생'}`);
        setLoading(false);
      }
    };

    exchangeCodeForTokens();
  }, [searchParams, router, login]); // 의존성 배열에 router와 searchParams,login 추가

  // 로딩 및 에러 UI
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
            {loading ? 'Google 인증 정보 확인 중입니다...' : '인증 처리 완료'}
          </p>
          <p className="mt-2 text-sm text-gray-500">잠시 후 자동으로 이동됩니다.</p>
        </div>
      )}
    </div>
  );
};

const GoogleAuthCallbackPage: React.FC = () => {
  return (
    // Suspense로 감싸서, searchParams가 로드될 때까지 기다리도록 설정합니다.
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh] text-center">
          <p className="text-gray-500">인증 정보를 준비 중입니다...</p>
        </div>
      }
    >
      <CoreCallbackLogic />
    </Suspense>
  );
};

export default GoogleAuthCallbackPage;
