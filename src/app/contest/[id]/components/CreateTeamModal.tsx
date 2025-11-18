'use client';

import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { Plus, Minus, Sparkles } from 'lucide-react';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  contestId: number;
}

export default function CreateTeamModal({ isOpen, onClose, contestId }: CreateTeamModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    memberCount: 0,
    description: '',
    question: '',
  });

  const [questions, setQuestions] = useState<string[]>([]);

  const aiQuestions = [
    'GitHub 또는 포트폴리오 링크를 공유해주세요',
    '이 프로젝트에서 어떤 역할을 맡고 싶으신가요?',
    '주로 사용하는 기술 스택은 무엇인가요?'
  ];

  const handleAddQuestion = () => {
    if (formData.question.trim()) {
      setQuestions([...questions, formData.question]);
      setFormData({ ...formData, question: '' });
    }
  };

  const handleSubmit = () => {
    console.log('팀 생성:', formData, questions);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="700px" title="팀 만들기">
      <div className="space-y-6">
        {/* 제목 */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            팀 이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="팀 이름을 입력하세요"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full h-12 px-4 bg-gray-50 border border-gray-300 rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* 모집 인원 */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            모집 인원 <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFormData({ ...formData, memberCount: Math.max(0, formData.memberCount - 1) })}
              className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Minus size={18} />
            </button>
            <div className="w-16 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center text-lg font-semibold">
              {formData.memberCount}
            </div>
            <button
              onClick={() => setFormData({ ...formData, memberCount: formData.memberCount + 1 })}
              className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Plus size={18} />
            </button>
            <span className="text-sm text-gray-600 ml-2">명</span>
          </div>
        </div>

        {/* 모집 글 */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            모집 글 <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="팀 소개, 모집 역할, 필요 스킬 등을 작성해주세요"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* 질문 추가 */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            신청자에게 질문하기
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="질문을 입력하세요"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleAddQuestion()}
              className="flex-1 h-12 px-4 bg-gray-50 border border-gray-300 rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <Button onClick={handleAddQuestion} className="h-12 px-6">
              추가
            </Button>
          </div>

          {/* 추가된 질문 목록 */}
          {questions.length > 0 && (
            <div className="mt-3 space-y-2">
              {questions.map((q, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm text-gray-700">Q{idx + 1}. {q}</span>
                  <button
                    onClick={() => setQuestions(questions.filter((_, i) => i !== idx))}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI 추천 질문 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-blue-600" />
            <label className="text-sm font-semibold text-gray-700">
              AI 추천 질문
            </label>
          </div>
          <div className="space-y-2">
            {aiQuestions.map((question, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-sm text-gray-700">{question}</span>
                <Button
                  onClick={() => setQuestions([...questions, question])}
                  variant="ghost"
                  className="h-8 px-4 text-xs"
                >
                  추가
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="ghost" onClick={onClose} className="px-6">
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="px-8"
            disabled={!formData.title || !formData.description || formData.memberCount === 0}
          >
            팀 만들기
          </Button>
        </div>
      </div>
    </Modal>
  );
}