'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/common/Button';
import { Tag } from '@/components/common/Tag';
import { SelectBox } from '@/components/common/SelectBox';
import { Search, X } from 'lucide-react';
import Input from '@/components/common/Input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

import { useSignUp } from '@/hooks/register/useSignup';
import { UserProfileDto } from '@/features/register/types/register';
import { EDUCATION_MAP, DEGREE_MAP, CATEGORY_MAP } from '@/constants/register';
import { useToast } from '@/components/ui/use-toast';
import { useUniversitySearch } from '@/hooks/univSearch/useUniversitySearch';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}
const FormField = ({ label, children, disabled }: FormFieldProps) => (
  <div className="space-y-2 flex flex-col">
    <label
      className={cn(
        'text-base font-bold text-[#1D1D1D] block',
        disabled && 'opacity-50 transition-opacity duration-300'
      )}
    >
      {label}
    </label>
    {children}
  </div>
);

const univList = [
  '서울대학교',
  '연세대학교',
  '고려대학교',
  '성균관대학교',
  '한양대학교',
  '경희대학교',
];

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { query, setQuery, filtered } = useUniversitySearch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // useSignUp 훅 사용
  const {
    mutate: signUpMutate,
    isPending,
    isSuccess,
    isError,
    error,
  } = useSignUp({
    onSuccess: (data) => {
      console.log('✅ 회원가입 성공:', data);
      toast({
        variant: 'default',
        title: '회원가입이 성공적으로 완료되었습니다! 🎉',
        description: '메인 페이지로 이동합니다.',
      });
      router.push('/');
    },
    onError: (err) => {
      console.error('❌ 회원가입 실패:', err);
      toast({
        title: '회원가입에 실패했습니다. 🚨',
        description: `잠시 후 다시 시도해주세요.`,
        variant: 'destructive',
      });
    },
  });

  // 1. 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    intro: '', // 한줄 소개
    school: '', // 학교명
    department: '', // 학과명
    interest: '', // 관심분야 (CATEGORY_MAP의 key 값)
    skills: '', // 스킬/툴 (입력 필드)
  });
  // 2. 선택형 데이터 상태 관리
  const [selectedEducation, setSelectedEducation] = useState('대학교'); // '고등학교' | '대학교'
  const [selectedMajorType, setSelectedMajorType] = useState('대학교 (2, 3년제)'); // '대학교 (2, 3년제)' | '대학교 (4년제)' | '대학원'
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const isHighschool = selectedEducation === '고등학교';

  //  3. 새로 추가된 스킬 목록 상태 (배열)
  const [skillsList, setSkillsList] = useState<string[]>([]);
  //4. 버튼 활성화 상태 관리
  const [isButtonActive, setIsButtonActive] = useState(false);

  // 5. 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 학교명 입력 시 드롭다운 다시 표시
    if (name === 'school') {
      setShowDropdown(true);
    }
  };

  // SelectBox 전용 핸들러 (SelectBox는 'value'를 직접 전달함)
  const handleInterestChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      interest: value,
    }));
  };

  // 6. "추가" 버튼 클릭 핸들러
  const handleAddSkill = (value: string) => {
    const newSkill = value.trim();

    if (newSkill && !skillsList.includes(newSkill)) {
      setSkillsList((prevList) => [...prevList, newSkill]);

      // 입력창 비우기
      setFormData((prevData) => ({
        ...prevData,
        skills: '',
      }));
    }
  };

  // 7. 'x' 버튼 클릭 핸들러 (스킬 제거)
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillsList((prevList) => prevList.filter((skill) => skill !== skillToRemove));
  };

  // 8. 유효성 검사 (값이 변경될 때마다 실행)
  useEffect(() => {
    // 고등학교 선택 시, 학교명/학과명 필드 모두 무시
    const isEducationFieldsValid = isHighschool
      ? true // 고등학교 선택 시, 대학교 관련 필드는 유효성 검사 통과
      : formData.school.trim() !== '' && formData.department.trim() !== ''; // 대학교 선택 시 학교명, 학과명 필수

    const isBaseFieldsValid =
      formData.intro.trim() !== '' && formData.interest !== '' && skillsList.length > 0;

    const isValid = isBaseFieldsValid && isEducationFieldsValid;

    setIsButtonActive(isValid);
  }, [formData, skillsList, isHighschool]);

  // 9. 제출 핸들러 (API 호출 로직)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isButtonActive || isPending) return;

    //  폼 데이터를 UserProfileDto에 맞게 가공
    const categoryId = CATEGORY_MAP[formData.interest];
    if (formData.interest && !categoryId) {
      console.error('유효하지 않은 관심분야 값입니다.');
      toast({
        variant: 'destructive',
        title: '관심분야 선택 오류 🚨',
        description: '관심분야를 올바르게 선택해주세요.',
      });
      return;
    }

    // HighSchool 여부에 따라 DTO 데이터 변경
    const highschoolData = {
      universityName: null,
      recognizedDegree: null,
      major: null,
    };

    // 대학원 선택 시 특별 처리
    const isGraduateSchool = selectedMajorType === '대학원';

    const universityData = {
      universityName: formData.school.trim(),
      recognizedDegree: isGraduateSchool ? null : DEGREE_MAP[selectedMajorType],
      major: formData.department.trim(),
    };

    const submitData: UserProfileDto = {
      introduction: formData.intro.trim(),
      education: isHighschool
        ? EDUCATION_MAP[selectedEducation]
        : isGraduateSchool
        ? 'MASTER'
        : EDUCATION_MAP[selectedEducation],
      categoryIds: categoryId ? [categoryId] : [],
      skills: skillsList,
      ...(isHighschool ? highschoolData : universityData),
    };

    console.log('최종 전송 DTO:', submitData);

    // API 호출 시작
    signUpMutate(submitData);
  };

  // 시안에 맞는 스타일 정의
  const FORM_MAX_WIDTH = 'max-w-3xl';
  const HEADING_CLASS = 'text-lg font-bold text-[#1D1D1D]';

  const filteredUnivList = univList.filter((name) =>
    name.toLowerCase().includes(formData.school.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className={`mx-auto px-4 ${FORM_MAX_WIDTH} pt-10`}>
        {/* 메인 콘텐츠 시작 */}
        <form onSubmit={handleSubmit} className="space-y-12 pb-20">
          {/* 환영 헤더 */}
          <h1 className={HEADING_CLASS}>
            공모자들에 오신 것을 <br />
            환영합니다 🌱
          </h1>

          {/* 폼 필드 섹션 */}
          <div className="space-y-10">
            {/* 1. 한줄 소개 */}
            <FormField label="한 줄 소개">
              <Input
                placeholder="한 줄 소개를 입력해주세요"
                name="intro"
                value={formData.intro}
                onChange={handleInputChange}
              />
            </FormField>

            {/* 2. 학력 (Tags) */}
            <FormField label="학력">
              <div className="flex gap-2 w-full">
                <Button
                  variant={selectedEducation === '고등학교' ? 'active' : 'ghost'}
                  className="w-1/2"
                  type="button"
                  onClick={() => setSelectedEducation('고등학교')}
                >
                  고등학교
                </Button>
                <Button
                  variant={selectedEducation === '대학교' ? 'active' : 'ghost'}
                  className="w-1/2"
                  type="button"
                  onClick={() => setSelectedEducation('대학교')}
                >
                  대학교 / 대학원
                </Button>
              </div>
            </FormField>

            {/* 3. 학교명 검색 */}
            <FormField label="학교 명 검색" disabled={isHighschool}>
              <div
                ref={dropdownRef}
                className={`relative w-full ${
                  isHighschool
                    ? 'opacity-50 cursor-not-allowed pointer-events-none transition-opacity duration-300'
                    : ''
                }`}
              >
                <Input
                  name="school"
                  value={formData.school}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(e);
                    setQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  placeholder="학교 명을 입력해주세요"
                  className="w-full"
                  icon={
                    <Search
                      size={20}
                      className="text-text-02 cursor-pointer"
                      onClick={() => setShowDropdown((prev) => !prev)}
                      onFocus={() => setShowDropdown(true)}
                      onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    />
                  }
                />

                {/* 자동완성 리스트 */}
                {showDropdown && !isHighschool && filtered.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto scrollbar">
                    {filtered.map((u) => (
                      <li
                        key={u.id}
                        className="px-3 py-2.5 text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, school: u.name }));
                          setQuery(u.name);
                          setShowDropdown(false);
                        }}
                      >
                        {u.name}
                      </li>
                    ))}
                  </ul>
                )}

                {/* 검색 결과 없음 */}
                {showDropdown && !isHighschool && filtered.length === 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3 text-sm text-gray-500">
                    검색 결과가 없습니다.
                  </div>
                )}
              </div>
            </FormField>

            {/* 4. 인정 학력 선택 (Tags) */}
            <FormField label="인정 학력 선택" disabled={isHighschool}>
              <div
                className={`flex gap-2 w-full ${
                  isHighschool
                    ? 'opacity-50 cursor-not-allowed pointer-events-none transition-opacity duration-300'
                    : ''
                }`}
              >
                <Button
                  variant={selectedMajorType === '대학교 (2, 3년제)' ? 'active' : 'ghost'}
                  className="w-1/3"
                  type="button"
                  onClick={() => setSelectedMajorType('대학교 (2, 3년제)')}
                >
                  대학교 <br className="sm:hidden" /> (2, 3년제)
                </Button>
                <Button
                  variant={selectedMajorType === '대학교 (4년제)' ? 'active' : 'ghost'}
                  className="w-1/3"
                  type="button"
                  onClick={() => setSelectedMajorType('대학교 (4년제)')}
                >
                  대학교 <br className="sm:hidden" /> (4년제)
                </Button>
                <Button
                  variant={selectedMajorType === '대학원' ? 'active' : 'ghost'}
                  className="w-1/3"
                  type="button"
                  onClick={() => setSelectedMajorType('대학원')}
                >
                  대학원
                </Button>
              </div>
            </FormField>

            {/* 5. 학과 명 입력 */}
            <FormField label="학과 명 입력" disabled={isHighschool}>
              <div
                className={`${
                  isHighschool
                    ? 'opacity-50 cursor-not-allowed pointer-events-none transition-opacity duration-300'
                    : ''
                }`}
              >
                <Input
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="학과 명을 입력해주세요"
                />
              </div>
            </FormField>

            {/* 6. 관심 분야 (Dropdown Placeholder) */}
            <FormField label="관심분야">
              <SelectBox
                type="single"
                placeholder="선택해주세요"
                value={formData.interest}
                onChange={handleInterestChange}
                options={Object.keys(CATEGORY_MAP).map((key) => ({
                  value: key,
                  label: key,
                }))}
              />
            </FormField>

            {/* 7. 스킬/툴 */}
            <FormField label="스킬셋">
              <div className="relative w-full">
                <Input
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (formData.skills.trim()) {
                        handleAddSkill(formData.skills);
                      }
                    }
                  }}
                  placeholder="활용 가능한 기술을 작성해주세요"
                  icon={
                    <p
                      className="text-blue text-xs font-extrabold cursor-pointer"
                      onClick={() => handleAddSkill(formData.skills)}
                    >
                      추가
                    </p>
                  }
                />
              </div>
              {/*  8. 추가된 스킬 태그 렌더링 영역 */}
              <div className="flex flex-wrap gap-3">
                {skillsList.map((skill, index) => (
                  <Tag
                    key={index}
                    shape="rounded"
                    icon={
                      <X
                        size={16}
                        className="text-text-04 cursor-pointer"
                        onClick={() => handleRemoveSkill(skill)}
                      />
                    }
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            </FormField>
          </div>

          {/* 하단 버튼 (유효성 검사에 따라 variant 변경) */}
          <div className="pt-8">
            <Button
              type="submit"
              variant={isButtonActive ? 'primary' : 'disabled'}
              fullWidth
              className="h-[52px]"
              isLoading={isPending}
              disabled={!isButtonActive || isPending} // 실제 클릭 방지
              onClick={handleSubmit}
              onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            >
              {isPending ? '등록 중...' : '완료'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
