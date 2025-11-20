'use client';

import Input from '@/components/common/Input';
import Tag from '@/components/common/Tag';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { MAIN_DATA } from '../page';

const HeroSection = () => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="relative w-full h-[430px] max-md:h-[600px]">
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
        <div className="flex flex-col justify-center gap-7 md:max-w-[400px]">
          <p className="text-xl lg:text-[32px] max-md:font-medium font-bold max-md:text-center">
            지금 인기있는 공모전을
            <br className="max-md:hidden" /> 확인해보세요!
          </p>
          <Input
            placeholder="공모전 정보를 검색하세요"
            variant="heroInput"
            icon={<Search size={20} className="text-text-02" />}
          />
        </div>

        {/* 이미지 슬라이더 */}
        <div className="flex max-md:flex-col items-center gap-3 lg:gap-10 max-md:mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-3">
              <Image
                src={'/chevronLeft.svg'}
                alt="Left Arrow"
                width={27}
                height={27}
                className="cursor-pointer"
                onClick={() =>
                  setImageIndex((prev) => (prev + MAIN_DATA.length - 1) % MAIN_DATA.length)
                }
              />
              <div className="relative w-[200px] h-[300px] rounded-[14px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={MAIN_DATA[imageIndex].id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/70 to-transparent z-[1] rounded-[14px]" />
                    <Image
                      src={MAIN_DATA[imageIndex].thumbnailUrl}
                      alt="Contest Example"
                      fill
                      className="object-cover rounded-[14px]"
                    />

                    <div className="absolute p-3 bottom-0 text-white z-[2]">
                      <div className="flex gap-1 mb-1.5">
                        <Tag
                          shape="square"
                          variant="transparentOrange"
                          className="text-[10px] px-1.5 py-1"
                        >
                          D-{MAIN_DATA[imageIndex].dDay}
                        </Tag>
                        <Tag
                          shape="square"
                          variant="transparentDefault"
                          className="text-[10px] px-1.5 py-1 font-medium"
                        >
                          개설된 방 {MAIN_DATA[imageIndex].teams}개
                        </Tag>
                      </div>
                      <p className="text-[13px] line-clamp-1">{MAIN_DATA[imageIndex].title}</p>
                      <p className="text-[10px] text-white/70 mt-0.5">
                        {MAIN_DATA[imageIndex].organizer}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <Image
                src={'/chevronRight.svg'}
                alt="Right Arrow"
                width={27}
                height={27}
                className="cursor-pointer"
                onClick={() => setImageIndex((prev) => (prev + 1) % MAIN_DATA.length)}
              />
            </div>
            <span className="text-[12px] text-text-03 px-[14px] py-1.5 bg-white/70 rounded-full">
              <span className="text-black">{imageIndex + 1}</span> / {MAIN_DATA.length}
            </span>
          </div>

          <div className="relative w-[170px] h-[240px] rounded-[10px] overflow-hidden mb-10 max-md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={MAIN_DATA[(imageIndex + 1) % MAIN_DATA.length].id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/70 to-transparent z-[1] rounded-[10px]" />
                <Image
                  src={MAIN_DATA[(imageIndex + 1) % MAIN_DATA.length].thumbnailUrl}
                  alt="Contest Example"
                  fill
                  className="object-cover rounded-[10px]"
                />

                <div className="absolute p-3 bottom-0 text-white z-[2]">
                  <div className="flex gap-1 mb-1.5">
                    <Tag
                      shape="square"
                      variant="transparentOrange"
                      className="text-[10px] px-1.5 py-1"
                    >
                      D-{MAIN_DATA[(imageIndex + 1) % MAIN_DATA.length].dDay}
                    </Tag>
                    <Tag
                      shape="square"
                      variant="transparentDefault"
                      className="text-[10px] px-1.5 py-1 font-medium"
                    >
                      개설된 방 {MAIN_DATA[(imageIndex + 1) % MAIN_DATA.length].teams}개
                    </Tag>
                  </div>
                  <p className="text-[13px] line-clamp-1">
                    {MAIN_DATA[(imageIndex + 1) % MAIN_DATA.length].title}
                  </p>
                  <p className="text-[10px] text-white/70 mt-0.5">
                    {MAIN_DATA[(imageIndex + 1) % MAIN_DATA.length].organizer}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
