'use client';

import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';
import { UsersRound } from 'lucide-react';
import Image from 'next/image';

export interface MyApplyCardProps {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  totalMembers: number;
  applicants: number;
  status: string;
}

export default function MyApplyCard({
  title,
  subtitle,
  image,
  totalMembers,
  applicants,
  status,
}: MyApplyCardProps) {
  const isOpen = status === 'open';
  const isClosed = status === 'closed';

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
          <UsersRound size={15} /> 모집 인원 {totalMembers}명{' '}
          <span className="text-blue-500 font-semibold ml-1">/ {applicants}명 영입</span>
        </p>

        {/* 버튼 */}
        <div className="mt-4">
          {isOpen ? (
            <Button variant="red" className="w-full">
              신청 취소
            </Button>
          ) : (
            <Button variant="gray" className="w-full">
              삭제
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
