import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '공모자들 - 공모전 팀매칭 플랫폼',
  description: '혼자서는 도전하기 어려운 공모전, 이제 완벽한 팀원을 찾아 함께 도전하세요!',
  keywords:
    '공모전, 팀매칭, 개발자, 팀빌딩, 프로그래밍, 해커톤, 프로젝트, 협업, 스킬매칭, 공모자들',
  authors: [{ name: '발자국' }],
  icons: {
    icon: [
      { url: '/cup.png', type: 'image/png' },
      { url: '/cup.png', sizes: '32x32', type: 'image/png' },
      { url: '/cup.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/cup.png',
    shortcut: '/cup.png',
  },
  openGraph: {
    title: '공모자들 - 공모전 팀매칭 플랫폼',
    description: '혼자서는 도전하기 어려운 공모전, 이제 완벽한 팀원을 찾아 함께 도전하세요!',
    url: 'https://www.gmjd.site',
    siteName: '공모자들',
    images: [
      {
        url: 'https://www.gmjd.site/metadata.png?v=20251215',
        width: 1920,
        height: 1080,
        alt: '공모자들 - 공모전 팀매칭 플랫폼으로 완벽한 팀원을 찾아 함께 도전하세요',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '공모자들 - 공모전 팀매칭 플랫폼',
    description: '혼자서는 도전하기 어려운 공모전, 이제 완벽한 팀원을 찾아 함께 도전하세요!',
    images: ['https://www.gmjd.site/metadata.png?v=20251215'],
  },
  metadataBase: new URL('https://www.gmjd.site'),
  alternates: {
    canonical: 'https://www.gmjd.site',
  },
  robots: {
    index: true,
    follow: true,
  },
};
