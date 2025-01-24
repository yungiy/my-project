import Image from "next/image";
import zLogo from "../../../../public/zlogo.png";
import Link from "next/link";

export default function Main() {
  return (
    <>
      <div className='flex flex-1 justify-center items-center'>
        <Image src={zLogo} alt="logo" />
      </div>
      <div className='flex flex-1 flex-col justify-center'>
        <h1 className='font-bold text-6xl'>지금 일어나고 있는 일</h1>
        <h2 className='font-bold text-3xl mb-8'>지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className='w-72 h-10 text-sm bg-blue-500 text-white flex items-center justify-center'>계정 만들기</Link>
        <h3 className='text-base py-2'>이미 트위터에 가입하셨나요?</h3>
        <Link href="/login" className='w-72 h-10 text-sm text-blue-500 flex items-center justify-center border'>로그인</Link>
      </div>
    </>
  )
}