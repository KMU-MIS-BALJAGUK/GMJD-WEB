'use client';

import InfoEditPopup from '@/components/popup/my-recruit/InfoEditPopup';
import MakeTeamPopup from '@/components/popup/contest-detail/MakeTeamPopup';
import MyRecruitPopup from '@/components/popup/my-recruit/MyRecruitPopup';
import PlayerInfoPopup from '@/components/popup/profile/PlayerInfoPopup';
import RemovePlayerPopup from '@/components/popup/my-team/RemovePlayerPopup';
import RequestPopup from '@/components/popup/contest-detail/RequestPopup';
import TeamInfoPopup from '@/components/popup/my-team/TeamInfoPopup';
import { useState } from 'react';

export default function Home() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);

  const Btn = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
    >
      {label}
    </button>
  );

  return (
    <div className="p-10 space-y-10">
      {/* === 팀 관련 팝업 === */}
      <section>
        <h2 className="text-xl font-semibold mb-3">팀 관련 팝업</h2>
        <div className="grid grid-cols-2 gap-3">
          <Btn label="팀 만들기 팝업" onClick={() => setOpen1(true)} />
          <Btn label="신청하기 팝업" onClick={() => setOpen2(true)} />
          <Btn label="팀 정보 팝업" onClick={() => setOpen3(true)} />
          <Btn label="내보내기 팝업" onClick={() => setOpen4(true)} />
        </div>
      </section>

      {/* === 내 모집 / 지원자 === */}
      <section>
        <h2 className="text-xl font-semibold mb-3">모집 / 지원자 팝업</h2>
        <div className="grid grid-cols-2 gap-3">
          <Btn label="나의 모집 팝업" onClick={() => setOpen5(true)} />
          <Btn label="지원자 정보 팝업" onClick={() => setOpen6(true)} />
        </div>
      </section>

      {/* === 내 정보 수정 === */}
      <section>
        <h2 className="text-xl font-semibold mb-3">내 정보 수정 팝업</h2>
        <div className="grid grid-cols-2 gap-3">
          <Btn label="스킬셋 수정 팝업" onClick={() => setOpen7(true)} />
          <Btn label="학력 수정 팝업" onClick={() => setOpen8(true)} />
        </div>
      </section>

      {/* === 팝업 컴포넌트 === */}
      <MakeTeamPopup open={open1} setOpen={setOpen1} />
      <RequestPopup open={open2} setOpen={setOpen2} />
      <TeamInfoPopup open={open3} setOpen={setOpen3} />
      <RemovePlayerPopup open={open4} setOpen={setOpen4} playerName="홍길동" />
      <MyRecruitPopup open={open5} setOpen={setOpen5} />
      <PlayerInfoPopup open={open6} setOpen={setOpen6} />
      <InfoEditPopup open={open7} setOpen={setOpen7} type="skill" />
      <InfoEditPopup open={open8} setOpen={setOpen8} type="education" />
    </div>
  );
}
