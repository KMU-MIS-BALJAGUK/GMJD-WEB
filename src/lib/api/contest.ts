import { Contest, TeamListResponse } from '@/types/contest';
import { mockContestData } from '@/lib/mock-data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export async function getContestDetail(contestId: number): Promise<Contest> {
  try {
    // TODO: 실제 API 연동 시 주석 해제
    // const response = await fetch(`${API_BASE_URL}/contests/${contestId}`);
    // if (!response.ok) throw new Error('Failed to fetch contest detail');
    // return await response.json();

    // 임시 목 데이터 사용
    return mockContestData.contest;
  } catch (error) {
    console.error('Error fetching contest detail:', error);
    throw error;
  }
}

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
    // const response = await fetch(`${API_BASE_URL}/contests/${contestId}/teams`);
    // if (!response.ok) throw new Error('Failed to fetch contest teams');
    // return await response.json();

    // 임시 목 데이터 사용
    let teams = mockContestData.teams;
    if (params?.status) {
      teams = teams.filter(team => team.status === params.status);
    }

    return {
      teams,
      totalCount: teams.length
    };
  } catch (error) {
    console.error('Error fetching contest teams:', error);
    throw error;
  }
}

export async function applyToTeam(teamId: number): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to apply to team');
    return await response.json();
  } catch (error) {
    console.error('Error applying to team:', error);
    throw error;
  }
}