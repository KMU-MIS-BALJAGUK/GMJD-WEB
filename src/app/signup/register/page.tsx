//기존 register 페이지

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { Tag } from '@/components/common/Tag';
import { SelectBox } from '@/components/common/SelectBox';
import { Check, Search, X } from 'lucide-react';
import Input from '@/components/common/Input';

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

export default function RegisterPage() {
  // 1. 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    intro: '', // 한줄 소개
    school: '', // 학교명
    department: '', // 학과명
    interest: '', // 관심분야
    skills: '', // 스킬/툴
  });
  // 2. 선택형 데이터 상태 관리
  const [selectedEducation, setSelectedEducation] = useState('대학교');
  const [selectedMajorType, setSelectedMajorType] = useState('대학교 (4년제)');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [univ, setUniv] = useState<string>('');

  const universityList = [
    '서울대학교',
    '연세대학교',
    '고려대학교',
    '성균관대학교',
    '한양대학교',
    '경희대학교',
  ];

  const highSchoolList = [
    '하나고등학교',
    '대원외국어고등학교',
    '민족사관고등학교',
    '상산고등학교',
    '용문고등학교',
    '경기과학고등학교',
  ];

  const currentSchoolList = selectedEducation === '대학교' ? universityList : highSchoolList;

  const isUniversitySelected = selectedEducation === '대학교';
  const disabledClass = isUniversitySelected ? '' : 'opacity-50 pointer-events-none relative';

  //  3. 새로 추가된 스킬 목록 상태 (배열)
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
    if (name === 'school') {
      setShowDropdown(true);
    }
  };

  // 💡 SelectBox 전용 핸들러 (SelectBox는 'value'를 직접 전달함)
  const handleInterestChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      interest: value,
    }));
  };

  // 💡 6. "추가" 버튼 클릭 핸들러
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
    console.log('Form Data Updated:', formData);
    const baseValid =
      formData.intro.trim() !== '' &&
      formData.school.trim() !== '' &&
      formData.department.trim() !== '' &&
      formData.interest !== '' &&
      skillsList.length > 0;

    let departmentValid = true;
    if (isUniversitySelected) {
      departmentValid = formData.department.trim() !== '';
    }

    const isValid = baseValid && departmentValid;

    //console.log('Is Form Valid:', isValid);

    setIsButtonActive(isValid);
  }, [formData, skillsList, isUniversitySelected]);

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

  const handleEducationChange = (education: '고등학교' | '대학교') => {
    setSelectedEducation(education);
    setFormData((prev) => ({
      ...prev,
      school: '',
      department: '',
    }));
    setShowDropdown(false);
  };

  // 시안에 맞는 스타일 정의
  const FORM_MAX_WIDTH = 'max-w-3xl';
  const HEADING_CLASS = 'text-lg font-bold text-[#1D1D1D]';

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
                  onClick={() => handleEducationChange('고등학교')}
                >
                  고등학교
                </Button>
                <Button
                  variant={selectedEducation === '대학교' ? 'active' : 'ghost'}
                  className="w-1/2"
                  onClick={() => handleEducationChange('대학교')}
                >
                  대학교
                </Button>
              </div>
            </FormField>

            {/* 3. 학교명 검색 */}
            <FormField label="학교 명 검색">
              <div className="relative w-full">
                <Input
                  name="school"
                  variant="default"
                  value={formData.school}
                  onChange={handleInputChange}
                  placeholder="학교 명을 입력해주세요"
                  className="w-full"
                  icon={
                    <Search
                      size={20}
                      className="text-text-02 cursor-pointer"
                      onClick={() => setShowDropdown(true)}
                    />
                  }
                />

                {formData.school.length > 0 && showDropdown && (
                  <ul
                    className="
                      absolute left-0 right-0 top-full z-50 
                      mt-2 p-1 w-full 
                      bg-white border border-gray-200 rounded-md shadow-md
                      max-h-48 overflow-y-auto scrollbar
                      animate-in fade-in zoom-in
                    "
                  >
                    {currentSchoolList
                      .filter((name) => name.includes(formData.school))
                      .map((name, index) => (
                        <li
                          key={index}
                          className="
                            px-3 py-2.5 rounded text-[15px] cursor-pointer
                            hover:bg-gray-100 flex items-center justify-between
                          "
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, school: name }));
                            setShowDropdown(false);
                          }}
                        >
                          {name}

                          {/* 체크 아이콘 */}
                          {formData.school === name && <Check className="size-4 text-blue" />}
                        </li>
                      ))}
                    {currentSchoolList.filter((name) => name.includes(formData.school)).length ===
                      0 && <li className="px-3 py-2 text-gray-500 text-sm">검색 결과 없음</li>}
                  </ul>
                )}
              </div>
            </FormField>

            {/* 4. 전공 선택 (Tags) */}
            <FormField label="인정 학력 선택">
              <div className={`flex gap-2 w-full ${disabledClass}`}>
                <Button
                  variant={selectedMajorType === '대학교 (2, 3년제)' ? 'active' : 'ghost'}
                  className="w-1/2"
                  onClick={() => setSelectedMajorType('대학교 (2, 3년제)')}
                  disabled={!isUniversitySelected}
                >
                  대학교 (2, 3년제)
                </Button>
                <Button
                  variant={selectedMajorType === '대학교 (4년제)' ? 'active' : 'ghost'}
                  className="w-1/2"
                  onClick={() => setSelectedMajorType('대학교 (4년제)')}
                  disabled={!isUniversitySelected}
                >
                  대학교 (4년제)
                </Button>
              </div>
            </FormField>

            {/* 5. 학과 명 입력 */}
            <FormField label="학과 명 입력">
              <div className={disabledClass}>
                <Input
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="학과 명을 입력해주세요"
                  disabled={!isUniversitySelected}
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
                options={[
                  { value: '사진/영상/UCC', label: '사진/영상/UCC' },
                  { value: '광고/마케팅', label: '광고/마케팅' },
                  { value: '디자인/순수미술/공예', label: '디자인/순수미술/공예' },
                  { value: '네이밍/슬로건', label: '네이밍/슬로건' },
                ]}
              />
            </FormField>

            {/* 7. 스킬/툴 */}
            <FormField label="스킬셋">
              <div className="relative w-full">
                <Input
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
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
              {/*  8. 추가된 스킬 태그 렌더링 영역 */}
              <div className="flex flex-wrap gap-3">
                {skillsList.map((skill, index) => (
                  <Tag
                    key={index}
                    shape="rounded"
                    icon={<X size={16} className="text-text-04 cursor-pointer" />}
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
