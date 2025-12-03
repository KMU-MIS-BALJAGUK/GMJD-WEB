'use client';

import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';
import { UsersRound } from 'lucide-react';
import { useCancelApplication } from '@/hooks/mypage/useCancelApplication';
import NextImage from 'next/image';

export interface MyApplyCardProps {
  teamId: number;
  title: string;
  subtitle: string;
  image: string; // 사용하지만 외부 이미지 로드 X
  totalMembers: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  recruitStatus: 'OPEN' | 'CLOSED';
  onCardClick: (teamId: number) => void; // 카드 클릭 이벤트 핸들러
}

export default function MyApplyCard({
  teamId,
  title,
  subtitle,
  image,
  totalMembers,
  status,
  recruitStatus,
  onCardClick,
}: MyApplyCardProps) {
  const { mutate: cancelMutation, isPending } = useCancelApplication();

  const canCancel = status === 'PENDING';
  const isRecruitOpen = recruitStatus === 'OPEN';

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    cancelMutation({ teamId });
  };

  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md bg-white hover:scale-105 transition duration-300 cursor-pointer"
      onClick={() => onCardClick(teamId)}
    >
      <div className="relative w-full h-[160px] bg-gray-100">
        <NextImage src={image} alt={title} fill className="object-cover rounded-t-lg" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />

        <div className="absolute bottom-2 left-2">
          {isRecruitOpen ? (
            <Tag variant="green" shape="square" className="text-xs">
              모집중
            </Tag>
          ) : (
            <Tag variant="gray" shape="square" className="text-xs">
              모집완료
            </Tag>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="font-semibold text-sm leading-tight line-clamp-2">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        <p className="flex items-center gap-1 text-sm mt-2">
          <UsersRound size={15} /> 모집 인원 {totalMembers}명
        </p>

        {canCancel && (
          <Button
            variant="red"
            className="w-full mt-4"
            disabled={isPending}
            onClick={handleCancel}
          >
            {isPending ? '취소 중...' : '신청 취소'}
          </Button>
        )}
      </div>
    </div>
  );
}
