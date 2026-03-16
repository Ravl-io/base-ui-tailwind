import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ingredients/field';
import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ingredients/select';
import { cn } from '@/lib/utils/utils';
import type { SelectProps } from './types';

export type { SelectProps, SelectClasses, SelectOption } from './types';

export const Select = ({
                         id,
                         label,
                         options,
                         placeholder,
                         helperText,
                         error,
                         className,
                         classes,
                         ...props
                       }: SelectProps) => {
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const ariaDescribedBy = `${helperText ? helperId : ""} ${error ? errorId : ""}`.trim();

  return (
    <Field
      data-invalid={!!error || undefined}
      className={cn("gap-2", className)}
    >
      <FieldLabel htmlFor={id} className={cn(classes?.label)}>
        {label}
      </FieldLabel>

      <SelectPrimitive {...props}>
        <SelectTrigger
          id={id}
          aria-describedby={ariaDescribedBy || undefined}
          aria-invalid={!!error}
          className={cn(classes?.trigger)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={cn(classes?.content)}>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={cn(classes?.item)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPrimitive>

      {helperText && (
        <FieldDescription id={helperId} className={cn(classes?.helperText)}>
          {helperText}
        </FieldDescription>
      )}
      {error && (
        <FieldError
          id={errorId}
          className={cn(classes?.error)}
          errors={typeof error === 'string' ? [{ message: error }] : undefined}
        >
          {typeof error !== 'string' ? error : undefined}
        </FieldError>
      )}
    </Field>
  );
};