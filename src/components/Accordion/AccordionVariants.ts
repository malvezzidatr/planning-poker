import { tv } from "tailwind-variants";

export const accordion = tv({
  base: "w-full bg-white rounded-lg overflow-hidden border shadow",
  variants: {
    noBackground: {
      true: "bg-transparent",
    },
  }
})

export const accordionQuestionSize = tv({
  base: "font-semibold text-black",
  variants: {
    size: {
      SM: "text-sm",
      MD: "md:text-lg text-sm",
      LG: "md:text-xl text-lg"
    }
  }
})

export const anwserQuestionSize = tv({
  base: "text-black pt-2 pb-4 whitespace-pre-line",
  variants: {
    size: {
      SM: "text-sm",
      MD: "md:text-md text-sm",
      LG: "md:text-lg text-md"
    }
  }
});