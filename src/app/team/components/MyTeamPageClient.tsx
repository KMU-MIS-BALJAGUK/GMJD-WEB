'use client';

import TeamCard from '@/app/team/components/TeamCard';
import Link from 'next/link';
import { useMyTeams } from '@/hooks/team/useMyTeams';

export default function MyTeamPageClient() {
  const { data: myTeams, isLoading, isError } = useMyTeams();

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto max-md:py-7 py-10 px-4 md:px-6 lg:px-8">
        <h1 className="max-md:text-xl text-2xl font-bold mb-6">팀 관리</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1200px] mx-auto max-md:py-7 py-10 px-4 md:px-6 lg:px-8">
        <h1 className="max-md:text-xl text-2xl font-bold mb-6">팀 관리</h1>
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto max-md:py-7 py-10 px-4 md:px-6 lg:px-8">
      {/* 제목 */}
      <h1 className="max-md:text-xl text-2xl font-bold mb-6">팀 관리</h1>

      {/* 탭 메뉴 */}
      <nav className="flex gap-6 mb-8 border-b pb-2 text-sm">
        <span className="font-semibold text-[#1487F9] border-b-2 border-[#1487F9] pb-2">
          나의 팀
        </span>

        <Link href="/team/my_recruit" className="text-gray-600 hover:text-black">
          나의 모집
        </Link>

        <Link href="/team/my_apply" className="text-gray-600 hover:text-black">
          나의 지원
        </Link>
      </nav>

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {myTeams &&
          myTeams.map((team) => (
            <TeamCard
              key={team.teamId}
              id={team.teamId}
              title={team.contestName}
              subtitle={team.contestOrganizationName}
              image={team.contestImageUrl}
              totalMembers={team.memberCount}
              role={team.type} // Using team type as a placeholder for role
            />
          ))}
      </div>
    </div>
  );
}
