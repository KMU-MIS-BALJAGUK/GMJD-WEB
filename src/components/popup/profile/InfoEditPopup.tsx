import React, { useState, useEffect } from 'react';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import Input from '../../common/Input';
import { Search, X } from 'lucide-react';
import Button from '../../common/Button';
import Tag from '../../common/Tag';
import { SelectBox } from '@/components/common/SelectBox';
import { EducationLevel, RecognizedDegree, EDUCATION_MAP, DEGREE_MAP } from '@/constants/register';
import { UseMutationResult } from '@tanstack/react-query';
import {
  SkillsRequestDto,
  EducationInfoRequestDto,
  CategoryRequestDto,
  IntroductionRequestDto,
} from '@/features/mypage/types/my-profile-request';
import { CATEGORY_MAP } from '@/constants/contest';

type MutationType<T> = UseMutationResult<void, Error, T>;

interface InfoEditPopupProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  type: 'intro' | 'education' | 'skill' | 'interest';

  initialData: {
    introduction?: string;
    universityName?: string;
    major?: string;
    skillList?: string[];
    categoryList?: string[];
  };

  updateIntro?: MutationType<IntroductionRequestDto>;
  updateSkills?: MutationType<SkillsRequestDto>;
  updateEducation?: MutationType<EducationInfoRequestDto>;
  updateCategories?: MutationType<CategoryRequestDto>;
}

const InfoEditPopup = ({
  open,
  setOpen,
  type,
  initialData,
  updateIntro,
  updateSkills,
  updateEducation,
  updateCategories,
}: InfoEditPopupProps) => {
  // 💡 Mutation 상태 (isPending)를 통합하여 로딩 처리
  const isPending =
    updateIntro?.isPending ||
    updateEducation?.isPending ||
    updateSkills?.isPending ||
    updateCategories?.isPending ||
    false;

  // 변수 관리 (initialData를 사용하여 초기값 설정)

  const [intro, setIntro] = useState<string>(initialData.introduction || '');
  const [univ, setUniv] = useState<string>(initialData.universityName || '');
  const [major, setMajor] = useState<string>(initialData.major || '');
  const [skill, setSkill] = useState<string>('');
  // 스킬셋 초기값 설정 시 initialData.skillList 사용
  const [skillSet, setSkillSet] = useState<string[]>(initialData.skillList || []);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [interest, setInterest] = useState<string>(initialData.categoryList?.join(', ') || ''); // 관심분야는 임시로 문자열로 처리 // 🚨 초기값 설정을 위한 useEffect (모달이 열릴 때마다 초기화)

  useEffect(() => {
    // type에 따라 초기값을 설정합니다.
    if (open) {
      setIntro(initialData.introduction || '');
      setUniv(initialData.universityName || '');
      setMajor(initialData.major || '');
      setSkillSet(initialData.skillList || []);
      setInterest(initialData.categoryList?.join(', ') || '');
      // 🚨 학력/학위는 현재 DB 값(ENUM)을 한글 값으로 역매핑하여 초기화해야 함
      // 여기서는 초기값이 없다고 가정하고 기본값 유지:
      setSelectedEducation('대학교');
      setSelectedMajorType('대학교 (4년제)');
    }
  }, [open, initialData]);

  const [selectedEducation, setSelectedEducation] = useState<string>('대학교');
  const [selectedMajorType, setSelectedMajorType] = useState<string>('대학교 (4년제)');
  const isHighschool = selectedEducation === '고등학교';

  const univList = [
    '서울대학교',
    '연세대학교',
    '고려대학교',
    '성균관대학교',
    '한양대학교',
    '경희대학교',
  ];

  // 함수 관리
  const addSkills = (q: string) => {
    setSkillSet([...skillSet, q]);
  };

  const removeSkills = (index: number) => {
    const newSkills = [...skillSet];
    newSkills.splice(index, 1);
    setSkillSet(newSkills);
  };

  const handleSubmit = () => {
    // 모든 성공 시 공통 처리
    const handleSuccess = () => {
      setOpen(false);
      // alert('수정 완료!'); // React Query의 invalidateQueries가 알아서 데이터를 새로고침합니다.
    };
    const handleError = (e: Error) => {
      alert(`수정 실패: ${e.message}`);
    };

    if (type === 'intro' && updateIntro) {
      const body: IntroductionRequestDto = { introduction: intro };
      updateIntro.mutate(body, { onSuccess: handleSuccess, onError: handleError });
    } else if (type === 'education' && updateEducation) {
      // 클라이언트 선택 값을 백엔드 ENUM으로 매핑
      const educationEnum = EDUCATION_MAP[selectedEducation as keyof typeof EDUCATION_MAP];
      const degreeEnum = DEGREE_MAP[selectedMajorType as keyof typeof DEGREE_MAP];

      if (!educationEnum || !degreeEnum) {
        alert('유효하지 않은 학력/학위 선택입니다.');
        return;
      }

      const body: EducationInfoRequestDto = {
        // 고등학교 선택 시 학교명/학과명을 서버가 무시하더라도 클라이언트에서 clear하는게 안전
        universityName: isHighschool ? '' : univ,
        major: isHighschool ? '' : major,
        education: educationEnum,
        recognizedDegree: degreeEnum,
      };

      updateEducation.mutate(body, { onSuccess: handleSuccess, onError: handleError });
    } else if (type === 'skill' && updateSkills) {
      const body: SkillsRequestDto = { skills: skillSet };
      updateSkills.mutate(body, { onSuccess: handleSuccess, onError: handleError });
    } else if (type === 'interest' && updateCategories) {
      const categoryId = CATEGORY_MAP[interest];

      if (!categoryId) {
        alert('유효하지 않은 관심분야 선택이거나, 선택된 항목이 없습니다.');
        return;
      }
      const body: CategoryRequestDto = { categoryIds: [categoryId] };

      updateCategories.mutate(body, { onSuccess: handleSuccess, onError: handleError });
    }
  };
  return (
    <LayerPopup
      open={open}
      setOpen={setOpen}
      title={`${
        type === 'skill'
          ? '스킬셋'
          : type === 'education'
          ? '학력'
          : type === 'intro'
          ? '한 줄 소개'
          : '관심분야'
      } 수정`}
    >
      {type === 'intro' ? (
        // 🔹 한 줄 소개 수정
        <div className="flex flex-col gap-5">
          <div>
            <p>한 줄 소개</p>
            <Input
              placeholder="간단한 소개를 입력해주세요."
              className="mt-1"
              value={intro}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIntro(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="pt-5">
            <Button
              className="w-full"
              variant="primary"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? '수정 중...' : '수정 완료'}
            </Button>
          </div>
        </div>
      ) : type === 'education' ? (
        // 🔹 학력 수정
        <div className="flex flex-col gap-5 ">
          <div>
            <p>학력</p>
            <div className="flex gap-2 mt-1">
              <Button
                variant={selectedEducation === '고등학교' ? 'active' : 'ghost'}
                className="w-1/2"
                onClick={() => setSelectedEducation('고등학교')}
                disabled={isPending}
              >
                고등학교
              </Button>
              <Button
                variant={selectedEducation === '대학교' ? 'active' : 'ghost'}
                className="w-1/2"
                onClick={() => setSelectedEducation('대학교')}
                disabled={isPending}
              >
                대학교
              </Button>
            </div>
          </div>

          {/* 학교명 검색 */}
          <div
            className={`relative ${
              isHighschool ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
            }`}
          >
            <p>학교명 검색</p>
            <Input
              placeholder="학교명을 입력해주세요."
              className="mt-1"
              value={univ}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUniv(e.target.value)}
              disabled={isPending}
              icon={
                <Search
                  size={20}
                  className="text-text-02 cursor-pointer"
                  onClick={() => setShowDropdown(true)}
                />
              }
            />

            {univ.length > 0 && showDropdown && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto scrollbar">
                {univList.map((name, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-bg-blue cursor-pointer"
                    onClick={() => {
                      setUniv(name);
                      setShowDropdown(false);
                    }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 학과명 */}
          <div
            className={`${isHighschool ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
          >
            <p>학과명 입력</p>
            <Input
              placeholder="학과명을 입력해주세요."
              className="mt-1"
              value={major}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMajor(e.target.value)}
              disabled={isPending}
            />
          </div>

          {/* 인정 학력 */}
          <div
            className={`${isHighschool ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
          >
            <p>인정 학력 선택</p>
            <div className="flex gap-2 mt-1">
              <Button
                variant={selectedMajorType === '대학교 (2, 3년제)' ? 'active' : 'ghost'}
                className="w-1/2"
                onClick={() => setSelectedMajorType('대학교 (2, 3년제)')}
                disabled={isPending}
              >
                대학교 (2, 3년제)
              </Button>
              <Button
                variant={selectedMajorType === '대학교 (4년제)' ? 'active' : 'ghost'}
                className="w-1/2"
                onClick={() => setSelectedMajorType('대학교 (4년제)')}
              >
                대학교 (4년제)
              </Button>
            </div>
          </div>

          <div className="pt-5">
            <Button
              className="w-full"
              variant="primary"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? '수정 중...' : '수정 완료'}
            </Button>
          </div>
        </div>
      ) : type === 'skill' ? (
        // 🔹 스킬셋 수정
        <div className="flex flex-col gap-5">
          <div>
            <p>스킬셋</p>
            <Input
              placeholder="스킬을 입력해주세요."
              className="mt-1"
              value={skill}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSkill(e.target.value)}
              disabled={isPending}
              icon={
                <p
                  className="text-blue text-xs font-extrabold"
                  onClick={() => {
                    if (isPending || !skill.trim()) return;
                    addSkills(skill);
                    setSkill('');
                  }}
                >
                  추가
                </p>
              }
            />

            {skillSet.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skillSet.map((skill, index) => (
                  <Tag
                    key={index}
                    icon={
                      <X
                        size={15}
                        className="text-text-04 cursor-pointer"
                        onClick={() => !isPending && removeSkills(index)}
                      />
                    }
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          <div className="pt-5">
            <Button
              className="w-full"
              variant="primary"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? '수정 중...' : '수정 완료'}
            </Button>
          </div>
        </div>
      ) : (
        // 🔹 관심분야 수정
        <div className="flex flex-col gap-5">
          <div>
            <p>관심분야</p>
            <SelectBox
              type="single"
              placeholder="선택해주세요"
              value={interest}
              onChange={(value) => setInterest(value)}
              options={[
                { value: '사진/영상/UCC', label: '사진/영상/UCC' },
                { value: '광고/마케팅', label: '광고/마케팅' },
                { value: '디자인/순수미술/공예', label: '디자인/순수미술/공예' },
                { value: '네이밍/슬로건', label: '네이밍/슬로건' },
              ]}
              className="mt-1"
              disabled={isPending}
            />
          </div>

          <div className="pt-5">
            <Button
              className="w-full"
              variant="primary"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? '수정 중...' : '수정 완료'}
            </Button>
          </div>
        </div>
      )}
    </LayerPopup>
  );
};

export default InfoEditPopup;
