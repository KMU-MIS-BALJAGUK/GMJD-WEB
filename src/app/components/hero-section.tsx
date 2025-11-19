'use client';

import Input from '@/components/common/Input';
import Tag from '@/components/common/Tag';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

const HeroSection = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const data = [
    {
      id: 1,
      title: 'NH농협카드 플레이트&스티커 디자인 콘테스트',
      organization: 'NH농협은행',
      d_day: 2,
      team_num: 5,
      image: '/contest.png',
    },
    {
      id: 2,
      title: '2024 스마트시티 아이디어 공모전',
      organization: '국토교통부',
      d_day: 10,
      team_num: 3,
      image: '/contest2.png',
    },
    {
      id: 3,
      title: '제10회 대한민국 청소년 창업경진대회',
      organization: '중소벤처기업부',
      d_day: 15,
      team_num: 8,
      image: '/contest3.png',
    },
    {
      id: 4,
      title: '2024 환경사랑 그림그리기 대회',
      organization: '환경부',
      d_day: 20,
      team_num: 4,
      image: '/contest4.png',
    },
    {
      id: 5,
      title: '2024 대학생 광고 공모전',
      organization: '한국광고학회',
      d_day: 25,
      team_num: 6,
      image: '/contest5.png',
    },
  ];

  return (
    <div className="relative w-full h-[430px]">
      <Image src="/hero-section.png" alt="Hero Section" fill className="object-cover" priority />

      <div className="absolute inset-0 flex justify-center mx-auto items-center text-white w-[85%] gap-18 xl:gap-32">
        <div className="flex flex-col justify-center gap-7 max-w-[400px] max-md:hidden">
          <p className="text-2xl lg:text-[32px] font-bold">
            지금 인기있는 공모전을
            <br /> 확인해보세요!
          </p>
          <Input
            placeholder="공모전 정보를 검색하세요"
            variant="heroInput"
            icon={<Search size={20} className="text-text-02" />}
          />
        </div>

        {/* 이미지 슬라이더 */}
        <div className="flex max-md:flex-col items-center gap-3 lg:gap-10 max-md:mx-auto">
          <p className="text-lg font-semibold text-center text-white/80 md:hidden">
            지금 인기있는 공모전을 확인해보세요!
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-3">
              <Image
                src={'/chevronLeft.svg'}
                alt="Left Arrow"
                width={27}
                height={27}
                className="cursor-pointer"
                onClick={() => setImageIndex((prev) => (prev + data.length - 1) % data.length)}
              />
              <div className="relative w-[200px] h-[300px] rounded-[14px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={data[imageIndex].id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/70 to-transparent z-[1] rounded-[14px]" />
                    <Image
                      src={data[imageIndex].image}
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
                          D-{data[imageIndex].d_day}
                        </Tag>
                        <Tag
                          shape="square"
                          variant="transparentDefault"
                          className="text-[10px] px-1.5 py-1 font-medium"
                        >
                          개설된 방 {data[imageIndex].team_num}개
                        </Tag>
                      </div>
                      <p className="text-[13px] line-clamp-1">{data[imageIndex].title}</p>
                      <p className="text-[10px] text-white/70 mt-0.5">
                        {data[imageIndex].organization}
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
                onClick={() => setImageIndex((prev) => (prev + 1) % data.length)}
              />
            </div>
            <span className="text-[12px] text-text-03 px-[14px] py-1.5 bg-white/70 rounded-full">
              <span className="text-black">{imageIndex + 1}</span> / 5
            </span>
          </div>

          <div className="relative w-[170px] h-[240px] rounded-[10px] overflow-hidden mb-10 max-md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={data[(imageIndex + 1) % data.length].id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/70 to-transparent z-[1] rounded-[10px]" />
                <Image
                  src={data[(imageIndex + 1) % data.length].image}
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
                      D-{data[(imageIndex + 1) % data.length].d_day}
                    </Tag>
                    <Tag
                      shape="square"
                      variant="transparentDefault"
                      className="text-[10px] px-1.5 py-1 font-medium"
                    >
                      개설된 방 {data[(imageIndex + 1) % data.length].team_num}개
                    </Tag>
                  </div>
                  <p className="text-[13px] line-clamp-1">
                    {data[(imageIndex + 1) % data.length].title}
                  </p>
                  <p className="text-[10px] text-white/70 mt-0.5">
                    {data[(imageIndex + 1) % data.length].organization}
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
