'use client';

import ContestPageClient from './components/ContestPageClient';

export const contests = [
  {
    id: 1,
    thumbnailUrl: '/contest.png',
    dDay: 23,
    teams: 4,
    title: 'NH농협카드 플레이트&스티커 디자인 콘테스트',
    organizer: 'NH 농협은행',
    status: 'recruiting',
  },
  {
    id: 2,
    thumbnailUrl: '/contest2.png',
    dDay: 12,
    teams: 0,
    title: '키움증권 사회 초년생 자산UP! 영상 공모전',
    organizer: '키움증권',
    status: 'recruiting',
  },
  {
    id: 3,
    thumbnailUrl: '/contest3.png',
    dDay: 32,
    teams: 0,
    title: '제3회 기아 PBV 아이디어 공모전',
    organizer: '기아 (KIA)',
    status: 'recruiting',
  },
  {
    id: 4,
    thumbnailUrl: '/contest4.png',
    dDay: 2,
    teams: 19,
    title: '한국방송통신대학교 상징물 캐릭터, 로고, 워드마크 디자인공모전',
    organizer: '한국방송통신대학교',
    status: 'recruiting',
  },
  {
    id: 5,
    thumbnailUrl: '/contest.png',
    dDay: 23,
    teams: 4,
    title: '경찰청 안보지킴이 공모전',
    organizer: '경찰청',
    status: 'recruiting',
  },
  {
    id: 6,
    thumbnailUrl: '/contest2.png',
    dDay: 32,
    teams: 0,
    title: '제3회 기아 PBV 아이디어 공모전',
    organizer: '기아 (KIA)',
    status: 'recruiting',
  },
  {
    id: 7,
    thumbnailUrl: '/contest3.png',
    dDay: 2,
    teams: 4,
    title: '한국방송통신대학교 상징물 캐릭터, 로고, 워드마크 디자인공모전',
    organizer: '한국방송통신대학교',
    status: 'recruiting',
  },
  {
    id: 8,
    thumbnailUrl: '/contest4.png',
    dDay: 13,
    teams: 4,
    title: '서울시 2024 대학 광고동아리 광고제',
    organizer: '서울특별시',
    status: 'recruiting',
  },
] as const;

export default function ContestPage() {
  return <ContestPageClient />;
}
