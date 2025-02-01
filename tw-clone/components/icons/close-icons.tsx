import Image from 'next/image';
import closeLogo from '@/assets/icons/close-icons.svg'

export default function CloseIcon() {
  return <Image src={closeLogo} alt="close" width={24} height={24} />;
}