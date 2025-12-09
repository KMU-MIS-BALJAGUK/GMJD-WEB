'use client';

import ContestCard from '@/components/common/contest/ContestCard';
import React, { useEffect, useState } from 'react';
import SortButton from './SortButton';
import { SelectBox } from '@/components/common/SelectBox';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { SORT_MAP } from '@/constants/contest';
import { useSearchParams } from 'next/navigation';
import { useContests } from '@/hooks/contest/useContests';
import { useCategories } from '@/hooks/categories/useCategories';
import { ContestItemDto } from '@/features/contest/types/contest-response';
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';
import { Search } from 'lucide-react';

const ContestPageClient = () => {
  const searchParams = useSearchParams();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const keyword = searchParams.get('keyword') ?? '';
  const size = 30;

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [contestList, setContestList] = useState<ContestItemDto[]>([]);

  const [activeSort, setActiveSort] = useState('전체');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 카테고리 이름-ID 매핑 생성
  const categoryMap =
    categories?.reduce((acc, category) => {
      acc[category.name] = category.id;
      return acc;
    }, {} as Record<string, number>) || {};

  const params = {
    sortType: SORT_MAP[activeSort],
    categoryIdList:
      selectedCategories.length > 0
        ? selectedCategories.map((name) => categoryMap[name])
        : undefined,
    page,
    size,
  };

  console.log('🔍 params 변경됨:', params);
  console.log('🔍 activeSort:', activeSort);

  const { data, isLoading, isError } = useContests({
    params,
    keyword,
  });

  console.log('🔍 useContests data:', data);

  const contests = data?.contests;
  const totalElements = data?.totalElements || 0;

  /** 1) 새로운 데이터가 올 때마다 업데이트 */
  useEffect(() => {
    if (!contests) return;
    setContestList(contests);

    // totalPages 계산
    if (totalElements > 0) {
      setTotalPages(Math.ceil(totalElements / size));
    } else {
      setTotalPages(1);
    }
  }, [contests, totalElements, size]);

  /** 2) 정렬/카테고리/검색어 변경되면 페이지 초기화 */
  useEffect(() => {
    setPage(0);
  }, [activeSort, selectedCategories, keyword]);

  const sortOptions = ['전체', '인기순', '마감임박순'];

  const categoryOptions =
    categories?.map((cat) => ({
      value: cat.name,
      label: cat.name,
    })) || [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(0, page - 2);
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={page === i}
            className="cursor-pointer"
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[904px]">
      <h1 className="text-2xl font-bold mb-5 max-md:hidden mt-10">공모전</h1>
      {keyword && (
        <p className="mb-5 text-text-02 max-sm:mb-3 max-sm:mt-5">{`🔎 "${keyword}"에 대한 검색 결과입니다.`}</p>
      )}

      <div className="flex justify-between items-center mb-5 max-md:mt-7">
        <SelectBox
          type="multiple"
          options={categoryOptions}
          value={selectedCategories}
          onChange={setSelectedCategories}
          placeholder="전체"
          className="w-52 max-sm:w-42 max-sm:mb-2 max-sm:self-start max-sm:text-sm! max-sm:h-10!"
        />

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

      {isLoading && <Loading />}
      {isError && <Error />}

      {/* 검색결과 없음 UI */}
      {!isLoading && !isError && contestList && contestList.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="p-4 bg-bg-02 rounded-full mb-4">
            <Search className="w-12 h-12 text-text-03" />
          </div>
          <h3 className="text-lg font-medium text-text-01 mb-2">
            {keyword ? '검색 결과가 없어요' : '공모전이 없어요'}
          </h3>
          <p className="text-text-03 text-sm mb-1">
            {keyword
              ? `"${keyword}"에 대한 검색 결과를 찾을 수 없어요.`
              : '현재 조건에 맞는 공모전이 없습니다.'}
          </p>
          <p className="text-text-03 text-sm">
            {keyword
              ? '다른 키워드로 검색해보거나 필터를 변경해보세요.'
              : '필터 조건을 변경하거나 잠시 후 다시 확인해주세요.'}
          </p>
        </div>
      )}

      {contestList && contestList.length > 0 && !isLoading && (
        <div className="flex justify-center">
          <div className="grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-x-6 gap-y-6">
            {contestList?.map((contest: ContestItemDto) => (
              <ContestCard contest={contest} key={contest.id} />
            ))}
          </div>
        </div>
      )}

      {contestList && contestList.length > 0 && !isLoading && (
        <div className="mt-10 mb-5 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(0, page - 1))}
                  className={page === 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {renderPageNumbers()}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(totalPages - 1, page + 1))}
                  className={
                    page === totalPages - 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ContestPageClient;
