import React, { useState } from 'react';
import Button from '../../common/Button';
import { CalendarDays, UsersRound, X } from 'lucide-react';
import Input from '../../common/Input';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import Tag from '../../common/Tag';

const RequestPopup = ({ open, setOpen, team }: { open: boolean; setOpen: (value: boolean) => void; team: Team | null; }) => {
  const data = {
    title: team.teamName,
    author: team.leaderName,
    date: team.createdAt.split('T')[0].replace(/-/g, '.'),
    recruitNumber: team.currentMembers,
    totalNumber: team.maxMembers,
    recruitDeadline: '2025.06.01',  // TODO: 실제 데이터로 변경
    content: team.description,
    AIQuestion: [
      '해당 공모전에 지원한 동기가 무엇인가요?',
      '평소에 즐겨 사용하는 디자인 툴이나 개발 언어가 있나요?',
    ],
  };

  // 변수 관리
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>(Array(data.AIQuestion.length).fill(''));

  // 함수 관리
  const addSkills = (q: string) => {
    if (q.trim() !== '') {  // ← 빈 문자열 체크 추가
      setSkills([...skills, q]);
    }
  };

  const removeSkills = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const reset = () => {
    // 초기화
    setSkills([]);
    setSkillInput('');
    setAnswers(Array(data.AIQuestion.length).fill(''));
  };

  const checkValidation = () => {
    if (skills.length === 0 || answers.some((answer) => answer.trim() === '')) return true;

    return false;
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      reset();
    }
    setOpen(value);
  };

  const handleSubmit = () => {
    console.log({
      teamId: team.id, 
      skill: skills,
      answers: answers,
    });

    reset();
    setOpen(false);
  };

  return (
    <LayerPopup open={open} setOpen={handleOpenChange} title="신청하기">
      <div>
        <div className="flex flex-col px-2 h-auto pb-1 max-h-[600px] overflow-y-auto scrollbar">
          <div className="flex flex-col gap-5 pb-5 border-b">
            <div>
              <p className="text-text-01 font-semibold text-xl mb-1">{data.title}</p>
              <p className="text-text-03 text-[13px]">
                {data.author} {data.date} 작성
              </p>
            </div>

            <div className="text-text-02 text-[14px]">
              <p className="flex gap-1 items-center">
                <UsersRound size={16} />
                모집인원: {data.recruitNumber}/{data.totalNumber}명
              </p>
              <p className="flex gap-1 items-center">
                <CalendarDays size={16} />
                모집기간: {data.recruitDeadline}까지
              </p>
            </div>
          </div>

          <div className="py-10 border-b">
            <p className="text-text-01 text-[15px]">{data.content}</p>
          </div>

          <div className="flex flex-col gap-5 pt-5 text-text-01">
            <div className="flex flex-col gap-1">
              <p>
                스킬셋<span className="text-red-500 ml-[1px]">*</span>
              </p>
              <Input
                placeholder="활용 가능한 기술을 작성해주세요."
                value={skillInput}
                icon={<p className="text-blue text-xs font-extrabold">추가</p>}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSkillInput(e.target.value);
                }}
                onIconClick={() => {
                  addSkills(skillInput);
                  setSkillInput('');
                }}
              />

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
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

            <div className="flex flex-col gap-4">
              {data.AIQuestion.map((q, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p className="text-[14px]">{`질문 ${index + 1}. ${q}`}</p>
                  <Input
                    placeholder="답변을 작성해주세요."
                    value={answers[index]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAnswerChange(index, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-5">
          <Button
            onClick={handleSubmit}
            className="w-full"
            variant={checkValidation() ? 'disabled' : 'primary'}
            disabled={checkValidation()}
          >
            신청하기
          </Button>
        </div>
      </div>
    </LayerPopup>
  );
};

export default RequestPopup;
