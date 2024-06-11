'use client';
import React, { useState } from 'react';
import SignupModal from './SignupModal';
import Link from 'next/link';

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <h2 className='text-2xl mb-4 text-center'>로그인</h2>
        <form>
          <div className='mb-4'>
            <label className='block text-gray-700'>아이디</label>
            <input
              type='text'
              name='id'
              className='w-full px-3 py-2 border rounded-lg outline-none'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>비밀번호</label>
            <input
              type='password'
              name='password'
              className='w-full px-3 py-2 border rounded-lg outline-none'
            />
          </div>
          <button
            type='submit'
            className='w-full px-3 py-2 bg-yellow-400 text-yellow-800 rounded-lg'
          >
            로그인
          </button>
        </form>
        <button
          onClick={() => setIsModalOpen(true)}
          className='mt-4 w-full text-yellow-800 underline'
        >
          회원가입
        </button>
        <Link href="/">
          <div className="mt-4 w-full text-center block border-2 rounded-md p-2 border-black">
            홈으로 돌아가기
          </div>
        </Link>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
