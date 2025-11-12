// src/app/signup/page.jsx

'use client';

import React, { useState } from 'react';
// src/app/signup/page.jsx 상단에 추가
import { Button } from '@/components/common/Button';
import Image from 'next/image';
// Figma 이미지와 정확히 일치하도록 색상 정의
const LOGO_COLOR_CLASS = 'text-[#3F3356]';
const GOOGLE_TEXT_COLOR_CLASS = 'text-gray-600';
const TOOLTIP_BG_COLOR_CLASS = 'bg-blue-500'; // Figma 이미지 파란색 (blue-500이 가장 유사)
const TOOLTIP_CARET_BORDER_COLOR_CLASS = 'border-b-blue-500';

export default function SignupPage() {
  const [isSnsTooltipVisible, setIsSnsTooltipVisible] = useState(false);

  const handleGoogleSignIn = () => {
    console.log('Google 로그인 버튼 클릭됨');
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="w-full max-w-xs text-center space-y-5">
        {/* A. 로고 및 제목 */}
        <div className="flex justify-center">
          <Image
            src="/공모자들로고.png"
            alt="공모자들 로고"
            width={80}
            height={50}
            className="mb--8"
          />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-10">
          회원가입/로그인
        </h1>

        {/* 1. Google 버튼과 말풍선을 감싸는 부모 컨테이너 */}
        <div
          className="relative flex flex-col items-center w-full"
          onMouseEnter={() => setIsSnsTooltipVisible(true)}
          onMouseLeave={() => setIsSnsTooltipVisible(false)}
        >
          {/* Google 로그인 버튼 */}
          <Button
            onClick={handleGoogleSignIn}
            variant="ghost"
            fullWidth
            className={`w-full py-2 border border-gray-300 rounded-lg flex items-center justify-center 
                                  ${GOOGLE_TEXT_COLOR_CLASS} hover:bg-gray-50 transition duration-150 shadow-sm space-x-2`}
          >
            <Image
              src="/icon.png" // public 폴더 기준 경로
              alt="Google logo"
              width={20} // 로고 크기 조절 (필요에 따라 변경)
              height={20}
              className="mr-2" // Google 텍스트와의 간격
            />
            <span>Sign in with Google</span>
          </Button>

          {/* 2. SNS로 간편하게 시작하기 (말풍선/팝오버) */}
          {isSnsTooltipVisible && (
            <div
              // 💡 위치 조정: top-full 대신 정확한 픽셀 위치를 위해 style 속성 사용 (버튼 높이를 고려)
              // 💡 transition-all로 부드러운 등장 효과 추가
              className="absolute z-20 transition-all duration-300 opacity-100 visible pointer-events-none"
              style={{
                top: 'calc(100% + 10px)',
                left: '50%',
                transform: 'translateX(-50%)',
              }} // 버튼 높이 + 간격(10px)만큼 아래로 이동
            >
              <div
                className={`relative py-2 px-4 ${TOOLTIP_BG_COLOR_CLASS} text-white font-medium rounded-full shadow-lg flex justify-center items-center whitespace-nowrap`}
              >
                {/* 💡 꼬리 (Caret) div: 최종 픽셀 위치 조정 */}
                <div
                  className={`
                                    absolute -top-[6px] left-1/2 transform -translate-x-1/2 
                                    w-0 h-0 
                                    border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent 
                                    border-b-[6px] ${TOOLTIP_CARET_BORDER_COLOR_CLASS} 
                                `}
                ></div>
                SNS로 간편하게 시작하기
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
