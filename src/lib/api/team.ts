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




// // src/lib/api/team.ts
// import api from '@/lib/axios';
// import type {
//     TeamDetailDto,
//   } from '@/features/team/types/TeamDetailResponse';

// import type { TeamDetailResponseDto } from '@/features/team/types/TeamDetailResponse';
// import type { TeamApplyRequestDto } from '@/features/team/types/TeamApplyRequest';
// import type { TeamApplyResponseDto } from '@/features/team/types/TeamApplyResponse';
// import type { TeamCreateRequestDto } from '@/features/team/types/TeamCreateRequest';
// import type { TeamCreateResponseDto } from '@/features/team/types/TeamCreateResponse';
// import type { AiQuestionRecommendResponseDto } from '@/features/team/types/AiQuestionRecommendResponse';

// // 팀 관련 mock 스위치
// const USE_MOCK_TEAM = true;

// // 팀 상세 mock 데이터 (RequestPopup, TeamInfoPopup용)
// const mockTeamDetail: TeamDetailDto = {
//   title: 'AI 공모전 같이 하실 분!',
//   leaderName: '김현정',
//   createdAt: '2025.06.30',
//   memberCount: 3,
//   maxMember: 5,
//   contestEndDate: '2025.07.15',
//   introduction:
//     'AI 기반의 프로젝트를 함께 진행할 팀원을 찾습니다.\n프론트/백엔드/디자인 모두 환영합니다!',
//   questionList: [
//     '해당 공모전에 지원한 동기가 무엇인가요?',
//     '협업에서 가장 중요하게 생각하는 점은 무엇인가요?',
//     '사용 가능한 기술 스택을 적어주세요.',
//   ],
// };

// // GET /api/v1/teams/{teamId}/detail
// export async function fetchTeamDetail(teamId: number) {
//   if (USE_MOCK_TEAM) {
//     await new Promise((r) => setTimeout(r, 300));
//     // teamId에 따라 조금씩 다르게 보고 싶으면 여기서 분기해도 됨
//     return mockTeamDetail;
//   }

//   const res = await api.get<TeamDetailResponseDto>(
//     `/api/v1/teams/${teamId}/detail`,
//   );
//   return res.data.data;
// }

// // POST /api/v1/teams/apply/{teamId}
// export async function applyTeam(
//   teamId: number,
//   payload: TeamApplyRequestDto,
// ) {
//   if (USE_MOCK_TEAM) {
//     console.log('🧪 [MOCK] 팀 신청 요청', { teamId, payload });
//     await new Promise((r) => setTimeout(r, 500));
//     const mock: TeamApplyResponseDto = {
//       code: 200,
//       msg: 'MOCK - 팀 신청 성공',
//       data: {},
//     };
//     return mock;
//   }

//   const res = await api.post<TeamApplyResponseDto>(
//     `/api/v1/teams/apply/${teamId}`,
//     payload,
//   );
//   return res.data;
// }

// // POST /api/v1/teams/{contestId}
// export async function createTeam(
//   contestId: number,
//   payload: TeamCreateRequestDto,
// ) {
//   if (USE_MOCK_TEAM) {
//     console.log('🧪 [MOCK] 팀 생성 요청', { contestId, payload });
//     await new Promise((r) => setTimeout(r, 500));
//     const mock: TeamCreateResponseDto = {
//       code: 200,
//       msg: 'MOCK - 팀 생성 성공',
//       data: {},
//     };
//     return mock;
//   }

//   const res = await api.post<TeamCreateResponseDto>(
//     `/api/v1/teams/${contestId}`,
//     payload,
//   );
//   return res.data;
// }

// // POST /api/v1/teams/{contestId}/ai-question
// export async function fetchAiQuestions(contestId: number) {
//   if (USE_MOCK_TEAM) {
//     await new Promise((r) => setTimeout(r, 300));
//     const mock: AiQuestionRecommendResponseDto = {
//       code: 200,
//       msg: 'MOCK - AI 질문 추천 성공',
//       data: {
//         aiRecommendQuestionList: [
//           '최근에 해결해 본 기술적 문제는 무엇인가요?',
//           '가장 자신 있는 기술 스택은 무엇인가요?',
//           '협업 과정에서 어려웠던 경험을 공유해주세요.',
//         ],
//       },
//     };
//     return mock.data.aiRecommendQuestionList;
//   }

//   const res = await api.post<AiQuestionRecommendResponseDto>(
//     `/api/v1/teams/${contestId}/ai-question`,
//   );
//   return res.data.data.aiRecommendQuestionList;
// }
