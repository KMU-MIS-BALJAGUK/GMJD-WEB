import Image from 'next/image';
import MyPageClient from './component/MyPageClient';

// 유저 데이터 서버에서 가져오는 것처럼 구성
async function getUserData() {
  return {
    name: '김주미',
    email: 'gongmoja@example.com',
    Level: 'LV.3',
    avatarUrl: '/my-page-image.png',
    intro: '안녕하세요. 잘 부탁드립니다.',
    born: '2003.04.05',
    school: '국민대학교',
    major: '경영정보학부',
    skills: ['Figma', 'Python'],
    interest: '광고마케팅',
  };
}

export default async function MyPage() {
  const user = await getUserData();

  return <MyPageClient user={user} />;
}
