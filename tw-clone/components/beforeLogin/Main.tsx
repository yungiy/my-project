import Image from "next/image";
import zLogo from '@/assets/images/zlogo.png';
import Link from "next/link";
import Button from '@/components/common/button';

export default function Main() {
  return (
  <main className="flex h-screen">
    <div className="flex-1 flex justify-center items-center">
      <Image src={zLogo} alt="logo" width={300} height={300} />
    </div>
    <div className="flex-1 flex flex-col justify-center px-8">
      <h1 className="text-5xl font-bold mb-8">지금 일어나고 있는 일</h1>
      <h2 className="text-2xl font-medium mb-6">지금 가입하세요.</h2>
      <Button className="bg-stone-800 hover:bg-stone-700 py-2 rounded-full border w-full max-w-[300px]">
        <Link href="/i/flow/signup">계정 만들기</Link>
      </Button>
        <div className="flex items-center my-4 w-[500px]">
          <hr className="flex-grow border-gray-700" />
            <span className="px-4 text-gray-500">또는</span>
          <hr className="flex-grow border-gray-700" />
        </div>
      <p className="text-gray-500 text-sm mt-4">
        가입하시면 쿠키 사용을 포함해 <Link href="/terms" className="underline">이용약관</Link>과 <Link href="/privacy" className="underline">개인정보 처리방침</Link>에 동의하게 됩니다.
      </p>
      <div className="mt-8">
        <h3 className="text-base font-medium mb-2">이미 트위터에 가입하셨나요?</h3>
        <Button className="bordertext-black  py-2 rounded-full w-full max-w-[300px] bg-stone-800 hover:bg-stone-700">
          <Link href="/login">로그인</Link>
        </Button>
      </div>
    </div>
  </main>
  )
}

