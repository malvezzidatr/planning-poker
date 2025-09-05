"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const JoinSessionCardGroup = dynamic(
  () => import("@/components/JoinSessionCardGroupWrapper/components/JoinSessionCardGroup/JoinSessionCardGroup"),
  { ssr: false }
);

export default function JoinSessionCardGroupWrapper() {

  return <JoinSessionCardGroup />;
}