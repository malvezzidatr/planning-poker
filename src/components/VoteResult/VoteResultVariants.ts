import { tv } from "tailwind-variants";

export const voteResult = tv({
  base: "flex flex-col items-center justify-center border-[1px] rounded-lg w-full h-32",
  variants: {
    color: {
      green: "bg-green-50 border-green-200 text-green-700",
      blue: "bg-blue-50 border-blue-200 text-blue-700",
      purple: "bg-purple-50 border-purple-200 text-purple-700",
    },
  },
  defaultVariants: {
    color: "green",
  },
});
