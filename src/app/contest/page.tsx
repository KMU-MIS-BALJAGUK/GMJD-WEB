import type { NextPage } from 'next';
import Image from 'next/image';

type Contest = {
  id: number;
  dDay: string;
  teams: string;
  title: string;
  organizer: string;
  imageUrl: string;
  status: 'recruiting' | 'soon' | 'closed'; // 모집중, 예정, 마감
};

// 임시 공모전 데이터입니다.
const contests: Contest[] = [
  {
    id: 1,
    dDay: 'D-23',
    teams: '개설된 팀 4',
    title: 'NH농협카드 플레이트&스티커 디자인 콘테스트',
    organizer: 'NH 농협은행',
    imageUrl: 'https://placehold.co/300x200/003366/FFFFFF/png?text=NH+CARD',
    status: 'recruiting',
  },
  {
    id: 2,
    dDay: 'D-13',
    teams: '개설된 팀 0',
    title: '키움증권 사회 초년생 자산UP! 영상 공모전',
    organizer: '키움증권',
    imageUrl: 'https://placehold.co/300x200/4B0082/FFFFFF/png?text=영상+공모전',
    status: 'recruiting',
  },
  {
    id: 3,
    dDay: 'D-32',
    teams: '개설된 팀 0',
    title: '제3회 기아 PBV 아이디어 공모전',
    organizer: '기아 (KIA)',
    imageUrl: 'https://placehold.co/300x200/A9A9A9/000000/png?text=KIA+PBV',
    status: 'recruiting',
  },
  {
    id: 4,
    dDay: 'D-2',
    teams: '개설된 팀 19',
    title: '한국방송통신대학교 상징물 캐릭터, 로고, 워드마크 디자인공모전',
    organizer: '한국방송통신대학교',
    imageUrl: 'https://placehold.co/300x200/1E90FF/FFFFFF/png?text=KNOU+Design',
    status: 'recruiting',
  },
  {
    id: 5,
    dDay: 'D-23',
    teams: '개설된 팀 4',
    title: '경찰청 안보지킴이 공모전',
    organizer: '경찰청',
    imageUrl: 'https://placehold.co/300x200/004C8C/FFFFFF/png?text=안보지킴이',
    status: 'recruiting',
  },
  {
    id: 6,
    dDay: 'D-32',
    teams: '개설된 팀 0',
    title: '제3회 기아 PBV 아이디어 공모전',
    organizer: '기아 (KIA)',
    imageUrl: 'https://placehold.co/300x200/A9A9A9/000000/png?text=KIA+PBV',
    status: 'recruiting',
  },
  {
    id: 7,
    dDay: 'D-2',
    teams: '개설된 팀 4',
    title: '한국방송통신대학교 상징물 캐릭터, 로고, 워드마크 디자인공모전',
    organizer: '한국방송통신대학교',
    imageUrl: 'https://placehold.co/300x200/1E90FF/FFFFFF/png?text=KNOU+Design',
    status: 'recruiting',
  },
  {
    id: 8,
    dDay: 'D-13',
    teams: '개설된 팀 4',
    title: '서울시 2024 대학 광고동아리 광고제',
    organizer: '서울특별시',
    imageUrl: 'https://placehold.co/300x200/FF69B4/FFFFFF/png?text=My+Ad',
    status: 'recruiting',
  },
];

// 공모전 카드 컴포넌트
const ContestCard = ({ contest }: { contest: Contest }) => (
  <div className="w-full">
    <div className="relative">
      <Image
        src={contest.imageUrl}
        alt={contest.title}
        width={300}
        height={200}
        className="w-full rounded-lg object-cover"
      />
    </div>
    <div className="pt-3">
      <div className="flex items-center gap-2 text-xs">
        <span className="font-semibold text-blue-600">{contest.dDay}</span>
        <span className="text-gray-500">{contest.teams}</span>
      </div>
      <h3 className="font-bold mt-1 truncate">{contest.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{contest.organizer}</p>
    </div>
  </div>
);

const ContestPage: NextPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">공모전</h1>

      <div className="flex justify-between items-center mb-6">
        {/* 필터 드롭다운 */}
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option>전체</option>
            <option>기획/아이디어</option>
            <option>디자인</option>
            <option>영상/콘텐츠</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        {/* 정렬 옵션 */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <button className="font-bold text-black">전체</button>
          <button>인기순</button>
          <button>마감임박순</button>
        </div>
      </div>

      {/* 공모전 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {contests.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>

      {/* 더보기 버튼 */}
      <div className="mt-12 text-center">
        <button className="bg-white border border-gray-300 rounded-full py-3 px-8 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          더보기
          <svg className="inline-block h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default ContestPage;