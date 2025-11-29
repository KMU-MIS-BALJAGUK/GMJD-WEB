import Image from 'next/image';
import MyPageClient from './component/MyPageClient';
import { UserProfileDataDto } from '@/features/mypage/types/my-profile-response';

// 유저 데이터 서버에서 가져오는 것처럼 구성
async function getUserData(): Promise<UserProfileDataDto> {
  return {
    profileImageUrl: '/my-page-image.png',
    name: '김주미',
    introduction: '안녕하세요. 잘 부탁드립니다.',
    level: 3,
    email: 'gongmoja@example.com',
    // API 응답 DTO에 맞게 필드 추가
    universityName: '국민대학교',
    major: '경영정보학부',
    education: 'UNIVERSITY',
    recognizedDegree: 'BACHELOR',
    skillList: ['Figma', 'Python'],
    categoryList: ['광고마케팅'],
  };
}

export default async function MyPage() {
  const user = await getUserData();

  return <MyPageClient initialUser={user} />;
}
