'use client';

import { cn } from '@/lib/utils';
import { Menu, X, Search, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Input from './common/Input';
import { useUserProfile } from '@/hooks/mypage/useUserProfile';
import { useAuthStore } from '@/store/authStore';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const { data: user } = useUserProfile();
  const isLoggedIn = !!user;

  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (pathname !== '/contest') {
      setKeyword('');
    }
  }, [pathname]);

  const onSearch = () => {
    if (!keyword.trim()) return;
    router.push(`/contest?keyword=${encodeURIComponent(keyword)}`);
  };

  const onLogout = () => {
    logout(); // Zustand 토큰 삭제
    queryClient.clear(); // React Query 전체 캐시 삭제
    router.push('/');
  };

  return (
    <header className="w-full h-[68px] border-b border-border-01">
      <div className="flex justify-between w-[90%] lg:w-[80%] mx-auto items-center h-full">
        <div className="flex gap-3 items-center flex-1">
          <Link href="/">
            <Image src={'/logo.png'} alt="logo" width={70} height={40} className="cursor-pointer" />
          </Link>

          {pathname !== '/' && (
            <div className="hidden md:block w-full max-w-[500px] mr-7">
              <Input
                placeholder="공모전 정보를 검색해 보세요"
                variant="rounded"
                icon={
                  <Search size={18} className="text-text-02 cursor-pointer" onClick={onSearch} />
                }
                value={keyword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') onSearch();
                }}
              />
            </div>
          )}
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <div className="flex gap-5 text-text-01 font-semibold text-[15px]">
            <Link
              href="/contest"
              className={`cursor-pointer ${
                pathname === '/contest' && 'text-blue'
              } hover:text-blue transition-colors`}
            >
              공모전
            </Link>
            <Link
              href="/team"
              className={`cursor-pointer ${
                pathname === '/team' && 'text-blue'
              } hover:text-blue transition-colors`}
            >
              팀 관리
            </Link>
            <Link
              href="/chat"
              className={`cursor-pointer ${
                pathname === '/chat' && 'text-blue'
              } hover:text-blue transition-colors`}
            >
              채팅
            </Link>
          </div>

          <div className="text-border-02">|</div>

          {isLoggedIn ? (
            <div className="flex gap-1 items-center">
              <Link
                href="/mypage"
                className={cn(
                  'flex gap-1 items-end text-text-03 font-semibold text-[15px] cursor-pointer hover:text-blue transition-colors',
                  pathname === '/mypage' && 'text-blue'
                )}
              >
                <UserRound size={20} className="mb-0.5" />
                <div className="flex gap-0.5 items-center">
                  <p>{user?.name}</p>
                  <p>님</p>
                </div>
              </Link>

              <div className="text-border-02">|</div>

              <button
                className="cursor-pointer text-text-03 hover:text-blue transition-colors font-semibold text-[15px]"
                onClick={onLogout}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex gap-2 text-text-03 font-semibold text-[15px]">
              <Link href="/signup" className="cursor-pointer hover:text-blue transition-colors">
                회원가입
              </Link>
              <p>/</p>
              <Link href="/signup" className="cursor-pointer hover:text-blue transition-colors">
                로그인
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden cursor-pointer" onClick={() => setOpen(true)}>
          <Menu size={23} />
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-0 bg-black/40 z-50 md:hidden transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setOpen(false)}
      >
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-64 bg-white shadow-lg p-5 flex flex-col gap-6',
            'transform transition-transform duration-300',
            open ? 'translate-x-0' : 'translate-x-full'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <Image src={'/logo.png'} alt="logo" width={70} height={40} />
            <X size={20} className="cursor-pointer" onClick={() => setOpen(false)} />
          </div>

          <nav className="flex flex-col gap-4 text-[17px] font-semibold">
            <Link
              href="/contest"
              onClick={() => setOpen(false)}
              className={`cursor-pointer ${
                pathname === '/contest' && 'text-blue'
              } hover:text-blue transition-colors`}
            >
              공모전
            </Link>
            <Link
              href="/team"
              onClick={() => setOpen(false)}
              className={`cursor-pointer ${
                pathname === '/team' && 'text-blue'
              } hover:text-blue transition-colors`}
            >
              팀 관리
            </Link>
            <Link
              href="/chat"
              onClick={() => setOpen(false)}
              className={`cursor-pointer ${
                pathname === '/chat' && 'text-blue'
              } hover:text-blue transition-colors`}
            >
              채팅
            </Link>
          </nav>

          <div className="mt-auto flex justify-between items-center text-text-03">
            <Link
              className={`flex gap-2 cursor-pointer font-semibold ${
                pathname === '/mypage' && 'text-blue'
              } hover:text-blue transition-colors`}
              href="/mypage"
              onClick={() => setOpen(false)}
            >
              <UserRound size={20} />
              <p>{user?.name} 님</p>
            </Link>

            <button className="hover:text-blue transition-colors cursor-pointer" onClick={onLogout}>
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
