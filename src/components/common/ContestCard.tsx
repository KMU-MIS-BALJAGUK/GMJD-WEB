import Image from 'next/image';
import { Tag } from '@/components/common/Tag';
import Link from 'next/link';

import { ContestItemDto } from '@/features/contest/types/contest-response';

type ContestCardProps = {
  contest: ContestItemDto;
};

export default function ContestCard({ contest }: ContestCardProps) {
  return (
    <Link href={`/contest/${contest.id}`}>
      <div className="w-full sm:w-[280px] sm:h-[299px] flex flex-col cursor-pointer">
        {/* 썸네일 */}
        <div className="relative shrink-0 border border-border-1 rounded-lg">
          <Image
            src={contest.imageUrl}
            alt={contest.name}
            width={280}
            height={201}
            className="w-full sm:w-[280px] sm:h-[200px] h-[200px] rounded-lg object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* 정보 */}
        <div className="pt-3 flex-grow">
          {/* 태그 */}
          <div className="flex items-center gap-[6px] text-xs mb-[12px]">
            <Tag variant={contest.remainingDays <= 2 ? 'orange' : 'blue'} shape="square">
              D-{contest.remainingDays}
            </Tag>

            <Tag variant="gray" shape="square">
              개설된 팀 {contest.openTeamCount}
            </Tag>
          </div>

          {/* 제목 */}
          <h3 className="font-medium truncate mb-1.5 leading-none">{contest.name}</h3>

          {/* 주최 */}
          <p className="text-sm text-gray-600">{contest.organizationName}</p>
        </div>
      </div>
    </Link>
  );
}
