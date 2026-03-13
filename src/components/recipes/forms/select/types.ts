import type { ReactNode } from 'react';
import type { Select as SelectPrimitive } from '@base-ui/react/select';

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectClassNames {
  root?: string
  label?: string
  trigger?: string
  content?: string
  item?: string
  helperText?: string
  error?: string
}

export interface SelectProps extends SelectPrimitive.Root.Props<string> {
  id: string
  label: string
  options: SelectOption[]
  placeholder?: string
  helperText?: string | ReactNode
  error?: string | ReactNode
  classNames?: SelectClassNames
}