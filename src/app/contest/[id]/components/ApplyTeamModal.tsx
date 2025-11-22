'use client';

import { useState } from 'react';
import Modal from '@/components/common/Modal';
import { X, Plus } from 'lucide-react';
import { Team } from '@/types/contest';

interface ApplyTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team | null;
}

export default function ApplyTeamModal({ isOpen, onClose, team }: ApplyTeamModalProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});

  if (!team) return null;

  const mockQuestions = [
    'GitHub 또는 포트폴리오 링크를 공유해주세요',
    '이 프로젝트에서 어떤 역할을 맡고 싶으신가요?',
    '주로 사용하는 기술 스택은 무엇인가요?'
  ];

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSubmit = () => {
    console.log('신청:', { teamId: team.id, skills, answers });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="600px" title={team.teamName}>
      <div className="space-y-6">
        {/* 팀 정보 */}
        <div className="p-4 bg-[#F5F5F5] rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">팀장</span>
            <span className="text-sm text-gray-900">{team.leaderName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">모집 인원</span>
            <span className="text-sm text-gray-900">{team.currentMembers}/{team.maxMembers}명</span>
          </div>
        </div>

        {/* 모집 글 */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">팀 소개</h3>
          <p className="text-sm text-gray-600 leading-relaxed p-4 bg-[#F5F5F5] rounded-lg">
            {team.description}
          </p>
        </div>

        {/* 스킬셋 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">
            보유 스킬 <span className="text-red-500">*</span>
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="활용 가능한 기술을 입력하세요"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              className="flex-1 h-12 px-4 bg-[#F5F5F5] border border-gray-300 rounded-lg text-[15px] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#1487F9] focus:border-transparent transition-all"
            />
            <button
              onClick={handleAddSkill}
              className="h-12 w-12 bg-[#1487F9] text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* 추가된 스킬 */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg group hover:bg-blue-100 transition-colors">
                  <span className="text-sm font-medium text-blue-700">{skill}</span>
                  <button 
                    onClick={() => handleRemoveSkill(skill)} 
                    className="text-blue-600 hover:text-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 질문 답변 */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">팀장의 질문</h3>
          {mockQuestions.map((question, index) => (
            <div key={index} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Q{index + 1}. {question}
              </label>
              <textarea
                placeholder="답변을 작성해주세요"
                value={answers[index] || ''}
                onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                className="w-full h-24 px-4 py-3 bg-[#F5F5F5] border border-gray-300 rounded-lg text-sm placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#1487F9] focus:border-transparent transition-all resize-none"
              />
            </div>
          ))}
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={skills.length === 0}
            className="px-8 py-2 bg-[#1487F9] text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            신청하기
          </button>
        </div>
      </div>
    </Modal>
  );
}