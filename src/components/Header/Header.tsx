"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoToTerms = () => {
    router.push('/terms-of-use');
  }

  return (
    <header className="sticky left-0 top-0 w-full py-5 px-24 bg-[#f9FAFB] shadow-md flex z-50 items-center justify-between">
      <p onClick={handleGoHome} className="text-[#004593] font-bold text-xl cursor-pointer">Planning Poker</p>
      <div className="text-black flex gap-8">
        <p className="cursor-pointer hover:border-b-[1px] transition" onClick={handleGoHome}>Home</p>
        <p className="cursor-pointer hover:border-b-[1px] transition" onClick={handleGoToTerms}>Terms of Use</p>
      </div>
    </header>
  )
}