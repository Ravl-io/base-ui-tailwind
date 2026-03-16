import React from 'react';

export interface InputClasses {
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
  classes?: InputClasses;
}