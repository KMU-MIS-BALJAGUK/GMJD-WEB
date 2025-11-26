import {
  Contest,
  Team,
  ContestDetailResponse,
  TeamListResponse,
} from '@/features/contest/types/contest-mock';

// API Base URL (환경변수로 관리 예정)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

/**
 * 공모전 상세 정보 조회
 * @param contestId 공모전 ID
 * @returns 공모전 상세 정보
 */
export async function getContestDetail(contestId: number): Promise<Contest> {
  try {
    // TODO: 실제 API 연동 시 주석 해제
    // const response = await fetch(`${API_BASE_URL}/contests/${contestId}`);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch contest detail');
    // }
    // return await response.json();

    // 임시 목 데이터 사용
    const response = await fetch('/mock-data/contest-detail.json');
    const data: ContestDetailResponse = await response.json();
    return data.contest;
  } catch (error) {
    console.error('Error fetching contest detail:', error);
    throw error;
  }
}

/**
 * 공모전별 팀 목록 조회
 * @param contestId 공모전 ID
 * @param params 검색 파라미터 (정렬, 필터 등)
 * @returns 팀 목록
 */
export async function getContestTeams(
  contestId: number,
  params?: {
    page?: number;
    size?: number;
    sort?: 'recent' | 'popular';
    status?: 'recruiting' | 'closed';
  }
): Promise<TeamListResponse> {
  try {
    // TODO: 실제 API 연동 시 주석 해제
    // const queryParams = new URLSearchParams();
    // if (params?.page) queryParams.append('page', params.page.toString());
    // if (params?.size) queryParams.append('size', params.size.toString());
    // if (params?.sort) queryParams.append('sort', params.sort);
    // if (params?.status) queryParams.append('status', params.status);

    // const response = await fetch(
    //   `${API_BASE_URL}/contests/${contestId}/teams?${queryParams}`
    // );
    // if (!response.ok) {
    //   throw new Error('Failed to fetch contest teams');
    // }
    // return await response.json();

    // 임시 목 데이터 사용
    const response = await fetch('/mock-data/contest-detail.json');
    const data: ContestDetailResponse = await response.json();

    // 필터링 (status가 있으면)
    let teams = data.teams;
    if (params?.status) {
      teams = teams.filter((team) => team.status === params.status);
    }

    return {
      teams,
      totalCount: teams.length,
    };
  } catch (error) {
    console.error('Error fetching contest teams:', error);
    throw error;
  }
}

/**
 * 팀 신청하기
 * @param teamId 팀 ID
 * @returns 신청 결과
 */
export async function applyToTeam(teamId: number): Promise<{ success: boolean; message: string }> {
  try {
    // TODO: 실제 API 연동
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include', // 쿠키 포함
    });

    if (!response.ok) {
      throw new Error('Failed to apply to team');
    }

    return await response.json();
  } catch (error) {
    console.error('Error applying to team:', error);
    throw error;
  }
}
