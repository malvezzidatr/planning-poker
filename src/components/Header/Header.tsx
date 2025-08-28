"use client"

import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";
import { auth, provider } from "@/lib/firebase";
import { signOut, signInWithPopup, User } from "firebase/auth";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(user)
  }, [user])

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoToTerms = () => {
    router.push('/terms-of-use');
  };

  const handleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky left-0 top-0 w-full py-5 px-24 bg-[#f9FAFB] shadow-md flex z-50 items-center justify-between">
      <p onClick={handleGoHome} className="text-[#004593] font-bold text-xl cursor-pointer">
        Planning Poker
      </p>
      <div className="text-black flex gap-8 items-center">
        <p className="cursor-pointer hover:border-b-[1px] transition" onClick={handleGoHome}>
          Home
        </p>
        <p className="cursor-pointer hover:border-b-[1px] transition" onClick={handleGoToTerms}>
          Terms of Use
        </p>

        {user ? (
          <div className="flex items-center gap-4">
            {user.photoURL && (
              <img src={user.photoURL} alt="profile" className="w-8 h-8 rounded-full" />
            )}
            <span>{user.displayName}</span>
            <Button text="Sign Out" onClick={handleSignOut} />
          </div>
        ) : (
          <Button iconName="google" text="Sign In" onClick={handleSignIn} />
        )}
      </div>
    </header>
  );
}
