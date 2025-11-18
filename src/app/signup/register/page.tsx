// src/app/signup/register/page.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { Tag } from '@/components/common/Tag';
import { cn } from '@/lib/utils';
import { SelectionChip } from './components/SelectionChip';
import { CustomInput } from './components/CustomInput';
import Image from 'next/image';
import RightPopoverSelect from './components/RightPopoverSelect';

// 폼 필드 구조를 단순화하기 위한 헬퍼 컴포넌트
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}
const FormField = ({ label, children }: FormFieldProps) => (
  <div className="space-y-2 flex flex-col">
    <label className="text-base font-bold text-[#1D1D1D] block">{label}</label>
    {children}
  </div>
);

// SelectBox에 전달할 옵션 목록을 정의합니다. (SelectBox 컴포넌트의 Option 타입과 일치)
const interestOptions = [
  { value: '사진/영상/UCC', label: '사진/영상/UCC' },
  { value: '광고/마케팅', label: '광고/마케팅' },
  { value: '디자인/순수미술/공예', label: '디자인/순수미술/공예' },
  { value: '네이밍/슬로건', label: '네이밍/슬로건' },
];

export default function RegisterPage() {
  // 1. 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    intro: '',
    school: '',
    department: '', // 학과명
    interest: '', // 관심분야
    skills: '', // 스킬/툴
  });
  // 2. 선택형 데이터 상태 관리
  const [selectedEducation, setSelectedEducation] = useState('대학교');
  const [selectedMajorType, setSelectedMajorType] = useState('대학교 (4년)');

  // 💡 3. 새로 추가된 스킬 목록 상태 (배열)
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
  };

  // 💡 SelectBox 전용 핸들러 (SelectBox는 'value'를 직접 전달함)
  const handleInterestChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      interest: value,
    }));
  };
  // 💡 6. "추가" 버튼 클릭 핸들러
  const handleAddSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 폼 제출 방지
    const newSkill = formData.skills.trim();

    // 비어있지 않고, 중복되지 않은 스킬만 추가
    if (newSkill && !skillsList.includes(newSkill)) {
      setSkillsList((prevList) => [...prevList, newSkill]);
      // 스킬 입력창 비우기
      setFormData((prevData) => ({
        ...prevData,
        skills: '',
      }));
    }
  };

  // 💡 7. 'x' 버튼 클릭 핸들러 (스킬 제거)
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillsList((prevList) => prevList.filter((skill) => skill !== skillToRemove));
  };

  // 8. 유효성 검사 (값이 변경될 때마다 실행)
  useEffect(() => {
    console.log('Form Data Updated:', formData);
    // 필수 필드 체크: 한줄소개, 학교명, 학과명, 관심분야 (스킬은 선택사항일 경우 제외 가능)
    const isValid =
      formData.intro.trim() !== '' &&
      formData.school.trim() !== '' &&
      formData.department.trim() !== '' &&
      formData.interest !== '' &&
      skillsList.length > 0;

    console.log('Is Form Valid:', isValid);

    setIsButtonActive(isValid);
  }, [formData, skillsList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isButtonActive) return; // 비활성화 시 return

    console.log('완료되었습니다. 최종 폼 데이터:', {
      ...formData,
      education: selectedEducation,
      majorType: selectedMajorType,
      skillSet: skillsList,
    });
    // 해야할것: 서버로 폼 데이터 전송
  };

  // 시안에 맞는 스타일 정의
  const FORM_MAX_WIDTH = 'max-w-3xl';
  const HEADING_CLASS = 'text-lg font-bold text-[#1D1D1D]';

  return (
    <div className="min-h-screen bg-white">
      <div className={`mx-auto px-4 ${FORM_MAX_WIDTH} pt-20`}>
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
              <CustomInput
                name="intro"
                value={formData.intro}
                onChange={handleInputChange}
                placeholder="한 줄 소개를 입력해주세요"
              />
            </FormField>

            {/* 2. 학력 (Tags) */}
            <FormField label="학력">
              <div className="flex gap-2">
                <SelectionChip
                  isSelected={selectedEducation === '고등학교'}
                  onClick={() => setSelectedEducation('고등학교')}
                >
                  고등학교
                </SelectionChip>
                <SelectionChip
                  isSelected={selectedEducation === '대학교'}
                  onClick={() => setSelectedEducation('대학교')}
                >
                  대학교
                </SelectionChip>
              </div>
            </FormField>

            {/* 3. 학교명 검색 */}
            <FormField label="학교 명 검색">
              <div className="relative">
                <CustomInput
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  placeholder="학교 명을 입력해주세요"
                  iconRight={
                    <div className="cursor-pointer">
                      <Image src="/돋보기.png" alt="돋보기" width={20} height={20} />
                    </div>
                  }
                />
              </div>
            </FormField>

            {/* 4. 전공 선택 (Tags) */}
            <FormField label="인정 학력 선택">
              <div className="flex gap-2">
                <SelectionChip
                  isSelected={selectedMajorType === '대학교 (2, 3년)'}
                  onClick={() => setSelectedMajorType('대학교 (2, 3년)')}
                >
                  대학교 (2, 3년)
                </SelectionChip>
                <SelectionChip
                  isSelected={selectedMajorType === '대학교 (4년)'}
                  onClick={() => setSelectedMajorType('대학교 (4년)')}
                >
                  대학교 (4년)
                </SelectionChip>
              </div>
            </FormField>

            {/* 5. 학과 명 입력 */}
            <FormField label="학과 명 입력">
              <CustomInput
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="학과 명을 입력해주세요"
              />
            </FormField>

            {/* 6. 관심 분야 (Dropdown Placeholder) */}
            <FormField label="관심분야">
              <RightPopoverSelect
                options={interestOptions}
                placeholder="선택해주세요"
                value={formData.interest}
                onChange={handleInterestChange}
                className="bg-[#F8F8F8] text-[#1D1D1D]"
              />
            </FormField>

            {/* 7. 스킬/툴 */}
            <FormField label="스킬셋">
              <CustomInput
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="활용 가능한 기술을 작성해주세요"
                iconRight={
                  <button
                    className="text-[#1487F9] font-medium whitespace-nowrap text-sm"
                    onClick={handleAddSkill}
                  >
                    추가
                  </button>
                }
              />
              {/* 💡 8. 추가된 스킬 태그 렌더링 영역 */}
              <div className="flex flex-wrap gap-3">
                {skillsList.map((skill, index) => (
                  <Tag
                    key={index}
                    variant="default"
                    shape="rounded"
                    icon={
                      <button type="button" onClick={() => handleRemoveSkill(skill)}>
                        <Image src="/X.png" alt="X" width={16} height={16} />
                      </button>
                    }
                    className="w-[83px] h-[32px] justify-center text-[#555555]"
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
              disabled={!isButtonActive} // 실제 클릭 방지
              onClick={handleSubmit}
            >
              완료
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
