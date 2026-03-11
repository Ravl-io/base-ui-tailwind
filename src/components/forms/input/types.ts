import React from 'react';

export interface InputClassNames {
  root?: string;
  label?: string;
  input?: string;
  helperText?: string;
  error?: string;
}

export interface InputProps extends Omit<React.ComponentProps<'input'>, 'id'> {
  id: string;
  label: string;
  helperText?: string | React.ReactNode;
  error?: string | React.ReactNode;
  classNames?: InputClassNames;
}