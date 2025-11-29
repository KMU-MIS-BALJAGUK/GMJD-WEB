'use client';

import Link from 'next/link';
import TeamCard from '@/app/team/components/TeamCard';
import { useQuery } from '@tanstack/react-query';
import { fetchMyTeamList } from '@/lib/api/team/team';

export default function TeamManagementPage() {
  const {
    data: teams,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['myTeams'],
    queryFn: fetchMyTeamList,
    staleTime: 1000 * 60 * 5,
  });

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

      {/* 로딩 */}
      {isLoading && <p>로딩 중...</p>}

      {/* 에러 */}
      {error && <p>데이터를 불러오는 중 오류가 발생했습니다.</p>}

      {/* 빈 목록 처리 */}
      {!isLoading && !error && teams?.length === 0 && (
        <p className="text-gray-500">나의 팀이 존재하지 않습니다.</p>
      )}

      {/* 실제 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teams?.map((team) => (
          <TeamCard
            key={team.id}
            id={team.id}
            title={team.contestTitle}
            subtitle={team.organizationName}
            image={team.imageUrl}
            totalMembers={team.totalMembers}
            role={team.role === 'LEADER' ? '팀장' : '팀원'}
          />
        ))}
      </div>
    </div>
  );
}
