import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ContestDetailPageClient from './components/ContestDetailPageClient';

interface ContestDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ContestDetailPage({
  params,
}: ContestDetailPageProps) {
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

  return {
    title: `공모전 #${contestId} | 공모전 매칭 플랫폼`,
    description: '공모전 팀원을 찾고 함께 성장하세요',
  };
}