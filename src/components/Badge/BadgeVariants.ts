import { tv } from "tailwind-variants";

export const badge = tv({
  base: "px-3 py-1 rounded-md text-sm font-bold",
  variants: {
    animate: {
      true: "animate-pulse",
      false: "",
    },
  },
  defaultVariants: {
    animate: false,
  },
});