import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field';
import { Checkbox as CheckboxPrimitive } from '@/components/ui/checkbox';
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
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const ariaDescribedBy = `${helperText ? helperId : ""} ${error ? errorId : ""}`;

  return (
    <Field
      data-invalid={!!error || undefined}
      className={cn("gap-2", classNames?.root)}
    >
      <div className={cn("flex flex-row items-center gap-2", classNames?.wrapper)}>
        <CheckboxPrimitive
          id={id}
          aria-describedby={ariaDescribedBy || undefined}
          aria-invalid={!!error}
          className={cn(classNames?.checkbox)}
          {...props}
        />
        <FieldLabel htmlFor={id} className={cn(classNames?.label)}>
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
