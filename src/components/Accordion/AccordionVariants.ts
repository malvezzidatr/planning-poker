import { tv } from "tailwind-variants";

export const accordion = tv({
  base: "w-full bg-blue-100 rounded-lg overflow-hidden",
  variants: {
    noBackground: {
      true: "bg-transparent",
    },
    questionSize: {
      SM: "text-sm",
      MD: "text-md",
      LG: "text-xl"
    }
  }
})

export const accordionQuestionSize = tv({
  base: "font-semibold text-black",
  variants: {
    size: {
      SM: "text-sm",
      MD: "text-md",
      LG: "text-xl"
    }
  }
})