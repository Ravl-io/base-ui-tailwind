import { FieldSet, FieldLegend, FieldDescription, FieldError } from '@/components/ingredients/field';
import { RadioGroup as RadioGroupPrimitive, RadioGroupItem } from '@/components/ingredients/radio-group';
import { cn } from '@/lib/utils/utils';
import type { RadioGroupProps } from './types';

export type { RadioGroupProps, RadioGroupClasses, RadioOption } from './types';

export const RadioGroup = ({
                             id,
                             label,
                             options,
                             helperText,
                             error,
                             className,
                             classes,
                             ...props
                           }: RadioGroupProps) => {
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const ariaDescribedBy = `${helperText ? helperId : ""} ${error ? errorId : ""}`.trim();

  return (
    <FieldSet
      aria-invalid={!!error || undefined}
      aria-describedby={ariaDescribedBy || undefined}
      className={cn(className)}
    >
      <FieldLegend className={cn(classes?.legend)}>
        {label}
      </FieldLegend>

      <RadioGroupPrimitive
        id={id}
        name={id}
        className={cn(classes?.group)}
        {...props}
      >
        {options.map((option) => {
          const optionId = `${id}-${option.value}`;
          const labelId = `${id}-${option.value}-label`;
          return (
            <div key={option.value} className={cn("flex items-center gap-2", classes?.itemWrapper)}>
              <RadioGroupItem
                id={optionId}
                value={option.value}
                disabled={option.disabled}
                aria-labelledby={labelId}
                aria-invalid={!!error || undefined}
                className={cn(classes?.item)}
              />
              <label
                id={labelId}
                htmlFor={optionId}
                className={cn(
                  "text-sm font-medium leading-snug",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  classes?.itemLabel,
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </RadioGroupPrimitive>

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
    </FieldSet>
  );
};