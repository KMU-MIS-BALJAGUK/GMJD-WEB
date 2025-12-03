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
  image: string;
  memberCount: number; // 현재 인원
  maxMember: number;   // 전체 인원
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  recruitStatus: 'OPEN' | 'CLOSED';
  onCardClick: (teamId: number) => void;
}

export default function MyApplyCard({
  teamId,
  title,
  subtitle,
  image,
  memberCount,
  maxMember,
  status,
  recruitStatus,
  onCardClick,
}: MyApplyCardProps) {
  const { mutate: cancelMutation, isPending } = useCancelApplication();

  const isRecruitOpen = recruitStatus === 'OPEN';

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    cancelMutation({ teamId });
  };

  const renderButton = () => {
    // 모집이 완료된 경우 (recruitStatus === 'CLOSED')
    if (!isRecruitOpen) { // isRecruitOpen is true when recruitStatus is 'OPEN'
      return (
        <Button variant="gray" className="w-full mt-4" disabled>
          삭제
        </Button>
      );
    }

    // 모집이 진행 중인 경우 (recruitStatus === 'OPEN')
    switch (status) {
      case 'PENDING':
        return (
          <Button
            variant="red"
            className="w-full mt-4"
            disabled={isPending}
            onClick={handleCancel}
          >
            {isPending ? '취소 중...' : '신청 취소'}
          </Button>
        );
      case 'ACCEPTED':
        return (
          <Button variant="green" className="w-full mt-4" disabled>
            승인됨
          </Button>
        );
      case 'REJECTED':
        return (
          <Button variant="gray" className="w-full mt-4" disabled>
            거절됨
          </Button>
        );
      default:
        return null;
    }
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
          <UsersRound size={15} /> 현재 {memberCount}명 / 모집 {maxMember}명
        </p>

        <div className="mt-4 h-[36px]">{renderButton()}</div>
      </div>
    </div>
  );
}
