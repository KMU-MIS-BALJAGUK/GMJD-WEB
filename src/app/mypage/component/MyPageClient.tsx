'use client';

import Image from 'next/image';
import { Tag } from '@/components/common/Tag';
import { PencilLine } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  Level: string;
  avatarUrl: string;
  intro: string;
  born: string;
  school: string;
  major: string;
  skills: string[];
  interest: string;
}

interface MyPageClientProps {
  user: UserData;
}

interface ProfileFieldProps {
  label: string;
  children: React.ReactNode;
}

function ProfileField({ label, children }: ProfileFieldProps) {
  return (
    <div className="flex justify-between items-center py-2">
      <p className="text-sm font-medium text-text-03">{label}</p>
      <div className="text-base text-text-01">{children}</div>
    </div>
  );
}

// 세로형 필드
interface ProfileFieldVerticalProps {
  label: string;
  children: React.ReactNode;
  onEdit?: () => void;
}

function ProfileFieldVertical({ label, children, onEdit }: ProfileFieldVerticalProps) {
  return (
    <div>
      <div className="flex justify-between items-center ">
        <p className="text-sm font-medium text-text-03 mb-3">{label}</p>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-sm font-medium text-text-03 hover:text-blue mb-3 cursor-pointer"
          >
            <PencilLine size={16} />
            수정
          </button>
        )}
      </div>
      <div className="text-base text-text-01">{children}</div>
    </div>
  );
}

export default function MyPageClient({ user }: MyPageClientProps) {
  const handleEditEducation = () => console.log('학력 수정');
  const handleEditSkills = () => console.log('스킬 수정');
  const handleEditInterest = () => console.log('관심분야 수정');

  return (
    <div className="h-[calc(100vh-68px-80px)] bg-white flex justify-center items-center py-16">
      <section className="w-full max-w-xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4 text-text-01">마이페이지</h2>

        <div className="bg-white border border-border-2 rounded-[8px] p-6 shadow-sm space-y-6">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={user.avatarUrl}
              alt="프로필 이미지"
              width={100}
              height={100}
              className="rounded-full border border-border-2"
            />
            <div className="text-center">
              <h1 className="text-xl font-semibold text-text-01">{user.name}</h1>
              <p className="text-sm text-text-03">{user.intro}</p>
            </div>
          </div>

          <div className="space-y-4">
            <ProfileField label="추천레벨">
              <Tag variant="blue" shape="rounded">
                {user.Level}
              </Tag>
            </ProfileField>

            <ProfileField label="생년월일">
              <p className="text-[15px]">{user.born}</p>
            </ProfileField>

            <ProfileField label="이메일">
              <p className="text-[15px]">{user.email}</p>
            </ProfileField>

            <hr className="border-border-1 mb-6" />

            <ProfileFieldVertical label="학력" onEdit={handleEditEducation}>
              <div className="flex items-center space-x-2 text-[15px]">
                <p>{user.school}</p>
                <p className="text-border-01">|</p>
                <p>{user.major}</p>
              </div>
            </ProfileFieldVertical>

            <ProfileFieldVertical label="관심분야" onEdit={handleEditInterest}>
              <p className="text-[15px]">{user.interest}</p>
            </ProfileFieldVertical>

            <ProfileFieldVertical label="스킬셋" onEdit={handleEditSkills}>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Tag key={skill} variant="default" shape="rounded" className="text-text-02">
                    {skill}
                  </Tag>
                ))}
              </div>
            </ProfileFieldVertical>
          </div>
        </div>
      </section>
    </div>
  );
}
