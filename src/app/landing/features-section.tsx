import React from 'react';
import Image from 'next/image';
import ScrollAnimation from '@/components/common/ScrollAnimation';

const FeaturesSection = () => {
  return (
    <section className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-20">
        {/* 스마트 매칭 기능 */}
        <ScrollAnimation>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mb-10 md:mb-16 lg:mb-20">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                팀 매칭 시스템
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                스킬셋, 경험, 관심 분야를 확인하여 원하는 팀원을 직접 찾아보세요. 다양한 팀원들과
                연결되어 완벽한 팀을 구성할 수 있습니다.
              </p>
              <ul className="space-y-2 text-sm md:text-base text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue mr-2">✓</span>
                  팀원 스킬 정보 확인
                </li>
                <li className="flex items-start">
                  <span className="text-blue mr-2">✓</span>
                  경험 레벨 확인
                </li>
                <li className="flex items-start">
                  <span className="text-blue mr-2">✓</span>
                  관심 분야별 팀원 탐색
                </li>
              </ul>
            </div>
            <div className="order-first sm:order-last">
              <Image
                src="/feature-1.png"
                alt="스마트 매칭 시스템"
                width={520}
                height={520}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </ScrollAnimation>

        {/* 실시간 채팅 기능 */}
        <ScrollAnimation delay={200}>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mb-8 sm:mb-10 md:mb-16 lg:mb-20">
            <div>
              <Image
                src="/feature-2.png"
                alt="실시간 채팅"
                width={520}
                height={520}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                실시간 팀 채팅
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                팀이 구성되면 바로 채팅을 시작할 수 있습니다. 아이디어 공유부터 프로젝트 진행까지
                모든 소통을 한 곳에서 관리하세요.
              </p>
              <ul className="space-y-2 text-sm md:text-base text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue mr-2">✓</span>
                  실시간 메시지 전송
                </li>
                <li className="flex items-start">
                  <span className="text-blue mr-2">✓</span>
                  링크 공유
                </li>
              </ul>
            </div>
          </div>
        </ScrollAnimation>

        {/* 공모전 정보 기능 */}
        <ScrollAnimation delay={400}>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mb-8 sm:mb-10 md:mb-16 lg:mb-20">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                최신 공모전 정보
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                다양한 공모전 정보를 한눈에 확인하고, 관심있는 공모전에 바로 지원하세요. 놓치기 쉬운
                마감일도 체크해드립니다.
              </p>
              <ul className="space-y-2 text-sm md:text-base text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue mr-2">✓</span>
                  최신 공모전 정보 업데이트
                </li>
                <li className="flex items-start">
                  <span className="text-blue mr-2">✓</span>
                  관심 분야별 필터링
                </li>
                <li className="flex items-start">
                  <span className="text-blue mr-2">✓</span>
                  상세 정보 등 확인
                </li>
              </ul>
            </div>
            <div className="order-first sm:order-last">
              <Image
                src="/feature-3.png"
                alt="공모전 정보"
                width={520}
                height={520}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </ScrollAnimation>

        {/* 팀 관리 기능 */}
        <ScrollAnimation delay={600}>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mt-8 sm:mt-10 md:mt-16 lg:mt-20">
            <div>
              <Image
                src="/feature-4.png"
                alt="팀 관리"
                width={520}
                height={520}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                통합 팀 관리
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                팀원 모집부터 팀 지원, 팀 운영까지 체계적으로 관리하세요. 팀장은 지원자를 검토하고
                승인할 수 있으며, 신청자는 자신의 지원 현황을 확인할 수 있습니다.
              </p>
              <ul className="space-y-2 text-sm md:text-base text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue mr-2">✓</span>
                  팀원 모집 현황 확인 및 팀원 관리
                </li>
                <li className="flex items-start">
                  <span className="text-blue mr-2">✓</span>
                  지원자 검토 및 승인
                </li>
                <li className="flex items-start">
                  <span className="text-blue mr-2">✓</span>
                  나의 지원 현황 관리
                </li>
              </ul>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default FeaturesSection;
