import React, { useState } from 'react';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import Tag from '../../common/Tag';
import Button from '../../common/Button';
import Image from 'next/image';

const PlayerInfoPopup = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const data = {
    name: '오연정',
    summary: ['금융업', '개발', '화장'],
    level: 3,
    skills: ['React', 'Figma', 'Photoshop', 'Illustrator'],
    question: [
      { q: '평소에 즐겨 사용하는 디자인 툴이나 개발 언어가 있나요?', answer: 'Figma / Python' },
      { q: '해당 공모전에 지원한 동기가 무엇인가요?', answer: '대외활동 및 경력 보완' },
    ],
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <LayerPopup open={open} setOpen={handleOpenChange} title="팀 정보">
      <div className="px-2">
        <div className="flex items-center gap-3 border-b pb-5">
          <Image src={'/profile-image.png'} alt="Profile Image" width={64} height={64} />

          <div className="gap-1.5 flex flex-col">
            <div className="flex items-end">
              <p>오연정</p>
              <Tag variant="blue" className="ml-2 text-xs">
                추천LV.{data.level}
              </Tag>
            </div>
            <div className="flex gap-1.5">
              {data.summary.map((item, index) => (
                <p key={index} className="text-[14px] text-text-03">
                  #{item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-5">
          <p>스킬셋</p>

          <div>
            {data.skills.map((skill, index) => (
              <Tag key={index} variant="default" className="mr-2 mb-2">
                {skill}
              </Tag>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-5">
          <p>답변</p>

          {data.question.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="text-[13px] text-text-03 mb-1">
                질문{index + 1}. {item.q}
              </p>
              <p className="text-[15px] text-text-01">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="pt-5">
          <Button onClick={() => setOpen(false)} className="w-full" variant="primary">
            확인
          </Button>
        </div>
      </div>
    </LayerPopup>
  );
};

export default PlayerInfoPopup;
