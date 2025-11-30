'use client';

import Button from '@/components/common/Button';

import type { ContestDetailDto } from '@/types/contest';
import Image from 'next/image';
import Link from 'next/link';

interface ContestHeaderProps {
  contest: ContestDetailDto;
}

export default function ContestHeader({ contest }: ContestHeaderProps) {
  return (
    <div className="w-full md:max-w-[660px] lg:w-[432px] flex flex-col max-sm:flex-col-reverse gap-5 sm:gap-10">
      {/* 모바일에서만 보이는 홈페이지 지원 버튼 */}
      {contest.siteUrl && (
        <Link
          href={contest.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden"
        >
          <Button variant="secondary" className="w-full mt-3">
            홈페이지 지원하기
          </Button>
        </Link>
      )}

      {/* 상세 정보 (2열) */}
      <div className="flex max-sm:flex-col justify-around gap-5 sm:gap-[70px]">
        {/* 왼쪽 컬럼 */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3.5">
            <span className="text-[15px] font-normal text-[#888888] w-[52px] flex-shrink-0">
              기업형태
            </span>
            <span className="text-[15px] font-medium text-[#1D1D1D] whitespace-nowrap">
              {contest.companyType}
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <span className="text-[15px] font-normal text-[#888888] w-[52px] flex-shrink-0">
              시상규모
            </span>
            <span className="text-[15px] font-medium text-[#1D1D1D] whitespace-nowrap">
              {contest.awardScale}
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <span className="text-[15px] font-normal text-[#888888] w-[52px] flex-shrink-0">
              참여대상
            </span>
            <span className="text-[15px] font-medium text-[#1D1D1D] whitespace-nowrap">
              {contest.targetParticipants}
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <span className="text-[15px] font-normal text-[#888888] w-[52px] flex-shrink-0">
              추가혜택
            </span>
            <span className="text-[15px] font-normal text-[#1D1D1D] whitespace-nowrap">
              {contest.additionalBenefits}
            </span>
          </div>
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3.5">
            <span className="text-[15px] font-normal text-[#888888] w-[52px] flex-shrink-0">
              활동혜택
            </span>
            <span className="text-[15px] font-normal text-[#1D1D1D] whitespace-nowrap">
              {contest.benefits}
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <span className="text-[15px] font-normal text-[#888888] w-[52px] flex-shrink-0">
              접수기간
            </span>
            <span className="text-[15px] font-medium text-[#1D1D1D] whitespace-nowrap">
              {contest.duration}
            </span>
          </div>

          {contest.siteUrl && (
            <div className="flex items-center gap-3.5">
              <span className="text-[15px] font-normal text-[#888888] w-[52px] flex-shrink-0">
                홈페이지
              </span>
              <a
                href={contest.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-[#1487F9] underline hover:text-blue-700 whitespace-nowrap"
              >
                사이트 바로가기
              </a>
            </div>
          )}

          <div className="flex items-center gap-3.5">
            <span className="text-[15px] font-normal text-[#888888] w-[52px] flex-shrink-0">
              공모분야
            </span>
            <span className="inline-flex items-center px-3 py-1.5 border border-[#E4E4E4] rounded-full text-[13px] font-medium text-[#555555] whitespace-nowrap">
              {contest.categories}
            </span>
          </div>
        </div>
      </div>

      {/* 포스터 이미지 */}
      <div className="w-full aspect-[2/3] lg:h-[611px] bg-gray-100 rounded-lg overflow-hidden relative">
        <Image
          src={contest.imageUrl}
          alt={contest.name}
          fill
          className="max-lg:object-contain lg:object-cover"
          priority
        />
      </div>
    </div>
  );
}