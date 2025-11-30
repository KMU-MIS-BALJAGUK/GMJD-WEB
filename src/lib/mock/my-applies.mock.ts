import { MyAppliedItem } from '@/features/team/types/MyAppliedListResponse';

export const mockMyApplies: MyAppliedItem[] = [
  {
    teamId: 1,
    applicationId: 101,
    contestName: "2025 AI 아이디어 챌린지",
    teamTitle: "AI 데이터 분석팀",
    contestImageUrl: "https://picsum.photos/300/200",
    memberCount: 4,
    status: "PENDING",
  },
  {
    teamId: 2,
    applicationId: 102,
    contestName: "서울시 영상 공모전",
    teamTitle: "서울영상팀",
    contestImageUrl: "https://picsum.photos/300/201",
    memberCount: 4,
    status: "ACCEPTED",
  },
  {
    teamId: 3,
    applicationId: 103,
    contestName: "기흥중권 미디어 공모전",
    teamTitle: "미디어랩팀",
    contestImageUrl: "https://picsum.photos/300/202",
    memberCount: 5,
    status: "REJECTED",
  },
];
