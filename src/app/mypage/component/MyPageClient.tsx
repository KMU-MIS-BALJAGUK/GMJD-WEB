'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Tag } from '@/components/common/Tag';
import { PencilLine } from 'lucide-react';

import { useUserProfile } from '@/hooks/mypage/useUserProfile';
import { useUserProfileMutations } from '@/hooks/mypage/useUserProfileMutations';
import { UserProfileDataDto } from '@/features/mypage/types/my-profile-response';
import InfoEditPopup from '@/components/popup/profile/InfoEditPopup';

interface MyPageClientProps {
  initialUser: UserProfileDataDto;
}

interface ProfileFieldProps {
  label: string;
  children: React.ReactNode;
}

function ProfileField({ label, children }: ProfileFieldProps) {
  return (
    <div className="flex justify-between items-center py-2">
      <p className="text-sm font-medium text-text-03">{label}</p>
      <div className="text-base text-text-01">{children}</div>
    </div>
  );
}

// 세로형 필드
interface ProfileFieldVerticalProps {
  label: string;
  children: React.ReactNode;
  onEdit?: () => void;
}

function ProfileFieldVertical({ label, children, onEdit }: ProfileFieldVerticalProps) {
  return (
    <div>
      <div className="flex justify-between items-center ">
        <p className="text-sm font-medium text-text-03 mb-3">{label}</p>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-sm font-medium text-text-03 hover:text-blue mb-3 cursor-pointer"
          >
            <PencilLine size={16} />
            수정
          </button>
        )}
      </div>
      <div className="text-base text-text-01">{children}</div>
    </div>
  );
}

//  학력 정보 표시를 위한 헬퍼 컴포넌트
const EducationDisplay: React.FC<{ user: UserProfileDataDto }> = ({ user }) => {
  // education 필드에 따른 분기 처리 (ENUM 값은 백엔드 명세에 맞게 조정 필요)
  if (user.education === 'HIGH_SCHOOL') {
    return <p>고등학교</p>;
  }

  // 대학교, 전문대, 대학원 등 universityName과 major 필드를 사용하는 경우
  if (user.universityName || user.major) {
    return (
      <div className="flex items-center space-x-2 text-[15px]">
        <p>{user.universityName}</p>
        {user.universityName && user.major && <p className="text-border-01">|</p>}
        <p>{user.major}</p>
      </div>
    );
  }

  return <p className="text-text-03">학력 정보 미등록</p>;
};

export default function MyPageClient({ initialUser }: MyPageClientProps) {
  // 1.  데이터 조회 (React Query)
  const { data: user, isLoading, isError } = useUserProfile();

  // 2. Mutation Hooks 가져오기
  const mutations = useUserProfileMutations();

  // 3. 팝업 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<'intro' | 'education' | 'skill' | 'interest'>('intro');

  // 4.  팝업 열기 함수
  const openPopup = (type: typeof popupType) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };
  const handleEditIntro = () => openPopup('intro');
  const handleEditEducation = () => openPopup('education');
  const handleEditSkills = () => openPopup('skill');
  const handleEditInterest = () => openPopup('interest');

  // API 로딩/에러 처리
  const displayUser = user || initialUser;

  if (isLoading && !user) return <div>프로필을 로딩 중입니다...</div>;
  if (isError || !displayUser) return <div>프로필 정보를 불러오는 데 실패했습니다.</div>;

  return (
    <div className="h-[calc(100vh-68px-80px)] bg-white flex justify-center items-center py-16">
      <section className="w-full max-w-xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4 text-text-01 max-sm:hidden">마이페이지</h2>

        <div className="bg-white border border-border-2 rounded-[8px] p-6 shadow-sm space-y-6">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={displayUser.profileImageUrl}
              alt="프로필 이미지"
              width={100}
              height={100}
              className="rounded-full border border-border-2"
            />
            <div className="text-center">
              <h1 className="text-xl font-semibold text-text-01">{displayUser.name}</h1>
              <p className="text-sm text-text-03">{displayUser.introduction}</p>
              <Tag
                variant="blue"
                shape="rounded"
                className="mt-2 mx-auto text-xs cursor-pointer"
                onClick={handleEditIntro}
              >
                수정
              </Tag>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <ProfileField label="추천레벨">
                <Tag variant="blue" shape="rounded">
                  {`LV.${displayUser.level}`}
                </Tag>
              </ProfileField>

              <ProfileField label="이메일">
                <p className="text-[15px]">{displayUser.email}</p>
              </ProfileField>
            </div>

            <hr className="border-border-1 mb-6" />

            <ProfileFieldVertical label="학력" onEdit={handleEditEducation}>
              <EducationDisplay user={displayUser} />
            </ProfileFieldVertical>

            <ProfileFieldVertical label="관심분야" onEdit={handleEditInterest}>
              <p className="text-[15px]">
                {(displayUser.categoryList || []).join(', ') || '관심분야 미등록'}
              </p>
            </ProfileFieldVertical>

            <ProfileFieldVertical label="스킬셋" onEdit={handleEditSkills}>
              <div className="flex flex-wrap gap-2">
                {displayUser.skillList.map((skill) => (
                  <Tag key={skill} variant="default" shape="rounded" className="text-text-02">
                    {skill}
                  </Tag>
                ))}
              </div>
            </ProfileFieldVertical>
          </div>
        </div>
      </section>
      {/* 6. InfoEditPopup 렌더링 및 props 전달 */}
      <InfoEditPopup
        open={isPopupOpen}
        setOpen={setIsPopupOpen}
        type={popupType}
        initialData={displayUser}
        mutations={mutations}
      />
    </div>
  );
}
