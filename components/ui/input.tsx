import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { theme_styles } from "@/app/style-constants"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}


const fileStyles = `
  file:border-0
  file:bg-transparent
  file:text-sm
  file:font-medium
`

const inputVariants = cva(`
  flex
  w-full
  px-3 py-2
  rounded-md

  border
  border-slate-200
  dark:border-slate-800

  bg-slate-100 dark:bg-slate-800
  ${theme_styles.default_text_color}
  transition-colors
  ${fileStyles}

  focus:placeholder:text-opacity-80
  dark:focus:placeholder:text-opacity-20

  placeholder:text-slate-500
  focus:placeholder:text-slate-300

  dark:placeholder:text-slate-400
  dark:focus:placeholder:text-slate-300

  focus-visible:outline-none
  focus-visible:ring-1
  focus-visible:ring-offset-transparent
  focus-visible:ring-blue-800
  dark:focus-visible:ring-sky-700
  disabled:cursor-not-allowed
  disabled:opacity-50
`,
  {
    variants: {
      variant: {
        default:
          "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
