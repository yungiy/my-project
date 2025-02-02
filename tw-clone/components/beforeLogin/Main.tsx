import Image from "next/image";
import zLogo from '@/assets/images/zlogo.png';
import Link from "next/link";
import Button from '@/components/common/button';

export default function Main() {
  return (
    <main className='flex'>
      <div className='flex-1 p-2 justify-center items-center flex'>
        <Image src={zLogo} alt="logo" width={300} height={300} />
      </div>
      <div className=' flex-1 p-2'>
        <h1 className='text-3xl font-bold py-1'>지금 일어나고 있는 일</h1>
        <h2 className='text-2xl font-medium py-1'>지금 가입하세요.</h2>
        <Button className='border bg-green-800 py-1'>
          <Link href="/i/flow/signup">계정 만들기</Link>
        </Button>
        <h3 className='font-medium text-base py-1'>이미 트위터에 가입하셨나요?</h3>
        <Button className='border bg-green-800 py-1'>
          <Link href="/login">로그인</Link>
        </Button>
      </div>
    </main>
  )
}
