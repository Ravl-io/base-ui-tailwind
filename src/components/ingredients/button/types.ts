import type { VariantProps } from "class-variance-authority";
import type { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { buttonVariants } from "./variants";

export interface ButtonClassNames {
  root?: string
  content?: string
  spinner?: string
  srOnly?: string
}

export interface ButtonLabel {
  loading?: string
}

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  label?: ButtonLabel
  classNames?: ButtonClassNames
}