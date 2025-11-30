//src/app/team/my_apply/components/MyApplyCard.tsx
// 

'use client';

import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';
import { UsersRound } from 'lucide-react';
import Image from 'next/image';
import { useCancelApplication } from '@/hooks/mypage/useCancelApplication';

export interface MyApplyCardProps {
  teamId: number;
  applicationId: number;
  title: string;
  subtitle: string;
  image: string;
  totalMembers: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
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
  const { mutate: cancelMutation, isPending } = useCancelApplication();

  const isClosed = status === 'REJECTED';
  const isOpen = !isClosed;

  const handleCancel = () => {
    cancelMutation({
      teamId,
      data: { applicationId },
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md bg-white hover:scale-105 transition duration-300">
      {/* 이미지 */}
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover" />

        {/* 상태 표시 */}
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

      {/* 내용 */}
      <div className="p-4">
        <p className="font-semibold text-sm leading-tight line-clamp-2">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        <p className="flex items-center gap-1 text-sm mt-2">
          <UsersRound size={15} /> 모집 인원 {totalMembers}명
        </p>

        {/* 취소 버튼 */}
        <div className="mt-4">
          {isOpen && (
            <Button
              variant="red"
              className="w-full"
              disabled={isPending}
              onClick={handleCancel}
            >
              {isPending ? '취소 중...' : '신청 취소'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
