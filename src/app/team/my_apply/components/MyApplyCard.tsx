'use client';

import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';
import { UsersRound } from 'lucide-react';
import Image from 'next/image';
import { useCancelApplication } from '@/hooks/mypage/useCancelApplication';

export interface MyApplyCardProps {
  teamId: number;
  applicationId: number; // Added for cancel functionality
  title: string;
  subtitle: string;
  image: string;
  totalMembers: number;
  status: string; // 'open', 'closed'
}

export default function MyApplyCard({
  teamId,
  applicationId,
  title,
  subtitle,
  image,
  totalMembers,
  status,
}: MyApplyCardProps) {
  const { mutate: cancelApplicationMutation, isPending } = useCancelApplication();

  const isOpen = status === 'open';
  const isClosed = status === 'closed'; // Status for UI, e.g., 'open' or 'closed'

  const handleCancelApplication = () => {
    cancelApplicationMutation({
      teamId: teamId,
      data: { applicationId: applicationId },
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md bg-white hover:scale-105 transition duration-300">
      {/* 이미지 */}
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover" />

        {/* 상태 배지 */}
        <div className="absolute bottom-2 left-2">
          {isOpen ? (
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

      {/* 카드 내용 */}
      <div className="p-4">
        {/* 제목 */}
        <p className="font-semibold text-sm leading-tight line-clamp-2">{title}</p>

        {/* 기관명 */}
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        {/* 모집 / 지원 */}
        <p className="flex items-center gap-1 text-sm mt-2">
          <UsersRound size={15} /> 모집 인원 {totalMembers}명
        </p>

        {/* 버튼 */}
        <div className="mt-4">
          {/* Change button variant based on status, but enable/disable based on isPending */}
          <Button
            variant={isOpen ? 'red' : 'gray'}
            className="w-full"
            onClick={isOpen ? handleCancelApplication : undefined} // Only allow cancel if open
            disabled={isPending || !isOpen}
          >
            {isPending ? '취소 중...' : (isOpen ? '신청 취소' : '삭제')}
          </Button>
        </div>
      </div>
    </div>
  );
}
