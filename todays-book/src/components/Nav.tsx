'use client';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import classNames from 'classnames';
import Link from 'next/link';

export default function Nav() {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div className='bg-gray-100'>
      <div className='max-w-8xl mx-auto px-3'>
        <div className='flex justify-between'>
          <div className='flex space-x-4'>
            <div>
              <Link
                href='/'
                className='flex items-center py-5 px-2 text-gray-700'
              >
                <span className='font-bold'>홈</span>
              </Link>
            </div>
            <div className='hidden md:flex items-center space-x-1'>
              <Link
                href='/search'
                className='py-5 px-3 text-gray-700 hover:text-gray-900'
              >
                책 검색
              </Link>
              <Link
                href='/recommend'
                className='py-5 px-3 text-gray-700 hover:text-gray-900'
              >
                둘러보기
              </Link>
            </div>
          </div>
          <div className='hidden md:flex items-center space-x-1'>
            <Link
              href='/login'
              className='py-2 px-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-800 font-semibold rounded transition duration-300'
            >
              로그인
            </Link>
          </div>

          {/* 모바일 화면 */}
          <div className='md:hidden flex items-center'>
            <button onClick={() => setMenuToggle(!menuToggle)}>
              {menuToggle ? <MenuIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      {/* 모바일 아이템 */}
      <div className={classNames('md:hidden', { hidden: !menuToggle })}>
        <Link
          href='/search'
          className='block py-2 px-4 text-sm hover:bg-gray-200'
        >
          책 검색
        </Link>
        <Link
          href='/recommend'
          className='block py-2 px-4 text-sm hover:bg-gray-200'
        >
          둘러보기
        </Link>
        <Link
          href='/login'
          className='block py-2 px-4 text-sm hover:bg-gray-200'
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
