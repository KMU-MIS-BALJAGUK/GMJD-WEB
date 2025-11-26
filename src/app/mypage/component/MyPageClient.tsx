'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Tag } from '@/components/common/Tag';
import { PencilLine } from 'lucide-react';
import { useUserProfile } from '@/hooks/mypage/useUserProfile';
import { UserProfileDataDto } from '@/features/mypage/types/my-profile-response';
import InfoEditPopup from '@/components/popup/profile/InfoEditPopup';

import { useUserProfileMutations } from '@/hooks/mypage/useUserProfileMutations';
import {
  IntroductionRequestDto,
  EducationInfoRequestDto,
  SkillsRequestDto,
  CategoryRequestDto,
} from '@/features/mypage/types/my-profile-request';

type PopupType = 'intro' | 'education' | 'skill' | 'interest';

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

export default function MyPageClient() {
  // 팝업 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>('intro');

  // 데이터 Query Hook
  const { data: userProfile, isLoading, isError } = useUserProfile();

  // 💡 [수정] Mutation 훅 호출 및 구조 분해 할당
  const {
    updateIntroMutation,
    updateEducationMutation,
    updateSkillsMutation,
    updateCategoriesMutation,
  } = useUserProfileMutations();

  // InfoEditPopup Props 이름에 맞게 Mutation 변수 이름 재할당
  const updateIntro = updateIntroMutation;
  const updateEducation = updateEducationMutation;
  const updateSkills = updateSkillsMutation;
  const updateCategories = updateCategoriesMutation;

  // 수정 버튼 클릭 핸들러: 팝업 열기 및 타입 설정
  const handleOpenPopup = (type: PopupType) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const handleEditIntro = () => handleOpenPopup('intro');
  const handleEditEducation = () => handleOpenPopup('education');
  const handleEditSkills = () => handleOpenPopup('skill');
  const handleEditInterest = () => handleOpenPopup('interest');

  // 2. 로딩 및 에러 처리 (스켈레톤 UI로 나중에 변경, 임시로 텍스트 처리)
  if (isLoading) {
    return <div className="text-center py-20">프로필 정보를 불러오는 중입니다...</div>;
  }

  if (isError || !userProfile) {
    return (
      <div className="text-center py-20 text-red-500">프로필 정보를 불러오는 데 실패했습니다.</div>
    );
  }

  const user: UserProfileDataDto = userProfile;

  // 팝업에 전달할 초기 데이터 준비
  const initialData = {
    introduction: user.introduction,
    universityName: user.universityName,
    major: user.major,
    skillList: user.skillList,
    categoryList: user.categoryList,
  };

  return (
    <div className="h-[calc(100vh-68px-80px)] bg-white flex justify-center items-center py-16">
      <section className="w-full max-w-xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4 text-text-01 max-sm:hidden">마이페이지</h2>

        <div className="bg-white border border-border-2 rounded-[8px] p-6 shadow-sm space-y-6">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={user.profileImageUrl || '/default-avatar.png'}
              alt="프로필 이미지"
              width={100}
              height={100}
              className="rounded-full border border-border-2"
            />
            <div className="text-center">
              <h1 className="text-xl font-semibold text-text-01">{user.name}</h1>
              <p className="text-sm text-text-03">{user.introduction}</p>
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
                  {user.level}
                </Tag>
              </ProfileField>

              <ProfileField label="이메일">
                <p className="text-[15px]">{user.email}</p>
              </ProfileField>
            </div>

            <hr className="border-border-1 mb-6" />

            <ProfileFieldVertical label="학력" onEdit={handleEditEducation}>
              <div className="flex items-center space-x-2 text-[15px]">
                <p>{user.universityName}</p>
                <p className="text-border-01">|</p>
                <p>{user.major}</p>
              </div>
            </ProfileFieldVertical>

            <ProfileFieldVertical label="관심분야" onEdit={handleEditInterest}>
              <p className="text-[15px]">{user.categoryList.join(', ')}</p>
            </ProfileFieldVertical>

            <ProfileFieldVertical label="스킬셋" onEdit={handleEditSkills}>
              <div className="flex flex-wrap gap-2">
                {user.skillList.map((skillList) => (
                  <Tag key={skillList} variant="default" shape="rounded" className="text-text-02">
                    {skillList}
                  </Tag>
                ))}
              </div>
            </ProfileFieldVertical>
          </div>
        </div>
      </section>
      {/* InfoEditPopup 렌더링 및 Props 전달 */}
      <InfoEditPopup
        open={isPopupOpen}
        setOpen={setIsPopupOpen}
        type={popupType}
        initialData={initialData}
        // Mutation 훅 전달
        updateIntro={updateIntro}
        updateEducation={updateEducation}
        updateSkills={updateSkills}
        updateCategories={updateCategories}
      />
    </div>
  );
}
