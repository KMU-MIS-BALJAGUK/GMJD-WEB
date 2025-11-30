// src/app/contest/[id]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ContestDetailPageClient from './components/ContestDetailPageClient';
import { fetchContestDetail } from '@/lib/api/contest';

interface ContestDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ContestDetailPage({ params }: ContestDetailPageProps) {
  const { id } = await params;
  const contestId = Number(id);

  if (!contestId || Number.isNaN(contestId) || contestId < 1) {
    notFound();
  }

  return <ContestDetailPageClient contestId={contestId} />;
}

export async function generateMetadata({
  params,
}: ContestDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const contestId = Number(id);

  if (!contestId || Number.isNaN(contestId)) {
    return {
      title: '공모전 상세 | 공모전 매칭 플랫폼',
      description: '공모전 팀원을 찾고 함께 성장하세요',
    };
  }

  try {
    // 서버에서 직접 공모전 상세를 조회해서 메타데이터 생성
    const contest = await fetchContestDetail(contestId);

    return {
      title: `${contest.name} | 공모전 매칭 플랫폼`,
      description: `[${contest.organizationName}] ${contest.name} 공모전의 상세 정보를 확인하고 팀원을 모집하세요.`,
    };
  } catch (error) {
    console.error('Failed to generate metadata:', contestId, error);

    return {
      title: `공모전 #${contestId} | 공모전 매칭 플랫폼`,
      description: '공모전 팀원을 찾고 함께 성장하세요',
    };
  }
}
