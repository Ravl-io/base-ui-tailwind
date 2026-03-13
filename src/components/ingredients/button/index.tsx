import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils/utils.ts";
import { getLabel } from "@/lib/utils/getLabel.ts";
import { buttonVariants } from "./variants";
import type { ButtonProps } from "./types";

export type { ButtonProps, ButtonClassNames, ButtonLabel } from "./types";
export { buttonVariants } from './variants';

export const Button = ({
                         className,
                         variant = "default",
                         size = "default",
                         isLoading = false,
                         label,
                         classNames,
                         disabled,
                         children,
                         ...props
                       }: ButtonProps) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled}
      aria-disabled={isLoading || disabled}
      aria-busy={isLoading}
      onClick={isLoading ? (e) => e.preventDefault() : props.onClick}
      className={cn(buttonVariants({ variant, size }), className, classNames?.root)}
      {...props}
    >
      <span className={cn(isLoading && "invisible", classNames?.content)}>
        {children}
      </span>

      {isLoading && (
        <span className={cn("absolute inset-0 flex items-center justify-center", classNames?.spinner)}>
          <Loader2 className="animate-spin" aria-hidden="true" />
        </span>
      )}

      <span className={cn("sr-only", classNames?.srOnly)}>
        {isLoading ? getLabel(label?.loading, "label.loading") : ""}
      </span>
    </ButtonPrimitive>
  );
};