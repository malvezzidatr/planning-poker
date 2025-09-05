"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const JoinSessionCardGroup = dynamic(
  () => import("@/components/JoinSessionCardGroupWrapper/components/JoinSessionCardGroup/JoinSessionCardGroup"),
  { ssr: false }
);

export default function JoinSessionCardGroupWrapper() {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)
    console.log(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
    console.log(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
  }, []);


  return <JoinSessionCardGroup />;
}