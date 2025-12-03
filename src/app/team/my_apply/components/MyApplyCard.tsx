'use client';

import NextImage from 'next/image';
import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';
import { UsersRound } from 'lucide-react';
import { useCancelApplication } from '@/hooks/mypage/useCancelApplication';

export interface MyApplyCardProps {
  teamId: number;
  title: string;
  subtitle: string;
  image: string;
  memberCount: number; // 모집된 인원
  maxMember: number; // 모집 목표 인원
  recruitStatus: '모집중' | '모집완료';
  requestedCount: number;
  onCardClick: (teamId: number) => void;
}

export default function MyApplyCard({
  teamId,
  title,
  subtitle,
  image,
  memberCount,
  maxMember,
  recruitStatus,
  requestedCount,
  onCardClick,
}: MyApplyCardProps) {
  const { mutate: cancelApplication, isPending: isCancelling } = useCancelApplication();
  const isRecruitOpen = recruitStatus === '모집중';

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    cancelApplication({ teamId });
  };

  const renderActionButton = () => {
    return isRecruitOpen ? (
      <Button
        className="w-full mt-4 bg-[#fdeaea] text-[#d65c5c] hover:bg-[#f7dada]"
        variant="ghost"
        disabled={isCancelling}
        onClick={handleCancel}
      >
        {isCancelling ? '취소 중...' : '신청 취소'}
      </Button>
    ) : (
      <Button
        className="w-full mt-4 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer border border-gray-300"
        variant="ghost"
        onClick={(e) => e.stopPropagation()}
      >
        삭제
      </Button>
    );
  };

  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md bg-white hover:scale-105 transition duration-300 cursor-pointer flex flex-col"
      onClick={() => onCardClick(teamId)}
    >
      <div className="relative w-full h-[160px] bg-gray-100">
        <NextImage
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

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

      <div className="p-4 flex flex-col flex-1">
        <p className="font-semibold text-sm leading-tight line-clamp-2">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        <p className="flex items-center gap-1 text-sm mt-2">
          <UsersRound size={15} /> 모집 인원 {maxMember}명 /
          <span className="text-blue font-semibold ml-1">지원 {requestedCount}명</span> /
          <span className="text-blue font-semibold ml-1">모집 {memberCount}명</span>
        </p>

        <div className="mt-auto pt-4 h-[44px] flex items-end">{renderActionButton()}</div>
      </div>
    </div>
  );
}
