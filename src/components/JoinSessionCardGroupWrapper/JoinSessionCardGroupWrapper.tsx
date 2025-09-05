"use client";

import dynamic from "next/dynamic";

const JoinSessionCardGroup = dynamic(
  () => import("@/components/JoinSessionCardGroupWrapper/components/JoinSessionCardGroup/JoinSessionCardGroup"),
  { ssr: false }
);

export default function JoinSessionCardGroupWrapper() {
  return <JoinSessionCardGroup />;
}