"use client";

import {useState} from "react";
import CloseIcon from '@/components/icons/close-icons';

export default function LoginModal() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const onSubmit = () => {
  };
  const onClickClose = () => {
  };

  const onChangeId = () => {
  };

  const onChangePassword = () => {
  };

  return (
    <div>
      <div>
        <div>
          <button onClick={onClickClose}>
            <CloseIcon/>
          </button>
          <div>로그인하세요.</div>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <div>
              <label htmlFor="id">아이디</label>
              <input id="id" value={id} onChange={onChangeId} type="text" placeholder=""/>
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <input id="password" value={password} onChange={onChangePassword} type="password" placeholder=""/>
            </div>
          </div>
          <div>{message}</div>
          <div>
            <button disabled={!id && !password}>로그인하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}