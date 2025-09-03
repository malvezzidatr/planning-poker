import { tv } from "tailwind-variants";

export const button = tv({
  base: "flex items-center py-2.5 px-8 rounded-lg cursor-pointer transition-all",
  variants: {
    variant: {
      primary: "bg-blue-500 hover:opacity-85 text-white",
      secondary: "bg-white-100 hover:bg-gray-100 text-gray-800",
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
