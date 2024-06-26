import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { theme_styles } from "@/app/style-constants"
import { useId } from "react"

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

  ${theme_styles.default_input_border}

  ${theme_styles.default_input_bg}
  ${theme_styles.default_text_color}
  transition-all
  duration-500
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
      highlight: {
        true: `
          ring-purple-800
          ring-2
        `,
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, highlight, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, highlight, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
  const accessibilityId = useId()
  return (
    <div className={cn('grid w-full items-center gap-1', className)}>
      <label className={cn(`
        ${theme_styles.default_text_color}
        font-medium
        tracking-wide
        text-sm
        pl-1
        ${props.highlight && "text-purple-800"}
      `)} htmlFor={accessibilityId}>
        {props["aria-label"]} <span className="inline-block ml-3">{props.highlight && "👇🤖"}</span>
      </label>
      <Input ref={ref} id={accessibilityId} {...props} />
    </div>
  )
})
InputWithLabel.displayName = "InputWithLabel";

export { InputWithLabel }