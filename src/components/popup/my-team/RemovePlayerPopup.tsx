import React from 'react';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import { CircleAlert } from 'lucide-react';
import Button from '../../common/Button';

const RemovePlayerPopup = ({
  open,
  setOpen,
  playerName,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  playerName: string;
}) => {
  return (
    <LayerPopup open={open} setOpen={setOpen} title="팀원 내보내기">
      <div className="text-center">
        <p>{playerName} 님을</p>
        <p>팀에서 정말 내보내시겠습니까?</p>
      </div>

      <div className="flex justify-center items-center gap-2 text-[14px] text-text-02 bg-red-50 px-4 py-3 rounded-xl mb-4">
        <CircleAlert className="text-red-400" /> 내보낸 팀원은 복구할 수 없습니다.
      </div>

      <Button variant="ghost" onClick={() => setOpen(false)}>
        내보내기
      </Button>
    </LayerPopup>
  );
};

export default RemovePlayerPopup;
