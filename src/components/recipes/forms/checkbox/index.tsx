import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ingredients/field';
import { Checkbox as CheckboxPrimitive } from '@/components/ingredients/checkbox';
import { cn } from '@/lib/utils/utils';
import type { CheckboxProps } from './types';

export type { CheckboxProps, CheckboxClassNames } from './types';

export const Checkbox = ({
                           id,
                           label,
                           helperText,
                           error,
                           classNames,
                           ...props
                         }: CheckboxProps) => {
  const labelId = `${id}-label`;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const ariaDescribedBy = `${helperText ? helperId : ""} ${error ? errorId : ""}`.trim();

  return (
    <Field
      data-invalid={!!error || undefined}
      className={cn("gap-2", classNames?.root)}
    >
      <div className={cn("flex flex-row items-center gap-2", classNames?.wrapper)}>
        <FieldLabel
          id={labelId}
          className={cn("flex items-center gap-2 cursor-pointer min-h-6", classNames?.label)}
        >
          {/* p-1 extends the click target to 24×24px to satisfy WCAG 2.5.8
              Visual box remains 16px (size-4) inside the primitive */}
          <CheckboxPrimitive
            aria-labelledby={labelId}
            aria-describedby={ariaDescribedBy || undefined}
            aria-invalid={!!error}
            className={cn("p-1", classNames?.checkbox)}
            {...props}
          />
          {label}
        </FieldLabel>
      </div>

      {helperText && (
        <FieldDescription id={helperId} className={cn(classNames?.helperText)}>
          {helperText}
        </FieldDescription>
      )}
      {error && (
        <FieldError
          id={errorId}
          className={cn(classNames?.error)}
          errors={typeof error === 'string' ? [{ message: error }] : undefined}
        >
          {typeof error !== 'string' ? error : undefined}
        </FieldError>
      )}
    </Field>
  );
};