import { FieldSet, FieldLegend, FieldDescription, FieldError } from '@/components/ui/field';
import { RadioGroup as RadioGroupPrimitive, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils/utils';
import type { RadioGroupProps } from './types';

export type { RadioGroupProps, RadioGroupClassNames, RadioOption } from './types';

export const RadioGroup = ({
                             id,
                             label,
                             options,
                             helperText,
                             error,
                             classNames,
                             ...props
                           }: RadioGroupProps) => {
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const ariaDescribedBy = `${helperText ? helperId : ""} ${error ? errorId : ""}`;

  return (
    <FieldSet
      aria-invalid={!!error || undefined}
      aria-describedby={ariaDescribedBy || undefined}
      className={cn(classNames?.root)}
    >
      <FieldLegend className={cn(classNames?.legend)}>
        {label}
      </FieldLegend>

      <RadioGroupPrimitive
        id={id}
        name={id}
        className={cn(classNames?.group)}
        {...props}
      >
        {options.map((option) => {
          const optionId = `${id}-${option.value}`;
          return (
            <div key={option.value} className={cn("flex items-center gap-2", classNames?.itemWrapper)}>
              <RadioGroupItem
                id={optionId}
                value={option.value}
                disabled={option.disabled}
                aria-invalid={!!error || undefined}
                className={cn(classNames?.item)}
              />
              <label
                htmlFor={optionId}
                className={cn(
                  "text-sm font-medium leading-snug",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  classNames?.itemLabel,
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </RadioGroupPrimitive>

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
    </FieldSet>
  );
};