import React from 'react';
import { ChevronRight, Crown, PenLine, UsersRound } from 'lucide-react';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import Tag from '../../common/Tag';
import Button from '../../common/Button';

const MyRecruitPopup = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const data = {
    title: 'NH농협카드 플레이트&스티커 디자인 콘테스트',
    isRecruiting: true,
    recruitMember: 2,
    applyNumber: 4,
    applyPlayers: [
      { name: '김민수', summary: ['금융업', '개발', '화장'] },
      { name: '이서연', summary: ['금융업', '개발'] },
      { name: '박지훈', summary: ['금융업', '개발'] },
      { name: '최유나', summary: ['금융업', '개발'] },
    ],
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <LayerPopup open={open} setOpen={handleOpenChange} title="팀 정보">
      <div>
        <div className="flex flex-col px-2 h-auto pb-1 max-h-[600px] overflow-y-auto scrollbar">
          <div className="flex flex-col gap-3 pb-5 border-b">
            <div>
              <Tag variant="green" shape="square" className="mb-2">
                모집중
              </Tag>
              <p className="text-text-01 font-semibold text-xl mb-1">{data.title}</p>
            </div>

            <p className="flex gap-1 items-center text-text-02 text-[14px]">
              <UsersRound size={16} />
              모집 인원 {data.recruitMember}명 /{' '}
              <span className="text-blue">지원 {data.applyNumber}명</span>
            </p>
          </div>

          <div className="flex flex-col gap-5 pt-5 text-text-01">
            <div className="flex flex-col gap-4 text-[14px]">
              <p className="text-base">지원자 리스트</p>

              {data.applyPlayers.map((player, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full bg-amber-300 shrink-0" />
                    <div className="flex justify-between w-full">
                      <div className="flex max-sm:flex-col sm:gap-1.5">
                        <p>{player.name}</p>
                        <p className="text-text-04">
                          {player.summary.map((item) => `#${item}`).join('\u00A0\u00A0')}
                        </p>
                      </div>

                      <ChevronRight size={20} className="text-text-03 cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default MyRecruitPopup;
