'use client';

import Image from 'next/image';

export default function HeroContestCard({
  src = '/contest.png',
  children,
}: {
  src?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative w-full aspect-200/300 rounded-[14px] overflow-hidden">
      {/* 배경 이미지 */}
      <Image src={src} alt="Contest Background" fill className="object-cover" priority />

      {/* 내부 내용 */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end text-white bg-black/20">
        {children}
      </div>
    </div>
  );
}
