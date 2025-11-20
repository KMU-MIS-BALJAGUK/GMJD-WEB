import React, { useState } from 'react';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import Input from '../../common/Input';
import { Search, X } from 'lucide-react';
import Button from '../../common/Button';
import Tag from '../../common/Tag';
import { SelectBox } from '@/components/common/SelectBox';

const InfoEditPopup = ({
  open,
  setOpen,
  type,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  type: string;
}) => {
  // 변수 관리
  const [univ, setUniv] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [skill, setSkill] = useState<string>('');
  const [skillSet, setSkillSet] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [interest, setInterest] = useState<string>('');

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
    setUniv(univ);
    setMajor(major);
    setOpen(false);
  };

  return (
    <LayerPopup
      open={open}
      setOpen={setOpen}
      title={`${type == 'skill' ? '스킬셋' : type === 'education' ? '학력' : '관심분야'} 수정`}
    >
      {type === 'education' ? (
        <div className="flex flex-col gap-5 ">
          <div className="relative">
            <p>학교명 검색</p>
            <Input
              placeholder="학교명을 입력해주세요."
              className="mt-1"
              value={univ}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUniv(e.target.value);
              }}
              icon={
                <Search
                  size={20}
                  className="text-text-02 cursor-pointer"
                  onClick={() => setShowDropdown(true)}
                />
              }
            />

            {/* 결과 드롭다운 UI  */}
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

          <div>
            <p>학과명 입력</p>
            <Input
              placeholder="학과명을 입력해주세요."
              className="mt-1"
              value={major}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMajor(e.target.value)}
            />
          </div>

          <div className="pt-5">
            <Button className="w-full" variant="primary" onClick={handleSubmit}>
              수정 완료
            </Button>
          </div>
        </div>
      ) : type === 'skill' ? (
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
                  <div key={index}>
                    <Tag
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
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-5">
            <Button className="w-full" variant="primary" onClick={handleSubmit}>
              수정 완료
            </Button>
          </div>
        </div>
      ) : (
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
            />
          </div>

          <div className="pt-5">
            <Button className="w-full" variant="primary" onClick={handleSubmit}>
              수정 완료
            </Button>
          </div>
        </div>
      )}
    </LayerPopup>
  );
};

export default InfoEditPopup;
