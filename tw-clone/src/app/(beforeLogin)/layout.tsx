import { ReactNode } from 'react';

type Props = { children: ReactNode; modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <div className='flex flex-row bg-white w-[100dvw] h-[100dvh]'>
      {children}
      {modal}
    </div>
  );
}
