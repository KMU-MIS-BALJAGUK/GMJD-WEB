// src/app/signup/page.jsx

'use client';
import React from 'react';
// src/app/signup/page.jsx 상단에 추가
import { Button } from '@/components/common/Button';
import Image from 'next/image';
// Figma 이미지와 정확히 일치하도록 색상 정의
const LOGO_COLOR_CLASS = 'text-[#3F3356]';
const GOOGLE_TEXT_COLOR_CLASS = 'text-gray-600';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function SignupPage() {
  const handleGoogleSignIn = () => {
    console.log('Google 로그인 버튼 클릭됨');
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="w-full max-w-xs text-center space-y-5">
          {/* A. 로고 및 제목 */}
          <div className="flex justify-center">
            <Image
              src="/공모자들로고.png"
              alt="공모자들 로고"
              width={80}
              height={50}
              className="mb-2"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-10">회원가입/로그인</h1>

          {/* 1. Google 버튼과 말풍선을 감싸는 부모 컨테이너 */}
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

              {/* 2. SNS로 간편하게 시작하기 (툴팁) */}
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
