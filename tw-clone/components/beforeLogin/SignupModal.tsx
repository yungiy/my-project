"use client";

import {usePathname, useRouter} from "next/navigation";
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import CloseIcon from '@/components/icons/close-icons';

export default function SignupModal() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File>();

  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기

  const onClickClose = () => {

  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value)
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  };
  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value)
  };
  const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files && setImageFile(e.target.files[0])
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    fetch('http://localhost:9090/api/users', {
      method: 'post',
      body: JSON.stringify({
        id,
        nickname,
        image,
        password
      }),
      credentials: 'include'
    }).then((response: Response) => {
      console.log(response.status);
      if (response.status === 200) {
        router.replace('/home');
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  return (
    // <>
    //   <div>
    //     <div>
    //       <div>
    //         <button onClick={onClickClose}>
    //           <CloseIcon/>
    //         </button>
    //         <div>계정을 생성하세요.</div>
    //       </div>
    //       <form>
    //         <div>
    //           <div>
    //             <label htmlFor="id">아이디</label>
    //             <input id="id" type="text" placeholder=""
    //                    value={id}
    //                    onChange={onChangeId}
    //             />
    //           </div>
    //           <div>
    //             <label htmlFor="name">닉네임</label>
    //             <input id="name" type="text" placeholder=""
    //                    value={nickname}
    //                    onChange={onChangeNickname}
    //             />
    //           </div>
    //           <div>
    //             <label htmlFor="password">비밀번호</label>
    //             <input id="password" type="password" placeholder=""
    //                    value={password}
    //                    onChange={onChangePassword}
    //             />
    //           </div>
    //           <div>
    //             <label htmlFor="image">프로필</label>
    //             <input id="image" type="file" accept="image/*"
    //                    onChange={onChangeImageFile}
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <button disabled>가입하기</button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </>
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Container */}
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">계정을 생성하세요</h2>
          <button onClick={onClickClose} className="text-stone-500 hover:text-stone-700">
            <CloseIcon />
          </button>
        </div>

        {/* Signup Form */}
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="space-y-4">
            {/* ID Field */}
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                아이디
              </label>
              <input
                id="id"
                type="text"
                placeholder=""
                value={id}
                onChange={onChangeId}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Nickname Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                닉네임
              </label>
              <input
                id="name"
                type="text"
                placeholder=""
                value={nickname}
                onChange={onChangeNickname}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                type="password"
                placeholder=""
                value={password}
                onChange={onChangePassword}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Profile Image Field */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                프로필
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={onChangeImageFile}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={!id || !nickname || !password}
              className={`w-full p-2 text-white font-bold rounded-md ${
                !id || !nickname || !password ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}