import TeamCard from '@/app/team/components/TeamCard';
import Link from 'next/link';

// 임시 데이터 (나의 팀 전용)
const mockCards = [
  {
    id: 1,
    title: 'NH농협카드 플레이토&스터디 디자인 콘테스트',
    subtitle: 'NH농협카드',
    image: '/contest.png',
    totalMembers: 2,
    role: '팀장',
  },
  {
    id: 2,
    title: '기흥중진 사회 청년희망 프로그램 영상 공모전',
    subtitle: '기흥중진',
    image: '/contest2.png',
    totalMembers: 2,
    role: '팀원',
  },
  {
    id: 3,
    title: '서울시 2024 대학 광고동아리 광고제',
    subtitle: '서울특별시',
    image: '/contest3.png',
    totalMembers: 2,
    role: '팀원',
  },
  {
    id: 4,
    title: '한국방송통신대학교 상징물 캐릭터 공모전',
    subtitle: '한국방송통신대학교',
    image: '/contest4.png',
    totalMembers: 2,
    role: '팀장',
  },
  {
    id: 5,
    title: 'NH농협카드 플레이토&스터디 디자인 콘테스트',
    subtitle: 'NH농협카드',
    image: '/contest.png',
    totalMembers: 2,
    role: '팀장',
  },
  {
    id: 6,
    title: '기흥중진 사회 청년희망 프로그램 영상 공모전',
    subtitle: '기흥중진',
    image: '/contest2.png',
    totalMembers: 2,
    role: '팀원',
  },
  {
    id: 7,
    title: '서울시 2024 대학 광고동아리 광고제',
    subtitle: '서울특별시',
    image: '/contest3.png',
    totalMembers: 2,
    role: '팀원',
  },
  {
    id: 8,
    title: '한국방송통신대학교 상징물 캐릭터 공모전',
    subtitle: '한국방송통신대학교',
    image: '/contest4.png',
    totalMembers: 2,
    role: '팀장',
  },
];

export default function TeamManagementPage() {
  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-6">팀 관리</h1>

      {/* 탭 메뉴 */}
      <nav className="flex gap-6 mb-8 border-b pb-2 text-sm">
        <span className="font-semibold text-[#1487F9] border-b-2 border-[#1487F9] pb-2">
          나의 팀
        </span>

        <Link href="/team/my_recruit" className="text-gray-600 hover:text-black">
          나의 모집
        </Link>

        <Link href="/team/my_apply" className="text-gray-600 hover:text-black">
          나의 지원
        </Link>
      </nav>

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockCards.map((card) => (
          <TeamCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
