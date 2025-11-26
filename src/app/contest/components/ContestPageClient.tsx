'use client';

import Button from '@/components/common/Button';
import ContestCard from '@/components/common/ContestCard';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import SortButton from './SortButton';
import { SelectBox } from '@/components/common/SelectBox';
import { contests } from '../page';
import { ContestFilterParams, ContestItemDto } from '@/features/contest/types/contest';
import { CATEGORY_MAP, SORT_MAP } from '@/constants/contest';
import { useFilteredContests } from '@/hooks/contest/useFilteredContests';
// { initialData }: { initialData: ContestItemDto[] }
const ContestPageClient = () => {
  const [activeSort, setActiveSort] = useState('전체');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [params, setParams] = useState<ContestFilterParams>({
    sort: SORT_MAP['전체'],
    categoryIds: undefined,
  });

  // 정렬 + 카테고리 선택 시 API 요청 params 갱신
  useEffect(() => {
    setParams({
      sort: SORT_MAP[activeSort],
      categoryIds:
        selectedCategories.length > 0
          ? selectedCategories.map((name) => CATEGORY_MAP[name])
          : undefined,
    });
  }, [activeSort, selectedCategories]);

  const { data } = useFilteredContests(params);

  console.log(data);

  const sortOptions = ['전체', '인기순', '마감임박순'];
  // const [activeSort, setActiveSort] = useState('전체');
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
      {/* 공모전 그리드 */}
      <h1 className="text-2xl font-bold mb-5 max-md:hidden mt-10">공모전</h1>

      <div className="flex justify-between items-center mb-4 max-sm:mt-7">
        <SelectBox
          type="multiple"
          options={categories}
          value={selectedCategories}
          onChange={setSelectedCategories}
          placeholder="전체"
          className="w-52 max-sm:w-42 max-sm:mb-2 max-sm:self-start max-sm:text-sm! max-sm:h-10!"
        />
        {/* 정렬 옵션 */}
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

      <div className="flex justify-center">
        <div className="grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-x-6 gap-y-6">
          {contests.map((contest) => {
            return <ContestCard contest={contest} key={contest.id} />;
          })}
        </div>
      </div>

      {/* 더보기 버튼 */}
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
