import { tv } from "tailwind-variants";

export const summary = tv({
  base: "w-[250px] bg-white shadow-lg p-5 rounded-lg",
  variants: {
    fixed: {
      true: "sticky top-20",
    },
  }
})

export const summaryText = tv({
  base: "flex items-center gap-2 font-medium hover:text-blue-500",
  variants: {
    active: {
      true: "text-blue-500 font-bold",
    }
  }
})