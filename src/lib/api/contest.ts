
import api from '@/lib/axios';
import axios from 'axios';

// Contest types
import { ContestDetailResponseDto } from '@/features/contest/types/ContestDetailResponse';
import { ContestTeamListResponseDto } from '@/features/contest/types/ContestTeamListResponse';

// Team 생성/신청은 team.ts에서 처리
import type { TeamCreateRequestDto } from '@/features/team/types/TeamCreateRequest';
import type { AiQuestionRecommendResponseDto } from '@/features/team/types/AiQuestionRecommendResponse';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 공모전 상세 조회 API
// GET /api/v1/contests/{contestId}
export async function fetchContestDetail(contestId: number) {
  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL가 설정되어 있지 않습니다.');

  }

  const res = await fetch(`${BASE_URL}/api/v1/contests/${contestId}`, {
    method: 'GET',
    // 공모전 상세는 공개라서 credentials 필요 X
  });

  if (!res.ok) {
    throw new Error(`contest detail 요청 실패: ${res.status}`);
  }

  const json = (await res.json()) as ContestDetailResponseDto;
  return json.data; // ContestDetailDto
}


// 공모전별 팀 목록 조회 API
// GET /api/v1/teams/{contestId}
export async function fetchContestTeams(contestId: number) {
  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL가 설정되어 있지 않습니다.');
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/teams/${contestId}`, {
      method: 'GET',
    });

    // 팀 API가 아직 준비 안 됐거나, contestId에 팀이 없으면 404일 수도 있음
    if (!res.ok) {
      console.warn('팀 목록 API 실패 상태코드:', res.status);
      // 팀이 없어도 상세페이지는 떠야 하니까, 그냥 빈 배열 리턴
      return [];

    }

    const json = (await res.json()) as ContestTeamListResponseDto;
    return json.data.teams; // ContestTeamItemDto[]
  } catch (error) {
    console.error(' 팀 목록 API 네트워크 에러:', error);
    return []; // 에러여도 페이지 죽이지 말고 "팀 없음" 상태로
  }
}



