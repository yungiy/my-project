"use client";

import {useState} from "react";
import CloseIcon from '@/components/icons/close-icons';
import {usePathname} from 'next/navigation';
import {router} from 'next/client';

export default function LoginModal() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const onSubmit = () => {
  };

  const pathname = usePathname(); // 현재 경로 가져오기

  const onClickClose = () => {
    if (pathname !== "/home") {
      router.push("/home");
    } else {
      router.back();
    }
  };

  const onChangeId = () => {
  };

  const onChangePassword = () => {
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Container */}
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">로그인하세요</h2>
          <button onClick={onClickClose} className="text-gray-500 hover:text-gray-700">
            <CloseIcon/>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            {/* ID Field */}
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                아이디
              </label>
              <input
                id="id"
                value={id}
                onChange={onChangeId}
                type="text"
                placeholder=""
                className="w-full mt-1 p-2 border rounded-md focus:outline-none"
                autoComplete="off"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                id="password"
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder=""
                className="w-full mt-1 p-2 border rounded-md focus:outline-none"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Error Message */}
          {message && <div className="text-red-500 text-sm mt-4">{message}</div>}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              disabled={!id || !password}
              className={`w-full p-2 text-white font-bold rounded-md ${
                !id || !password ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}