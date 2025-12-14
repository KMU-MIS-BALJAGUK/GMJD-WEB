import Button from '@/components/common/Button';
import AnimatedText from '@/components/common/AnimatedText';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up delay-200">
            <AnimatedText /> Your Dream Team
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto animate-fade-in-up delay-400">
            혼자서는 도전하기 어려운 공모전, <br className="sm:hidden" />
            이제 완벽한 팀원을 찾아 함께 도전하세요!
          </p>
          <Image
            src={'/landing-hero.jpg'}
            alt="Landing Hero"
            width={800}
            height={400}
            className="w-full h-[450px] max-md:h-[200px] object-cover rounded-2xl shadow-lg mb-10 animate-fade-in-up delay-600"
          />
          <div className="flex gap-2 sm:gap-4 justify-center animate-fade-in-up delay-800">
            <Link href="/signup">
              <button className="bg-blue text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer">
                팀매칭 시작하기
              </button>
            </Link>
            <Link href="/main">
              <button className="border border-gray-300 text-gray-700 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                공모전 둘러보기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
