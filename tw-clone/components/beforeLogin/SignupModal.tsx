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
    if (pathname !== "/home") {
      router.push("/home");
    } else {
      router.back();
    }
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
    <>
      <div>
        <div>
          <div>
            <button onClick={onClickClose}>
              <CloseIcon/>
            </button>
            <div>계정을 생성하세요.</div>
          </div>
          <form>
            <div>
              <div>
                <label htmlFor="id">아이디</label>
                <input id="id" type="text" placeholder=""
                       value={id}
                       onChange={onChangeId}
                />
              </div>
              <div>
                <label htmlFor="name">닉네임</label>
                <input id="name" type="text" placeholder=""
                       value={nickname}
                       onChange={onChangeNickname}
                />
              </div>
              <div>
                <label htmlFor="password">비밀번호</label>
                <input id="password" type="password" placeholder=""
                       value={password}
                       onChange={onChangePassword}
                />
              </div>
              <div>
                <label htmlFor="image">프로필</label>
                <input id="image" type="file" accept="image/*"
                       onChange={onChangeImageFile}
                />
              </div>
            </div>
            <div>
              <button disabled>가입하기</button>
            </div>
          </form>
        </div>
      </div>
    </>)
}