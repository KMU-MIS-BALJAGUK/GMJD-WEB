'use client';

import Button from '@/components/common/Button';
import ContestCard from '@/components/common/ContestCard';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import SortButton from './SortButton';
import { SelectBox } from '@/components/common/SelectBox';

import { ContestFilterParams } from '@/features/contest/types/contest-request';
import { CATEGORY_MAP, SORT_MAP } from '@/constants/contest';

import { useFilteredContests } from '@/hooks/contest/useFilteredContests';
import { useSearchContests } from '@/hooks/contest/useSearchContests';
import { useSearchParams } from 'next/navigation';

const ContestPageClient = () => {
  const searchParams = useSearchParams();

  /** URL Params */
  const keyword = searchParams.get('keyword') ?? '';
  const page = Number(searchParams.get('page') ?? 0);
  const size = Number(searchParams.get('size') ?? 30);

  /** 정렬/카테고리 상태 */
  const [activeSort, setActiveSort] = useState('전체');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  /** GET/POST 공용 params (body 제외) */
  const [params, setParams] = useState<ContestFilterParams>({
    sortType: SORT_MAP['전체'],
    categoryIds: undefined,
    page,
    size,
  });

  /** 정렬/카테고리/페이지 변경 시 params 업데이트 */
  useEffect(() => {
    setParams({
      sortType: SORT_MAP[activeSort],
      categoryIds:
        selectedCategories.length > 0
          ? selectedCategories.map((name) => CATEGORY_MAP[name])
          : undefined,
      page,
      size,
    });
  }, [activeSort, selectedCategories, page, size]);

  /** 검색 여부 */
  const isSearching = keyword.length > 0;

  /** 검색 (POST + body) */
  const { data: searchData, isLoading: searchLoading } = useSearchContests(
    {
      params,
      body: { keyword },
    },
    {
      enabled: keyword.length > 0,
    }
  );

  /** 일반 목록 (GET + params) */
  const { data: listData, isLoading: listLoading } = useFilteredContests(params, {
    enabled: !isSearching, // 검색 중이 아닐 때만 GET 실행
  });

  /** 최종 데이터 */
  const contests = isSearching ? searchData : listData;
  const isLoading = isSearching ? searchLoading : listLoading;

  /** 리스트/정렬/카테고리 UI */
  const sortOptions = ['전체', '인기순', '마감임박순'];

  const categories = [
    { value: '기획/아이디어', label: '기획/아이디어' },
    { value: '광고/마케팅', label: '광고/마케팅' },
    { value: '사진/영상/UCC', label: '사진/영상/UCC' },
    { value: '디자인/순수미술/공예', label: '디자인/순수미술/공예' },
    { value: '네이밍/슬로건', label: '네이밍/슬로건' },
    { value: '캐릭터/만화/게임', label: '캐릭터/만화/게임' },
    { value: '건축/건설/인테리어', label: '건축/건설/인테리어' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[904px]">
      <h1 className="text-2xl font-bold mb-5 max-md:hidden mt-10">
        {isSearching ? `"${keyword}" 검색 결과` : '공모전'}
      </h1>

      <div className="flex justify-between items-center mb-4 max-sm:mt-7">
        {/* 카테고리 */}
        <SelectBox
          type="multiple"
          options={categories}
          value={selectedCategories}
          onChange={setSelectedCategories}
          placeholder="전체"
          className="w-52 max-sm:w-42 max-sm:mb-2 max-sm:self-start max-sm:text-sm! max-sm:h-10!"
        />

        {/* 정렬 */}
        <div className="flex items-center gap-3 text-sm">
          {sortOptions.map((option) => (
            <SortButton
              key={option}
              isActive={activeSort === option}
              onClick={() => setActiveSort(option)}
            >
              {option}
            </SortButton>
          ))}
        </div>
      </div>

      {/* 리스트 */}
      <div className="flex justify-center">
        <div className="grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-x-6 gap-y-6">
          {isLoading && <p>로딩중…</p>}

          {contests?.map((contest) => (
            <ContestCard contest={contest} key={contest.id} />
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button variant="ghost" className="w-full max-w-[400px] mx-auto mb-5">
          더보기
          <ChevronDown size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ContestPageClient;
