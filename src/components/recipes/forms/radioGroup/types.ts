import type { ReactNode } from 'react';
import type { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupClasses {
  legend?: string
  group?: string
  itemWrapper?: string
  item?: string
  itemLabel?: string
  helperText?: string
  error?: string
}

export interface RadioGroupProps extends RadioGroupPrimitive.Props {
  id: string
  label: string
  options: RadioOption[]
  helperText?: string | ReactNode
  error?: string | ReactNode
  className?: string
  classes?: RadioGroupClasses
}