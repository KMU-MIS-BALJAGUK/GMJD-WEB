'use client';

import NextImage from 'next/image';
import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';
import { UsersRound } from 'lucide-react';
import { useCancelApplication } from '@/hooks/mypage/useCancelApplication';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export interface MyApplyCardProps {
  contestId: number;
  teamId: number;
  title: string;
  subtitle: string;
  image: string;
  memberCount: number; // 모집된 인원
  maxMember: number; // 모집 목표 인원
  recruitStatus: '모집중' | '모집완료';
  onCardClick?: (teamId: number) => void; // optional로 변경
}

export default function MyApplyCard({
  contestId,
  teamId,
  title,
  subtitle,
  image,
  memberCount,
  maxMember,
  recruitStatus,
  onCardClick,
}: MyApplyCardProps) {
  const { mutate: cancelApplication, isPending: isCancelling } = useCancelApplication();
  const router = useRouter();
  const { toast } = useToast();
  const isRecruitOpen = recruitStatus === '모집중';

  const handleCardClick = () => {
    // 공모전 상세 페이지로 이동
    router.push(`/contest/${contestId}`);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    cancelApplication(
      { teamId },
      {
        onSuccess: () => {
          toast({
            variant: 'default',
            title: '지원이 취소되었습니다 ✅',
            description: isRecruitOpen
              ? '다시 지원을 원하시면 언제든지 신청해 주세요.'
              : '지원 내역이 목록에서 제거되었습니다.',
          });
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: '오류가 발생했습니다 🚨',
            description: '잠시 후 다시 시도해 주세요.',
          });
        },
      }
    );
  };

  const renderActionButton = () => {
    return isRecruitOpen ? (
      <Button className="w-full" variant="red" disabled={isCancelling} onClick={handleCancel}>
        {isCancelling ? '취소 중...' : '신청 취소'}
      </Button>
    ) : (
      <Button
        className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer border border-gray-300"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          handleCancel(e);
        }}
      >
        삭제
      </Button>
    );
  };

  return (
    <div
      className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md bg-white relative hover:scale-105 transition duration-300 cursor-pointer flex flex-col"
      onClick={handleCardClick}
    >
      <div className="relative w-full h-[160px] bg-gray-100 flex-shrink-0">
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

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm leading-tight pr-6">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-text-02">
            <UsersRound size={12} />
            <span>모집 {maxMember}명</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">
              현재 {memberCount}명
            </div>
          </div>
        </div>

        <div className="mt-auto">{renderActionButton()}</div>
      </div>
    </div>
  );
}
