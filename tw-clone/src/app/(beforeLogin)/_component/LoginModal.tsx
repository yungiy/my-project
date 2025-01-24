'use client';

import style from '@/app/(beforeLogin)/_component/login.module.css';
import { useState } from 'react';

export default function LoginModal() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const onSubmit = () => {};
  const onClickClose = () => {};

  const onChangeId = () => {};

  const onChangePassword = () => {};

  return (
    <div className='w-[100vh] h-full flex justify-center absolute top-0 left-0 right-0 bottom-0'>
      <div className='bg-white relative flex flex-col'>
        <div className='text-3xl font-bold'>
          <button className='w-8 h-8 cursor-pointer bg-white absolute flex items-center justify-center' onClick={onClickClose}>
            <svg
              width={24}
              viewBox='0 0 24 24'
              aria-hidden='true'
              className='r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03'
            >
              <path d='M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z'></path>
            </svg>
          </button>
          <span>로그인하세요.</span>
        </div>
        <form onSubmit={onSubmit}>
          <div className='flex flex-1 pt-0 pb-20'>
            <div className='flex flex-col h-12 relative pt-3 pb-0 border'>
              <label className='w-full inline-block absolute top-0 rounded text-xs h-12 text-gray-700' htmlFor='id'>
                아이디
              </label>
              <input
                id='id'
                className='w-full text-base mt-4 pt-3 pb-2 pl-2'
                value={id}
                onChange={onChangeId}
                type='text'
                placeholder=''
              />
            </div>
            <div className='flex flex-col h-12 relative border'>
              <label className='w-full inline-block absolute top-0 rounded text-xs h-12 text-gray-700' htmlFor='password'>
                비밀번호
              </label>
              <input
                id='password'
                className='w-full text-base mt-4 pt-3 pb-2 pl-2'
                value={password}
                onChange={onChangePassword}
                type='password'
                placeholder=''
              />
            </div>
          </div>
          <div>{message}</div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled={!id && !password}>
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
