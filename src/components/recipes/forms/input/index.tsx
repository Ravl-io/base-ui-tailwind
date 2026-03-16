import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ingredients/field';
import { Input as InputPrimitive } from '@/components/ingredients/input';
import { cn } from '@/lib/utils/utils';
import type { InputProps } from './types';

export const Input = ({ id, label, helperText, error, className, classes, ...props }: InputProps) => {
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const ariaDescribedBy = `${helperText ? helperId : ""} ${error ? errorId : ""}`;

  return (
    <Field data-invalid={!!error || undefined} className={cn(className)}>
      <FieldLabel htmlFor={id} className={cn(classes?.label)}>{label}</FieldLabel>
      <InputPrimitive
        id={id}
        aria-describedby={ariaDescribedBy || undefined}
        aria-invalid={!!error}
        className={cn(classes?.input)}
        {...props}
      />
      {helperText && (
        <FieldDescription id={helperId} className={cn(classes?.helperText)}>{helperText}</FieldDescription>
      )}
      {error && (
        <FieldError id={errorId} className={cn(classes?.error)} errors={typeof error === 'string' ? [{ message: error }] : undefined}>
          {typeof error !== 'string' ? error : undefined}
        </FieldError>
      )}
    </Field>
  );
};