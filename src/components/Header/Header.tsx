"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <header className="fixed left-0 top-0 w-full py-5 px-24 bg-[#f9FAFB] shadow-md flex z-50 items-center justify-between">
      <p onClick={handleClick} className="text-[#004593] font-bold text-xl cursor-pointer">Planning Poker</p>
      <div className="text-black flex gap-8">
        <p className="cursor-pointer" onClick={handleClick}>Home</p>
        <p>Terms of Use</p>
      </div>
    </header>
  )
}