import React from 'react';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import Link from 'next/link';

const CtaSection = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-20">
        <ScrollAnimation>
          <div className="text-center bg-gray-50 rounded-2xl px-4 py-6 md:px-8 md:py-10 lg:px-12 lg:py-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              지금 바로 시작해보세요!
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
              팀을 찾는 순간, 도전은 시작됩니다. <br />
              공모전의 시작, <strong>공모자들</strong>.
            </p>
            <Link href="/signup">
              <button className="bg-blue text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer">
                🚀 회원가입하고 시작하기
              </button>
            </Link>

            {/* 간단한 통계 정보 (임시) */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue mb-1">1000+</div>
              <div className="text-sm text-gray-600">활성 사용자</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue mb-1">500+</div>
              <div className="text-sm text-gray-600">성사된 팀</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue mb-1">200+</div>
              <div className="text-sm text-gray-600">진행중인 프로젝트</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue mb-1">50+</div>
              <div className="text-sm text-gray-600">성공한 공모전</div>
            </div>
          </div> */}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default CtaSection;
