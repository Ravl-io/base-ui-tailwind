import type { SyntheticEvent, ReactNode, HTMLAttributes } from 'react';

export interface FormLabels {
  submit: string
  cancel?: string
  reset?: string
}

export interface FormClassNames {
  root?: string
  actions?: string
  cancelButton?: string
  resetButton?: string
  submitButton?: string
  error?: string
}

export interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  name: string
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
  onCancel?: () => void
  onReset?: () => void
  error?: string | ReactNode
  isSubmitting?: boolean
  labels: FormLabels
  classNames?: FormClassNames
  children: ReactNode
}