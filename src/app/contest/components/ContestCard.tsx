import Image from 'next/image';

// The 'Contest' type should ideally be in a shared types file,
// but for this fix, we'll define the expected props structure.
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
          <div className="w-[45px] h-[26px] flex items-center justify-center rounded" style={{ backgroundColor: '#dcedfe' }}>
            <span className="font-semibold text-blue-600">{contest.dDay}</span>
          </div>
          <div className="w-[71px] h-[26px] flex items-center justify-center rounded" style={{ backgroundColor: '#e6e6e6' }}>
            <span className="text-gray-500">{contest.teams}</span>
          </div>
        </div>
        <h3 className="font-bold truncate mb-[6px]">{contest.title}</h3>
        <p className="text-sm text-gray-600">{contest.organizer}</p>
      </div>
    </div>
  );
}
