import React, { useState, useEffect } from 'react';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import Input from '../../common/Input';
import { Search, X } from 'lucide-react';
import Button from '../../common/Button';
import Tag from '../../common/Tag';
import { SelectBox } from '@/components/common/SelectBox';

import { useUserProfileMutations } from '@/hooks/mypage/useUserProfileMutations';
import { UserProfileDataDto } from '@/features/mypage/types/my-profile-response';
import {
  IntroductionRequestDto,
  EducationInfoRequestDto,
  SkillsRequestDto,
  CategoryRequestDto,
} from '@/features/mypage/types/my-profile-request';
import { EDUCATION_MAP, DEGREE_MAP, EducationLevel, RecognizedDegree } from '@/constants/register';
import { CATEGORY_MAP } from '@/constants/contest';

const CATEGORY_OPTIONS = Object.keys(CATEGORY_MAP).map((name) => ({
  value: name,
  label: name,
}));

//ENUM <=> 한글 역매핑 상수 정의 (초기값 설정을 위해 ENUM -> 한글 변환)
const REVERSE_EDUCATION_MAP: Record<string, string> = Object.entries(EDUCATION_MAP).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as Record<string, string>
);

const REVERSE_DEGREE_MAP: Record<string, string> = Object.entries(DEGREE_MAP).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as Record<string, string>
);

// Props 인터페이스 확장
interface InfoEditPopupProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  type: 'intro' | 'education' | 'skill' | 'interest';
  initialData: UserProfileDataDto | undefined;
  mutations: ReturnType<typeof useUserProfileMutations>;
}

const InfoEditPopup = ({ open, setOpen, type, initialData, mutations }: InfoEditPopupProps) => {
  // 변수 관리
  const [intro, setIntro] = useState<string>('');
  const [univ, setUniv] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [skill, setSkill] = useState<string>('');
  const [skillSet, setSkillSet] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [interest, setInterest] = useState<string>('');

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

  //  팝업 열릴 때 initialData로 상태 초기화
  useEffect(() => {
    if (open && initialData) {
      setIntro(initialData.introduction || '');
      setUniv(initialData.universityName || '');
      setMajor(initialData.major || '');
      setSkillSet(initialData.skillList || []);
      setInterest(initialData.categoryList?.[0] || '');

      // 학력/학위 초기화 로직 (ENUM -> 한글 역매핑)
      if (initialData.education) {
        setSelectedEducation(REVERSE_EDUCATION_MAP[initialData.education] || '대학교');
      }
      if (initialData.recognizedDegree) {
        setSelectedMajorType(REVERSE_DEGREE_MAP[initialData.recognizedDegree] || '대학교 (4년제)');
      }
    }
  }, [open, initialData]);

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
    if (!initialData) return;

    switch (type) {
      case 'intro': {
        const body: IntroductionRequestDto = { introduction: intro };
        mutations.updateIntroMutation.mutate(body, {
          onSuccess: () => {
            setOpen(false);
          },
        });
        break;
      }
      case 'education': {
        const DEFAULT_EDUCATION = EDUCATION_MAP['대학교'];
        const DEFAULT_DEGREE = DEGREE_MAP['대학교 (4년제)'];

        const body: EducationInfoRequestDto = {
          universityName: univ,
          major: major,
          // 한글 -> ENUM 변환하여 전송 (EDUCATION_MAP, DEGREE_MAP 사용)
          education: EDUCATION_MAP[selectedEducation] || DEFAULT_EDUCATION,
          recognizedDegree: DEGREE_MAP[selectedMajorType] || DEFAULT_DEGREE,
        };
        mutations.updateEducationMutation.mutate(body, {
          onSuccess: () => {
            setOpen(false);
          },
        });
        break;
      }
      case 'skill': {
        const body: SkillsRequestDto = { skills: skillSet };
        mutations.updateSkillsMutation.mutate(body, {
          onSuccess: () => {
            setOpen(false);
          },
        });
        break;
      }
      case 'interest': {
        // 관심분야는 SelectBox의 'value'를 사용하므로, 실제 백엔드 요청 DTO에 맞게 categoryIds를 구성해야 함.
        const selectedId = CATEGORY_MAP[interest];
        if (!selectedId) {
          // 관심분야가 선택되지 않았거나 유효하지 않은 경우 (초기값 미설정 등)
          alert('관심분야를 선택해주세요.');
          return;
        }

        const body: CategoryRequestDto = { categoryIds: [selectedId] };
        mutations.updateCategoriesMutation.mutate(body, {
          onSuccess: () => {
            setOpen(false);
          },
        });
        break;
      }
      default:
        break;
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
            />
          </div>

          <div className="pt-5">
            <Button
              className="w-full"
              variant="primary"
              onClick={handleSubmit}
              disabled={mutations.updateIntroMutation.isPending}
            >
              {mutations.updateIntroMutation.isPending ? '수정 중...' : '수정 완료'}
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
              >
                고등학교
              </Button>
              <Button
                variant={selectedEducation === '대학교' ? 'active' : 'ghost'}
                className="w-1/2"
                onClick={() => setSelectedEducation('대학교')}
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
              disabled={mutations.updateEducationMutation.isPending}
            >
              {mutations.updateEducationMutation.isPending ? '수정 중...' : '수정 완료'}
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
              icon={
                <p
                  className="text-blue text-xs font-extrabold"
                  onClick={() => {
                    if (!skill.trim()) return;
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
                        onClick={() => removeSkills(index)}
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
              disabled={mutations.updateSkillsMutation.isPending}
            >
              {mutations.updateSkillsMutation.isPending ? '수정 중...' : '수정 완료'}
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
              options={CATEGORY_OPTIONS}
              className="mt-1"
            />
          </div>

          <div className="pt-5">
            <Button
              className="w-full"
              variant="primary"
              onClick={handleSubmit}
              disabled={mutations.updateCategoriesMutation.isPending}
            >
              {mutations.updateCategoriesMutation.isPending ? '수정 중...' : '수정 완료'}
            </Button>
          </div>
        </div>
      )}
    </LayerPopup>
  );
};

export default InfoEditPopup;
