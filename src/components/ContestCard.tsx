import Image from 'next/image';

type ContestCardProps = {
  dDay: string;
  teamCount: number;
  title: string;
  organizer: string;
};

export default function ContestCard({ dDay, teamCount, title, organizer }: ContestCardProps) {
  return (
    <div className="w-[280px]">
      <Image
        src="/placeholder.svg"
        alt="Contest thumbnail"
        width={280}
        height={201}
      />
      <div className="p-2">
        <div className="flex justify-between text-sm">
          <span>D-{dDay}</span>
          <span>개설된 팀 {teamCount}</span>
        </div>
        <h3 className="font-bold truncate mt-1">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{organizer}</p>
      </div>
    </div>
  );
}
