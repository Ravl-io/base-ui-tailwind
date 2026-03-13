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

export type { SelectProps, SelectClassNames, SelectOption } from './types';

export const Select = ({
                         id,
                         label,
                         options,
                         placeholder,
                         helperText,
                         error,
                         classNames,
                         ...props
                       }: SelectProps) => {
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const ariaDescribedBy = `${helperText ? helperId : ""} ${error ? errorId : ""}`.trim();

  return (
    <Field
      data-invalid={!!error || undefined}
      className={cn("gap-2", classNames?.root)}
    >
      <FieldLabel htmlFor={id} className={cn(classNames?.label)}>
        {label}
      </FieldLabel>

      <SelectPrimitive {...props}>
        <SelectTrigger
          id={id}
          aria-describedby={ariaDescribedBy || undefined}
          aria-invalid={!!error}
          className={cn(classNames?.trigger)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={cn(classNames?.content)}>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={cn(classNames?.item)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPrimitive>

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