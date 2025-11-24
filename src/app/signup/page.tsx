'use client';
import React from 'react';
import { Button } from '@/components/common/Button';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// 환경 변수 가져오기
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '';
// 구글 로그인 요청 URL 생성
const GOOGLE_LOGIN_START_URL =
  API_BASE_URL && GOOGLE_REDIRECT_URI
    ? `${API_BASE_URL}/oauth/google?redirect_uri=${GOOGLE_REDIRECT_URI}`
    : '';

const GOOGLE_TEXT_COLOR_CLASS = 'text-gray-600';

export default function SignupPage() {
  const handleGoogleSignIn = () => {
    if (!GOOGLE_LOGIN_START_URL) {
      console.error('Google login URL is not configured. Check environment variables.');
      return;
    }
    //구글 로그인 시작 주소로 강제 이동
    window.location.href = GOOGLE_LOGIN_START_URL;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-[calc(100vh-68px-80px)] bg-white flex justify-center items-center">
        <div className="w-full max-w-xs text-center space-y-5">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="service logo" width={80} height={50} className="mb-2" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-10">회원가입/로그인</h1>

          <div className="relative flex flex-col items-center w-full">
            {/* Google 로그인 버튼 */}
            <Tooltip open={true}>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleGoogleSignIn}
                  variant="ghost"
                  fullWidth
                  className={`
              ${GOOGLE_TEXT_COLOR_CLASS} 
              space-x-2
            `}
                >
                  <Image
                    src="/icon.png"
                    alt="Google logo"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>Sign in with Google</span>
                </Button>
              </TooltipTrigger>

              <TooltipContent side="bottom" sideOffset={5}>
                <p>SNS로 간편하게 시작하기</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
