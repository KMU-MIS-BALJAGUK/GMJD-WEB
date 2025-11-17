import Image from 'next/image';
import { Tag } from '@/components/common/Tag';

type Contest = {
  id: number;
  dDay: string;
  teams: string;
  title: string;
  organizer: string;
  status: 'recruiting' | 'soon' | 'closed';
};

type ContestCardProps = {
  contest: Contest;
};

// 공모전 카드 컴포넌트
export default function ContestCard({ contest }: ContestCardProps) {
  const getDdayVariant = (dDay: string) => {
    const day = parseInt(dDay.replace('D-', ''), 10);
    if (!isNaN(day) && day <= 2) {
      return 'orange';
    }
    return 'blue';
  };

  return (
    <div className="w-[280px] h-[299px] flex flex-col">
      <div className="relative flex-shrink-0 border-[1px] border-[#e7e7e7] rounded-lg">
        <Image
          src="/placeholder.svg"
          alt={contest.title}
          width={280}
          height={201}
          className="w-full rounded-lg object-cover"
        />
      </div>
      <div className="pt-3 flex-grow">
        <div className="flex items-center gap-[6px] text-xs mb-[12px]">
          <Tag variant={getDdayVariant(contest.dDay)} shape="square">
            {contest.dDay}
          </Tag>
          <Tag variant="gray" shape="square">{contest.teams}</Tag>
        </div>
        <h3 className="font-bold truncate mb-[6px]">{contest.title}</h3>
        <p className="text-sm text-gray-600">{contest.organizer}</p>
      </div>
    </div>
  );
}
