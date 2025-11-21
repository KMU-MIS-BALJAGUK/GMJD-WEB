import React, { useState } from 'react';
import Button from '../../common/Button';
import { CircleMinus, CirclePlus, CircleX } from 'lucide-react';
import Input from '../../common/Input';
import LayerPopup from '../../common/layerpopup/LayerPopup';

const MakeTeamPopup = ({ open, setOpen, contestId }: { open: boolean; setOpen: (value: boolean) => void; contestId: number; }) => {
  const AIQuestion = [
    // TODO: 나중에 API로 변경
    '해당 공모전에 지원한 동기가 무엇인가요?',
    '평소에 즐겨 사용하는 디자인 툴이나 개발 언어가 있나요?',
  ];

  // 변수 관리
  const [title, setTitle] = useState<string>('');
  const [recruitNumber, setRecruitNumber] = useState<number>(1);
  const [content, setContent] = useState<string>('');
  const [question, setQuestion] = useState<string[]>([]);
  const [questionInput, setQuestionInput] = useState<string>('');

  // 함수 관리
  const addQuestion = (q: string) => {
    setQuestion([...question, q]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...question];
    newQuestions.splice(index, 1);
    setQuestion(newQuestions);
  };

  const reset = () => {
    // 초기화
    setTitle('');
    setRecruitNumber(1);
    setContent('');
    setQuestion([]);
    setQuestionInput('');
  };

  const checkValidation = () => {
    if (title.trim() === '' || content.trim() === '') return true;

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
      contestId: contestId, 
      title: title,
      recruitNumber: recruitNumber,
      content: content,
      question: question,
    });

    reset();
    setOpen(false);
  };

  return (
    <LayerPopup open={open} setOpen={handleOpenChange} title="팀 만들기">
      <div>
        <div className="flex flex-col gap-5 px-2 h-[500px] overflow-y-auto scrollbar">
          <div className="flex flex-col gap-1">
            <p>
              제목<span className="text-red-500 ml-[1px]">*</span>
            </p>
            <Input
              placeholder="팀 제목을 입력해주세요."
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>
              모집 인원<span className="text-red-500 ml-[1px]">*</span>
            </p>
            <div className="flex items-center gap-1.5">
              <CircleMinus
                className="inline-block text-white fill-gray-600 cursor-pointer"
                size={20}
                onClick={() => setRecruitNumber(Math.max(1, recruitNumber - 1))}
              />
              <span className="px-4 py-2 rounded-[8px] bg-bg-02">{recruitNumber}</span>
              <CirclePlus
                className="inline-block text-white fill-gray-600 cursor-pointer"
                size={20}
                onClick={() => setRecruitNumber(recruitNumber + 1)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>
              모집 글<span className="text-red-500 ml-[1px]">*</span>
            </p>
            <Input
              placeholder="내용을 입력하세요. ex) 팀 소개, 모집 역할, 필요 스킬"
              variant="textArea"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>질문</p>
            <Input
              placeholder="신청자에게 할 질문을 작성해주세요."
              variant="default"
              icon={<p className="text-blue text-xs font-extrabold">추가</p>}
              value={questionInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setQuestionInput(e.target.value);
              }}
              onIconClick={() => {
                if (questionInput.trim() !== '') {
                  addQuestion(questionInput.trim());
                  setQuestionInput('');
                }
              }}
            />

            <div className="flex flex-col gap-1.5 mt-1">
              {question.map((q, index) => (
                <span key={index} className="flex items-center text-sm text-text-02">
                  <span className="font-semibold mr-1">Q{index + 1}.</span>
                  {q}
                  <CircleX
                    size={20}
                    className="ml-1 cursor-pointer fill-gray-400 text-white"
                    onClick={() => removeQuestion(index)}
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p>💬 AI 추천 질문 리스트</p>
            {AIQuestion.map((q, index) => (
              <span
                key={index}
                className="inline-flex items-center text-sm px-4 py-2 border border-blue rounded-3xl text-blue bg-white cursor-pointer hover:bg-bg-blue"
                onClick={() => addQuestion(q)}
              >
                Q. {q}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-5">
          <Button
            onClick={handleSubmit}
            className="w-full"
            variant={checkValidation() ? 'disabled' : 'primary'}
            disabled={checkValidation()}
          >
            팀 만들기
          </Button>
        </div>
      </div>
    </LayerPopup>
  );
};

export default MakeTeamPopup;
