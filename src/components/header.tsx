'use client';

import { cn } from '@/lib/utils';
import { Menu, X, Search, UserRound } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import Input from './common/Input';

const Header = () => {
  const isLogin = true; // TODO: 로그인 상태 관리
  const [page, setPage] = useState<'home' | 'contest' | 'team' | 'chat' | 'profile'>('home');
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full h-[68px] border-b border-border-01">
      <div className="flex justify-between w-[80%] mx-auto items-center h-full">
        <div className="flex gap-3 items-center flex-1">
          <Image
            src={'/logo.png'}
            alt="logo"
            width={70}
            height={40}
            className="cursor-pointer"
            onClick={() => {
              setPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {page === 'home' && (
            <div className="hidden md:block w-full max-w-[500px] mr-7">
              <Input
                placeholder="공모전 정보를 검색해 보세요"
                variant="rounded"
                icon={<Search size={18} className="text-text-02" />}
              />
            </div>
          )}
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <div className="flex gap-5 text-text-01 font-semibold text-[15px]">
            <p
              className={`cursor-pointer ${
                page === 'contest' && 'text-blue'
              } hover:text-blue transition-colors`}
              onClick={() => setPage('contest')}
            >
              공모전
            </p>
            <p
              className={`cursor-pointer ${
                page === 'team' && 'text-blue'
              } hover:text-blue transition-colors`}
              onClick={() => setPage('team')}
            >
              팀 관리
            </p>
            <p
              className={`cursor-pointer ${
                page === 'chat' && 'text-blue'
              } hover:text-blue transition-colors`}
              onClick={() => setPage('chat')}
            >
              채팅
            </p>
          </div>

          <div className="text-border-02">|</div>

          {isLogin ? (
            <div className="flex gap-2 text-text-03 font-semibold text-[15px]">
              <p className="cursor-pointer hover:text-blue transition-colors">회원가입</p>
              <p>/</p>
              <p className="cursor-pointer hover:text-blue transition-colors">로그인</p>
            </div>
          ) : (
            <div
              className={cn(
                'flex gap-1 items-end text-text-03 font-semibold text-[15px] cursor-pointer hover:text-blue transition-colors',
                page === 'profile' && 'text-blue'
              )}
              onClick={() => setPage('profile')}
            >
              <UserRound size={20} className="mb-0.5" />
              <div className="flex gap-0.5 items-center">
                <p>김주미</p>
                <p>님</p>
              </div>
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
            <p
              onClick={() => setPage('contest')}
              className={`cursor-pointer ${
                page === 'contest' && 'text-blue'
              } hover:text-blue transition-colors`}
            >
              공모전
            </p>
            <p
              onClick={() => setPage('team')}
              className={`cursor-pointer ${
                page === 'team' && 'text-blue'
              } hover:text-blue transition-colors`}
            >
              팀 관리
            </p>
            <p
              onClick={() => setPage('chat')}
              className={`cursor-pointer ${
                page === 'chat' && 'text-blue'
              } hover:text-blue transition-colors`}
            >
              채팅
            </p>
            <p
              onClick={() => setPage('profile')}
              className={`cursor-pointer ${
                page === 'profile' && 'text-blue'
              } hover:text-blue transition-colors`}
            >
              프로필
            </p>
          </nav>

          <div
            className={`mt-auto flex gap-2 text-text-03 cursor-pointer font-semibold`}
            onClick={() => setPage('profile')}
          >
            <UserRound size={20} />
            <p>김주미 님</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
