import type { ReactNode } from 'react';
import type { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

export interface CheckboxClasses {
  wrapper?: string
  checkbox?: string
  label?: string
  helperText?: string
  error?: string
}

export interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  id: string
  label: string | ReactNode
  helperText?: string | ReactNode
  error?: string | ReactNode
  className?: string
  classes?: CheckboxClasses
}
