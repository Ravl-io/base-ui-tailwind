"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils/utils.ts";
import { getLabel } from "@/lib/utils/getLabel.ts";
import { buttonVariants } from "./variants";
import type { ButtonProps } from "./types";

export type { ButtonProps, ButtonClasses, ButtonLabel } from "./types";
export { buttonVariants } from './variants';

export const Button = ({
                         className,
                         variant = "default",
                         size = "default",
                         isLoading = false,
                         label,
                         classes,
                         disabled,
                         children,
                         ...props
                       }: ButtonProps) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      {...props}
      disabled={disabled}
      aria-disabled={isLoading || disabled}
      aria-busy={isLoading}
      onClick={isLoading ? (e) => e.preventDefault() : props.onClick}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <span className={cn(isLoading && "invisible", classes?.content)}>
        {children}
      </span>

      {isLoading && (
        <span className={cn("absolute inset-0 flex items-center justify-center", classes?.spinner)}>
          <Loader2 className="animate-spin" aria-hidden="true" />
        </span>
      )}

      <span className={cn("sr-only", classes?.srOnly)}>
        {isLoading ? getLabel(label?.loading, "label.loading") : ""}
      </span>
    </ButtonPrimitive>
  );
};