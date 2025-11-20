import MyRecruitPageClient from './components/MyRecruitPageClient';
import { RecruitManageCardProps } from './components/RecruitCard';

// 임시 데이터
export const mockCards: RecruitManageCardProps[] = [
  {
    id: 1,
    title: 'NH농협카드 플레이토&스터디 디자인 콘테스트',
    subtitle: 'NH농협카드',
    image: '/contest.png',
    totalMembers: 2,
    applicants: 4,
    status: 'open',
  },
  {
    id: 2,
    title: '기흥중진 사회 청년희망 프로그램 영상 공모전',
    subtitle: '기흥중진',
    image: '/contest2.png',
    totalMembers: 2,
    applicants: 4,
    status: 'open',
  },
  {
    id: 3,
    title: '서울시 2024 대학 광고동아리 광고제',
    subtitle: '서울특별시',
    image: '/contest3.png',
    totalMembers: 2,
    applicants: 4,
    status: 'open',
  },
  {
    id: 4,
    title: '한국방송통신대학교 상징물 캐릭터 공모전',
    subtitle: '한국방송통신대학교',
    image: '/contest4.png',
    totalMembers: 2,
    applicants: 4,
    status: 'closed',
  },
];

export default function MyRecruitPage() {
  return <MyRecruitPageClient />;
}
