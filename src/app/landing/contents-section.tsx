import React from 'react';
import ScrollAnimation from '@/components/common/ScrollAnimation';

const ContentsSection = () => {
  return (
    <section className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-20">
        {/* 문제 제시 */}
        <ScrollAnimation>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              이런 경험 있으신가요?
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12">
              공모전에 참여하고 싶지만 혼자서는 어려운 일들이 많죠. <br />
              많은 참가자들이 겪는 공통된 문제들을 해결해드립니다.
            </p>
          </div>
        </ScrollAnimation>

        {/* 문제점들 */}
        <ScrollAnimation delay={200}>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
            <div className="bg-red-50 p-3 md:p-6 rounded-lg border border-red-100">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4 text-center">😰</div>
              <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-center text-red-700">
                팀원은 어디서?
              </h3>
              <p className="text-sm md:text-base text-gray-600 text-center">
                공모전에 관심은 있지만 팀원을 찾기가 어렵고, 혼자서는 모든 분야를 커버하기 힘들어요.
              </p>
            </div>

            <div className="bg-orange-50 p-3 md:p-6 rounded-lg border border-orange-100">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4 text-center">🤷‍♂️</div>
              <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-center text-orange-700">
                실력이 맞을까?
              </h3>
              <p className="text-sm md:text-base text-gray-600 text-center">
                팀원의 실력이나 경험 수준을 미리 알기 어려워 프로젝트 진행 중 어려움을 겪는 경우가
                많아요.
              </p>
            </div>

            <div className="bg-yellow-50 p-3 md:p-6 rounded-lg border border-yellow-100">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4 text-center">⏰</div>
              <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-center text-yellow-700">
                기간을 놓쳤어!
              </h3>
              <p className="text-sm md:text-base text-gray-600 text-center">
                관심있는 공모전 정보를 일일이 찾아보기 번거롭고, 마감일을 놓치는 경우가 자주
                발생해요.
              </p>
            </div>

            <div className="bg-purple-50 p-3 md:p-6 rounded-lg border border-purple-100">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4 text-center">💬</div>
              <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-center text-purple-700">
                소통이 어려워!
              </h3>
              <p className="text-sm md:text-base text-gray-600 text-center">
                여러 플랫폼을 사용하다 보니 대화가 흩어지고, 프로젝트 진행 상황을 파악하기 어려워요.
              </p>
            </div>

            <div className="bg-blue-50 p-3 md:p-6 rounded-lg border border-blue-100">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4 text-center">👥</div>
              <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-center text-blue-700">
                관리가 복잡해!
              </h3>
              <p className="text-sm md:text-base text-gray-600 text-center">
                팀원 모집부터 역할 분담, 여러 공모전 관리까지 체계적으로 관리할 도구가 없어요.
              </p>
            </div>

            <div className="bg-green-50 p-3 md:p-6 rounded-lg border border-green-100">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4 text-center">🎯</div>
              <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3 text-center text-green-700">
                목표가 달라!
              </h3>
              <p className="text-sm md:text-base text-gray-600 text-center">
                각자 다른 목표와 관심사를 가진 팀원들과 협업하기 어려운 경우가 많아요.
              </p>
            </div>
          </div>
        </ScrollAnimation>

        {/* 솔루션 제시 */}
        <ScrollAnimation delay={400}>
          <div className="text-center p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
              공모자들이 모든 문제를 해결합니다! 🎉
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-4 md:mb-6">
              팀원 찾기부터 통합 관리까지, 공모전 참여에 필요한 모든 것을 한 곳에서 해결하세요.{' '}
              <br />더 이상 혼자 고민하지 마세요!
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ContentsSection;
