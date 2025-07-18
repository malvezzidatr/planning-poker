"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <header className="fixed left-0 top-0 w-full py-4 px-12 bg-[#172D56] shadow-md flex items-center z-50">
      <div onClick={handleClick} className="flex items-center gap-2 cursor-pointer">
        <Image className="cursor-pointer" width={50} height={50} src={'/favicon-80x80.png'} alt="logo" />
        <p className="text-white">Planning Poker App</p>
      </div>
    </header>
  )
}