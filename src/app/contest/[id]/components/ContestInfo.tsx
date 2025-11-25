import { Contest } from '@/types/contest-mock';

interface ContestInfoProps {
  contest: Contest;
}

export default function ContestInfo({ contest }: ContestInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* 공모전 소개 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
          공모전 소개
        </h2>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {contest.description}
        </div>
      </section>

      {/* 참가 요건 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
          참가 요건
        </h2>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {contest.requirements}
        </div>
      </section>

      {/* 추가 정보 */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> 팀을 만들거나 기존 팀에 참여하여 함께 공모전을 준비해보세요!
        </p>
      </div>
    </div>
  );
}
