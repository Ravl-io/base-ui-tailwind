import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field';
import { Input as InputPrimitive } from '@/components/ui/input';
import { cn } from '@/lib/utils/utils';
import type { InputProps } from './types';

export const Input = ({ id, label, helperText, error, classNames, ...props }: InputProps) => {
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const ariaDescribedBy = `${helperText ? helperId : ""} ${error ? errorId : ""}`;

  return (
    <Field data-invalid={!!error || undefined} className={cn(classNames?.root)}>
      <FieldLabel htmlFor={id} className={cn(classNames?.label)}>{label}</FieldLabel>
      <InputPrimitive
        id={id}
        aria-describedby={ariaDescribedBy || undefined}
        aria-invalid={!!error}
        className={cn(classNames?.input)}
        {...props}
      />
      {helperText && (
        <FieldDescription id={helperId} className={cn(classNames?.helperText)}>{helperText}</FieldDescription>
      )}
      {error && (
        <FieldError id={errorId} className={cn(classNames?.error)} errors={typeof error === 'string' ? [{ message: error }] : undefined}>
          {typeof error !== 'string' ? error : undefined}
        </FieldError>
      )}
    </Field>
  );
};