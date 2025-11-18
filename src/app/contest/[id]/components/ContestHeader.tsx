'use client';

import { Contest } from '@/types/contest';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { Bookmark } from 'lucide-react';
import { useState } from 'react';

interface ContestHeaderProps {
  contest: Contest;
}
 
export default function ContestHeader({ contest }: ContestHeaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').replace(/\.$/, '');
  };

  const calculateDday = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `D-${diff}` : '마감';
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    console.log('북마크:', !isBookmarked);
  };

  return (
    <div className="w-[400px] flex flex-col gap-10">
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <p className="text-3xl font-semibold text-red-600">
            {calculateDday(contest.endDate)}
          </p>
          <button
            onClick={handleBookmark}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
            aria-label="북마크"
          >
            <Bookmark
              size={28}
              className={isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-gray-600'}
            />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-black leading-tight">
          {contest.title}
        </h1>
      </div>

      <div className="w-full aspect-[3/4] bg-gray-100 border-2 border-black rounded-2xl overflow-hidden relative shadow-sm">
        <Image
          src={contest.posterUrl}
          alt={contest.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full space-y-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-sm font-semibold text-gray-700 min-w-[70px]">기업형태</span>
              <span className="text-sm text-gray-900 flex-1">{contest.organizer}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sm font-semibold text-gray-700 min-w-[70px]">시상규모</span>
              <span className="text-sm text-gray-900 flex-1">{contest.prize.split(',')[0]}</span>
            </div>
            {contest.homepageUrl && (
              <div className="flex items-start gap-3">
                <span className="text-sm font-semibold text-gray-700 min-w-[70px]">홈페이지</span>
                <a
                  href={contest.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline font-medium flex-1"
                >
                  바로가기
                </a>
              </div>
            )}
            <div className="flex items-start gap-3">
              <span className="text-sm font-semibold text-gray-700 min-w-[70px]">공모분야</span>
              <span className="text-sm text-gray-900 flex-1">{contest.category}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-sm font-semibold text-gray-700 min-w-[70px]">참여대상</span>
              <span className="text-sm text-gray-900 flex-1">대학생</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sm font-semibold text-gray-700 min-w-[70px]">접수기간</span>
              <div className="flex flex-col text-sm text-gray-900 flex-1">
                <span>{formatDate(contest.startDate)}</span>
                <span>~ {formatDate(contest.endDate)}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sm font-semibold text-gray-700 min-w-[70px]">활동혜택</span>
              <span className="text-sm text-gray-900 flex-1">상금</span>
            </div>
          </div>
        </div>
      </div>

      {contest.homepageUrl && (
        <a 
          href={contest.homepageUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full block"
        >
          <Button
            variant="primary"
            fullWidth
            className="h-12 text-base font-semibold shadow-sm hover:shadow-md transition-shadow"
          >
            공모전 홈페이지 지원하기
          </Button>
        </a>
      )}
    </div>
  );
}