'use client';

import Input from '@/components/common/Input';
import Tag from '@/components/common/Tag';
import { Inbox, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContests } from '@/hooks/contest/useContests';
import Loading from '@/components/common/Loading';

function EmptyState({ message = '데이터가 없습니다.' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white/70 gap-2">
      <Inbox size={28} className="text-white/60" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

const HeroSection = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const params = {
    sortType: 'popular' as const,
    page: 0,
    size: 5,
  };

  const { data, isLoading } = useContests({ params });
  const contests = data?.contests;
  const list = contests ?? [];
  const safeIndex = list.length > 0 ? imageIndex % list.length : 0;

  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const onSearch = () => {
    if (!keyword.trim()) return;
    router.push(`/contest?keyword=${encodeURIComponent(keyword)}`);
    setKeyword('');
  };

  return (
    <div className="relative w-full h-[430px] max-md:h-[600px]">
      {/* 배경 이미지 */}
      <Image
        src="/hero-section.png"
        alt="Hero Section"
        fill
        className="object-cover max-md:hidden"
        priority
      />
      <Image
        src="/hero-section-mobile.png"
        alt="Hero Section"
        fill
        className="object-cover md:hidden"
        priority
      />

      <div className="absolute inset-0 flex max-md:flex-col justify-center mx-auto items-center text-white w-[85%] gap-7 xl:gap-32">
        {/* 텍스트 & 검색 */}
        <div className="flex flex-col justify-center gap-7 md:max-w-[400px]">
          <p className="text-xl lg:text-[32px] max-md:font-medium font-bold max-md:text-center">
            지금 인기있는 공모전을
            <br className="max-md:hidden" /> 확인해보세요!
          </p>

          <Input
            placeholder="공모전 정보를 검색하세요"
            variant="heroInput"
            value={keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') onSearch();
            }}
            icon={<Search size={20} className="text-text-02" onClick={onSearch} />}
          />
        </div>

        {/* 이미지 슬라이더 */}
        <div className="flex max-md:flex-col items-center gap-3 lg:gap-10 max-md:mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-3">
              {/* 왼쪽 이동 */}
              <Image
                src={'/chevronLeft.svg'}
                alt="Left Arrow"
                width={27}
                height={27}
                className="cursor-pointer"
                onClick={() =>
                  list.length > 0 && setImageIndex((prev) => (prev + list.length - 1) % list.length)
                }
              />

              {/* 메인 카드 */}
              <div className="relative w-[200px] h-[300px] rounded-[14px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={list[safeIndex]?.id ?? 'loading'}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    {/* 로딩/빈 상태 */}
                    {list.length === 0 ? (
                      <div className="flex items-center justify-center h-full bg-black/40 text-white/60 text-sm">
                        {isLoading ? <Loading /> : <EmptyState />}
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/70 to-transparent z-1 rounded-[14px]" />

                        <Image
                          src={list[safeIndex].imageUrl}
                          alt="Contest"
                          fill
                          className="object-cover rounded-[14px]"
                        />

                        <div className="absolute p-3 bottom-0 text-white z-2">
                          <div className="flex gap-1 mb-1.5">
                            <Tag
                              shape="square"
                              variant="transparentOrange"
                              className="text-[10px] px-1.5 py-1"
                            >
                              D-{list[safeIndex].remainingDays}
                            </Tag>
                            <Tag
                              shape="square"
                              variant="transparentDefault"
                              className="text-[10px] px-1.5 py-1 font-medium"
                            >
                              개설된 방 {list[safeIndex].openTeamCount}개
                            </Tag>
                          </div>

                          <p className="text-[13px] line-clamp-1">{list[safeIndex].name}</p>
                          <p className="text-[10px] text-white/70 mt-0.5">
                            {list[safeIndex].organizationName}
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 오른쪽 이동 */}
              <Image
                src={'/chevronRight.svg'}
                alt="Right Arrow"
                width={27}
                height={27}
                className="cursor-pointer"
                onClick={() => list.length > 0 && setImageIndex((prev) => (prev + 1) % list.length)}
              />
            </div>

            {/* 인덱스 표시 */}
            {list.length > 0 && (
              <span className="text-[12px] text-text-03 px-3.5 py-1.5 bg-white/70 rounded-full">
                <span className="text-black">{safeIndex + 1}</span> / {list.length}
              </span>
            )}
          </div>

          {/* 오른쪽 작은 카드 */}
          {(isLoading || list.length > 1) && (
            <div className="relative w-[170px] h-60 rounded-[10px] overflow-hidden mb-10 max-md:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLoading ? 'loading' : list[(safeIndex + 1) % list.length].id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  {/* 로딩 상태 */}
                  {isLoading && (
                    <div className="flex items-center justify-center h-full bg-black/40 text-white/60 text-sm">
                      <Loading />
                    </div>
                  )}

                  {/* 로딩 아님 + length <= 1 → 아무것도 렌더링하지 않음 */}
                  {!isLoading && list.length <= 1 && null}

                  {/* 정상 렌더링 (length > 1) */}
                  {!isLoading && list.length > 1 && (
                    <>
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/70 to-transparent z-1 rounded-[10px]" />
                      <Image
                        src={list[(safeIndex + 1) % list.length].imageUrl}
                        alt="Contest"
                        fill
                        className="object-cover rounded-[10px]"
                      />

                      <div className="absolute p-3 bottom-0 text-white z-2">
                        <div className="flex gap-1 mb-1.5">
                          <Tag
                            shape="square"
                            variant="transparentOrange"
                            className="text-[10px] px-1.5 py-1"
                          >
                            D-{list[(safeIndex + 1) % list.length].remainingDays}
                          </Tag>
                          <Tag
                            shape="square"
                            variant="transparentDefault"
                            className="text-[10px] px-1.5 py-1"
                          >
                            개설된 방 {list[(safeIndex + 1) % list.length].openTeamCount}개
                          </Tag>
                        </div>

                        <p className="text-[13px] line-clamp-1">
                          {list[(safeIndex + 1) % list.length].name}
                        </p>
                        <p className="text-[10px] text-white/70 mt-0.5">
                          {list[(safeIndex + 1) % list.length].organizationName}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
