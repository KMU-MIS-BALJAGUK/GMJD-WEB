'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

const Footer = () => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'w-full h-20 border-t border-border-01',
        pathname.startsWith('/chat') && 'max-md:hidden'
      )}
    >
      <div className="flex justify-between w-[80%] mx-auto items-center h-full">
        <p className="text-text-03 font-semibold text-sm">
          작은 아이디어가 세상을 바꾸는 순간, 공모자들
        </p>

        <Image
          src={'/insta-icon.png'}
          alt="instagram"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Footer;
