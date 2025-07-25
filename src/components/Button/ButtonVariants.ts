import { tv } from "tailwind-variants";

export const button = tv({
  base: "flex items-center py-3 px-6 rounded-lg cursor-pointer transition-colors",
  variants: {
    variant: {
      primary: "bg-[#0067DA] hover:bg-[#0056B3] text-white",
      secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    },
    full: {
      true: "w-full",
    },
    textCenter: {
      true: "justify-center items-center",
    },
    outlined: {
      true: "border-2 border-blue-500"
    },
    disabled: {
      true: "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300",
    }
  },
  defaultVariants: {
    variant: "primary",
  },
});
