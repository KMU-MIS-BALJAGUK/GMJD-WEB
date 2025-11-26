import api from '@/lib/axios';

// ===== 타입 import =====
import type { TeamDetailResponseDto } from '@/features/team/types/TeamDetailResponse';
import type { TeamApplyRequestDto } from '@/features/team/types/TeamApplyRequest';
import type { TeamApplyResponseDto } from '@/features/team/types/TeamApplyResponse';
import type { TeamCreateRequestDto } from '@/features/team/types/TeamCreateRequest';
import type { TeamCreateResponseDto } from '@/features/team/types/TeamCreateResponse';
import type { AiQuestionRecommendResponseDto } from '@/features/team/types/AiQuestionRecommendResponse';

/**
 * 팀 상세 조회
 * GET /api/v1/teams/{teamId}/detail
 */
export async function fetchTeamDetail(teamId: number) {
  const res = await api.get<TeamDetailResponseDto>(
    `/api/v1/teams/${teamId}/detail`,
  );
  return res.data.data; // TeamDetailDto
}

/**
 * 팀 신청
 * POST /api/v1/teams/apply/{teamId}
 */
export async function applyTeam(
  teamId: number,
  payload: TeamApplyRequestDto,
) {
  const res = await api.post<TeamApplyResponseDto>(
    `/api/v1/teams/apply/${teamId}`,
    payload,
  );
  return res.data; // { code, msg, data: {} }
}

/**
 * 팀 생성
 * POST /api/v1/teams/{contestId}
 */
export async function createTeam(
  contestId: number,
  payload: TeamCreateRequestDto,
) {
  const res = await api.post<TeamCreateResponseDto>(
    `/api/v1/teams/${contestId}`,
    payload,
  );
  return res.data; // { code, msg, data: {} }
}

/**
 * AI 질문 추천
 * POST /api/v1/teams/{contestId}/ai-question
 */
export async function fetchAiQuestions(contestId: number) {
  const res = await api.post<AiQuestionRecommendResponseDto>(
    `/api/v1/teams/${contestId}/ai-question`,
  );
  return res.data.data.aiRecommendQuestionList; // string[]
}
