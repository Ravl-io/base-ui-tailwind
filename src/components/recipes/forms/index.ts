import { Form as FormRoot } from './form';
import { Input } from './input';
import { Select } from './select';
// import { Textarea } from './textarea';
import { Checkbox } from './checkbox';
import { RadioGroup } from './radioGroup';

export const Form = Object.assign(FormRoot, {
  Input,
  Select,
  // Textarea,
  Checkbox,
  RadioGroup,
});

// types
export type { FormProps } from './form';
export type { InputProps } from './input/types.ts';
export type { SelectProps } from './select';
// export type { TextareaProps } from './textarea';
export type { CheckboxProps } from './checkbox';
export type { RadioGroupProps } from './radioGroup';