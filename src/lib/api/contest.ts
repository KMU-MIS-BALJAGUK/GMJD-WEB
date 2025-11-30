
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





// 팀 생성 요청 (공모전 페이지에서 사용)
// POST /api/v1/teams/{contestId}
export async function createTeam(contestId: number, payload: TeamCreateRequestDto) {
  const res = await api.post(`/api/v1/teams/${contestId}`, payload);
  return res.data;
}

// AI 추천 질문
// POST /api/v1/teams/{contestId}/ai-question
export async function fetchAiQuestions(contestId: number) {
  const res = await api.post<AiQuestionRecommendResponseDto>(
    `/api/v1/teams/${contestId}/ai-question`
  );
  return res.data.data.aiRecommendQuestionList;
}


// // 403에러나서 화면테스트용 목업 코드로 돌리는 중
// import api from '@/lib/axios';
// import type {
//   ContestDetailDto,
//   ContestDetailResponseDto,
// } from '@/features/contest/types/ContestDetailResponse';
// import type {
//   ContestTeamItemDto,
//   ContestTeamListResponseDto,
// } from '@/features/contest/types/ContestTeamListResponse';

// // 백엔드 열리기 전까지 임시로 true
// const USE_MOCK_CONTEST = true;

// // 공모전 상세 mock 데이터
// const mockContestDetail: ContestDetailDto = {
//   name: '2025 AI 해커톤',
//   organizationName: '한국정보기술협회',
//   companyType: '공공기관',
//   benefits: '상금 및 채용 연계',
//   awardScale: '총 상금 1,000만 원',
//   duration: '2025-03-01 ~ 2025-04-15',
//   targetParticipants: '대학생 및 일반인',
//   siteUrl: 'https://example.com/contest/1',
//   additionalBenefits: '멘토링 제공, 네트워킹 행사',
//   categories: 'AI/ML, 데이터 분석',
//   imageUrl: '/contest.png',
// };

// // 공모전별 팀 목록 mock 데이터
// const mockContestTeams: ContestTeamItemDto[] = [
//   {
//     teamId: 1,
//     title: 'AI 같이 공부하실 분 구해요',
//     maxMember: 4,
//     currentMemberCount: 2,
//     status: 'OPEN',
//   },
//   {
//     teamId: 2,
//     title: '기획·디자인 팀원 모집 (초보 환영)',
//     maxMember: 5,
//     currentMemberCount: 5,
//     status: 'CLOSED',
//   },
// ];

// // GET /api/v1/contests/{contestId}
// export async function fetchContestDetail(contestId: number) {
//   // 🔹 mock 모드일 땐 여기에서 바로 반환
//   if (USE_MOCK_CONTEST) {
//     await new Promise((r) => setTimeout(r, 300)); // 로딩 느낌용
//     return mockContestDetail;
//   }

//   const res = await api.get<ContestDetailResponseDto>(
//     `/api/v1/contests/${contestId}`,
//   );
//   return res.data.data;
// }

// // GET /api/v1/teams/{contestId}
// export async function fetchContestTeams(contestId: number) {
//   if (USE_MOCK_CONTEST) {
//     await new Promise((r) => setTimeout(r, 300));
//     return mockContestTeams;
//   }

//   const res = await api.get<ContestTeamListResponseDto>(
//     `/api/v1/teams/${contestId}`,
//   );
//   return res.data.data.teams;
// }
