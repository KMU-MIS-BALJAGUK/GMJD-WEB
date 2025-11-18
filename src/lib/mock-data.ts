import { ContestDetailResponse } from '@/types/contest';

export const mockContestData: ContestDetailResponse = {
  contest: {
    id: 1,
    title: "2025년 책이음과 함께하는 AI활용 아이디어 챌린지",
    organizer: "국립중앙도서관",
    posterUrl: "https://media-cdn.linkareer.com//se2editor/image/690676",
    category: "AI/데이터",
    startDate: "2025-10-22",
    endDate: "2025-11-28",
    prize: "최우수상 150만원, 우수상 100만원, 장려상 80만원",
    description: "책이음 데이터와 AI 기술을 활용한 아이디어 기획 공모전입니다.\n\n주제는 다음 중 택1:\n- 모바일 웹/웹서비스 활성화\n- 이용자 맞춤 서비스 개선\n- 도서관 서비스 혁신\n\n책이음과 AI에 관심있는 일반 국민 누구나 참여 가능합니다.",
    requirements: "- 책이음과 AI에 관심있는 일반 국민 (개인 및 단체)\n- 이메일로 책이음 데이터 신청 후 참여\n- A4 용지 2매 이상 10매 이내 원고 작성",
    homepageUrl: "https://linkareer.com/activity/279514",
    status: "recruiting",
    viewCount: 1250,
    bookmarkCount: 89,
    createdAt: "2025-10-22T09:00:00Z",
    updatedAt: "2025-11-18T14:30:00Z"
  },
  teams: [
    {
      id: 101,
      contestId: 1,
      teamName: "AI 데이터 분석팀",
      description: "데이터 분석과 AI 기술에 관심있는 분들 모집합니다! 도서관 서비스 혁신 아이디어로 참여할 예정입니다.",
      leaderName: "김도서",
      leaderProfile: "https://via.placeholder.com/100",
      currentMembers: 2,
      maxMembers: 4,
      requiredPositions: [
        { role: "데이터분석", count: 1, currentCount: 1 },
        { role: "AI개발", count: 1, currentCount: 0 },
        { role: "기획", count: 1, currentCount: 0 }
      ],
      tags: ["AI", "데이터분석", "열정적"],
      status: "recruiting",
      createdAt: "2025-10-25T10:00:00Z"
    },
    {
      id: 102,
      contestId: 1,
      teamName: "책이음 서비스팀",
      description: "이용자 맞춤 서비스 개선 주제로 참여합니다. UX/UI 디자이너, 개발자 환영합니다!",
      leaderName: "이서비",
      leaderProfile: "https://via.placeholder.com/100",
      currentMembers: 3,
      maxMembers: 5,
      requiredPositions: [
        { role: "UX디자이너", count: 1, currentCount: 0 },
        { role: "프론트엔드", count: 1, currentCount: 0 }
      ],
      tags: ["UX중시", "협업중시", "친근한"],
      status: "recruiting",
      createdAt: "2025-10-26T14:20:00Z"
    },
    {
      id: 103,
      contestId: 1,
      teamName: "모바일 혁신팀",
      description: "모바일 웹/웹서비스 활성화 주제로 참여합니다. 실제 서비스 런칭까지 목표!",
      leaderName: "박모바",
      leaderProfile: "https://via.placeholder.com/100",
      currentMembers: 2,
      maxMembers: 4,
      requiredPositions: [
        { role: "모바일개발", count: 1, currentCount: 0 },
        { role: "백엔드", count: 1, currentCount: 0 }
      ],
      tags: ["실용주의", "장기프로젝트"],
      status: "recruiting",
      createdAt: "2025-10-28T09:30:00Z"
    },
    {
      id: 104,
      contestId: 1,
      teamName: "초보환영 챌린저스",
      description: "처음 AI 공모전 참가하시는 분들도 환영합니다! 함께 배우면서 성장해요.",
      leaderName: "최초보",
      leaderProfile: "https://via.placeholder.com/100",
      currentMembers: 2,
      maxMembers: 4,
      requiredPositions: [
        { role: "기획자", count: 1, currentCount: 0 },
        { role: "개발자", count: 1, currentCount: 0 }
      ],
      tags: ["초보환영", "친근한", "배움지향"],
      status: "recruiting",
      createdAt: "2025-11-01T11:00:00Z"
    },
    {
      id: 105,
      contestId: 1,
      teamName: "Python 데이터팀",
      description: "Python, Pandas, scikit-learn 활용해서 책이음 데이터 분석합니다.",
      leaderName: "정파이",
      leaderProfile: "https://via.placeholder.com/100",
      currentMembers: 3,
      maxMembers: 5,
      requiredPositions: [
        { role: "데이터사이언티스트", count: 2, currentCount: 0 }
      ],
      tags: ["Python", "데이터분석", "체계적"],
      status: "recruiting",
      createdAt: "2025-11-03T10:00:00Z"
    },
    {
      id: 106,
      contestId: 1,
      teamName: "추천시스템 연구팀",
      description: "도서 추천 알고리즘 개발에 관심있는 분들 모여주세요. 머신러닝 경험자 우대!",
      leaderName: "강추천",
      leaderProfile: "https://via.placeholder.com/100",
      currentMembers: 2,
      maxMembers: 4,
      requiredPositions: [
        { role: "ML엔지니어", count: 1, currentCount: 0 },
        { role: "백엔드", count: 1, currentCount: 0 }
      ],
      tags: ["머신러닝", "경험자우대", "실력파"],
      status: "recruiting",
      createdAt: "2025-11-05T14:20:00Z"
    },
    {
      id: 107,
      contestId: 1,
      teamName: "풀스택 개발팀",
      description: "프론트부터 백엔드, AI까지 모두 다루는 팀입니다. 빠른 개발이 장점!",
      leaderName: "윤풀스택",
      leaderProfile: "https://via.placeholder.com/100",
      currentMembers: 3,
      maxMembers: 5,
      requiredPositions: [
        { role: "풀스택", count: 2, currentCount: 0 }
      ],
      tags: ["빠른개발", "효율적", "다재다능"],
      status: "recruiting",
      createdAt: "2025-11-08T09:30:00Z"
    },
    {
      id: 108,
      contestId: 1,
      teamName: "도서관 UX팀",
      description: "사용자 경험 중심으로 도서관 서비스를 재해석합니다. 디자이너 + 기획자 팀!",
      leaderName: "송유엑스",
      leaderProfile: "https://via.placeholder.com/100",
      currentMembers: 2,
      maxMembers: 4,
      requiredPositions: [
        { role: "UX디자이너", count: 1, currentCount: 1 },
        { role: "서비스기획", count: 1, currentCount: 0 }
      ],
      tags: ["UX중시", "사용자중심", "세심한"],
      status: "recruiting",
      createdAt: "2025-11-10T11:00:00Z"
    }
  ]
};