import MyApplyPageClient from './components/MyApplyPageClient';

// 임시 데이터
export const mockApplies = [
  {
    id: 1,
    title: 'NH농협카드 플레이토&스터디 디자인 콘테스트',
    subtitle: '아이디어 기획 파트 1명 구합니다',
    image: '/contest.png',
    totalMembers: 2,
    applicants: 4,
    status: 'open',
  },
  {
    id: 2,
    title: 'NH농협카드 플레이토&스터디 디자인 콘테스트',
    subtitle: '아이디어 기획 파트 1명 구합니다',
    image: '/contest2.png',
    totalMembers: 2,
    applicants: 4,
    status: 'open',
  },
  {
    id: 3,
    title: 'NH농협카드 플레이토&스터디 디자인 콘테스트',
    subtitle: '아이디어 기획 파트 1명 구합니다',
    image: '/contest3.png',
    totalMembers: 2,
    applicants: 4,
    status: 'closed',
  },
];

export default function MyApplyPage() {
  return <MyApplyPageClient />;
}
