import { tv } from "tailwind-variants";

export const userCardVotes = tv({
  base: "flex gap-4 flex-col items-center pb-5 rounded-lg shadow-xs",
  variants: {
    color: {
      green: "bg-green-50 border-[1px] border-green-500",
      yellow: "bg-yellow-50 border-[1px] border-yellow-500",
      default: "bg-[#F9FAFB]",
    },
    isCurrentUser: {
      true: "border-[1px] border-gray-900 bg-gray-100",
      false: "",
    },
  },
  defaultVariants: {
    color: "default",
  },
});