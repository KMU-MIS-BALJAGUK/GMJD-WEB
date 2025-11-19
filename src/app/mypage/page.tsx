'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { Tag } from '@/components/common/Tag';
import { cn } from '@/lib/utils';

// 💡 1. 가짜(Mock) 데이터: 나중에 DB에서 이 데이터를 불러올 것입니다.
const MOCK_USER_DATA = {
  name: '김주미',
  email: 'gongmoja@example.com',
  Level: 'LV.3',
  avatarUrl: '/profile.png',
  intro: '안녕하세요. 잘 부탁드립니다.',
  born: '2003.04.05',
  school: '국민대학교',
  major: '경영정보학부',
  skills: ['Figma', 'Python'],
  interest: '광고마케팅',
};

// 💡 2. (가로추가) 가로 정렬 프로필 필드 헬퍼 컴포넌트
interface ProfileFieldProps {
  label: string;
  children: React.ReactNode;
}
const ProfileField: React.FC<ProfileFieldProps> = ({ label, children }) => (
  <div className="flex justify-between items-center py-2">
    <p className="text-sm font-medium text-[#888888]">{label}</p>
    <div className="text-base text-[#1D1D1D]">{children}</div>
  </div>
);

// 💡 3. (새로 추가) 세로 정렬 프로필 필드 헬퍼 컴포넌트
interface ProfileFieldVerticalProps {
  label: string;
  children: React.ReactNode;
  onEdit?: () => void;
}
const ProfileFieldVertical: React.FC<ProfileFieldVerticalProps> = ({ label, children, onEdit }) => (
  <div>
    <div className="flex justify-between items-center ">
      <p className="text-sm font-medium text-[#888888] mb-3">{label}</p>
      {onEdit && ( // 💡 onEdit prop이 있을 때만 "수정" 버튼 렌더링
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-sm font-medium text-[#888888] hover:text-[#1487F9] mb-3"
        >
          <Image src="/PencilSimpleLine.png" alt="수정" width={16} height={16} />
          수정
        </button>
      )}
    </div>
    <div className="text-base text-[#1D1D1D]">{children}</div>
  </div>
);

// 💡 3. 마이페이지 메인 컴포넌트
export default function MyPage() {
  // 💡 팝업 상태 관리 (나중에 유원누나 팝업 컴포넌트와 연결)
  const handleEditEducation = () => {
    console.log('학력 수정 팝업 열기');
    // 예: setIsEducationPopupOpen(true);
  };

  const handleEditSkills = () => {
    console.log('스킬셋 수정 팝업 열기');
    // 예: setIsSkillsPopupOpen(true);
  };

  const handleEditinterest = () => {
    console.log('관심사 수정 팝업 열기');
  };
  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-16">
      {/* 페이지 네비게이션 카드 섹션 */}
      <section className="w-full max-w-xl mx-auto px-4">
        {/* "내 프로필" 제목 */}
        <h2 className="text-xl font-bold mb-4">마이페이지</h2>

        {/* 💡 6. 모든 정보를 담는 메인 카드 */}
        <div className="bg-white border border-[#DDDDDD] rounded-[8px] p-6 shadow-sm space-y-6">
          {/* A. 프로필 헤더 (사진, 이름, 이메일, 레벨) */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src={MOCK_USER_DATA.avatarUrl}
              alt="프로필 이미지"
              width={100}
              height={100}
              className="rounded-full border"
            />
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">{MOCK_USER_DATA.name}</h1>
              <p className="text-sm text-[#888888]">{MOCK_USER_DATA.intro}</p>
            </div>
          </div>

          {/* B. 프로필 상세 정보 */}
          <div className="space-y-4">
            <ProfileField label="추천레벨">
              <p>
                <Tag
                  variant="blue"
                  shape="rounded"
                  className="w-[44px] h-[24px] p-0 justify-center text-xs"
                >
                  {MOCK_USER_DATA.Level}
                </Tag>
              </p>
            </ProfileField>

            <ProfileField label="생년월일">
              <p>{MOCK_USER_DATA.born}</p>
            </ProfileField>

            <ProfileField label="이메일">
              <p>{MOCK_USER_DATA.email}</p>
            </ProfileField>

            <hr className="border-[#E7E7E7] mb-6" />

            <ProfileFieldVertical label="학력" onEdit={handleEditEducation}>
              <div className="flex items-center space-x-2">
                <p className="text-base text-[#1D1D1D]">{MOCK_USER_DATA.school}</p>
                <div className="h-[10px] w-px bg-[#E7E7E7]"></div>
                <p className="text-base text-[#1D1D1D]">{MOCK_USER_DATA.major}</p>
              </div>
            </ProfileFieldVertical>

            <ProfileFieldVertical label="관심분야" onEdit={handleEditinterest}>
              <div className="flex items-center space-x-2">
                <p className="text-base text-[#1D1D1D]">{MOCK_USER_DATA.interest}</p>
              </div>
            </ProfileFieldVertical>

            <ProfileFieldVertical label="스킬셋" onEdit={handleEditSkills}>
              {/* 💡 justify-end 제거 (왼쪽 정렬이 기본값) */}
              <div className="flex flex-wrap gap-2">
                {MOCK_USER_DATA.skills.map((skill) => (
                  <Tag
                    key={skill}
                    variant="default"
                    shape="rounded"
                    className="w-[67px] h-[34px] justify-center text-[#555555]"
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            </ProfileFieldVertical>
          </div>
        </div>
      </section>
    </div>
  );
}
