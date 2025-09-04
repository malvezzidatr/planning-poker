// components/Badge.tsx
import { tv } from "tailwind-variants";
import { badge } from "./BadgeVariants";

interface BadgeProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  animate?: boolean;
}

export default function Badge({ text, bgColor = "bg-orange-100", animate = false, textColor }: BadgeProps) {
  return (
    <span className={badge({ animate }) + ` ${textColor} ${bgColor}`}>
      {text}
    </span>
  );
}
