import HeroSection from './components/hero-section';
import Main from './components/Main';

export const MAIN_DATA = [
  {
    id: 1,
    title: 'NH농협카드 플레이트&스티커 디자인 콘테스트',
    organizer: 'NH농협은행',
    dDay: 2,
    teams: 5,
    thumbnailUrl: '/contest.png',
    status: 'recruiting' as const,
  },
  {
    id: 2,
    title: '2024 스마트시티 아이디어 공모전',
    organizer: '국토교통부',
    dDay: 10,
    teams: 3,
    thumbnailUrl: '/contest2.png',
    status: 'recruiting' as const,
  },
  {
    id: 3,
    title: '제10회 대한민국 청소년 창업경진대회',
    organizer: '중소벤처기업부',
    dDay: 15,
    teams: 8,
    thumbnailUrl: '/contest3.png',
    status: 'recruiting' as const,
  },
  {
    id: 4,
    title: '2024 환경사랑 그림그리기 대회',
    organizer: '환경부',
    dDay: 20,
    teams: 4,
    thumbnailUrl: '/contest4.png',
    status: 'recruiting' as const,
  },
];

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Main />
    </div>
  );
}
