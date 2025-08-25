import { tv } from "tailwind-variants";

export const alert = tv({
  base: "fixed bottom-4 right-6 text-white font-bold rounded-lg px-6 py-3 flex items-center justify-between gap-6 shadow-lg",
  variants: {
    type: {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
    }
  }
})