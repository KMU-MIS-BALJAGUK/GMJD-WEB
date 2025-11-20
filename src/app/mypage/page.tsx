'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { Tag } from '@/components/common/Tag';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { UserInfo } from '@/hooks/UserInfo';

//  (가로추가) 가로 정렬 프로필 필드 헬퍼 컴포넌트
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

// (세로추가) 세로 정렬 프로필 필드 헬퍼 컴포넌트
interface ProfileFieldVerticalProps {
  label: string;
  children: React.ReactNode;
  onEdit?: () => void;
}
const ProfileFieldVertical: React.FC<ProfileFieldVerticalProps> = ({ label, children, onEdit }) => (
  <div>
    <div className="flex justify-between items-center ">
      <p className="text-sm font-medium text-[#888888] mb-3">{label}</p>
      {onEdit && ( //  onEdit prop이 있을 때만 "수정" 버튼 렌더링
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

//  마이페이지 메인 컴포넌트
export default function MyPage() {
  const router = useRouter();
  //  useUserInfo 훅을 사용하여 데이터, 로딩, 에러 상태를 가져옵니다.
  const { user, isLoading, error } = UserInfo();
  //  팝업 상태 관리 (나중에 유원누나 팝업 컴포넌트와 연결)
  const handleEditEducation = () => {
    console.log('학력 수정 팝업 열기');
    // 예: setIsEducationPopupOpen(true);
  };

  const handleEditSkills = () => {
    console.log('스킬셋 수정 팝업 열기');
    // 예: setIsSkillsPopupOpen(true);
  };

  const handleEditInterest = () => {
    console.log('관심사 수정 팝업 열기');
  };

  // 1. 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-indigo-500"></div>
          <p className="mt-4 text-gray-700">프로필 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 2. 에러 상태 또는 사용자 데이터가 없는 경우 처리
  if (error || !user) {
    // 토큰 만료 등의 오류가 발생하면 사용자에게 메시지 표시 후 로그인 페이지로 유도
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
        <div className="text-center p-8 border border-red-300 rounded-lg shadow-xl bg-white max-w-sm">
          <h2 className="text-xl font-bold text-red-600 mb-4">프로필 로드 실패</h2>
          <p className="text-gray-700 mb-6">{error || '로그인이 필요합니다.'}</p>
          <Button
            onClick={() => router.push('/signup')}
            variant="primary"
            className="w-full bg-[#1487F9] text-white hover:bg-[#1176e3]"
          >
            다시 로그인하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-16">
      {/* 페이지 네비게이션 카드 섹션 */}
      <section className="w-full max-w-xl mx-auto px-4">
        {/* "내 프로필" 제목 */}
        <h2 className="text-xl font-bold mb-4">마이페이지</h2>

        {/* 6. 모든 정보를 담는 메인 카드 */}
        <div className="bg-white border border-[#DDDDDD] rounded-[8px] p-6 shadow-sm space-y-6">
          {/* A. 프로필 헤더 (사진, 이름, 이메일, 레벨) */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src={user.profileImageUrl || '/default-profile.png'}
              alt="프로필 이미지"
              width={100}
              height={100}
              className="rounded-full border"
            />
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm text-[#888888]">{user.introduction}</p>
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
                  {`LV.${user.level}`}
                </Tag>
              </p>
            </ProfileField>

            <ProfileField label="이메일">
              <p>{user.email}</p>
            </ProfileField>

            <hr className="border-[#E7E7E7] mb-6" />

            <ProfileFieldVertical label="학력" onEdit={handleEditEducation}>
              <div className="flex items-center space-x-2">
                <p className="text-base text-[#1D1D1D]">{user.universityName}</p>
                <div className="h-[10px] w-px bg-[#E7E7E7]"></div>
                <p className="text-base text-[#1D1D1D]">{user.major}</p>
              </div>
            </ProfileFieldVertical>

            <ProfileFieldVertical label="관심분야" onEdit={handleEditInterest}>
              <div className="flex items-center space-x-2">
                <p className="text-base text-[#1D1D1D]">{user.categoryList}</p>
              </div>
            </ProfileFieldVertical>

            <ProfileFieldVertical label="스킬셋" onEdit={handleEditSkills}>
              <div className="flex flex-wrap gap-2">
                {user.skillList.map((skill) => (
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
