import Image from 'next/image';
import { Tag } from '@/components/common/Tag';

type Contest = {
  id: number;
  thumbnailUrl: string;
  dDay: number;
  teams: number;
  title: string;
  organizer: string;
  status: 'recruiting' | 'soon' | 'closed';
};

type ContestCardProps = {
  contest: Contest;
};

export default function ContestCard({ contest }: ContestCardProps) {
  const getDdayVariant = (dDay: string) => {
    const day = parseInt(dDay.replace('D-', ''), 10);
    if (!isNaN(day) && day <= 2) {
      return 'orange';
    }
    return 'blue';
  };

  return (
    <div className="w-full sm:w-[280px] sm:h-[299px] flex flex-col cursor-pointer">
      <div className="relative flex-shrink-0 border-[1px] border-[#e7e7e7] rounded-lg">
        <Image
          src={contest.thumbnailUrl}
          alt={contest.title}
          width={280}
          height={201}
          className="w-full sm:w-[280px] sm:h-[200px] h-[200px] rounded-lg object-cover hover:scale-105 transition duration-300"
        />
      </div>

      <div className="pt-3 flex-grow">
        <div className="flex items-center gap-[6px] text-xs mb-[12px]">
          <Tag variant="blue" shape="square">
            D-{contest.dDay}
          </Tag>
          <Tag variant="gray" shape="square">
            개설된 팀 {contest.teams}
          </Tag>
        </div>

        <h3 className="font-medium truncate mb-1.5 leading-none">{contest.title}</h3>
        <p className="text-sm text-gray-600">{contest.organizer}</p>
      </div>
    </div>
  );
}
