import { tv } from "tailwind-variants";

export const button = tv({
  base: "flex items-center py-2.5 px-8 rounded-lg cursor-pointer transition-all border-[1px] h-11 border-black transition-all text-nowrap",
  variants: {
    variant: {
      primary: "bg-black hover:opacity-85 text-white hover:shadow-md shadow-black",
      secondary: "bg-white text-black shadow-sm hover:bg-black hover:text-white",
    },
    full: {
      true: "w-full",
    },
    textCenter: {
      true: "justify-center items-center",
    },
    backgroundColor: {
      green: "bg-green-600 hover:bg-green-700 text-white",
      blue: "bg-blue-600 hover:bg-blue-700 text-white",
      red: "bg-red-600 hover:bg-red-700 text-white",
      none: "",
    },
     disabled: {
      true: "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
