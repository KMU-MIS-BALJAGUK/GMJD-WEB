'use client';

import { useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import ContestCard from './components/ContestCard';
import { Button } from '@/components/common/Button';

const categories = [
  '기획/아이디어',
  '광고/마케팅',
  '사진/영상/UCC',
  '디자인/순수미술/공예',
  '네이밍/슬로건',
  '캐릭터/만화/게임',
  '건축/건설/인테리어',
];

// 공모전 데이터 타입을 정의합니다.
type Contest = {
  id: number;
  dDay: string;
  teams: string;
  title: string;
  organizer: string;
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
    status: 'recruiting',
  },
  {
    id: 2,
    dDay: 'D-13',
    teams: '개설된 팀 0',
    title: '키움증권 사회 초년생 자산UP! 영상 공모전',
    organizer: '키움증권',
    status: 'recruiting',
  },
  {
    id: 3,
    dDay: 'D-32',
    teams: '개설된 팀 0',
    title: '제3회 기아 PBV 아이디어 공모전',
    organizer: '기아 (KIA)',
    status: 'recruiting',
  },
  {
    id: 4,
    dDay: 'D-2',
    teams: '개설된 팀 19',
    title: '한국방송통신대학교 상징물 캐릭터, 로고, 워드마크 디자인공모전',
    organizer: '한국방송통신대학교',
    status: 'recruiting',
  },
  {
    id: 5,
    dDay: 'D-23',
    teams: '개설된 팀 4',
    title: '경찰청 안보지킴이 공모전',
    organizer: '경찰청',
    status: 'recruiting',
  },
  {
    id: 6,
    dDay: 'D-32',
    teams: '개설된 팀 0',
    title: '제3회 기아 PBV 아이디어 공모전',
    organizer: '기아 (KIA)',
    status: 'recruiting',
  },
  {
    id: 7,
    dDay: 'D-2',
    teams: '개설된 팀 4',
    title: '한국방송통신대학교 상징물 캐릭터, 로고, 워드마크 디자인공모전',
    organizer: '한국방송통신대학교',
    status: 'recruiting',
  },
  {
    id: 8,
    dDay: 'D-13',
    teams: '개설된 팀 4',
    title: '서울시 2024 대학 광고동아리 광고제',
    organizer: '서울특별시',
    status: 'recruiting',
  },
];



const ContestPage: NextPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[904px]">
      <h1 className="text-3xl font-bold mb-[60px]">공모전</h1>

      <div className="flex justify-between items-center mb-4">
        {/* 필터 드롭다운 */}
        <MultiSelectDropdown
          options={categories}
          selectedOptions={selectedCategories}
          onChange={setSelectedCategories}
        />

        {/* 정렬 옵션 */}
        <div className="flex items-center gap-4 text-sm">
          <Button variant="active">전체</Button>
          <Button variant="ghost">인기순</Button>
          <Button variant="ghost">마감임박순</Button>
        </div>
      </div>

      {/* 공모전 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {contests.map((contest) => (
          <ContestCard contest={contest} />
        ))}
      </div>

      {/* 더보기 버튼 */}
      <div className="mt-[60px] text-center">
        <Button variant="ghost" className="w-[343px] mx-auto">
          더보기
          <svg className="inline-block h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </Button>
      </div>
    </div>
  );
};

export default ContestPage;